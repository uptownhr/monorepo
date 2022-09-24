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

export class V3TokenCreateRequestBody {
  @ApiProperty()
  @IsNotEmpty()
  client_id: string;
}
