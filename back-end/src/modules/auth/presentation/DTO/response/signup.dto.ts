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

