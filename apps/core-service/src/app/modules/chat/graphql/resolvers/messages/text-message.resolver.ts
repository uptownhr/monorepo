//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { subject } from '@casl/ability';
import { ForbiddenException } from '@nestjs/common';
import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphQLID, GraphQLString } from 'graphql';
import { chatAbility } from '../../../acl/core-user-chat.acl';
import { buildChannelId } from '../../../lib/build-channel-id';
import { isSendbirdError } from '../../../providers/sendbird-axios.provider';
import { CoreUserService, RawMessageService, UserChatService } from '../../../services';
import { ChatMessageType } from '../../../types/ChatMessageType';
import type { SendbirdFileMessageResponse, SendbirdTextMessageResponse } from '../../../types/sendbird';
import { ChatMessageInterface, SendbirdMessageType } from '../../models/ChatMessage.interface';
import { ChatMessageTypeEnum } from '../../models/ChatMessageType.enum';
import { TextMessage } from '../../models/messages/TextMessage.model';

@Resolver(() => TextMessage)
export class TextMessageResolver {
  constructor(
    private coreUserService: CoreUserService,
    private chatService: UserChatService,
    private messageService: RawMessageService,
  ) {}

  @ResolveField()
  async message(@Parent() message: TextMessage) {
    await this.#confirmData(message);
    return message.rawData.message;
  }

  async #confirmData(message) {
    if (message.channelId && message.id && !message.rawData) {
      const rawData = await this.messageService.getRawMessage(message.channelId, BigInt(message.id));
      if (!isSendbirdError(rawData)) {
        message.rawData = rawData;
      } else {
        throw rawData;
      }
    }
  }

  @Mutation(() => ChatMessageInterface)
  async sendMessageToUser(
    @AuthUser() currentUser: CurrentUser,
    @Args('id', { type: () => GraphQLID }) userId: string,
    @Args('message', { type: () => GraphQLString }) message: string,
  ) {
    // ACL CHECK
    const users = await this.coreUserService.getUsers([userId, currentUser.userId]);
    if (users.length !== 2) {
      throw new Error('Did not resolve two users');
    }
    const myAbility = chatAbility(users[0]);
    if (myAbility.can('start-chat', subject('CoreUserDTO', users[1]))) {
      const res = await this.chatService.sendMessage({
        channelId: buildChannelId(users[0].id, users[1].id),
        data: message,
        type: fromGraphqlEnum(ChatMessageTypeEnum.Text),
        senderId: currentUser.userId, // this is te senderId
        recipientId: users[1].id,
        companyId: currentUser.companyId!,
      });

      return mapToResponse(res);
    } else {
      throw new ForbiddenException('Cannot send chat messages.');
    }
  }

  @Mutation(() => ChatMessageInterface)
  async sendReplyToUserThread(
    @AuthUser() currentUser: CurrentUser,
    @Args('parentId', { type: () => GraphQLID }) parentId: string,
    @Args('userId', { type: () => GraphQLID }) userId: string,
    @Args('message', { type: () => GraphQLString }) message: string,
  ) {
    // ACL CHECK
    const users = await this.coreUserService.getUsers([userId, currentUser.userId]);
    if (users.length !== 2) {
      throw new Error('Did not resolve two users');
    }
    const myAbility = chatAbility(users[0]);
    if (myAbility.can('start-chat', subject('CoreUserDTO', users[1]))) {
      const res = await this.chatService.sendMessage({
        channelId: buildChannelId(users[0].id, users[1].id),
        threadParentId: BigInt(parentId),
        data: message,
        type: fromGraphqlEnum(ChatMessageTypeEnum.Text),
        senderId: currentUser.userId, // this is te senderId
        recipientId: users[1].id,
        companyId: currentUser.companyId!,
      });

      return mapToResponse(res);
    } else {
      throw new ForbiddenException('Cannot send chat messages.');
    }
  }
}

function mapToResponse(data: SendbirdTextMessageResponse | SendbirdFileMessageResponse): ChatMessageInterface {
  return {
    id: data.message_id.toString(),
    isThreadMessage: !!data.parent_message_id,
    isThreadParent: !!data.thread_info?.reply_count,
    rawType: mapSendbirdType(data.type),
    rawData: data,
    sender: { id: data.user.user_id },
    type: mapType(data.custom_type),
    createdAt: new Date(data.created_at),
    channelId: data.channel_url,
  };
}

function mapSendbirdType(t: 'MESG' | 'FILE' | 'ADMIN'): SendbirdMessageType {
  switch (t) {
    case 'MESG':
      return SendbirdMessageType.Message;
    case 'ADMIN':
      return SendbirdMessageType.Admin;
    case 'FILE':
      return SendbirdMessageType.File;
  }
}
function mapType(t: string): ChatMessageTypeEnum {
  switch (t.toLowerCase()) {
    case 'feedback':
      return ChatMessageTypeEnum.Feedback;
    default:
      return ChatMessageTypeEnum.Text;
  }
}

function fromGraphqlEnum(t: ChatMessageTypeEnum): ChatMessageType {
  switch (t) {
    case ChatMessageTypeEnum.Feedback:
      return ChatMessageType.Feedback;
    default:
      return ChatMessageType.Text;
  }
}
