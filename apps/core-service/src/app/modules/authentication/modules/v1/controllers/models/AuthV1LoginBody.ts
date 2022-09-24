//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ApiProperty } from '@nestjs/swagger';
import type { AuthV1MfaChallengeRequestBody } from './AuthV1MfaChallengeRequestBody';

export class AuthV1LoginBody {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  email: string;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  password: string;

  @ApiProperty()
  mfa?: AuthV1MfaChallengeRequestBody;
}
