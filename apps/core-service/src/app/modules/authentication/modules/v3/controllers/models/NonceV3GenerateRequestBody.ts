//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Matches } from 'class-validator';

export class NonceV3GenerateRequestBody {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  userId?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  authId?: string;

  @Matches(
    /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/,
  )
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  expiration?: string;
}
