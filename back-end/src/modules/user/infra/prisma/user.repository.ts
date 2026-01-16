import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRequestDto } from '../../presentation/DTO/request/user-request.dto';
import { UserResponseDto } from '../../presentation/DTO/response/user-response.dto';
import { User } from 'generated/prisma/client';
import { CreateDbUserDto } from '../../aplication/DTO/create-db-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }
  //#region GET

  async findAll(): Promise<UserResponseDto[]> {
    console.log('Acessando o banco de dados para buscar todos os usuários...');
    return this.prisma.user.findMany();
  }

  // async findById(id: number): Promise<User | null> {
  //     return this.prisma.user.findUnique({ where: { id } });
  // }

  //#endregion

  //#region  CREATE

  async create(data: CreateDbUserDto): Promise<User> {
    const res = this.prisma.user.create({ data });
    return res;
  }

  //#endregion

  //#region UPDATE
  //#endregion

  //#region DELETE
  //#endregion
}
