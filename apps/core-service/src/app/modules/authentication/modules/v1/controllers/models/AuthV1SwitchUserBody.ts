//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';

export class AuthV1SwitchUserBody {
  @ApiProperty({
    type: 'string',
  })
  userId: string;

  @ApiProperty({
    type: 'string',
  })
  userMngId: string;
}
