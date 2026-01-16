import { Injectable } from '@nestjs/common';
import { user } from '../../domain/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}
  // //#region GET
  // async findAll(): Promise<user[]> {
  //   return database.users;
  // }
  async findAll(): Promise<any> {
    // return this.prisma.user.findMany();
  }

  // async findById(id: number): Promise<User | null> {
  //     return this.prisma.user.findUnique({ where: { id } });
  // }

  async teste(teste: string): Promise<string> {
    return teste;
  }
  //#endregion

  //#region  CREATE

  //#endregion

  //#region UPDATE
  //#endregion

  //#region DELETE
  //#endregion
}


export const database = {
  users: [
    new user(
      1,
      'João Silva',
      'joao@email.com',
      '123456',
      [
        { number: 999999999, area_code: 11 },
        { number: 888888888, area_code: 21 },
      ],
      new Date('2026-01-01'),
    ),
    new user(
      2,
      'Maria Souza',
      'maria@email.com',
      'abcdef',
      [{ number: 777777777, area_code: 31 }],
      new Date('2026-01-05'),
    ),
  ],
};