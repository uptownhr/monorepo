//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserProfileV1Body } from './UserProfileV1Body.model';

export class UserProfilesV1ResponseBody {
  @ApiPropertyOptional({ type: [UserProfileV1Body] })
  users?: UserProfileV1Body[];

  constructor(data?: UserProfilesV1ResponseBody) {
    Object.assign(this, data);
  }
}
