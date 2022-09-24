//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AddressV1Body } from '../../../models/AddressV1Body.model';
import type { CoreUserDTO } from '../../dto/core-user.dto';
import { UserV1ContractorType } from './UserV1ContractorType.model';

export enum UserProfileV1Classification {
  Exempt = 'exempt',
  NonExempt = 'non-exempt',
}
export class UserProfileV1Body {
  @ApiProperty({
    type: String,
  })
  firstName: string;

  @ApiProperty({
    type: String,
  })
  lastName: string;

  @ApiProperty({
    type: String,
  })
  email: string;

  @ApiProperty({
    type: String,
  })
  title?: string;

  @ApiProperty({
    type: String,
  })
  phoneNumber: string;

  @ApiProperty({
    type: Date,
  })
  dob?: Date;

  @ApiPropertyOptional({ enum: Object.values(UserV1ContractorType) })
  contractorType?: UserV1ContractorType;

  @ApiPropertyOptional()
  contractorBusinessName?: string;

  @ApiProperty({ type: AddressV1Body })
  address: AddressV1Body;

  @ApiPropertyOptional({ enum: Object.values(UserProfileV1Classification) })
  classification?: UserProfileV1Classification;

  constructor(data?: UserProfileV1Body) {
    Object.assign(this, data);
  }
}

export function userDtoToProfileResponse(userDto: CoreUserDTO): UserProfileV1Body {
  const { profile, employment } = userDto;

  return {
    address: {
      address1: profile?.address?.line1 ?? '',
      address2: profile?.address?.line2 ?? '',
      city: profile?.address?.city ?? '',
      state: profile?.address?.state ?? '',
      zipCode: profile?.address?.zipCode ?? '',
    },
    dob: profile.dob,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    classification: employment.classification as any,
    contractorBusinessName: employment.contractorBusinessName,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contractorType: employment.contractorType as any,
    email: profile.email,
    firstName: profile.firstName,
    lastName: profile.lastName,
    phoneNumber: profile.phone,
    title: employment.title,
  };
}
