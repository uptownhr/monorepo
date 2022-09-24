//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { subject } from '@casl/ability';
import { permittedFieldsOf } from '@casl/ability/extra';
import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { GraphQLID, GraphQLInt, GraphQLString } from 'graphql';
import { pick } from 'lodash';
import type { CoreUserDTOAbility } from '../../acl/core-user.acl';
import type { CoreUserDTO } from '../../dto';

@ObjectType()
@Directive('@key(fields: "id")')
export class CoreUserSettings {
  @Field(() => GraphQLID)
  id: string;

  @Field(() => GraphQLInt, { nullable: true })
  zendeskOrgMembershipId?: number;

  @Field(() => GraphQLInt, { nullable: true })
  zendeskUserId?: number;

  @Field(() => GraphQLString, { nullable: true })
  zendeskEmail?: string;

  @Field(() => GraphQLInt, { nullable: true })
  intercomUserId?: number;

  @Field(() => GraphQLString, { nullable: true })
  intercomEmail?: string;

  @Field(() => GraphQLString, { nullable: true })
  hrEmailAlias?: string;

  @Field(() => GraphQLString, { nullable: true })
  slackUserId?: string;

  @Field(() => GraphQLString, { nullable: true })
  salesforceUserId?: string;

  @Field(() => GraphQLString, { nullable: true })
  salesforceContactId?: string;

  @Field(() => GraphQLString, { nullable: true })
  vonageExtension?: string;

  @Field(() => GraphQLString, { nullable: true })
  vonageNumber?: string;

  @Field(() => GraphQLString, { nullable: true })
  calendlySlug?: string;

  @Field(() => GraphQLString, { nullable: true })
  pandaContactId?: string;
}

export function mapUserDtoToCoreUserSettings(ability: CoreUserDTOAbility, user: CoreUserDTO): CoreUserSettings {
  const permittedFields = permittedFieldsOf(ability, 'read', subject('CoreUserDTO', user), {
    fieldsFrom: (r) => r.fields || Object.keys(user.settings),
  });

  const res = {
    id: user.id,
    zendeskOrgMembershipId: user.settings.zendeskOrgMembershipId,
    zendeskUserId: user.settings.zendeskUserId,
    zendeskEmail: user.settings.zendeskEmail,
    intercomUserId: user.settings.intercomUserId,
    intercomEmail: user.settings.intercomEmail,
    hrEmailAlias: user.settings.hrEmailAlias,
    slackUserId: user.settings.slackUserId,
    salesforceUserId: user.settings.salesforceUserId,
    salesforceContactId: user.settings.salesforceContactId,
    vonageExtension: user.settings.vonageExtension,
    vonageNumber: user.settings.vonageNumber,
    calendlySlug: user.settings.calendlySlug,
    pandaContactId: user.settings.pandaContactId,
  };

  return { id: user.id, ...pick(res, permittedFields) };
}
