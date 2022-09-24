//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ApiProperty } from '@nestjs/swagger';

export class AuthV1LoginResponse {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  token: string;

  @ApiProperty({
    type: 'string',
  })
  refreshToken: string;

  constructor(data: Partial<AuthV1LoginResponse>) {
    Object.assign(this, data);
  }
}
