//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { AuthUser } from '@bambeehr/authentication-guard';
import { subject } from '@casl/ability';
import { Args, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { GraphQLInt } from 'graphql';
import { CoreUser } from '../../../core/core-user/graphql/models/user.model';
import { feedbackAbility } from '../../acl';
import { feedbackValueDtoToModel } from '../../lib/feedback-dto-to-model';
import type { FeedbackDto } from '../../repositories/feedback.repository';
import { CoreUserService, FeedbackMessageService } from '../../services';
import { FeedbackHistory } from '../models/FeedbackHistory.model';

@Resolver(() => CoreUser)
export class CoreUserFeedbackResolver {
  constructor(private coreUserService: CoreUserService, private feedbackService: FeedbackMessageService) {}
  @ResolveField(() => [FeedbackHistory])
  async feedback(
    @AuthUser() currentUser: CurrentUser,
    @Root() user: CoreUser,
    @Args('count', { type: () => GraphQLInt, nullable: true }) count?: number,
  ) {
    const [currentUserDto, recipientDto] = await this.coreUserService.getUsers([currentUser.userId, user.id]);
    const results = await this.feedbackService.getUserFeedback({
      userId: user.id,
      count,
    });

    const fa = feedbackAbility(currentUserDto);

    return results
      .filter((r) => {
        const firstCheck = fa.can('read-feedback', subject('CoreUserDTO', recipientDto));
        const secondCheck = fa.can('read-feedback', subject('FeedbackDto', r));
        return firstCheck || secondCheck;
      })
      .map(mapToResponse);
  }
}

function mapToResponse(dto: FeedbackDto): FeedbackHistory {
  return {
    id: dto.id,
    byUser: { id: dto.senderId },
    date: dto.createdAt,
    message: { id: dto.messageId!.toString(), channelId: dto.channelId },
    value: feedbackValueDtoToModel(dto.value),
  };
}
