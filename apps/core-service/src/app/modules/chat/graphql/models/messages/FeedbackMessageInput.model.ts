//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

export enum FeedbackMessageValuEnum {
  BelowExpectations,
  MeetsExpectations,
  AboveExpectations,
}

registerEnumType(FeedbackMessageValuEnum, {
  name: 'FeedbackValue',
  description: 'A representation of feedback values',
  valuesMap: {
    BelowExpectations: {},
    MeetsExpectations: {},
    AboveExpectations: {},
  },
});

@InputType()
export class FeedbackMessageInput {
  @Field(() => FeedbackMessageValuEnum)
  value: FeedbackMessageValuEnum;

  @Field(() => GraphQLString)
  message: string;
}
