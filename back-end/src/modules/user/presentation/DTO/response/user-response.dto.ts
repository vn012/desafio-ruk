import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType() // Define um tipo GraphQL
export class UserResponseDto {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  created_at: Date;
}
