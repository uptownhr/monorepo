//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLID, GraphQLString } from 'graphql';
import type { CoreUser } from '../../../../core/core-user/graphql/models/user.model';
import type { SendbirdFileMessageResponse, SendbirdTextMessageResponse } from '../../../types/sendbird';
import { ChatMessageInterface, SendbirdMessageType } from '../ChatMessage.interface';
import type { ChatMessageTypeEnum } from '../ChatMessageType.enum';
import { FeedbackMessageValuEnum } from './FeedbackMessageInput.model';

@ObjectType({
  implements: () => ChatMessageInterface,
})
export class FeedbackMessage implements ChatMessageInterface {
  channelId: string;
  createdAt: Date;
  rawData: SendbirdTextMessageResponse | SendbirdFileMessageResponse;
  id: string;
  rawType: SendbirdMessageType;
  type: ChatMessageTypeEnum;
  sender: Pick<CoreUser, 'id'>;
  recipient: Pick<CoreUser, 'id'>;
  isThreadParent: boolean;
  isThreadMessage: boolean;
  threadParentId?: bigint | undefined;

  @Field(() => FeedbackMessageValuEnum)
  value: FeedbackMessageValuEnum;

  @Field(() => GraphQLString)
  message: string;

  @Field(() => GraphQLID)
  feedbackId: string;
}
