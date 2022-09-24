//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddressV1Body {
  @ApiProperty({
    type: String,
  })
  address1: string;

  @ApiPropertyOptional({
    type: String,
  })
  address2?: string;

  @ApiProperty({
    type: String,
  })
  city: string;

  @ApiProperty({
    type: String,
  })
  state: string;

  @ApiProperty({
    type: String,
  })
  zipCode: string;

  constructor(data?: AddressV1Body) {
    Object.assign(this, data);
  }
}
