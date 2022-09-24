//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { Directive, Field, GraphQLISODateTime, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { GraphQLBoolean, GraphQLFloat, GraphQLID } from 'graphql';
import { CreateRoleForCompanyInput } from '../../../company-role/graphql/models/CompanyRole.model';

export enum WorkerRolePaytype {
  Hourly = 'hourly',
  Salary = 'salary',
  Contractor = 'contractor',
}

registerEnumType(WorkerRolePaytype, {
  name: 'WorkerRolePaytype',
  valuesMap: {
    Hourly: {},
    Salary: {},
    Contractor: {},
  },
});

export type WorkerRolePaytypeValues = `${WorkerRolePaytype}`;
export function workerRolePaytypeDTOToType(t: WorkerRolePaytypeValues): WorkerRolePaytype {
  switch (t) {
    case 'hourly':
      return WorkerRolePaytype.Hourly;
    case 'salary':
      return WorkerRolePaytype.Salary;
    case 'contractor':
      return WorkerRolePaytype.Contractor;
  }
}
export function workerRolePaytypeToDTO(t: WorkerRolePaytype): WorkerRolePaytypeValues {
  switch (t) {
    case WorkerRolePaytype.Hourly:
      return 'hourly';
    case WorkerRolePaytype.Salary:
      return 'salary';
    case WorkerRolePaytype.Contractor:
      return 'contractor';
  }
}
@ObjectType()
@Directive('@key(fields: "id")')
export class WorkerRole {
  @Field(() => GraphQLID, { description: 'Bambee Worker Role id' })
  id: string;

  @Field(() => GraphQLBoolean, { description: 'Determines whether or not worker role is primary' })
  isPrimary: boolean;

  @Field(() => GraphQLFloat, { description: 'Pay rate of the worker role' })
  payRate: number;

  @Field(() => WorkerRolePaytype, { description: 'Pay type of the worker role' })
  payType: WorkerRolePaytypeValues;

  @Field(() => GraphQLISODateTime, { nullable: true, description: 'Date of worker role deletion' })
  deletedAt?: Date;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLID, { description: 'Bambee User Id' })
  userId: string;

  companyRoleId: string;
}

@InputType()
export class UpdateWorkerRoleInput {
  @Field(() => GraphQLID)
  workerRoleId: string;

  @Field(() => GraphQLBoolean)
  isPrimary: boolean;

  @Field(() => WorkerRolePaytype)
  payType: WorkerRolePaytype;
}

@InputType()
export class CreateWorkerRoleInput {
  @Field(() => GraphQLID, { description: 'Bambee Core User id' })
  userId: string;

  @Field(() => GraphQLBoolean)
  isPrimary: boolean;

  @Field(() => GraphQLFloat)
  payRate: number;

  @Field(() => WorkerRolePaytype)
  payType: WorkerRolePaytype;

  @Field(() => GraphQLID, { nullable: true })
  companyRoleId?: string;

  @Field(() => CreateRoleForCompanyInput, { nullable: true })
  newCompanyRole?: CreateRoleForCompanyInput;
}

@InputType()
export class AssignWorkerRolesInput {
  @Field(() => GraphQLID)
  userId: string;

  @Field(() => [CreateWorkerRoleInput], { nullable: true })
  add?: CreateWorkerRoleInput[];

  @Field(() => [UpdateWorkerRoleInput], { nullable: true })
  update?: UpdateWorkerRoleInput[];

  @Field(() => [GraphQLID], { nullable: true })
  delete?: string[];
}
