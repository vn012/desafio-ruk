import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AuthResponseDto {
  @Field()
  token: string; 
}
