//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { forwardRef, Inject, Injectable, Scope } from '@nestjs/common';
import { CoreAuthByIdLoader } from '../../core-auth/dataloaders';
import { CoreUserByIdLoader } from '../../core-user/dataloaders';
import type { CoreCompanyDTO } from '../dto/core-company.dto';
import { CompanyV1ProfileRepository } from '../repositories';
import DataLoader = require('dataloader');

@Injectable({ scope: Scope.REQUEST })
export class CoreCompanyByIdLoader extends DataLoader<string, CoreCompanyDTO | null> {
  constructor(
    protected companyRepo: CompanyV1ProfileRepository,
    @Inject(forwardRef(() => CoreUserByIdLoader)) protected userByIdLoader: CoreUserByIdLoader,
    @Inject(forwardRef(() => CoreAuthByIdLoader)) protected authByIdLoader: CoreAuthByIdLoader,
  ) {
    super(async (keys) => {
      const dtoResults = await this.companyRepo.getByIds(keys);

      return keys.map((k) => {
        const dtoResult = dtoResults.find((r) => r.id === k);
        if (dtoResult) {
          /**
           * Because companyRepo.getByIds is an aggregate that gets auth and user for the owner, we need to
           * preload these DTO results for the frequent case a subquery asks for them via resolver.
           */
          if (dtoResult._owner) {
            this.userByIdLoader.prime(dtoResult._owner.id, dtoResult._owner);
            if (dtoResult._owner._auth) {
              this.authByIdLoader.prime(dtoResult._owner._auth?.id, dtoResult._owner._auth);
            }
          }
          return dtoResult;
        } else {
          return null;
        }
      });
    });
  }
}
