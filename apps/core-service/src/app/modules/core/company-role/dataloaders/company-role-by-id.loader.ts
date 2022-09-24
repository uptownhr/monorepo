//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable, Scope } from '@nestjs/common';
import { compact } from 'lodash';
import type { CompanyRoleDTO } from '../dto/CompanyRole.dto';
import { CompanyRoleRepository } from '../repositories/company-role.repository';
import DataLoader = require('dataloader');

@Injectable({ scope: Scope.REQUEST })
export class CompanyRoleLoaderById extends DataLoader<string, CompanyRoleDTO[] | null> {
  constructor(protected companyRoleRepo: CompanyRoleRepository) {
    super(async (keys: readonly string[]): Promise<ArrayLike<CompanyRoleDTO[] | Error | null>> => {
      const dtoResults = await this.companyRoleRepo.getCompanyRolesById([...keys]);

      const resp = keys.map((k) => dtoResults.filter((r) => r.id.trim() === k) ?? null);
      return compact(resp);
    });
  }
}
