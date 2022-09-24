//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';

export class CoreAuthSwitchUser {
  @ApiProperty({
    type: String,
    required: false,
  })
  userId?: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  companyId?: string;

  constructor(data?: CoreAuthSwitchUser) {
    Object.assign(this, data);
  }
}
