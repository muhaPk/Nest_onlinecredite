import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service'
import { JwtStrategy } from '../strategies/jwt.strategy';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { ACCESS_SECRET_KEY } from '../config/consts';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: ACCESS_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthResolver, PrismaService, JwtStrategy, GqlAuthGuard],
  exports: [PassportModule, JwtModule]
})
export class AuthModule {}
