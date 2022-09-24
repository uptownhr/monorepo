//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Inject, Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { CoreAuthInternalRepository } from '../../core-auth/repositories';
import { CoreUserRepository } from '../repositories/core-user.repository';

@Injectable()
export class UserInternalService {
  constructor(
    protected userRepo: CoreUserRepository,
    protected authRepo: CoreAuthInternalRepository,
    @Inject('LOGGER') private readonly logger: winston.Logger,
  ) {}

  async newUserAuth(userId: string, newEmail: string): Promise<string> {
    const user = await this.userRepo.getById(userId); //by user id

    if (!user) {
      throw new Error(`User Not Found ${userId}`);
    }

    this.logger.debug('retrieved user', { user });

    const existingAuth = await this.authRepo.getByEmail(newEmail);

    this.logger.debug('retrieved existingAuth', { existingAuth });

    if (existingAuth) {
      throw new Error(`Auth with email exists: ${newEmail}`);
    }

    this.logger.debug('no existing auth found', { email: newEmail });

    if (user._auth) {
      const auth = await this.authRepo.getById(user._auth?.id);

      if (!auth) {
        throw new Error('Auth not found - this should not have happened in this context');
      }

      this.logger.debug('user reference auth retrieved', { auth });

      if (auth.currentUserId === userId) {
        throw new Error('Auth is pointing to currentUser. Can only split when Auth._user reference is not the userId');
      }
    }

    const newAuthId = await this.authRepo.createAuth(newEmail, { userId });

    await this.userRepo.setAuthReference(userId, newAuthId);

    return newAuthId;
  }
}
