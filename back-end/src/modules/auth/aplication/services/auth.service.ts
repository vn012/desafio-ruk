import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/modules/user/aplication/services/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(data: {
    name: string;
    email: string;
    password: string;
    telephones: {
      number: number;
      area_code: number;
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
}
