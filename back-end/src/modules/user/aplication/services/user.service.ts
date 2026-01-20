import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infra/prisma/user.repository';
import { CreateDbUserDto } from '../DTO/create-db-user.dto';
import { User } from 'generated/prisma/browser';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }
  //#region GET
  async findById(id: number): Promise<User | null> {
    const user = await this.userRepository.findById(id);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    console.log("Finding user by email:", email);
    // const user = await this.userRepository.findByEmail(email);

    // return user;

    // MOCK
    const user = USERS_MOCK.find(u => u.email === email) ?? null;
    return user;
  }

  async findAll(): Promise<User[]> {
    // return await this.userRepository.findAll();
    return USERS_MOCK;
  }
  //#endregion

  //#region CREATE
  async create(data: CreateDbUserDto): Promise<User> {
    const res = this.userRepository.create(data);
    return res;
  }
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