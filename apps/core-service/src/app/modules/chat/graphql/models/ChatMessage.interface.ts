//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* istanbul ignore file */
import { Field, GraphQLISODateTime, InterfaceType, registerEnumType } from '@nestjs/graphql';
import { GraphQLBoolean, GraphQLID } from 'graphql';
import { CoreUser } from '../../../core/core-user/graphql/models/user.model';
import type { SendbirdFileMessageResponse, SendbirdTextMessageResponse } from '../../types/sendbird';
import { ChatMessageTypeEnum } from './ChatMessageType.enum';
import { FeedbackMessage } from './messages/FeedbackMessage.model';
import { TextMessage } from './messages/TextMessage.model';

export enum SendbirdMessageType {
  Message,
  File,
  Admin,
}
registerEnumType(SendbirdMessageType, {
  name: 'SendbirdMessageType',
  description: 'The type of message according to sendbird',
  valuesMap: {
    Message: {
      description:
        'A text message.  This can be a standard message of just text, or a serialized payload for Bambee customized messages',
    },
    File: {
      description: 'A binary file, such as an image or other downloadable content.',
    },
    Admin: {
      description: 'Not currently in use',
    },
  },
});

@InterfaceType({
  async resolveType(message) {
    switch (message.type) {
      case ChatMessageTypeEnum.Feedback:
        return FeedbackMessage;
      default:
        return TextMessage;
    }
  },
})
export abstract class ChatMessageInterface {
  @Field(() => GraphQLID)
  id: string;

  @Field(() => GraphQLID)
  channelId: string;

  @Field(() => SendbirdMessageType)
  rawType: SendbirdMessageType;

  @Field(() => ChatMessageTypeEnum)
  type: ChatMessageTypeEnum;

  @Field(() => CoreUser)
  sender: Pick<CoreUser, 'id'>;

  @Field(() => CoreUser, { nullable: true, description: 'Recipieint, if a one-on-one message' })
  recipient?: Pick<CoreUser, 'id'>;

  @Field(() => GraphQLBoolean, { defaultValue: false })
  isThreadParent: boolean;

  @Field(() => GraphQLBoolean, { defaultValue: false })
  isThreadMessage: boolean;

  @Field(() => GraphQLID, { nullable: true })
  threadParentId?: bigint;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  rawData: SendbirdTextMessageResponse | SendbirdFileMessageResponse;
}
