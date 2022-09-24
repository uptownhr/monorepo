//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Field, InputType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

@InputType()
export class AuthMfaChallengeResponseInput {
  @Field(() => GraphQLString)
  nonce: string;

  @Field(() => GraphQLString)
  response: string;
}
