//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Directive, Field, GraphQLISODateTime, InputType, ObjectType } from '@nestjs/graphql';
import { GraphQLID, GraphQLString } from 'graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class CompanyRole {
  @Field(() => GraphQLID, { description: 'Bambee Core Company Role id' })
  id: string;

  @Field(() => GraphQLString, { description: 'Bambee Core Company Role title' })
  title: string;

  @Field(() => GraphQLID, { description: 'Bambee Core Company Id' })
  companyId: string;

  @Field(() => GraphQLISODateTime, { nullable: true, description: 'Date of role deletion' })
  deletedAt?: Date;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}

@InputType()
export class CreateRoleForCompanyInput {
  @Field(() => GraphQLID, { description: 'Bambee Core Company id' })
  companyId: string;

  @Field(() => GraphQLString, { description: 'Bambee Core Company Role title' })
  title: string;
}

@InputType()
export class UpdateRoleForCompanyInput {
  @Field(() => GraphQLID, { description: 'Bambee Company role id' })
  id: string;

  @Field(() => GraphQLString, { description: 'Bambee Core Company Role title' })
  title: string;
}
@InputType()
export class CreateMultipleRolesForCompanyInput {
  @Field(() => GraphQLID, { description: 'Bambee Core Company id' })
  companyId: string;

  @Field(() => [GraphQLString], { description: 'Bambee Core Company Role title' })
  titles: string[];
}

@InputType()
export class UpdateMultipleRolesForCompanyInput {
  @Field(() => GraphQLID, { description: 'Bambee Company id' })
  companyId: string;

  @Field(() => [UpdateRoleForCompanyInput], { description: 'Company Roles' })
  roles: UpdateRoleForCompanyInput[];
}

@InputType()
export class DeleteCompanyRolesInput {
  @Field(() => GraphQLID, { description: 'Bambee Core Company id' })
  companyId: string;

  @Field(() => [GraphQLString], { description: 'Bambee Core Company Role title' })
  roleIds: string[];
}
