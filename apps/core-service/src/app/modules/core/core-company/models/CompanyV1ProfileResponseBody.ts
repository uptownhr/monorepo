//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ApiProperty } from '@nestjs/swagger';
import { CompanyV1AddressResponseBody } from './CompanyV1AddressResponseBody';

export class CompanyV1ProfileResponseBody {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  ownerId: string;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  email: string;

  @ApiProperty({ type: CompanyV1AddressResponseBody })
  address: CompanyV1AddressResponseBody;

  @ApiProperty({
    type: String,
  })
  phone: string;

  @ApiProperty({
    type: String,
  })
  industry: string;

  @ApiProperty({
    type: String,
  })
  logoUrl: string;

  @ApiProperty({
    type: String,
  })
  ein: string;

  @ApiProperty({
    type: String,
  })
  dba: string;

  @ApiProperty({
    type: String,
  })
  payFrequency: string;

  @ApiProperty({
    type: String,
  })
  payDay: string;

  @ApiProperty({
    type: String,
  })
  convertedAt?: string;

  constructor(data: CompanyV1ProfileResponseBody) {
    Object.assign(this, data);
  }
}
