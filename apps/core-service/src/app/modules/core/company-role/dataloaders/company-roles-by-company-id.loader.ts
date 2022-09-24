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
export class CompanyRoleLoader extends DataLoader<string, CompanyRoleDTO[]> {
  constructor(protected companyRoleRepo: CompanyRoleRepository) {
    super(async (keys: readonly string[]): Promise<ArrayLike<CompanyRoleDTO[] | Error>> => {
      const dtoResults = await this.companyRoleRepo.getCompanyRoles([...keys]);

      const resp = keys.map((k) => dtoResults.filter((r) => r.companyId.trim() === k) ?? null);
      return compact(resp);
    });
  }
}
