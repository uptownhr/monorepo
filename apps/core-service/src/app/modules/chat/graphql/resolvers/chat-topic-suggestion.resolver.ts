//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { Query, Resolver } from '@nestjs/graphql';
import type { ChatTopicDTO } from '../../dto/ChatTopic.dto';
import { ChatTopicSuggestionService } from '../../services/chat-topic-suggestion.service';
import { ChatTopicSuggestion } from '../models/ChatTopicSuggestion.model';

@Resolver(() => [ChatTopicSuggestion])
export class ChatTopicSuggestionResolver {
  constructor(private suggestionService: ChatTopicSuggestionService) {}
  @Query(() => [ChatTopicSuggestion])
  public async getMySuggestedTopics(@AuthUser() currentUser: CurrentUser): Promise<Array<ChatTopicSuggestion>> {
    const suggestions = await this.suggestionService.getSuggestions(currentUser);
    return suggestions.map(mapToResponse);
  }
}

function mapToResponse(suggestion: ChatTopicDTO): ChatTopicSuggestion {
  return {
    type: suggestion.type,
    recipients: suggestion.recipients.map((r) => ({ id: r })),
  };
}
