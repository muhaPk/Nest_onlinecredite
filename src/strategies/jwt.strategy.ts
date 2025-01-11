import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ACCESS_SECRET_KEY } from '../config/consts'; // Replace with your actual secret

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header
      ignoreExpiration: false, // Reject expired tokens
      secretOrKey: ACCESS_SECRET_KEY, // Use environment variable for production
    });
  }

  // Validate payload extracted from token
  async validate(payload: any) {
    return { userId: payload.sub, phone: payload.phone };
  }
}
