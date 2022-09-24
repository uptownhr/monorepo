//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class AuthV1RefreshRequestBody {
  @ApiProperty({
    type: 'string',
  })
  @IsOptional()
  refreshToken?: string;
}
