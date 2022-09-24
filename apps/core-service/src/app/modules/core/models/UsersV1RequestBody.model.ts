//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ApiProperty } from '@nestjs/swagger';

export class UsersV1RequestBody {
  @ApiProperty({ type: [String] })
  userIds: string[];

  constructor(data?: UsersV1RequestBody) {
    Object.assign(this, data);
  }
}
