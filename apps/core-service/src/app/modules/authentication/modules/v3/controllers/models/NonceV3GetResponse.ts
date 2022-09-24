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

export class NonceV3GetResponse {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  authId: string;

  @ApiProperty()
  expiration?: Date | null;

  constructor(data: Partial<NonceV3GetResponse>) {
    Object.assign(this, data);
  }
}
