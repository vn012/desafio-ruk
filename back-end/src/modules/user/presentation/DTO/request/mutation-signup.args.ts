import { ArgsType, Field } from '@nestjs/graphql';
import { UserRequestDto } from './user-request.dto';

@ArgsType()
export class MutationSignUpArgs {
  @Field(() => UserRequestDto)
  data: UserRequestDto;
}
