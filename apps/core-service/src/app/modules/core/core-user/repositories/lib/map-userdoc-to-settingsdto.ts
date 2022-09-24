//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CoreUserSettingsDTO } from '../../dto';
import type { UserDocument } from '../../schemas/user.schema';

export function mapToUserSettingsDTO(doc: UserDocument): CoreUserSettingsDTO {
  return {
    zendeskOrgMembershipId: doc.settings.zendesk_org_membership_id,
    zendeskUserId: doc.settings.zendesk_user_id,
    zendeskEmail: doc.settings.zendesk_email,
    intercomUserId: doc.settings.intercomUserId,
    intercomEmail: doc.settings.intercomEmail,
    hrEmailAlias: doc.settings.hrEmailAlias,
    slackUserId: doc.settings.slackUserId,
    salesforceUserId: doc.settings.salesforceUserId,
    salesforceContactId: doc.settings.salesforceContactId,
    vonageExtension: doc.settings.vonageExtension,
    vonageNumber: doc.settings.vonageNumber,
    calendlySlug: doc.settings.calendlySlug,
    pandaContactId: doc.settings.pandaContactId,
  };
}
