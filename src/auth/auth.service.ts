// auth.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as twilio from 'twilio';
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } from 'src/config/consts';

@Injectable()
export class AuthService {
  private twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async sendOtp(phone: string): Promise<boolean> {
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    console.log(`OTP Code: ${otpCode}`); // For testing
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Expires in 5 minutes


    const user = await this.prisma.user.findUnique({ where: { phone } });
    if (!user) {
        throw new BadRequestException('User not found');
      }

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

  async verifyOtp(phone: string, otp: string): Promise<string> {
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
    const payload = { sub: user.id, phone: user.phone };
    return this.jwtService.sign(payload);
  }

}
