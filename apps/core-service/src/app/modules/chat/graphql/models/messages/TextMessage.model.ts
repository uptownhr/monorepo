//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import type { CoreUser } from '../../../../core/core-user/graphql/models/user.model';
import type { SendbirdFileMessageResponse, SendbirdTextMessageResponse } from '../../../types/sendbird';
import { ChatMessageInterface, SendbirdMessageType } from '../ChatMessage.interface';
import type { ChatMessageTypeEnum } from '../ChatMessageType.enum';

@ObjectType({
  implements: () => ChatMessageInterface,
})
export class TextMessage implements ChatMessageInterface {
  channelId: string;
  recipient?: Pick<CoreUser, 'id'> | undefined;
  createdAt: Date;
  rawData: SendbirdTextMessageResponse | SendbirdFileMessageResponse;
  id: string;
  rawType: SendbirdMessageType;
  type: ChatMessageTypeEnum;
  sender: Pick<CoreUser, 'id'>;
  isThreadParent: boolean;
  isThreadMessage: boolean;
  threadParentId?: bigint;

  @Field(() => GraphQLString)
  message: string;
}
