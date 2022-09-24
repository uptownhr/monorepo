// //=============================================================================
// //Licensed Materials - Property of Bambee
// //(C) Copyright Bambee 2022
// //All Rights Reserved
// //=============================================================================

import type { WorkerRoleDTO } from '../../../dto/WorkerRole.dto';
import {
  WorkerRole,
  WorkerRolePaytype,
  workerRolePaytypeDTOToType,
  workerRolePaytypeToDTO,
  WorkerRolePaytypeValues,
} from '../../models/WorkerRole.model';

export function mapWorkerRoleResult(dto: WorkerRoleDTO[]): WorkerRole[] {
  return dto.map((workerRole) => ({
    id: workerRole.id,
    isPrimary: workerRole.isPrimary,
    payRate: workerRole.payRate,
    payType: workerRole.payType,
    userId: workerRole.userId,
    companyRoleId: workerRole.companyRoleId,
    deletedAt: workerRole.deletedAt ?? undefined,
    createdAt: workerRole.createdAt,
  }));
}

export function fromWorkerRolePaytypeValues(t: WorkerRolePaytypeValues): WorkerRolePaytype {
  return workerRolePaytypeDTOToType(t);
}

export function toWorkerRolePaytypeValues(t: WorkerRolePaytype): WorkerRolePaytypeValues {
  return workerRolePaytypeToDTO(t);
}
