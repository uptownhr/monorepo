//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable, Scope } from '@nestjs/common';
import type { CoreAuthDTO } from '../dto';
import { CoreAuthRepository } from '../repositories';
import DataLoader = require('dataloader');

@Injectable({ scope: Scope.REQUEST })
export class CoreAuthByUserIdLoader extends DataLoader<string, CoreAuthDTO | null> {
  constructor(protected authRepo: CoreAuthRepository) {
    super(async (keys) => {
      const res = await this.authRepo.getByUserIds(keys);
      return keys.map((k) => res.find((r) => r._userId === k) ?? null);
    });
  }
}
