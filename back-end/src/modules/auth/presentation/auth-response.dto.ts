import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AuthResponseDto {
  @Field(() => Int)
  statusCode: number;

  @Field()
  message: string;

  @Field()
  data: string; // token JWT
}
