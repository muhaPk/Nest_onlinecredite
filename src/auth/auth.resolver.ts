// src/auth/auth.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean)
  async sendOtp(@Args('phone') phone: string): Promise<boolean> {
    return this.authService.sendOtp(phone);
  }

  @Mutation(() => String)
  async verifyOtp(
    @Args('phone') phone: string,
    @Args('otp') otp: string
  ): Promise<string> {
    return this.authService.verifyOtp(phone, otp);
  }
}
