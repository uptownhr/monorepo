//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';

export class V3TokenProfileResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  companyId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  constructor(data: Partial<V3TokenProfileResponse>) {
    Object.assign(this, data);
  }
}
