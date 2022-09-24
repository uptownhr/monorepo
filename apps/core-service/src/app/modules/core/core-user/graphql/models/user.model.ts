//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Directive, Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { GraphQLBoolean, GraphQLID, GraphQLString } from 'graphql';
import type { DeepPartial } from '../../../../../types/DeepPartial';
import { CoreCompany, mapCoreCompanyDtoToModel } from '../../../core-company/graphql/models/company.model';
import type { CoreUserDTO } from '../../dto';

@ObjectType()
@Directive('@key(fields: "id")')
export class CoreUser {
  @Field(() => GraphQLID)
  id: string;

  @Field(() => GraphQLBoolean)
  active: boolean;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => [GraphQLString])
  roles: string[];

  @Field(() => GraphQLString)
  role: string;

  // @Field(() => CoreUserProfile)
  // profile: CoreUserProfile;

  // @Field(() => CoreUserEmployment)
  // employment: CoreUserEmployment;

  @Field(() => GraphQLString)
  timeZone: string;

  // test that the resultant SDL works because of the @FieldResolver in user-employment.resolver.ts
  /*@Field(() => [CoreUser])
  directReports: CoreUser[];*/

  // @Field(() => CoreUserPermissions)
  // permissions: CoreUserPermissions;

  // @Field(() => CoreUserStates)
  // states: CoreUserStates;

  // @Field(() => CoreUserSettings)
  // settings: CoreUserSettings;

  @Field(() => CoreCompany, { nullable: true })
  company: CoreCompany;
}

export function mapUserDtoToCoreUser(u: CoreUserDTO): DeepPartial<CoreUser> {
  const res: DeepPartial<CoreUser> = {
    id: u.id,
    active: u.active,
    createdAt: u.createdAt,
    role: u.primaryRole,
    roles: u.roles,
    timeZone: u.timeZone,
  };

  if (u._company) {
    res.company = mapCoreCompanyDtoToModel(u._company);
  }

  return res;
}
