//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';

export class AuthV1Model {
  id: string;

  @ApiProperty({
    type: String,
  })
  email: string;

  constructor(data?: AuthV1Model) {
    Object.assign(this, data);
  }
}
