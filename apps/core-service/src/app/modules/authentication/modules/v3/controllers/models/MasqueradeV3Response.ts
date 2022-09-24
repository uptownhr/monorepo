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

export class MasqueradeV3Response {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  accessToken: string;

  @ApiProperty({
    required: true,
  })
  expiration: Date;

  constructor(data: Partial<MasqueradeV3Response>) {
    Object.assign(this, data);
  }
}
