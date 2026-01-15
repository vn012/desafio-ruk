import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from '../aplication/services/user.service';
import { AuthResponseDto } from './auth-response.dto';

@Resolver(() => AuthResponseDto)
export class UserResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => AuthResponseDto, { name: 'SignIn' })
    async signIn(
        @Args('email', { type: () => String }) email: string,
        @Args('password', { type: () => String }) password: string,
    ): Promise<AuthResponseDto> {

        const token = await this.authService.auth(email, password);

        return {
            statusCode: 200,
            message: "Login realizado com sucesso",
            data: token
        }
    }
}