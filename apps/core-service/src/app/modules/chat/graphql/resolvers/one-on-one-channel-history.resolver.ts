//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { ForbiddenError, subject } from '@casl/ability';
import { ForbiddenException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { chatAbility } from '../../acl/core-user-chat.acl';
import { buildChannelId } from '../../lib/build-channel-id';
import { ChannelHistoryService, CoreUserService, UserChatService } from '../../services';
import type { SendbirdFileMessageResponse, SendbirdTextMessageResponse } from '../../types/sendbird';
import { ChatMessageInterface, SendbirdMessageType } from '../models/ChatMessage.interface';
import { ChatMessageTypeEnum } from '../models/ChatMessageType.enum';
import { ConversationHistoryInput } from '../models/ConversationHistoryInput.model';

@Resolver(() => [ChatMessageInterface])
export class OneOnOneChannelHistoryResolver {
  constructor(
    private coreUserService: CoreUserService,
    private historyService: ChannelHistoryService,
    private chatService: UserChatService,
  ) {}
  /**
   * Fetches the next set of messages from chat history for the given channel
   * @param currentUser
   * @param userId
   * @param afterMessageId [optional] for paginatioin, uses this as the "last id" to get the next batch of messages
   * @returns
   */
  @Query(() => [ChatMessageInterface])
  async getConversationHistory(
    @AuthUser() currentUser: CurrentUser,
    @Args('input', { type: () => ConversationHistoryInput }) input: ConversationHistoryInput,
  ) {
    const [currentUserDto, recipientDto] = await this.coreUserService.getUsers([currentUser.userId, input.userId]);
    if (!currentUserDto || !recipientDto) {
      throw new Error('Did not resolve two users');
    }
    const existingChats = await this.chatService.getExistingConversations(currentUserDto.id, [recipientDto.id]);
    const myAbility = chatAbility(currentUserDto);
    try {
      ForbiddenError.from(myAbility).throwUnlessCan('read-conversation', subject('CoreUserDTO', recipientDto));
    } catch (e) {
      if (!existingChats.some((c) => c.members?.find((m) => m.user_id === input.userId))) {
        throw new ForbiddenException('Cannot send chat messages.' + (e as Error).message);
      }
    }

    const history = await this.historyService.getOneOnOneHistory({
      channelId: buildChannelId(currentUserDto.id, recipientDto.id),
      userId: currentUser.userId,
      companyId: currentUser.companyId!,
      count: input.count,
      afterId: input.afterId ? BigInt(input.afterId) : undefined,
    });
    if (!history) {
      return [];
    }
    return history.map(mapToResponse);
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
