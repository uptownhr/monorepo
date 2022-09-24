//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import type { AuthV3MfaChallengeRequestBody } from './AuthV3MfaChallengeRequestBody';

export class AuthV3LoginRequestBody {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  mfa?: AuthV3MfaChallengeRequestBody;
}
