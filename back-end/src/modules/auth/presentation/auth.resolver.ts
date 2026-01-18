import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from '../aplication/services/auth.service';
import { AuthResponseDto } from './DTO/response/auth-response.dto';
import { UserRequestDto } from 'src/modules/user/presentation/DTO/request/user-request.dto';
import { SignupDto } from './DTO/response/signup.dto';
import { Public } from '../aplication/public.decorator';
import type { MutationResolvers, MutationSignInArgs } from 'src/graphql/generated';
import { MutationSignUpArgs } from 'src/modules/user/presentation/DTO/request/mutation-signup.args';
@Resolver()
export class AuthResolver implements MutationResolvers {
  
  constructor(private readonly authService: AuthService) { }
  @Mutation(() => AuthResponseDto, { name: 'SignIn' })
  async SignIn(
    _parent: any,
    args: MutationSignInArgs,
  ): Promise<string> {
    const { email, password } = args;
    return this.authService.auth(email, password);
  }


  @Mutation(() => SignupDto, { name: "signUp" })
  @Public()
  async signUp(
     _parent: any,
    @Args() args: MutationSignUpArgs,
  ): Promise<SignupDto> {
    console.log("ioe")
    const user = await this.authService.signUp(args.data);

    return {
      id: user.id.toString(),
      created_at: user.created_at.toString(),
      modified_at: user.modified_at?.toString(),
    };
  }





}