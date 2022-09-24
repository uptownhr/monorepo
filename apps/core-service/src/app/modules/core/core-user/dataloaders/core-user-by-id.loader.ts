//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { forwardRef, Inject, Injectable, Scope } from '@nestjs/common';
import { CoreAuthByIdLoader } from '../../core-auth/dataloaders';
import { CoreCompanyByIdLoader } from '../../core-company/dataloaders/core-company-by-id.loader';
import type { CoreUserDTO } from '../dto/core-user.dto';
import { CoreUserRepository } from '../repositories/core-user.repository';
import DataLoader = require('dataloader');

@Injectable({ scope: Scope.REQUEST })
export class CoreUserByIdLoader extends DataLoader<string, CoreUserDTO | null> {
  constructor(
    protected userRepo: CoreUserRepository,
    @Inject(forwardRef(() => CoreAuthByIdLoader)) protected authByIdLoader: CoreAuthByIdLoader,
    @Inject(forwardRef(() => CoreCompanyByIdLoader)) protected companyByIdLoader: CoreCompanyByIdLoader,
  ) {
    super(async (keys) => {
      const dtoResults = await this.userRepo.getByIds(keys);

      return keys.map((k) => {
        const dtoResult = dtoResults.find((r) => r.id === k);
        if (dtoResult) {
          /**
           * Because userRepo.getByIds is an aggregate that gets auth and company, we need to
           * preload these DTO results for the frequent case a subquery asks for them via resolver.
           */
          if (dtoResult._auth) {
            this.authByIdLoader.prime(dtoResult._auth.id, dtoResult._auth);
          }
          if (dtoResult._company) {
            this.companyByIdLoader.prime(dtoResult._company.id, dtoResult._company);
          }
          return dtoResult;
        } else {
          return null;
        }
      });
    });
  }
}
