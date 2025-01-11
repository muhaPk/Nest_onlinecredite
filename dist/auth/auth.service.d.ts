import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    sendOtp(phone: string): Promise<boolean>;
    verifyOtp(phone: string, otp: string): Promise<{
        accessToken: string;
        refreshToken: string;
        userId: number;
    }>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
