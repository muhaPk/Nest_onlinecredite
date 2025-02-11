import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { VerifyOtpResponse } from './dto/verify-otp-response.dto';
import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_CLIENT_ID } from '../config/consts';

@Resolver()
export class AuthResolver {
  private client = new OAuth2Client(GOOGLE_CLIENT_ID);

  constructor(private readonly authService: AuthService) {}

  // phone auth
  @Mutation(() => Boolean)
  async sendOtp(@Args('phone') phone: string): Promise<boolean> {
    return this.authService.sendOtp(phone);
  }

  @Mutation(() => VerifyOtpResponse)
  async verifyOtp(
    @Args('phone') phone: string,
    @Args('otp') otp: string
  ): Promise<VerifyOtpResponse> {
    return this.authService.verifyOtp(phone, otp);
  }

  // google auth
  @Mutation(() => String)
  async googleAuth(@Args('token') token: string): Promise<string> {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) throw new Error('Invalid Google token');

    const user = await this.authService.validateGoogleUser({
      email: payload.email,
      name: payload.name,
      avatar: payload.picture,
      providerId: payload.sub,
    });

    return user.accessToken; // Return JWT token
  }


}
