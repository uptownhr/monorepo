//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { UserRole } from '@bambeehr/consts';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  UserV1ContractorType,
  UserV1ContractorTypeValues,
} from '../../core-user/controllers/models/UserV1ContractorType.model';
import { CompanyV1AddressResponseBody } from './CompanyV1AddressResponseBody';
import { CompanyV1EmploymentType } from './CompanyV1EmploymentType';

export class CompanyV1EmployeeBody {
  @ApiProperty({
    type: String,
  })
  userId: string;

  @ApiProperty({
    type: String,
  })
  firstName: string;

  @ApiProperty({
    type: String,
  })
  lastName: string;

  @ApiProperty({
    type: String,
  })
  email: string;

  @ApiProperty({
    type: String,
  })
  title: string;

  @ApiProperty({
    type: String,
  })
  phoneNumber: string;

  @ApiProperty({
    type: String,
  })
  dob: Date;

  @ApiProperty({
    type: String,
  })
  payType: string;

  @ApiProperty({
    type: String,
  })
  employeeType: string;

  @ApiProperty({
    enum: Object.values(CompanyV1EmploymentType),
  })
  employmentType: CompanyV1EmploymentType;

  @ApiPropertyOptional({
    enum: Object.values(UserV1ContractorType),
  })
  contractorType?: UserV1ContractorTypeValues;

  @ApiPropertyOptional()
  contractorBusinessName?: string;

  @ApiProperty({
    enum: Object.values(UserRole),
  })
  role: UserRole;

  @ApiProperty({
    type: String,
  })
  payAmount: string;

  @ApiProperty({
    type: String,
  })
  startDate: string;

  @ApiProperty({ type: CompanyV1AddressResponseBody })
  address: CompanyV1AddressResponseBody;

  @ApiProperty({
    type: 'boolean',
  })
  active: boolean;

  constructor(data?: CompanyV1EmployeeBody) {
    Object.assign(this, data);
  }
}
