import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
@InputType()
export class TelephoneInput {
  @Field(() => Int)
  number: number;

  @Field(() => Int)
  area_code: number;
}

@InputType()
export class SignUpRequestDto {
  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field(() => [TelephoneInput])
  telephones: TelephoneInput[];
}
