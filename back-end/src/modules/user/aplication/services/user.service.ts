import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infra/prisma/user.repository';
import { UserResponseDto } from '../../presentation/DTO/response/user-response.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    //   async findAll(): Promise<User[]> {
    //     return this.userRepository.findAll();
    //   }

    //   async findById(id: number): Promise<User | null> {
    //     return this.userRepository.findById(id);
    //   }

    //   async create(name: string, email: string): Promise<User> {
    //     return this.userRepository.create({ name, email });
    //   }

    async teste(teste?: string): Promise<any> {
        return this.userRepository.teste(teste || "vazio");
    }
    async finAll(): Promise<UserResponseDto[]> {
        return this.userRepository.findAll();
    }

}
