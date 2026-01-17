import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class TelephoneInput {
  @Field(() => Int)
  number: number;

  @Field(() => Int)
  area_code: number;
}

@InputType()
export class UserRequestDto {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => [TelephoneInput])
  telephones: TelephoneInput[];
}
