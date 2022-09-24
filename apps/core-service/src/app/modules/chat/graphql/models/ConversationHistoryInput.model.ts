//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNumberString, IsOptional } from 'class-validator';
import { GraphQLID, GraphQLInt } from 'graphql';

@InputType()
export class ConversationHistoryInput {
  @Field(() => GraphQLID)
  userId: string;

  @IsOptional()
  @IsNumberString()
  @Field(() => GraphQLID, { nullable: true })
  afterId?: string;

  @IsOptional()
  @IsInt()
  @Field(() => GraphQLInt, { nullable: true })
  count?: number;
}

@InputType()
export class ThreadHistoryInput extends ConversationHistoryInput {
  @IsNumberString()
  @Field(() => GraphQLID, { nullable: true })
  parentId: string;
}
