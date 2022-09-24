//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthV3RefreshRequestBody {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  refreshToken: string;
}
