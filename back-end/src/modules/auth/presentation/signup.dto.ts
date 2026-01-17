import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SignupDto {
  @Field()
  id: string;

  @Field()
  created_at: string;

  @Field({ nullable: true })
  modified_at?: string;
}

@ObjectType()
export class SignupResponseDto {
  @Field(() => Int)
  statusCode: number;

  @Field()
  message: string;

  @Field(() => SignupDto)
  data: SignupDto;
}
