import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from '../aplication/services/user.service';
import { UserResponseDto } from './DTO/response/user-response.dto';

// @Resolver(() => UserResponseDto)
@Resolver(() => UserResponseDto)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Query(() => String, { name: 'teste' })
    async users(
        @Args('nameTeste2', { type: () => String }) nameTeste1: string,
    ): Promise<string> {
        return this.userService.teste(nameTeste1);
    }

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

    //   @Mutation(() => User)
    //   async createUser(@Args('data') data: CreateUserInput) {
    //     return this.userService.create(data.name, data.email);
    //   }
}
