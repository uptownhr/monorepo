//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthV3SwitchCompanyBody {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  companyId: string;
}
