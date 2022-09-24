//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { WorkerRolePaytypeValues } from '../graphql/models/WorkerRole.model';

export interface WorkerRoleDTO {
  readonly id: string;
  readonly isPrimary: boolean;
  readonly payRate: number;
  readonly payType: WorkerRolePaytypeValues;
  readonly userId: string;
  readonly companyRoleId: string;
  readonly deletedAt?: Date | null;
  readonly createdAt: Date;
}
