//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { IsStateOrTerritory, TransformToStateAbbreviation } from '@bambeehr/input-filters';
import { subject } from '@casl/ability';
import { permittedFieldsOf } from '@casl/ability/extra';
import { Field, GraphQLISODateTime, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { GraphQLBoolean, GraphQLID, GraphQLString } from 'graphql';
import { pick } from 'lodash';
import type { CoreUserDTOAbility } from '../../acl/core-user.acl';
import type { CoreUserEmploymentDTO } from '../../dto';
import type { CoreUserDTO } from '../../dto/core-user.dto';
import { CoreUser } from './user.model';

export enum CoreEmployeePayType {
  Hourly = 'hourly',
  Salary = 'salary',
  Contractor = 'contractor',
}
registerEnumType(CoreEmployeePayType, {
  name: 'CoreEmployeePaytype',
});
export type CoreEmployeePayTypeValues = `${CoreEmployeePayType}`;
export function coreEmployeePayTypeToDTO(t: CoreEmployeePayType): CoreEmployeePayTypeValues {
  switch (t) {
    case CoreEmployeePayType.Hourly:
      return 'hourly';
    case CoreEmployeePayType.Salary:
      return 'salary';
    case CoreEmployeePayType.Contractor:
      return 'contractor';
  }
}

export enum CoreEmployeeType {
  PartTime = 'parttime',
  FullTime = 'fulltime',
  Contractor = 'contractor',
}
export type CoreEmployeeTypeValues = `${CoreEmployeeType}`;
export function coreEmployeeTypeToDTO(t: CoreEmployeeType): CoreEmployeeTypeValues {
  switch (t) {
    case CoreEmployeeType.PartTime:
      return 'parttime';
    case CoreEmployeeType.FullTime:
      return 'fulltime';
    case CoreEmployeeType.Contractor:
      return 'contractor';
  }
}

registerEnumType(CoreEmployeeType, {
  name: 'CoreEmployeeType',
});

export enum CoreContractorType {
  Individual = 'individual',
  Business = 'business',
}
registerEnumType(CoreContractorType, {
  name: 'CoreContractorType',
});
export type CoreContractorTypeValues = `${CoreContractorType}`;
export function coreContractorTypeToDTO(t: CoreContractorType): CoreContractorTypeValues {
  switch (t) {
    case CoreContractorType.Individual:
      return 'individual';
    case CoreContractorType.Business:
      return 'business';
  }
}

export enum CoreEmployeeClassification {
  Exempt = 'exempt',
  NonExempt = 'non-exempt',
}
registerEnumType(CoreEmployeeClassification, {
  name: 'CoreEmployeeClassification',
});
export type CoreEmployeeClassificationValues = `${CoreEmployeeClassification}`;
export function coreEmployeeClassificationToDTO(t: CoreEmployeeClassification): CoreEmployeeClassificationValues {
  switch (t) {
    case CoreEmployeeClassification.Exempt:
      return 'exempt';
    case CoreEmployeeClassification.NonExempt:
      return 'non-exempt';
  }
}
@ObjectType()
export class CoreUserEmployment {
  @Field(() => GraphQLID)
  id: string;

  @Field(() => CoreEmployeePayType, { nullable: true })
  payType?: CoreEmployeePayTypeValues;

  @Field(() => CoreEmployeeType, { nullable: true })
  employeeType?: CoreEmployeeTypeValues;

  @Field(() => GraphQLString, { nullable: true })
  payRate?: string;

  @Field(() => GraphQLString, { nullable: true })
  payDay?: string;

  @Field(() => GraphQLString, { nullable: true })
  payFrequency?: string;

  @Field(() => GraphQLString, { nullable: true })
  hoursPerWeek?: string;

  @Field(() => GraphQLString, { nullable: true })
  startDate?: string;

  @Field(() => GraphQLString, { nullable: true })
  stateWorksIn?: string;

  @Field(() => GraphQLBoolean, { nullable: true })
  isContractor?: boolean;

  @Field(() => GraphQLString, { nullable: true })
  contractorBusinessName?: string;

  @Field(() => CoreContractorType, { nullable: true })
  contractorType?: CoreContractorType;

  @Field(() => GraphQLString, { nullable: true })
  title?: string;

  // todo: given we are hard coding manager, this should not be CoreUser
  @Field(() => CoreUser, { nullable: true })
  manager?: CoreUser;

  /*  @Field(() => [CoreUser])
  directReports: CoreUser[];*/

  @Field()
  supervisor: string;

  @Field(() => CoreEmployeeClassification, { nullable: true })
  classification?: CoreEmployeeClassification;
}

@InputType()
export class CoreUserEmploymentInput {
  @Field(() => CoreEmployeeClassification, { nullable: true })
  classification?: CoreEmployeeClassification;

  @Field(() => GraphQLBoolean, { nullable: true })
  isContractor?: boolean;

  @Field(() => CoreEmployeePayType, { nullable: true })
  payType?: CoreEmployeePayType;

  @Field(() => CoreEmployeeType, { nullable: true })
  employeeType?: CoreEmployeeType;

  @Field(() => GraphQLString, { nullable: true })
  payRate?: string;

  @Field(() => GraphQLString, { nullable: true })
  payDay?: string;

  @Field(() => GraphQLString, { nullable: true })
  payFrequency?: string;

  @Field(() => GraphQLString, { nullable: true })
  hoursPerWeek?: string;

  @Field(() => GraphQLString, { nullable: true })
  title?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  startDate?: Date;

  @Field(() => CoreContractorType, { nullable: true })
  contractorType?: CoreContractorType;

  @Field(() => GraphQLString, { nullable: true })
  contractorBusinessName?: string;

  @Field(() => GraphQLString, { nullable: true })
  @IsOptional()
  @IsStateOrTerritory({
    message(validationArguments) {
      return `${validationArguments.value} is not a valid state or territory`;
    },
  })
  @TransformToStateAbbreviation()
  stateWorksIn?: string;
}

export function mapUserDtoToCoreUserEmployment(
  ability: CoreUserDTOAbility,
  u: CoreUserDTO,
): Omit<CoreUserEmployment, 'directReports'> {
  const permittedFields = permittedFieldsOf(ability, 'read', subject('CoreUserDTO', u), {
    fieldsFrom: (r) => r.fields || Object.keys(u),
  });

  const res = pick(u, permittedFields);
  return {
    id: u.id,
    payType: res.employment.payType,
    employeeType: res.employment.employeeType,
    payRate: res.employment.payRate,
    payDay: res.employment.payDay,
    payFrequency: res.employment.payFrequency,
    hoursPerWeek: res.employment.hoursPerWeek,
    startDate: res.employment.startDate,
    stateWorksIn: res.employment.stateWorksIn,
    isContractor: res.employment.isContractor,
    contractorBusinessName: res.employment.contractorBusinessName,
    contractorType: res.employment.contractorType,
    title: res.employment.title,
    supervisor: res.employment.supervisor,
    classification: res.employment.classification,
  };
}

export function mapEmploymentInputToDto(input: CoreUserEmploymentInput): Partial<CoreUserEmploymentDTO> {
  return {
    isContractor: input.isContractor,
    classification: input.classification,
    contractorBusinessName: input.contractorBusinessName,
    contractorType: input.contractorType ? coreContractorTypeToDTO(input.contractorType) : undefined,
    employeeType: input.employeeType ? coreEmployeeTypeToDTO(input.employeeType) : undefined,
    hoursPerWeek: input.hoursPerWeek,
    payDay: input.payDay,
    payFrequency: input.payFrequency,
    payRate: input.payRate,
    payType: input.payType ? coreEmployeePayTypeToDTO(input.payType) : undefined,
    startDate: input.startDate?.toDateString(),
    stateWorksIn: input.stateWorksIn,
    title: input.title,
  };
}
