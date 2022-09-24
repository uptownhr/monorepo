//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ApiProperty } from '@nestjs/swagger';

export class AuthV3MfaChallengeRequestBody {
  @ApiProperty({
    type: 'string',
  })
  nonce: string;

  @ApiProperty({
    type: 'string',
  })
  response: string;

  @ApiProperty({
    type: 'boolean',
    default: false,
  })
  rememberDevice?: boolean;
}
