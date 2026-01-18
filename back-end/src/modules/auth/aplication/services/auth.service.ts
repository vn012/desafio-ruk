import {
  Injectable,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/modules/user/aplication/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from '../../presentation/DTO/response/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private jwtService: JwtService) {}

  async signUp(data: {
    email: string;
    name: string;
    password: string;
    telephones: {
      area_code: number;
      number: number;
    }[];
  }) {
    if (!data.telephones || data.telephones.length === 0) {
      throw new BadRequestException('Informe ao menos um telefone');
    }

    const userExists = await this.userService.findByEmail(data.email);

    if (userExists) throw new ConflictException('E-mail já cadastrado');
    
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userService.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      telephones: data.telephones,
    });

    return {
      id: user.id,
      created_at: user.created_at.toISOString(),
      modified_at: user.modified_at?.toISOString(),
    };
  }
  
  async auth(email: string, password: string): Promise<string> {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');
  
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return this.jwtService.sign(payload);
  }

  //#region aux
  private async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) return null;
    
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) return null;
    
    return user;
  }

}
