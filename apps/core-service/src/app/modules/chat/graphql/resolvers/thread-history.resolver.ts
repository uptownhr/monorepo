//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { subject } from '@casl/ability';
import { ForbiddenException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { chatAbility } from '../../acl/core-user-chat.acl';
import { buildChannelId } from '../../lib/build-channel-id';
import { ChannelHistoryService, CoreUserService } from '../../services';
import type { SendbirdFileMessageResponse, SendbirdTextMessageResponse } from '../../types/sendbird';
import { ChatMessageInterface, SendbirdMessageType } from '../models/ChatMessage.interface';
import { ChatMessageTypeEnum } from '../models/ChatMessageType.enum';
import { ThreadHistoryInput } from '../models/ConversationHistoryInput.model';

@Resolver(() => [ChatMessageInterface])
export class ThreadHistoryResolver {
  constructor(private coreUserService: CoreUserService, private historyService: ChannelHistoryService) {}
  /**
   * Fetches the next set of messages from chat history for the given channel
   * @param currentUser
   * @param userId
   * @param afterMessageId [optional] for paginatioin, uses this as the "last id" to get the next batch of messages
   * @returns
   */
  @Query(() => [ChatMessageInterface])
  async getThreadHistory(
    @AuthUser() currentUser: CurrentUser,
    @Args('input', { type: () => ThreadHistoryInput }) input: ThreadHistoryInput,
  ) {
    const [currentUserDto, inputUserDto] = await this.coreUserService.getUsers([currentUser.userId, input.userId]);
    if (!currentUserDto || !inputUserDto) {
      throw new Error('Did not resolve two users');
    }
    const myAbility = chatAbility(currentUserDto);
    if (myAbility.can('read-conversation', subject('CoreUserDTO', inputUserDto))) {
      const history = await this.historyService.getThreadHistory({
        channelId: buildChannelId(currentUserDto.id, inputUserDto.id),
        userId: currentUser.userId,
        companyId: currentUser.companyId!,
        count: input.count,
        parentId: BigInt(input.parentId),
        afterId: input.afterId ? BigInt(input.afterId) : undefined,
      });
      if (!history) {
        return [];
      }
      return history.map(mapToResponse);
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
