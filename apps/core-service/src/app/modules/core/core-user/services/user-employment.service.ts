//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { subject } from '@casl/ability';
import { permittedFieldsOf } from '@casl/ability/extra';
import { Injectable } from '@nestjs/common';
import * as HttpErrors from 'http-errors';
import { pick } from 'lodash';
import { EventService } from '../../../event-client/event.service';
import { userDtoAbility } from '../acl/core-user.acl';
import { CoreUserByIdLoader } from '../dataloaders/core-user-by-id.loader';
import type { CoreUserEmploymentDTO } from '../dto/core-user-employment.dto';
import { CoreUserEmploymentRepository } from '../repositories/core-user-employment.respository';

@Injectable()
export class UserEmploymentService {
  constructor(
    protected userByIdLoader: CoreUserByIdLoader,

    protected eventService: EventService,
    protected userEmploymentRepo: CoreUserEmploymentRepository,
  ) {}

  public async updateUserEmploymentFromInput(
    currentUser: CurrentUser,
    userId: string,
    body: Partial<CoreUserEmploymentDTO>,
  ): Promise<CoreUserEmploymentDTO | null> {
    const user = await this.userByIdLoader.load(userId);
    if (!user) {
      throw new HttpErrors[404]();
    }
    const ability = userDtoAbility(currentUser);
    const permittedFields = permittedFieldsOf(ability, 'update', subject('CoreUserDTO', user), {
      fieldsFrom: (r) => r.fields || Object.keys(user.employment),
    });

    const input = pick(body, permittedFields);

    const updates = await this.userEmploymentRepo.updateUserEmployment(userId, input);
    if (!updates) {
      return null;
    }
    this.userByIdLoader.clear(userId);

    await this.eventService.userUpdateEvent(currentUser, userId, updates.diffs);
    return updates?.result;
  }
}
