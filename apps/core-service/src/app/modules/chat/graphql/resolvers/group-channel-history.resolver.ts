//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GraphQLID } from 'graphql';
import { ChatMessageInterface } from '../models/ChatMessage.interface';

@Resolver(() => [ChatMessageInterface])
export class GroupChannelHistoryResolver {
  /**
   * Fetches the next set of messages from chat history for the given channel
   * @param currentUser
   * @param userId
   * @param afterMessageId [optional] for paginatioin, uses this as the "last id" to get the next batch of messages
   * @returns
   */
  @Query(() => [ChatMessageInterface])
  async getChannelHistory(
    @AuthUser() currentUser: CurrentUser,
    @Args('channelId', { type: () => GraphQLID }) channelId: number,
    @Args('afterId', { type: () => GraphQLID, nullable: true }) afterMessageId?: number,
  ) {
    return [];
  }
}
