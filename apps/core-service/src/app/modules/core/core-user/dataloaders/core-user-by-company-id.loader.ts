//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CoreAuthByIdLoader } from '../../core-auth/dataloaders';
import { CoreCompanyByIdLoader } from '../../core-company/dataloaders/core-company-by-id.loader';
import type { CoreUserDTO } from '../dto/core-user.dto';
import { CoreUserRepository } from '../repositories/core-user.repository';
import DataLoader = require('dataloader');

@Injectable()
export class CoreUserByCompanyIdLoader extends DataLoader<string, CoreUserDTO[] | null> {
  constructor(
    protected userRepo: CoreUserRepository,
    @Inject(forwardRef(() => CoreAuthByIdLoader)) protected authByIdLoader: CoreAuthByIdLoader,
    @Inject(forwardRef(() => CoreCompanyByIdLoader)) protected companyByIdLoader: CoreCompanyByIdLoader,
  ) {
    super(async (keys) => {
      const dtoResults = await this.userRepo.getByCompanyIds(keys);

      return keys.map((k) => {
        const dtoResult = dtoResults[k] ?? null;
        if (dtoResult?.length) {
          dtoResult.forEach((r) => {
            /**
             * Because userRepo.getByIds is an aggregate that gets auth and company, we need to
             * preload these DTO results for the frequent case a subquery asks for them via resolver.
             */
            if (r._auth) {
              this.authByIdLoader.prime(r._auth.id, r._auth);
            }
            if (r._company) {
              this.companyByIdLoader.prime(r._company.id, r._company);
            }
          });
          return dtoResult;
        } else {
          return null;
        }
      });
    });
  }
}
