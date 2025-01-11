"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma.service");
const consts_1 = require("../config/consts");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async sendOtp(phone) {
        const user = await this.prisma.user.findUnique({ where: { phone } });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
        console.log(`OTP Code: ${otpCode}`);
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        await this.prisma.otpCode.upsert({
            where: { userId: user.id },
            update: { otpCode, expiresAt },
            create: { userId: user.id, otpCode, expiresAt },
        });
        await this.prisma.user.updateMany({
            where: { phone },
            data: { isVerified: false },
        });
        return true;
    }
    async verifyOtp(phone, otp) {
        const user = await this.prisma.user.findFirst({ where: { phone } });
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired OTP');
        }
        const otpEntry = await this.prisma.otpCode.findUnique({
            where: { userId: user.id },
        });
        if (!otpEntry || otpEntry.otpCode !== otp || otpEntry.expiresAt < new Date()) {
            throw new common_1.BadRequestException('Invalid or expired OTP');
        }
        await this.prisma.otpCode.delete({ where: { userId: user.id } });
        await this.prisma.user.updateMany({
            where: { phone },
            data: { isVerified: true },
        });
        const payload = { sub: user.id, phone: user.phone };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: '15m'
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: '7d',
        });
        return { accessToken, refreshToken, userId: user.id };
    }
    async refreshToken(refreshToken) {
        try {
            const decoded = this.jwtService.verify(refreshToken, { secret: consts_1.REFRESH_SECRET_KEY });
            const user = await this.prisma.user.findUnique({
                where: { id: decoded.sub },
            });
            if (!user)
                throw new common_1.UnauthorizedException('User not found');
            const newAccessToken = this.jwtService.sign({ sub: user.id, phone: user.phone }, { secret: consts_1.ACCESS_SECRET_KEY, expiresIn: '15m' });
            const newRefreshToken = this.jwtService.sign({ sub: user.id, phone: user.phone }, { secret: consts_1.REFRESH_SECRET_KEY, expiresIn: '7d' });
            return { accessToken: newAccessToken, refreshToken: newRefreshToken };
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map