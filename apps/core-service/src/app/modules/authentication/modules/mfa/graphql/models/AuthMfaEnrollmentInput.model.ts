//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Field, InputType } from '@nestjs/graphql';
import { AuthMfaType } from '../../../../../core/prisma/core-prisma.service';

@InputType()
export class AuthMfaEnrollmentInput {
  @Field(() => AuthMfaType)
  mfaType: AuthMfaType;
}
