//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import type { AwsUtil } from '@bambeehr/aws-i12e';
import type { RedisEventClient } from '@bambeehr/event-redis-client';
import { Inject, Injectable } from '@nestjs/common';
import { AWS_UTIL_PROVIDER_KEY } from '../../../aws/keys';
import { EventService } from '../../../event-client/event.service';
import { EVENT_CLIENT_PROVIDER_KEY } from '../../../event-client/keys';
import { CoreUserByIdLoader } from '../dataloaders/core-user-by-id.loader';
import type { CoreUserProfileDTO } from '../dto/core-user-profile.dto';
import type { CoreUserDTO } from '../dto/core-user.dto';
import { currentUserCanAccessUserDTO } from '../lib';
import { CoreUserProfileRepository } from '../repositories/core-user-profile.repository';

@Injectable()
export class UserProfileService {
  constructor(
    protected userByIdLoader: CoreUserByIdLoader,
    protected userProfileRepository: CoreUserProfileRepository,
    protected eventService: EventService,
    @Inject(AWS_UTIL_PROVIDER_KEY) protected awsUtil?: AwsUtil,
    @Inject(EVENT_CLIENT_PROVIDER_KEY) protected eventClient?: RedisEventClient,
  ) {}

  async getMyself(currentUser: CurrentUser): Promise<CoreUserProfileDTO | null> {
    return this.getUserProfile(currentUser, currentUser.userId);
  }

  async getUserProfile(currentUser: CurrentUser, userId: string): Promise<CoreUserProfileDTO | null> {
    const user = await this.userByIdLoader.load(userId);
    if (!user) {
      return null;
    }

    if (currentUserCanAccessUserDTO(currentUser, user)) {
      return user.profile;
    } else {
      return null;
    }
  }

  async getUserProfiles(currentUser: CurrentUser, userIds: string[]): Promise<CoreUserProfileDTO[]> {
    const userOrNull = await this.userByIdLoader.loadMany(userIds);
    const users = userOrNull.filter((u) => !!u) as CoreUserDTO[];
    return users.filter((u) => currentUserCanAccessUserDTO(currentUser, u)).map((u) => u.profile);
  }

  async updateUserProfileFromInput(
    currentUser: CurrentUser,
    userId: string,
    body: Partial<Omit<CoreUserProfileDTO, 'email'>>,
  ): Promise<Omit<CoreUserProfileDTO, 'email'>> {
    const updates = await this.userProfileRepository.updateUserProfile(userId, body);
    if (!updates) {
      // throw some kind of error
      throw Error();
    } else {
      await this.eventService.userUpdateEvent(currentUser, userId, updates.diffs);
      return updates.result;
    }
  }
}
