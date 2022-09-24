//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable, Scope } from '@nestjs/common';
import { compact } from 'lodash';
import type { WorkerRoleDTO } from '../dto/WorkerRole.dto';
import { WorkerRoleRepository } from '../repositories/worker-role.repository';
import DataLoader = require('dataloader');

@Injectable({ scope: Scope.REQUEST })
export class WorkerRoleByCompanyRoleLoader extends DataLoader<string, WorkerRoleDTO[]> {
  constructor(protected workerRoleRepo: WorkerRoleRepository) {
    super(async (keys: readonly string[]): Promise<ArrayLike<WorkerRoleDTO[] | Error>> => {
      const dtoResults = await this.workerRoleRepo.getWorkerRolesByCompanyRoleId([...keys]);

      const resp = keys.map((k) => dtoResults.filter((r) => r.companyRoleId.trim() === k) ?? null);
      return compact(resp);
    });
  }
}
