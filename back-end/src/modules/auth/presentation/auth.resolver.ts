import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from '../aplication/services/auth.service';
import { AuthResponseDto } from './DTO/response/auth-response.dto';
import { SignupDto } from './DTO/response/signup.dto';
import { Public } from '../aplication/public.decorator';
import { SignUpRequestDto } from './DTO/request/signup-request.dto';
import { SignInRequestDto } from './DTO/request/signIn-request.dto';

@Resolver()
export class AuthResolver {
  
  constructor(private readonly authService: AuthService) { }
  @Mutation(() => AuthResponseDto, { name: 'SignIn' })
  @Public()
  async SignIn(
    _parent: any,
    @Args('args') args: SignInRequestDto,
  ): Promise<AuthResponseDto> {
    const { email, password } = args;
    return this.authService.auth(email, password);
  }


  @Mutation(() => SignupDto, { name: "signUp" })
  @Public()
  async signUp(
     _parent: any,
    @Args('args') args: SignUpRequestDto,
  ): Promise<SignupDto> {
    console.log("ioe")
    const user = await this.authService.signUp(args);


    return user
    
  }
}