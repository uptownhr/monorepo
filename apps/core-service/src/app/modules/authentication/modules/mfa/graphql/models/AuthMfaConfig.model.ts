//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { AuthMfaType } from './AuthMfaType';

@ObjectType()
export class AuthMfaConfig {
  @Field(() => AuthMfaType)
  mfaType: AuthMfaType;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  lastChallengedAt?: Date;

  @Field(() => GraphQLString, { nullable: true })
  lastDevice?: string;

  @Field(() => GraphQLString, {
    description: 'When enrolling the first MFA device, a backup code will also be created and presented to the user.',
  })
  backupCode?: string;
}
