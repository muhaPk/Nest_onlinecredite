import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UserFilterInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  idPassport?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  surname?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  imgPassport?: string;

  @Field({ nullable: true })
  isVerified?: boolean;
}
