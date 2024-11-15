// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'src/prisma.service'
import { SECRET_KEY } from 'src/config/consts';

@Module({
  imports: [
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, AuthResolver, PrismaService],
})
export class AuthModule {}
