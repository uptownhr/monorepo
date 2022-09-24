//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { subject } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { feedbackAbility } from '../acl/core-user-feedback.acl';
import type { ChatTopicDTO } from '../dto/ChatTopic.dto';
import { CoreUserRepository } from '../repositories';

@Injectable()
export class ChatTopicSuggestionService {
  constructor(private coreRepo: CoreUserRepository) {}

  public async getSuggestions(currentUser: CurrentUser): Promise<ChatTopicDTO[]> {
    if (!currentUser.companyId) {
      return [];
    }
    const companyUsers = await this.coreRepo.getCompanyUsers(currentUser.companyId);
    const ability = feedbackAbility(companyUsers.find((u) => u.id === currentUser.userId)!);
    const recipients = companyUsers
      .filter((u) => ability.can('send-feedback', subject('CoreUserDTO', u)))
      .map((u) => u.id);

    return [
      {
        type: 'feedback',
        // groups: [],
        recipients,
      },
    ];
  }
}
