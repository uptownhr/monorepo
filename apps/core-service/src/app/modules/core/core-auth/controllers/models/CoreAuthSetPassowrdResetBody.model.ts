//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';

export class CoreAuthSetPassowrdResetBody {
  @ApiProperty({
    type: String,
    required: false,
  })
  token: string;

  constructor(data?: CoreAuthSetPassowrdResetBody) {
    Object.assign(this, data);
  }
}
