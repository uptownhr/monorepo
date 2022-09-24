//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';

export class AuthV3TokenBody {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  id: string;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  accessToken: string;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  refreshToken: string;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  baseUrl: string;

  @ApiProperty({
    required: true,
  })
  expiration: Date;

  constructor(data: Partial<AuthV3TokenBody>) {
    Object.assign(this, data);
  }
}
