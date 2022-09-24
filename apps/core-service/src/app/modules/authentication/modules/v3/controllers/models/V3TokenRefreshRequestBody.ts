//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* eslint-disable @typescript-eslint/naming-convention */
//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2021,2022
//All Rights Reserved
//=============================================================================
/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class V3TokenRefreshRequestBody {
  @ApiProperty()
  @IsNotEmpty()
  grant_type: 'refresh_token';

  @ApiProperty()
  @IsNotEmpty()
  access_token: string;

  @ApiProperty()
  @IsNotEmpty()
  refresh_token: string;

  @ApiProperty()
  @IsNotEmpty()
  client_id: string;

  @ApiProperty()
  @IsNotEmpty()
  client_secret: string;
}
