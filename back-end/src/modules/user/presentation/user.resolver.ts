import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../aplication/services/user.service';
import { UserResponseDto } from './DTO/response/user-response.dto';
import { UserRequestDto } from './DTO/request/user-request.dto';
import { User } from 'generated/prisma/browser';

// @Resolver(() => UserResponseDto)
@Resolver(() => UserResponseDto)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserResponseDto], { name: 'getAll' })
  async getAll(): Promise<UserResponseDto[]> {
    return this.userService.finAll();
  }

  //   @Query(() => [User])
  //   async users() {
  //     return this.userService.findAll();
  //   }

  //   @Query(() => User, { nullable: true })
  //   async user(@Args('id', { type: () => Int }) id: number) {
  //     return this.userService.findById(id);
  //   }

  @Mutation(() => UserResponseDto, { name: 'createUser' })
  async createUser(
    @Args('data') data: UserRequestDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.createUser(data);

    // Necessário fazer o automapping manual aqui
    const res: UserResponseDto = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: '',
      created_at: user.created_at,
    };

    return res;
  }
}
