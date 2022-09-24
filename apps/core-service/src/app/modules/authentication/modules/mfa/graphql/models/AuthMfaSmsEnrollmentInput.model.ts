//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { IsPhoneNumber } from '@bambeehr/input-filters';
import { Field, InputType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { AuthMfaType } from './AuthMfaType';
@InputType()
export class AuthMfaSmsEnrollmentInput {
  @Field(() => AuthMfaType)
  mfaType: AuthMfaType;

  @Field(() => GraphQLString)
  @IsPhoneNumber()
  phoneNumber: string;
}
