//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { subject } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { CoreUser } from '../../../core/core-user/graphql/models/user.model';
import { chatAbility } from '../../acl/core-user-chat.acl';
import { UserChatService } from '../../services';
import { CoreUserService } from '../../services/core-user.service';

@Injectable()
export class ChatRecipientResolver {
  constructor(private userService: CoreUserService, private chatService: UserChatService) {}

  /**
   * What does "recipients" mean?
   *
   * For now, we're allowing bidirectional communication between: direct-reports <-> managers,
   *
   * @param currentUser
   * @returns
   */
  @Query(() => [CoreUser])
  async getMyChatRecipients(@AuthUser() currentUser: CurrentUser) {
    if (!currentUser.companyId) {
      return [];
    }
    const users = await this.userService.getCompanyUsers(currentUser.companyId!);
    const me = users.find((u) => u.id === currentUser.userId);
    if (!me) {
      return [];
    }
    const ability = chatAbility(me);

    /**
     * You can chat with a person if:
     * - You have permission to START a chat with them
     * - You are already in a chat with them.
     * - ... they are active
     */
    const existingChats = await this.chatService.getExistingConversations(
      currentUser.userId,
      users.map((u) => u.id),
    );

    const allowed = users.filter(
      (user) =>
        user.active &&
        ability.can(
          'start-chat',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          subject('CoreUserDTO', user) || existingChats.some((c) => c.members?.find((m) => m.user_id === user.id)),
        ),
    );
    return allowed.map((u) => ({ id: u.id }));
  }
}
