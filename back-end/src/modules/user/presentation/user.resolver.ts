import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from '../aplication/services/user.service';
import { UserResponseDto } from './DTO/response/user-response.dto';
import { UserRequestDto } from './DTO/request/user-request.dto';

// @Resolver(() => UserResponseDto)
@Resolver(() => UserResponseDto)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserResponseDto], { name: 'getAll' })
  async getAll(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll();

    const res: UserResponseDto[] = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: '',
      created_at: user.created_at,
    }));

    return res;
  }

  @Query(() => UserResponseDto, { name: 'getUserById' })
  async getUserById(@Args('id') id: number): Promise<UserResponseDto | null> {
    const user = await this.userService.findById(id);

    if (!user) return null;

    const res: UserResponseDto = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: '',
      created_at: user.created_at,
    }
    return res;
  }

  @Mutation(() => UserResponseDto, { name: 'createUser' })
  async createUser(
    @Args('data') data: UserRequestDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.create(data);

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
