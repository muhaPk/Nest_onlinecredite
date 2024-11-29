import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  isVerified?: boolean
  
}
