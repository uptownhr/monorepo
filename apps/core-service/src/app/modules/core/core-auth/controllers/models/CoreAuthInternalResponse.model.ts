//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';

export class CoreAuthUserOptionsResponse {
  @ApiProperty({
    type: String,
  })
  userId: string;

  @ApiProperty({
    type: Boolean,
  })
  active: boolean;

  @ApiProperty({
    type: String,
  })
  companyId: string;

  @ApiProperty({
    type: String,
  })
  companyName: string;
}

export class CoreAuthInternalResponse {
  @ApiProperty({
    type: String,
  })
  email: string;

  @ApiProperty({
    type: String,
  })
  authId: string;

  @ApiProperty({
    type: String,
  })
  avatarUrl: string;

  @ApiProperty({
    type: Boolean,
  })
  authActive: boolean;

  @ApiProperty({
    type: Boolean,
  })
  userActive: boolean;

  @ApiProperty({
    type: String,
  })
  currentUserId: string;

  @ApiProperty({
    type: String,
  })
  fullName: string;

  @ApiProperty({
    type: String,
  })
  passwordHash: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  currentCompanyId?: string;

  @ApiProperty({
    type: [String],
  })
  roles: string[];

  @ApiProperty({
    type: String,
  })
  primaryRole: string;

  @ApiProperty({
    type: [CoreAuthUserOptionsResponse],
  })
  userOptions: CoreAuthUserOptionsResponse[];

  constructor(data?: CoreAuthInternalResponse) {
    Object.assign(this, data);
  }
}
