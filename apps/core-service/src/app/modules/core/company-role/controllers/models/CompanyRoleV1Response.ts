//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';

export class CompanyRoleV1Response {
  constructor(d: Partial<CompanyRoleV1Response>) {
    Object.assign(this, d);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  companyId: string;

  @ApiProperty({
    required: false,
  })
  deletedAt?: Date;

  @ApiProperty()
  title: string;
}
