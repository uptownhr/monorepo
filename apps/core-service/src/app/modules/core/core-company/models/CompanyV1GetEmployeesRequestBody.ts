//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ApiProperty } from '@nestjs/swagger';

export class CompanyV1GetEmployeesRequestBody {
  @ApiProperty({ type: [String] })
  userIds: string[];

  constructor(data?: CompanyV1GetEmployeesRequestBody) {
    Object.assign(this, data);
  }
}
