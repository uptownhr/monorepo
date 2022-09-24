//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ApiPropertyOptional } from '@nestjs/swagger';
import { CompanyV1EmployeeBody } from './CompanyV1EmployeeBody';

export class CompanyV1GetEmployeesResponse {
  @ApiPropertyOptional({ type: [CompanyV1EmployeeBody] })
  employees?: CompanyV1EmployeeBody[];

  constructor(data?: CompanyV1GetEmployeesResponse) {
    Object.assign(this, data);
  }
}
