import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from '../aplication/services/auth.service';
import { AuthResponseDto } from './auth-response.dto';
import { UserRequestDto } from 'src/modules/user/presentation/DTO/request/user-request.dto';
import { SignupDto, SignupResponseDto } from './signup.dto';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => AuthResponseDto, { name: 'SignIn' })
    async signIn(
        @Args('email', { type: () => String }) email: string,
        @Args('password', { type: () => String }) password: string,
    ): Promise<AuthResponseDto> {

        // const token = await this.authService.auth(email, password);
        const token = "await this.authService.auth(email, password);"

        return {
            statusCode: 200,
            message: "Login realizado com sucesso",
            data: token
        }
    }

@Mutation(() => SignupResponseDto)
async signUp(
  @Args('data') data: UserRequestDto,
): Promise<SignupResponseDto> {
  const user = await this.authService.signUp(data);

  return {
    statusCode: 200,
    message: 'Usuário registrado com sucesso',
    data: {
      id: user.id.toString(),
      created_at: user.created_at.toString(),
      modified_at: user.modified_at?.toString(),
    },
  };
}


    
    
}