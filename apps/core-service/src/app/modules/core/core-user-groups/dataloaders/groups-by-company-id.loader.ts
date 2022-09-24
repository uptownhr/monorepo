//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable, Scope } from '@nestjs/common';
import type { UserGroupDTO } from '../dto/UserGroup.dto';
import { CompanyCoreUserGroupRepository } from '../repositories/company-core-user-group.repository';
import DataLoader = require('dataloader');

@Injectable({ scope: Scope.REQUEST })
export class GroupsByCompanyIdLoader extends DataLoader<string, UserGroupDTO[] | null> {
  constructor(protected groupRepo: CompanyCoreUserGroupRepository) {
    super(async (keys) => {
      const dtoResults = await this.groupRepo.getAllGroupsByCompanyIds(keys);

      return keys.map((k) => dtoResults.find((r) => r.companyId === k)?.groups ?? null);
    });
  }
}
