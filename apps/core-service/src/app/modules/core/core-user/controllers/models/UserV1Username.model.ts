//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ApiProperty } from '@nestjs/swagger';

export class UserV1Username {
  @ApiProperty({
    type: String,
  })
  username: string;

  @ApiProperty({
    type: String,
  })
  userId: string;

  constructor(data?: UserV1Username) {
    Object.assign(this, data);
  }
}
