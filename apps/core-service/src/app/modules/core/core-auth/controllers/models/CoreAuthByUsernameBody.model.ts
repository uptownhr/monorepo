//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';

export class CoreAuthByUsernameBody {
  @ApiProperty({
    type: String,
  })
  username: string;

  constructor(data?: CoreAuthByUsernameBody) {
    Object.assign(this, data);
  }
}
