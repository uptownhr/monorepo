//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { V2CurrentUser } from '@bambeehr/authentication';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as HttpErrors from 'http-errors';
import * as jwt from 'jsonwebtoken';
import statClient from '../../../../../lib/stats';

function isMasqUser(u: V2CurrentUser): u is Required<V2CurrentUser> {
  return (
    Object.prototype.hasOwnProperty.call(u, 'masquerade') &&
    Object.prototype.hasOwnProperty.call(u.masquerade, 'userId')
  );
}

type BaseUser = Pick<V2CurrentUser, 'email' | 'name' | 'authId' | 'userId' | 'companyId' | 'roles' | 'deviceId'> & {
  avatarUrl?: string;
};

type MasqUser = BaseUser & { masq: BaseUser };

@Injectable()
export class AuthV1AccessTokenService {
  constructor(protected configService: ConfigService) {}

  async getResetPasswordToken(authId: string): Promise<string> {
    const jwtSecret = this.configService.get('authentication.jwt.v1Secret');
    const token = jwt.sign(
      {
        id: authId,
        time: Date.now(),
      },
      jwtSecret,
    );

    return token;
  }

  async generateTokenForCurrentUser(cu: V2CurrentUser, generatedDeviceId?: string): Promise<string> {
    if (isMasqUser(cu)) {
      return this.#generateForMasqUser(cu, generatedDeviceId);
    } else {
      return this.#generateForBaseUser(cu, generatedDeviceId);
    }
  }
  async #generateForMasqUser(cu: Required<V2CurrentUser>, generatedDeviceId?: string): Promise<string> {
    const deviceId = generatedDeviceId ?? cu.deviceId;
    if (!deviceId) {
      statClient.increment('access-token-v2.401', { reason: 'generatedDeviceId is null' });
      throw new HttpErrors.Unauthorized('Error generating token: generatedDeviceId is null');
    }
    const payload: MasqUser = {
      authId: cu.authId,
      userId: cu.userId,
      companyId: cu.companyId,
      email: cu.email,
      name: cu.name,
      roles: cu.roles,
      deviceId,
      masq: {
        authId: cu.masquerade.authId,
        userId: cu.masquerade.userId,
        companyId: cu.masquerade.companyId,
        email: cu.masquerade.email,
        name: cu.masquerade.name,
        roles: cu.masquerade.roles,
      },
    };

    return this.#generateToken(payload, deviceId);
  }

  async #generateForBaseUser(cu: V2CurrentUser, generatedDeviceId?: string): Promise<string> {
    const deviceId = generatedDeviceId ?? cu.deviceId;
    if (!deviceId) {
      statClient.increment('access-token-v2.401', { reason: 'generatedDeviceId is null' });
      throw new HttpErrors.Unauthorized('Error generating token: generatedDeviceId is null');
    }
    const payload: BaseUser = {
      authId: cu.authId,
      userId: cu.userId,
      companyId: cu.companyId,
      email: cu.email,
      name: cu.name,
      roles: cu.roles,
      deviceId,
    };

    return this.#generateToken(payload, deviceId);
  }

  /**
   * Creates cookies needed for device identification and refresh tokens.
   * Per spec, cookie names are case-insensitive.
   * @param refreshToken
   * @param deviceId
   */
  async #generateToken(currentUser: BaseUser, deviceId: string) {
    const jwtSecret = this.configService.get('authentication.jwt.v1Secret');
    const expiresIn = this.configService.get('authentication.jwt.expiresIn');

    if (!currentUser) {
      statClient.increment('access-token-v2.401', { reason: 'userProfile is null' });
      throw new HttpErrors.Unauthorized('Error generating token: userProfile is null');
    }
    if (!deviceId) {
      statClient.increment('access-token-v2.401', { reason: 'generatedDeviceId is null' });
      throw new HttpErrors.Unauthorized('Error generating token: generatedDeviceId is null');
    }

    return jwt.sign({ ...currentUser, deviceId }, jwtSecret, {
      expiresIn,
      audience: 'v2',
    });
  }
}
