import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from '../aplication/services/auth.service';
import { AuthResponseDto } from './DTO/response/auth-response.dto';
import { UserRequestDto } from 'src/modules/user/presentation/DTO/request/user-request.dto';
import { SignupDto } from './DTO/response/signup.dto';
import { Public } from '../aplication/public.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => AuthResponseDto, { name: 'SignIn' })
  @Public()
  async signIn(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return {
      token: await this.authService.auth(email, password),
    };
  }

  @Mutation(() => SignupDto, { name: "SignUp" })
  @Public()
  async signUp(
    @Args('data') data: UserRequestDto,
  ): Promise<SignupDto> {
    const user = await this.authService.signUp(data);

    return {
      id: user.id.toString(),
      created_at: user.created_at.toString(),
      modified_at: user.modified_at?.toString(),
    };
  }




}