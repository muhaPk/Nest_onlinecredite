import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {

  @Field(() => Int)
  id: number

  @Field()
  idPassport: string | null

  @Field()
  name: string

  @Field()
  surname: string

  @Field()
  email: string

  @Field()
  phone: string

  @Field()
  imgPassport: string

  @Field()
  isVerified: boolean

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
