// auth.service.ts
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
// import Twilio from 'twilio';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } from '../config/consts';
import { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } from '../config/consts';

@Injectable()
export class AuthService {
  // private twilioClient = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async sendOtp(phone: string): Promise<boolean> {

    const user = await this.prisma.user.findUnique({ where: { phone } });
    if (!user) {
        throw new BadRequestException('User not found');
      }

    // const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const otpCode = '1111'
    // console.log(`OTP Code: ${otpCode}`);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Expires in 5 minutes

    await this.prisma.otpCode.upsert({
        where: { userId: user.id },
        update: { otpCode, expiresAt },
        create: { userId: user.id, otpCode, expiresAt },
      });


    // Send OTP via Twilio
    // await this.twilioClient.messages.create({
    //   body: `Your OTP code is ${otpCode}`,
    //   from: 'YOUR_TWILIO_PHONE_NUMBER',
    //   to: `${phone}`,
    // });

    await this.prisma.user.updateMany({
        where: { phone },
        data: { isVerified: false },
      });


    return true;
  }

  async verifyOtp(phone: string, otp: string): Promise<{ accessToken: string; refreshToken: string, userId: number }> {

    const user = await this.prisma.user.findFirst({ where: { phone } });

    if (!user) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    const otpEntry = await this.prisma.otpCode.findUnique({
        where: { userId: user.id },
    });

    if (!otpEntry || otpEntry.otpCode !== otp || otpEntry.expiresAt < new Date()) {
        throw new BadRequestException('Invalid or expired OTP');
    }

    await this.prisma.otpCode.delete({ where: { userId: user.id } });
    

    await this.prisma.user.updateMany({
      where: { phone },
      data: { isVerified: true },
    });

    // Generate JWT token
    const payload = { sub: user.id, phone: user.phone }

    const accessToken = this.jwtService.sign(payload, {
      secret: ACCESS_SECRET_KEY, 
      expiresIn: '1m' // 15m
    })

    const refreshToken = this.jwtService.sign(payload, {
      secret: REFRESH_SECRET_KEY, 
      expiresIn: '7d', // Example: 7 days
    })

    return { accessToken, refreshToken, userId: user.id }
  }


  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {

    try {
      // Verify the refresh token
      const decoded = this.jwtService.verify(refreshToken, { secret: REFRESH_SECRET_KEY });

      const user = await this.prisma.user.findUnique({
        where: { id: decoded.sub },
      });
      console.log('user ' + user)

      if (!user) throw new UnauthorizedException('User not found');

      // Issue new tokens
      const newAccessToken = this.jwtService.sign(
        { sub: user.id, phone: user.phone },
        { secret: ACCESS_SECRET_KEY, expiresIn: '1m' }, // 15m
      );

      const newRefreshToken = this.jwtService.sign(
        { sub: user.id, phone: user.phone },
        { secret: REFRESH_SECRET_KEY, expiresIn: '7d' },
      );

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }


}
