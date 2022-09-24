//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { ForbiddenError, subject } from '@casl/ability';
import { Inject, Injectable } from '@nestjs/common';
import { add } from 'date-fns';
import * as HttpErrors from 'http-errors';
import { serializeError } from 'serialize-error';
import * as winston from 'winston';
import { CoreAuthRepository } from '../../core-auth/repositories';
import { userDtoAbility } from '../acl/core-user.acl';
import type { UserV1ConsumableToken } from '../controllers/models/UserV1ConsumableToken.model';
import type { UserV1Username } from '../controllers/models/UserV1Username.model';
import { CoreUserByCompanyIdLoader } from '../dataloaders/core-user-by-company-id.loader';
import { CoreUserByIdLoader } from '../dataloaders/core-user-by-id.loader';
import type { CoreUserDTO } from '../dto/core-user.dto';
import { currentUserCanAccessUserDTO } from '../lib/currentUser-can-access-userDTO';
import { CoreUserRepository } from '../repositories/core-user.repository';

@Injectable()
export class UserService {
  constructor(
    protected userByIdLoader: CoreUserByIdLoader,
    protected userByCompanyIdLoader: CoreUserByCompanyIdLoader,
    protected userRepo: CoreUserRepository,
    protected authRepo: CoreAuthRepository,
    @Inject('LOGGER') private readonly logger: winston.Logger,
  ) {}

  async getMyself(currentUser: CurrentUser): Promise<CoreUserDTO | null> {
    return this.getAccessibleUser(currentUser, currentUser.userId);
  }

  async getAllCompanyUsers(companyId: string, resetLoader = false): Promise<CoreUserDTO[]> {
    // This allows killing the cache explicitly, e.g. when calling via internal controller
    if (resetLoader) {
      this.userByCompanyIdLoader.clear(companyId);
    }
    const users = await this.userByCompanyIdLoader.load(companyId!);

    return users ?? [];
  }

  async getDirectReports(currentUser: CurrentUser, userId: string): Promise<CoreUserDTO[]> {
    const reportsIds = await this.userRepo.getDirectReportIds(userId);
    const userOrNull = await this.userByIdLoader.loadMany(reportsIds);
    const users = userOrNull.filter((u) => !!u) as CoreUserDTO[];

    return users.filter((u) => u && currentUserCanAccessUserDTO(currentUser, u));
  }

  async getUsers(currentUser: CurrentUser, userIds: string[]): Promise<CoreUserDTO[]> {
    const userOrNull = await this.userByIdLoader.loadMany(userIds);
    const users = userOrNull.filter((u) => !!u) as CoreUserDTO[];

    return users.filter((u) => u && currentUserCanAccessUserDTO(currentUser, u));
  }

  async getUsersInternal(userIds: string[]): Promise<CoreUserDTO[]> {
    const userOrNull = await this.userByIdLoader.loadMany(userIds);
    const users = userOrNull.filter((u) => !!u) as CoreUserDTO[];
    return users;
  }

  public async getUser(
    currentUser: CurrentUser,
    userId: string,
    skipLoader = false,
  ): Promise<CoreUserDTO | undefined | null> {
    const user = skipLoader ? await this.userRepo.getById(userId) : await this.userByIdLoader.load(userId);
    if (!user) {
      return null;
    }
    return user;
  }
  public async getAccessibleUser(
    currentUser: CurrentUser,
    userId: string,
    skipLoader = false,
    path?: string,
  ): Promise<CoreUserDTO | null> {
    const user = skipLoader ? await this.userRepo.getById(userId) : await this.userByIdLoader.load(userId);
    if (!user) {
      return null;
    }

    const ability = userDtoAbility(currentUser);
    try {
      ForbiddenError.from(ability).throwUnlessCan('read', subject('CoreUserDTO', user));
      return user;
    } catch (e) {
      this.logger.debug('getAccessibleUser error', { err: serializeError(e) });
      if (e instanceof Error) {
        throw new HttpErrors[403](e.message);
      } else {
        throw new HttpErrors[403]();
      }
    }
  }

  async getConsumableToken(currentUser: CurrentUser, userId: string, expiration = 30): Promise<UserV1ConsumableToken> {
    const user = await this.getAccessibleUser(currentUser, userId);
    if (!user) {
      throw new HttpErrors[404](`User-${userId} not found`);
    }
    const authId = user?._auth?.id;
    if (!authId) {
      throw new HttpErrors[500](`Auth not found for user-${userId}`);
    }
    const existing = await this.userRepo.getConsumableTokenByAuthId(authId);

    const expiresAt = add(new Date(), { days: expiration });
    if (existing) {
      await this.userRepo.updateConsumableTokenExpiration(existing.id, expiresAt);
      return {
        token: existing.token,
        expiresAt: expiresAt,
      };
    }

    const { token } = await this.userRepo.createConsumableToken(authId, currentUser.authId, expiresAt);
    return {
      token,
      expiresAt,
    };
  }

  async getUsernameFromConsumableToken(token: string): Promise<UserV1Username> {
    const existing = await this.userRepo.getConsumableTokenByToken(token);
    if (!existing) {
      const msg = `Token not found`;
      this.logger.info(msg);
      throw new HttpErrors[404](msg);
    }
    const authId = existing.user;

    const auth = await this.authRepo.getById(authId);
    if (!auth) {
      const msg = 'Auth not found';
      this.logger.info(msg);
      throw new HttpErrors[404](msg);
    }
    if (!auth._userId) {
      const msg = 'UserId not found';
      this.logger.info(msg);
      throw new HttpErrors[404](msg);
    }
    const { username } = auth;
    const userId = auth._userId;

    return {
      userId,
      username,
    };
  }
}
