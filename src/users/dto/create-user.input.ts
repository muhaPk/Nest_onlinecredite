import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {

  @Field({ nullable: true })
  idPassport?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  surname?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  isVerified?: boolean
  
}
