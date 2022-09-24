//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

@ObjectType()
export class AuthMfaChallenge {
  @Field(() => GraphQLString)
  nonce: string;

  @Field(() => GraphQLISODateTime)
  expiration: Date;
}
