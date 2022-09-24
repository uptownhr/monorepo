//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';

export class CoreAuthByEmailBody {
  @ApiProperty({
    type: String,
  })
  email: string;

  constructor(data?: CoreAuthByEmailBody) {
    Object.assign(this, data);
  }
}
