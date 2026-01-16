import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserRequestDto {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
