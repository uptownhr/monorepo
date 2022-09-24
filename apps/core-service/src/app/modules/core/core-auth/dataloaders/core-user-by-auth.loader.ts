//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable, Scope } from '@nestjs/common';
import type { CoreUserDTO } from '../../core-user/dto';
import { CoreUserByAuthRepository } from '../../core-user/repositories/core-user-by-auth.repository';
import DataLoader = require('dataloader');

@Injectable({ scope: Scope.REQUEST })
export class CoreUserByAuthLoader extends DataLoader<string, CoreUserDTO | null> {
  constructor(protected authRepo: CoreUserByAuthRepository) {
    super(async (keys) => {
      const res = await this.authRepo.getByAuthIds(keys);
      return keys.map((k) => res.find((r) => r.id === k) ?? null);
    });
  }
}
