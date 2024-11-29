import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {

  @Field(() => Int)
  id: number;

  @Field()
  name: string

  @Field()
  email: string

  @Field()
  phone: string

  @Field()
  isVerified: boolean

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
