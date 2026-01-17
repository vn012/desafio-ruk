import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infra/prisma/user.repository';
import { CreateDbUserDto } from '../DTO/create-db-user.dto';
import { User } from 'generated/prisma/browser';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  //#region GET
  async findById(id: number): Promise<User | null> {
    const user = await this.userRepository.findById(id);

    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
  //#endregion

  //#region CREATE
  async createUser(data: CreateDbUserDto): Promise<User> {
    const res = this.userRepository.create(data);
    return res;
  }
  //#endregion
}
