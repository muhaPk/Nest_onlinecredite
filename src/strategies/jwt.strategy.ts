import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ACCESS_SECRET_KEY } from '../config/consts'; // Replace with your actual secret
import { PrismaService } from '../prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly prisma: PrismaService) { // Inject PrismaService
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header
      ignoreExpiration: false, // Reject expired tokens
      secretOrKey: ACCESS_SECRET_KEY, // Use environment variable for production
    });
  }

  // Validate payload extracted from token
  // async validate(payload: any) {
  //   return { userId: payload.sub, phone: payload.phone };
  // }

  async validate(payload: any) {
    console.log('✅ Decoded Token:', payload);

    // Check if user is authenticated via Google or Phone
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { id: payload.userId }, // Google-authenticated users
          { phone: payload.phone }, // Phone-authenticated users
        ],
      },
    });

    if (!user) {
      console.error('❌ Unauthorized: User not found');
      throw new UnauthorizedException('Invalid token');
    }

    return user; // Attach full user object to context
  }

}
