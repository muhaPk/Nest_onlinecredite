import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class VerifyOtpResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => Int)
  userId: number;
}