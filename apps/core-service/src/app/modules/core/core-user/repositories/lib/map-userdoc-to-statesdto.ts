//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CoreUserStatesDTO } from '../../dto';
import type { UserDocument } from '../../schemas/user.schema';

export function mapToUserStatesDTO(doc: UserDocument): CoreUserStatesDTO {
  const viewedOnboardingInstructions = ['firstTime', 'lastTime'].includes(doc.states.viewedOnboardingInstructions)
    ? doc.states.viewedOnboardingInstructions
    : undefined;

  return {
    emailNotification: doc.states.email_notification,
    onboardRequest: doc.states.onboard_request,
    onboarded: doc.states.onboarded,
    terminationRequest: doc.states.termination_request,
    terminated: doc.states.terminated,
    selfSignupRegistered: doc.states.self_signup.registered,
    selfSignupActivated: doc.states.self_signup.activated,
    resignationLastDate: doc.states._resignation.last_date,
    resignationStatus: doc.states._resignation.status,
    viewedOnboardingInstructions: viewedOnboardingInstructions as 'firstTime' | 'lastTime' | undefined,
    viewedInsuranceIntroduction: doc.states.viewedInsuranceIntroduction,
    interestedInPersonalInsurance: doc.states.interestedInPersonalInsurance,
    viewedPersonalInsurance: doc.states.viewedPersonalInsurance,
    viewedCovid: doc.states.viewedCovid,
    viewedTaskCenter: doc.states.viewedTaskCenter,
    viewedVideoTourBusinessHealth: doc.states.viewedVideoTourBusinessHealth,
    viewedVideoTourCabinet: doc.states.viewedVideoTourCabinet,
    viewedVideoTourPolicy: doc.states.viewedVideoTourPolicy,
    viewedVideoTourReportCards: doc.states.viewedVideoTourReportCards,
    viewedVideoTourStaffFolder: doc.states.viewedVideoTourStaffFolder,
  };
}
