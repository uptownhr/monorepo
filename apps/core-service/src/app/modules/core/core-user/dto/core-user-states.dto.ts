//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

export interface CoreUserStatesDTO {
  readonly emailNotification: boolean;
  readonly onboardRequest: boolean;
  readonly onboarded: boolean;
  readonly terminationRequest: boolean;
  readonly terminated: boolean;
  readonly selfSignupRegistered: boolean;
  readonly selfSignupActivated: boolean;
  readonly resignationLastDate?: Date;
  readonly resignationStatus?: string;
  readonly viewedOnboardingInstructions?: 'firstTime' | 'lastTime';
  readonly viewedInsuranceIntroduction: boolean;
  readonly interestedInPersonalInsurance: boolean;
  readonly viewedPersonalInsurance: boolean;
  readonly viewedCovid: boolean;
  readonly viewedTaskCenter: boolean;
  readonly viewedVideoTourBusinessHealth: boolean;
  readonly viewedVideoTourCabinet: boolean;
  readonly viewedVideoTourPolicy: boolean;
  readonly viewedVideoTourReportCards: boolean;
  readonly viewedVideoTourStaffFolder: boolean;
}
