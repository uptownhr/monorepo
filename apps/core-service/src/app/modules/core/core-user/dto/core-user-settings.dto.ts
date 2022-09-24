//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

export interface CoreUserSettingsDTO {
  readonly zendeskOrgMembershipId?: number;
  readonly zendeskUserId?: number;
  readonly zendeskEmail?: string;
  readonly intercomUserId?: number;
  readonly intercomEmail?: string;
  readonly hrEmailAlias?: string;
  readonly slackUserId?: string;
  readonly salesforceUserId?: string;
  readonly salesforceContactId?: string;
  readonly vonageExtension?: string;
  readonly vonageNumber?: string;
  readonly calendlySlug?: string;
  readonly pandaContactId?: string;
}
