import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infra/prisma/user.repository';
import { CreateDbUserDto } from '../DTO/create-db-user.dto';
import { User } from 'generated/prisma/browser';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  //   async findAll(): Promise<User[]> {
  //     return this.userRepository.findAll();
  //   }

  //   async findById(id: number): Promise<User | null> {
  //     return this.userRepository.findById(id);
  //   }

  //   async create(name: string, email: string): Promise<User> {
  //     return this.userRepository.create({ name, email });
  //   }

  async finAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async createUser(data: CreateDbUserDto): Promise<User> {
    const res = this.userRepository.create(data);
    return res;
  }
}
