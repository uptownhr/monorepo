//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { TokenType } from '@bambeehr/authentication';
import { BambeeAuthGuard } from '@bambeehr/authentication-guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import type { WorkerRoleDTO } from '../dto/WorkerRole.dto';
import { fromWorkerRolePaytypeValues } from '../graphql/resolvers/lib/mapResult';
import { WorkerRoleService } from '../services/worker-role.service';
import type { WorkerRoleV1Response } from './models/WorkerRoleV1Response';

@Controller('/internal/worker-roles/v1/company/:companyId/after-date/:afterDate/deleted')
@UseGuards(BambeeAuthGuard(TokenType.Service))
export class InternalDeletedWorkerRolesAfterDateController {
  constructor(private workerRoleService: WorkerRoleService) {}

  @Get()
  public async getDeletedWorkerRolesByCompanyAfterDate(
    @Param('companyId') companyId: string,
    @Param('afterDate') afterDate: Date,
  ): Promise<Array<WorkerRoleV1Response>> {
    const res = await this.workerRoleService.getDeletedWorkerRolesByCompanyAfterDate(companyId, afterDate);
    return res?.map(mapToResponse) ?? [];
  }
}

function mapToResponse(dto: WorkerRoleDTO): WorkerRoleV1Response {
  return {
    id: dto.id,
    userId: dto.userId,
    companyRoleId: dto.companyRoleId,
    isPrimary: dto.isPrimary,
    payRate: dto.payRate,
    payType: fromWorkerRolePaytypeValues(dto.payType),
    deletedAt: dto.deletedAt ?? undefined,
  };
}
