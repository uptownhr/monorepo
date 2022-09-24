//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';
import { WorkerRolePaytype } from '../../graphql/models/WorkerRole.model';

export class WorkerRoleV1Response {
  constructor(d: Partial<WorkerRoleV1Response>) {
    Object.assign(this, d);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  isPrimary: boolean;

  @ApiProperty()
  payRate: number;

  @ApiProperty({
    type: WorkerRolePaytype,
  })
  payType: WorkerRolePaytype;

  @ApiProperty({
    required: false,
  })
  deletedAt?: Date;

  @ApiProperty()
  companyRoleId: string;

  @ApiProperty()
  userId: string;
}
