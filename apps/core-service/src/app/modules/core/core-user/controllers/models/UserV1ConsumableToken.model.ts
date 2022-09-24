//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ApiProperty } from '@nestjs/swagger';

export class UserV1ConsumableToken {
  @ApiProperty({
    type: String,
  })
  token: string;

  @ApiProperty({
    type: Date,
  })
  expiresAt: Date;

  constructor(data?: UserV1ConsumableToken) {
    Object.assign(this, data);
  }
}
