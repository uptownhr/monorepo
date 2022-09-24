//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ApiProperty } from '@nestjs/swagger';

export class AuthV1ForgotPasswordBody {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  email: string;
}
