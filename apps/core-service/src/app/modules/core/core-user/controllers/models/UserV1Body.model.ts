//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ApiProperty } from '@nestjs/swagger';
import { UserProfileV1Body } from './UserProfileV1Body.model';
import { UserV1EmploymentType } from './UserV1EmploymentType';

export class UserV1Body {
  @ApiProperty({
    type: String,
  })
  id: string;

  authId: string;

  @ApiProperty({
    type: String,
  })
  payType: string;

  @ApiProperty({
    type: String,
  })
  employeeType: string;

  @ApiProperty({
    enum: Object.values(UserV1EmploymentType),
  })
  employmentType: UserV1EmploymentType;

  @ApiProperty({
    type: String,
  })
  payAmount: string;

  @ApiProperty({
    type: String,
  })
  startDate: string;

  @ApiProperty({
    type: Boolean,
  })
  active: boolean;

  @ApiProperty({ type: UserProfileV1Body })
  profile: UserProfileV1Body;

  constructor(data?: UserV1Body) {
    Object.assign(this, data);
  }
}
