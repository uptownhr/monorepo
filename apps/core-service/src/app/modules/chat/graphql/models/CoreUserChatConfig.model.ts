//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */
import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

@ObjectType()
export class CoreUserChatConfig {
  @Field(() => GraphQLString, { nullable: true })
  token?: string;
}
