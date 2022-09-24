//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Injectable } from '@nestjs/common';
import { InternalCoreUserGroupV1Controller } from '../../core/core-user-groups/controllers';
import { UserGroupType } from '../../core/core-user-groups/types/UserGroupType';

@Injectable()
export class FeedbackTopicRecipientRepository {
  constructor(private groupController: InternalCoreUserGroupV1Controller) {}

  public async getUserFeedbackRecipients(companyId: string, userId: string): Promise<string[]> {
    const results = await this.groupController.getGroupsByOwner(companyId, userId, UserGroupType.ManagersWithReports);
    return results.reduce((a, r) => a.concat(r.memberIds), [] as string[]);
  }

  public async getFeedbackTopicRecipients(companyId: string): Promise<string[]> {
    const results = await this.groupController.getGroupsByType(companyId, UserGroupType.ManagersWithReports);
    return results
      .map((result) => result.id.split(`${UserGroupType.ManagersWithReports}:`)[1] ?? null)
      .filter((r) => r);
  }
}
