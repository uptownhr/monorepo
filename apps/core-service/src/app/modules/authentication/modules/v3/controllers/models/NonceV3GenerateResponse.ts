//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

//Licensed Materials - ApiProperty of Bambee
//(C) Copyright Bambee 2021,2022
//All Rights Reserved
//=============================================================================
/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NonceV3GenerateResponse {
  @ApiProperty()
  @IsNotEmpty()
  nonce: string;

  @ApiProperty()
  @IsNotEmpty()
  expiration?: Date;

  @ApiProperty()
  metadata?: Record<string, string>;

  constructor(data: Partial<NonceV3GenerateResponse>) {
    Object.assign(this, data);
  }
}
