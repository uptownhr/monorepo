//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';
import { GraphQLID, GraphQLInt } from 'graphql';

@InputType()
export class FeedbackHistoryInput {
  @Field(() => GraphQLID)
  userId: string;

  @IsOptional()
  @IsInt()
  @Field(() => GraphQLInt, { nullable: true })
  count?: number;
}
