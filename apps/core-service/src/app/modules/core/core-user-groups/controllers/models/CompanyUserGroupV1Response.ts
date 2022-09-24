//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';
import { UserGroupType } from '../../types/UserGroupType';

export class CompanyUserGroupV1Response {
  constructor(d: Partial<CompanyUserGroupV1Response>) {
    Object.assign(this, d);
  }

  @ApiProperty({ enum: Object.values(UserGroupType) })
  type: UserGroupType;

  @ApiProperty()
  id: string;

  @ApiProperty({
    required: false,
  })
  ownerId?: string;

  @ApiProperty({ type: [String] })
  memberIds: string[];

  @ApiProperty()
  name: string;
}
