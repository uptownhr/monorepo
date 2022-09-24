//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import type { TokenSet, UserinfoResponse } from 'openid-client';
import type { CoreAuthInternalDTO } from '../dto';
import { CoreAuthInternalRepository } from '../repositories';

@Injectable()
export class CoreAuthInternalService {
  constructor(protected authRepo: CoreAuthInternalRepository) {}

  async getAuthById(authId: string): Promise<CoreAuthInternalDTO | null> {
    return this.authRepo.getById(authId);
  }

  async getAuthByUserId(userId: string): Promise<CoreAuthInternalDTO | null> {
    return this.authRepo.getByUserId(userId);
  }

  async getAuthByEmail(email: string): Promise<CoreAuthInternalDTO | null> {
    return this.authRepo.getByEmail(email);
  }

  async getAuthByUsername(username: string): Promise<CoreAuthInternalDTO | null> {
    return this.authRepo.getByUsername(username);
  }

  async switchLoginUser(authId: string, userId: string): Promise<CoreAuthInternalDTO | null> {
    await this.authRepo.switchLoginUser(authId, userId);
    return this.getAuthById(authId);
  }

  async switchLoginCompany(authId: string, companyId: string): Promise<CoreAuthInternalDTO | null> {
    await this.authRepo.switchLoginCompany(authId, companyId);
    return this.getAuthById(authId);
  }

  async updateOauthData(authId: string, provider: string, tokens: TokenSet, userInfo: UserinfoResponse) {
    await this.authRepo.updateOauthData(authId, provider, tokens, userInfo);
  }

  async setPassowrdResetState(authId: string, token: string) {
    return this.authRepo.setPassowrdResetState(authId, token);
  }
}
