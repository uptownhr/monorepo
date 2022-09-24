//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { subject } from '@casl/ability';
import { permittedFieldsOf } from '@casl/ability/extra';
import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { GraphQLBoolean, GraphQLID } from 'graphql';
import { pick } from 'lodash';
import type { CoreUserDTOAbility } from '../../acl/core-user.acl';
import type { CoreUserDTO } from '../../dto';

@ObjectType()
@Directive('@key(fields: "id")')
export class CoreUserPermissions {
  @Field(() => GraphQLID)
  id: string;

  @Field(() => GraphQLBoolean)
  manager: boolean;

  @Field(() => GraphQLBoolean)
  approver: boolean;

  @Field(() => GraphQLBoolean)
  canCancelAccount: boolean;

  @Field(() => GraphQLBoolean)
  canRetractSignedPolicies: boolean;

  @Field(() => GraphQLBoolean)
  canEditGlobalPolicies: boolean;

  @Field(() => GraphQLBoolean)
  canViewPayrollTab: boolean;
}

export function mapUserDtoToCoreUserPermissions(ability: CoreUserDTOAbility, u: CoreUserDTO): CoreUserPermissions {
  const permittedFields = permittedFieldsOf(ability, 'read', subject('CoreUserDTO', u), {
    fieldsFrom: (r) => r.fields || Object.keys(u.permissions),
  });

  const res = {
    approver: u.permissions.approver,
    canCancelAccount: u.permissions.canCancelAccount,
    canEditGlobalPolicies: u.permissions.canEditGlobalPolicies,
    canRetractSignedPolicies: u.permissions.canRetractSignedPolicies,
    canViewPayrollTab: u.permissions.canViewPayrollTab,
    manager: u.permissions.manager,
    id: u.id,
  };

  return { id: u.id, ...pick(res, permittedFields) };
}
