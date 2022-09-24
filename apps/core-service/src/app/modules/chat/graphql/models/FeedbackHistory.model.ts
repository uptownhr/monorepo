//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { GraphQLID } from 'graphql';
import { CoreUser } from '../../../core/core-user/graphql/models/user.model';
import { FeedbackMessage } from './messages/FeedbackMessage.model';
import { FeedbackMessageValuEnum } from './messages/FeedbackMessageInput.model';

@ObjectType()
export class FeedbackHistory {
  @Field(() => GraphQLID)
  id: string;

  @Field(() => FeedbackMessageValuEnum)
  value: FeedbackMessageValuEnum;

  @Field(() => CoreUser)
  byUser: Pick<CoreUser, 'id'>;

  @Field(() => GraphQLISODateTime)
  date: Date;

  @Field(() => FeedbackMessage)
  message: Pick<FeedbackMessage, 'id' | 'channelId'>;
}
