//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { isSsoJwtPayload, signCurrentUser, signPayload, SsoJwtPayload } from '@bambeehr/authentication';
import { Injectable } from '@nestjs/common';
import * as HttpErrors from 'http-errors';
import * as jwt from 'jsonwebtoken';
import { JsonWebTokenError } from 'jsonwebtoken';
import type { AuthUserDTO } from '../../../dto/AuthUser.dto';
import { AuthServiceRepository } from '../../../repositories/auth-service.repository';
import { SsoConfigurationRepository } from '../../../repositories/sso-configuration.repository';
import { AuthV3TokenBody } from '../controllers/models/AuthV3TokenBody';
import { V3TokenProfileResponse } from '../controllers/models/V3TokenProfileResponse';
import { BASE_URL } from '../lib/base-url';
import { NonceV3Service } from './nonce-v3.service';
import ms = require('ms');

@Injectable()
export class SsoTokenService {
  constructor(
    protected nonceService: NonceV3Service,
    protected authRepo: AuthServiceRepository,
    protected ssoConfigRepo: SsoConfigurationRepository,
  ) {}

  public async generateCode(clientId: string, userId: string, authId: string) {
    return this.nonceService.generateUserNonce(userId, authId, {
      expiration: '10m',
      prefix: clientId,
    });
  }

  public async getProfile(authId: string, userId: string): Promise<V3TokenProfileResponse> {
    const dto = await this.authRepo.findByUserId(userId);
    if (!dto) {
      throw new HttpErrors[404]('User does not exist');
    }
    return new V3TokenProfileResponse({
      id: dto.currentUserId,
      companyId: dto.currentCompanyId,
      name: dto.fullName,
      email: dto.email,
    });
  }

  public async generateAccessToken(code: string, clientId: string, clientSecret: string): Promise<AuthV3TokenBody> {
    const userNonce = await this.nonceService.consumeNonce(code, clientId);
    if (!userNonce) {
      throw new HttpErrors.Unauthorized('Code invalid or expired');
    }

    const configuration = await this.ssoConfigRepo.findWithSecret(clientId, clientSecret);
    if (!configuration) {
      throw new HttpErrors.Unauthorized('Cannot find SSO configuration');
    }
    return this._generateToken(userNonce.userId, clientId, configuration.privateKey);
  }

  public async refreshAccessToken(
    accessClaim: string,
    refreshClaim: string,
    clientId: string,
    clientSecret: string,
  ): Promise<AuthV3TokenBody> {
    const configuration = await this.ssoConfigRepo.findWithSecret(clientId, clientSecret);
    if (!configuration) {
      throw new HttpErrors.Unauthorized('Cannot find SSO configuration');
    }

    let claim;

    try {
      const atClaim = jwt.verify(accessClaim, configuration.publicKey, { ignoreExpiration: true });
      if (isSsoJwtPayload(atClaim)) {
        claim = jwt.verify(refreshClaim, configuration.publicKey) as SsoJwtPayload;
        return await this._generateToken(claim.userId, clientId, configuration.privateKey);
      }
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        throw new HttpErrors.Unauthorized(e.message);
      }
    }

    throw new HttpErrors.Unauthorized('Claim is not recognized');
  }

  private async _generateToken(userId: string, clientId: string, privateKey: string): Promise<AuthV3TokenBody> {
    const dto = await this._getAuthForUserIdClaim(userId);

    const payload: SsoJwtPayload = {
      email: dto.email,
      name: dto.fullName,
      avatarUrl: dto.avatarUrl,
      authId: dto.id,
      userId: dto.currentUserId,
      companyId: dto.currentCompanyId || 'undefined',
      roles: dto.roles,
      ssoid: clientId,
    };
    const expiration = process.env.SSO_TOKEN_EXPIRES_IN ?? '30d';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const accessToken = signCurrentUser(payload as any, privateKey, { expiresIn: expiration, issuer: 'sso' });
    const refreshToken = signPayload({ userId: dto.currentUserId }, privateKey, { issuer: 'sso' });

    return new AuthV3TokenBody({
      id: userId,
      accessToken,
      refreshToken,
      baseUrl: BASE_URL,
      expiration: new Date(Date.now() + ms(expiration)),
    });
  }

  private async _getAuthForUserIdClaim(userId: string): Promise<AuthUserDTO> {
    const user = await this.authRepo.findByUserId(userId);
    if (!user) {
      throw new HttpErrors[401]('User does not exist');
    }

    return user;
  }
}
