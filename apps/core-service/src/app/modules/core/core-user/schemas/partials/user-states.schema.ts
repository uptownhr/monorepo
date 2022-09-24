//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

/* eslint-disable @typescript-eslint/naming-convention */
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  _id: false,
  id: false,
})
class UserStatesSelfSignup {
  @Prop({ default: true })
  registered: boolean;
  @Prop({ default: true })
  activated: boolean;
}
@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  _id: false,
  id: false,
})
class UserStatesResignation {
  @Prop({ default: '' })
  last_date: Date;

  @Prop({ default: '' })
  status: string;
}

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  _id: false,
  id: false,
})
export class UserStates {
  @Prop({ default: true })
  email_notification: boolean;

  @Prop({ default: false })
  onboard_request: boolean;

  @Prop({ default: false })
  onboarded: boolean;

  @Prop({ default: false })
  termination_request: boolean;

  @Prop({ default: false })
  terminated: boolean;

  @Prop({ type: UserStatesSelfSignup, default: {} })
  self_signup: UserStatesSelfSignup;

  @Prop({ type: UserStatesResignation, default: {} })
  _resignation: UserStatesResignation;

  @Prop({ enum: ['', 'firstTime', 'lastTime'], default: '' })
  viewedOnboardingInstructions: '' | 'firstTime' | 'lastTime';

  @Prop({ default: false })
  viewedInsuranceIntroduction: boolean;

  @Prop({ default: false })
  viewedInsurance: boolean;

  @Prop({ default: false })
  interestedInPersonalInsurance: boolean;

  @Prop({ default: false })
  viewedPersonalInsurance: boolean;

  @Prop({ default: false })
  viewedCovid: boolean;

  @Prop({ default: false })
  viewedTaskCenter: boolean;

  @Prop({ default: false })
  viewedVideoTourBusinessHealth: boolean;

  @Prop({ default: false })
  viewedVideoTourCabinet: boolean;

  @Prop({ default: false })
  viewedVideoTourPolicy: boolean;

  @Prop({ default: false })
  viewedVideoTourReportCards: boolean;

  @Prop({ default: false })
  viewedVideoTourStaffFolder: boolean;
}
