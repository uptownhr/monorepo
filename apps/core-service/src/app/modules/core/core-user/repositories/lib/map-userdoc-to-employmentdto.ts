//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { nullIfEmptyString } from '../../../../../lib/null-if-empty-string';
import type { CoreUserEmploymentDTO } from '../../dto';
import { UserProfileEmployeeType, UserProfileType } from '../../schemas/partials/user-profile.schema';
import type { UserDocument } from '../../schemas/user.schema';

export function mapToUserEmploymentDTO(doc: UserDocument): CoreUserEmploymentDTO {
  return {
    payType: getPayType(doc),
    employeeType: getEmployeeType(doc),
    classification: nullIfEmptyString(doc.profile.classification),
    payRate: doc.profile.pay_rate,
    payDay: doc.profile.pay_day,
    payFrequency: doc.profile.pay_frequency,
    hoursPerWeek: doc.profile.hours_per_week,
    startDate: doc.profile.start_date,
    stateWorksIn: doc.profile.state_work_in,
    isContractor: doc.profile.contractor,
    contractorBusinessName: doc.profile.contractor_business_name,
    contractorType: nullIfEmptyString(doc.profile.contractor_type),
    title: doc.profile.role,
    supervisor: doc.profile.supervisor,
    managerId: doc._manager?.toString(),
  };
}

function getPayType(doc: UserDocument): CoreUserEmploymentDTO['payType'] {
  switch (doc.profile.type) {
    case UserProfileType.SALARY:
      return 'salary';
    case UserProfileType.HOURLY:
      return 'hourly';
    case UserProfileType.CONTRACTOR:
      return 'contractor';
  }
}

function getEmployeeType(doc: UserDocument): CoreUserEmploymentDTO['employeeType'] {
  switch (doc.profile.employee_type) {
    case UserProfileEmployeeType.FULLTIME:
      return 'fulltime';
    case UserProfileEmployeeType.PARTTIME:
      return 'parttime';
    case UserProfileEmployeeType.CONTRACTOR:
      return 'contractor';
  }
}
