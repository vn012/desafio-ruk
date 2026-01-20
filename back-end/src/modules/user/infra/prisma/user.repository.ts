import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from 'generated/prisma/client';
import { CreateDbUserDto } from '../../aplication/DTO/create-db-user.dto';


@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  //#region GET

  async findAll(): Promise<User[]> {
    const res = await this.prisma.user.findMany();
    return res;

    
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
    
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  //#endregion

  //#region  CREATE

  async create(data: CreateDbUserDto) {
    const userData: Prisma.UserCreateInput = {
      name: data.name,
      email: data.email,
      password: data.password,
      telephones: {
        create: data.telephones,
      },
    };

    return this.prisma.user.create({
      data: userData,
      include: {
        telephones: true,
      },
    });
  }
  //#endregion

  //#region UPDATE
  //#endregion

  //#region DELETE
  //#endregion
}



const USERS_MOCK: User[] = [
  {
    id: 1,
    name: 'Admin',
    email: 'admin@email.com',
    password: '123456',
    created_at: new Date('2024-01-01'),
    modified_at: null,
    deleted_at: null,
  },
  {
    id: 2,
    name: 'User',
    email: 'user@email.com',
    password: '123456',
    created_at: new Date('2024-01-10'),
    modified_at: null,
    deleted_at: null,
  },
];