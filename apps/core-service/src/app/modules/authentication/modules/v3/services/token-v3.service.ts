//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { BaseUser, signCurrentUser, signPayload } from '@bambeehr/authentication';
import { allHoneyRoles, UserRole } from '@bambeehr/consts';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as HttpErrors from 'http-errors';
import * as jwt from 'jsonwebtoken';
import type { Logger } from 'winston';
import type { AuthUserDTO } from '../../../dto/AuthUser.dto';
import { dtoToCurrentUser } from '../lib/dto-to-current-user';
import type { JWTPayload } from '../types/JWTPayload';
import type { TokenResponse } from '../types/TokenResponse';
import ms = require('ms');

@Injectable()
export class TokenV3Service {
  constructor(private configService: ConfigService, @Inject('LOGGER') private logger: Logger) {}
  public async generateAccessToken(authUser: AuthUserDTO, generatedDeviceId: string): Promise<TokenResponse> {
    const payload = dtoToCurrentUser(authUser, generatedDeviceId);

    const expiresIn = this.configService.get<string>('authentication.jwt.expiresIn');
    const privateKey = this.configService.get<string>('authentication.jwt.privateKey') as string;
    const expiration = new Date(Date.now() + ms(expiresIn!));
    const value = signCurrentUser(payload, privateKey, {
      expiresIn,
    });

    return {
      value,
      expiration,
    };
  }

  public async generateMasqAccessToken(currentUser: BaseUser, authUser: AuthUserDTO): Promise<TokenResponse> {
    if (!currentUser.roles?.some((r) => allHoneyRoles.includes(r as UserRole))) {
      throw new HttpErrors[403]('[MASQ] Role denied');
    }

    const payload = dtoToCurrentUser(authUser, currentUser.deviceId);
    payload.masquerade = currentUser;

    const expiresIn = this.configService.get('authentication.masquerade.expiresIn');
    const expiration = new Date(Date.now() + ms(expiresIn));
    const privateKey = this.configService.get('authentication.masquerade.privateKey') as string;
    const value = signCurrentUser(payload, privateKey, {
      expiresIn,
      audience: 'masq',
    });

    return {
      value,
      expiration,
    };
  }

  /**
   * Note about refresh tokens:
   * Refresh token are the long-term access tokens.  They:
   * - Must be tied to a specific deviceID, and invalid otherwise.
   * - Must be invalidated by a password change.
   * - Must not leak any private or secure information.
   *
   * Refresh tokens should be constructed in such a way that they become invalid when a component of their construction
   * changes.  Traditionally, this meant using: `PASSWORDHASH + SECRET` as a shared secret (since only this app uses it, the
   * "secret" is not actually shared).
   *
   * While UUID.v5 was considered because it's construction was also deterministic, there is evidence that it might
   * be possible to deconstruct the password or secret given two different keys for a known user.
   *
   * The solution may be to use a non-identifying component, such as a uuid.v4 that's generated upon password change,
   * instead of the password itself.  More research is necessary.  For now, we're using `PASSWORDHASH+Secret` until
   * a more secure means can be investigated.
   *
   * @param auth
   * @param user
   * @param company
   * @returns
   */
  public async generateRefreshToken(authUser: AuthUserDTO): Promise<TokenResponse> {
    const payload = {
      authId: authUser.id,
      userId: authUser.currentUserId,
      companyId: authUser.currentCompanyId,
    };

    const expiration = new Date(Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRES_IN ?? '60d'));
    const privateKey = this.configService.get('authentication.refresh.privateKey');
    const value = signPayload(payload, authUser.passwordHash + privateKey);

    return {
      value,
      expiration,
    };
  }

  public decodeAccessToken(claim: string): JWTPayload | null {
    return jwt.decode(claim) as JWTPayload | null;
  }

  public verifyRefreshToken(token: string, passwordHash: string): JWTPayload | null {
    const privateKey = this.configService.get('authentication.refresh.privateKey');
    try {
      return jwt.verify(token, passwordHash + privateKey) as JWTPayload | null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      this.logger.warn('Token Verification Failed', {
        context: 'TokenV3Service.verifyRefreshToken',
        token,
        message: error.message,
        error,
      });
      throw new HttpErrors[401]('Token Verification Failed');
    }
  }
}
