//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { GraphQLID, GraphQLString } from 'graphql';
import { CoreUser } from '../../../core-user/graphql/models/user.model';

export enum CoreUserGroupType {
  Custom,
  Employees, // all W2 employees
  Contractors, // all W2 contractors
  Managers, // all user.permission.manager === true
  Admin, // all user.role === 'user'
  ManagersWithReports,
}
registerEnumType(CoreUserGroupType, { name: 'CoreUserGroupType' });

@ObjectType()
export class CoreUserGroup {
  @Field(() => GraphQLID)
  id: string;

  @Field(() => GraphQLID, { nullable: true })
  ownerId?: string;

  @Field(() => GraphQLString)
  name: string;

  @Field(() => CoreUserGroupType)
  type: CoreUserGroupType;

  @Field(() => [CoreUser])
  members: Array<Pick<CoreUser, 'id'>>;
}
