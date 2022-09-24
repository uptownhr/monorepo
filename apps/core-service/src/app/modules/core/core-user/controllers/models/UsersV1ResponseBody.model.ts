//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserV1Body } from './UserV1Body.model';

export class UsersV1ResponseBody {
  @ApiPropertyOptional({ type: [UserV1Body] })
  users?: Array<UserV1Body>;

  constructor(data?: UsersV1ResponseBody) {
    Object.assign(this, data);
  }
}
