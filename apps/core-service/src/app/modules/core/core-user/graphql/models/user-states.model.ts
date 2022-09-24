//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { subject } from '@casl/ability';
import { permittedFieldsOf } from '@casl/ability/extra';
import { Directive, Field, GraphQLISODateTime, ObjectType, registerEnumType } from '@nestjs/graphql';
import { GraphQLBoolean, GraphQLID, GraphQLString } from 'graphql';
import { pick } from 'lodash';
import type { CoreUserDTOAbility } from '../../acl/core-user.acl';
import type { CoreUserDTO } from '../../dto';

export enum CoreUserViewedOnboardingInstructions {
  FirstTime = 'firstTime',
  LastTime = 'lastTime',
}
registerEnumType(CoreUserViewedOnboardingInstructions, {
  name: 'CoreUserViewedOnboardingInstructions',
});

@ObjectType()
@Directive('@key(fields: "id")')
export class CoreUserStates {
  @Field(() => GraphQLID)
  id: string;

  @Field(() => GraphQLBoolean)
  emailNotification: boolean;

  @Field(() => GraphQLBoolean)
  onboardRequest: boolean;

  @Field(() => GraphQLBoolean)
  onboarded: boolean;

  @Field(() => GraphQLBoolean)
  terminationRequest: boolean;

  @Field(() => GraphQLBoolean)
  terminated: boolean;

  @Field(() => GraphQLBoolean)
  selfSignupRegistered: boolean;

  @Field(() => GraphQLBoolean)
  selfSignupActivated: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  resignationLastDate?: Date;

  @Field(() => GraphQLString, { nullable: true })
  resignationStatus?: string;

  @Field(() => CoreUserViewedOnboardingInstructions, { nullable: true })
  viewedOnboardingInstructions?: CoreUserViewedOnboardingInstructions;

  @Field(() => GraphQLBoolean)
  viewedInsuranceIntroduction: boolean;

  @Field(() => GraphQLBoolean)
  interestedInPersonalInsurance: boolean;

  @Field(() => GraphQLBoolean)
  viewedPersonalInsurance: boolean;

  @Field(() => GraphQLBoolean)
  viewedCovid: boolean;

  @Field(() => GraphQLBoolean)
  viewedTaskCenter: boolean;

  @Field(() => GraphQLBoolean)
  viewedVideoTourBusinessHealth: boolean;

  @Field(() => GraphQLBoolean)
  viewedVideoTourCabinet: boolean;

  @Field(() => GraphQLBoolean)
  viewedVideoTourPolicy: boolean;

  @Field(() => GraphQLBoolean)
  viewedVideoTourReportCards: boolean;

  @Field(() => GraphQLBoolean)
  viewedVideoTourStaffFolder: boolean;
}

export function mapUserDtoToCoreUserStates(ability: CoreUserDTOAbility, user: CoreUserDTO): CoreUserStates {
  const permittedFields = permittedFieldsOf(ability, 'read', subject('CoreUserDTO', user), {
    fieldsFrom: (r) => r.fields || Object.keys(user.states),
  });

  const res = {
    id: user.id,
    emailNotification: user.states.emailNotification,
    onboardRequest: user.states.onboardRequest,
    onboarded: user.states.onboarded,
    terminationRequest: user.states.terminationRequest,
    terminated: user.states.terminated,
    selfSignupRegistered: user.states.selfSignupRegistered,
    selfSignupActivated: user.states.selfSignupActivated,
    resignationLastDate: user.states.resignationLastDate,
    resignationStatus: user.states.resignationStatus,
    interestedInPersonalInsurance: user.states.interestedInPersonalInsurance,
    viewedPersonalInsurance: user.states.viewedPersonalInsurance,
    viewedCovid: user.states.viewedCovid,
    viewedTaskCenter: user.states.viewedTaskCenter,
    viewedVideoTourBusinessHealth: user.states.viewedVideoTourBusinessHealth,
    viewedVideoTourCabinet: user.states.viewedVideoTourCabinet,
    viewedVideoTourPolicy: user.states.viewedVideoTourPolicy,
    viewedVideoTourReportCards: user.states.viewedVideoTourReportCards,
    viewedVideoTourStaffFolder: user.states.viewedVideoTourStaffFolder,
    viewedInsuranceIntroduction: user.states.viewedInsuranceIntroduction,
  };

  return { id: user.id, ...pick(res, permittedFields) };
}
