import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { AuthJWTSignature, AuthJWTSignatureRoles } from './auth.types';

@Injectable()
export class AuthTokenService {
  secret: string;
  constructor(private readonly config: ConfigService) {
    const secret = this.config.get<string>('secret');

    if (!secret) throw new Error('AuthModule secret is not set');

    this.secret = secret;
  }

  createJwt() {
    const payload: AuthJWTSignature = {
      roles: [AuthJWTSignatureRoles.ADMIN],
    };

    return jwt.sign(payload, this.secret, {
      expiresIn: 60 * 10,
    });
  }

  verifyJwt(token: string) {
    return jwt.verify(token, this.secret);
  }
}
