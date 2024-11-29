// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'src/prisma.service'
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { ACCESS_SECRET_KEY } from 'src/config/consts';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: ACCESS_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, AuthResolver, PrismaService, JwtStrategy, GqlAuthGuard],
  exports: [PassportModule, JwtModule]
})
export class AuthModule {}
