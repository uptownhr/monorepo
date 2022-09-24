//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import type { TokenSet, UserinfoResponse } from 'openid-client';
import { InternalCoreAuthController } from '../../core/core-auth/controllers/internal-core-auth.controller';
import type { CoreAuthInternalResponse } from '../../core/core-auth/controllers/models/CoreAuthInternalResponse.model';
import type { AuthUserDTO } from '../dto/AuthUser.dto';

@Injectable()
export class AuthServiceRepository {
  constructor(
    @Inject(forwardRef(() => InternalCoreAuthController)) protected authController: InternalCoreAuthController,
  ) {}
  async findByAuthId(authId: string): Promise<AuthUserDTO | null> {
    try {
      const payload = await this.authController.getByAuthId(authId);
      return mapToDto(payload);
    } catch (error) {
      return null;
    }
  }

  async findByUserId(userId: string): Promise<AuthUserDTO | null> {
    try {
      const payload = await this.authController.findByUserId(userId);
      return mapToDto(payload);
    } catch (error) {
      return null;
    }
  }

  async findByUsername(username: string): Promise<AuthUserDTO | null> {
    try {
      const payload = await this.authController.findByUsername({ username });
      return mapToDto(payload);
    } catch (error) {
      return null;
    }
  }

  async findByEmail(email: string): Promise<AuthUserDTO | null> {
    try {
      const payload = await this.authController.findByEmail({ email });
      return mapToDto(payload);
    } catch (error) {
      return null;
    }
  }

  async updateOauthTokens(authId: string, provider: string, tokenSet: TokenSet, userInfo: UserinfoResponse) {
    try {
      await this.authController.updateOauthData(authId, {
        provider,
        tokens: tokenSet,
        userInfo,
      });
    } catch (error) {
      // noop
    }
  }

  async applyResetPasswordState(authId: string, token: string) {
    return this.authController.setPassowrdResetState(authId, { token });
  }

  /**
   * For switching companies and users, we have to set auth._user to a new value.
   * @param authId
   * @param newUserId
   */
  async changeActiveUserAuth(authId: string, userId: string) {
    const payload = await this.authController.switchToNewUser(authId, { userId });
    return mapToDto(payload);
  }

  async changeActiveCompanyAuth(authId: string, companyId: string) {
    const payload = await this.authController.switchToNewUser(authId, { companyId });
    return mapToDto(payload);
  }
}

function mapToDto(data: CoreAuthInternalResponse): AuthUserDTO {
  return {
    active: data.authActive,
    currentUserActive: data.userActive,
    avatarUrl: data.avatarUrl,
    currentUserId: data.currentUserId,
    email: data.email,
    fullName: data.fullName,
    id: data.authId,
    passwordHash: data.passwordHash,
    primaryRole: data.primaryRole,
    roles: data.roles,
    currentCompanyId: data.currentCompanyId,
    userOptions: data.userOptions.map((u) => ({
      companyId: u.companyId,
      companyName: u.companyName,
      userId: u.userId,
      active: u.active,
    })),
  };
}
