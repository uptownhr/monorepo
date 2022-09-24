//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { UserDocument } from '../../core-user/schemas/user.schema';
import { CompanyV1AddressResponseBody, CompanyV1EmployeeBody, CompanyV1EmploymentType } from '../models';

export function mapEmployeeToBody(
  employee: UserDocument,
  emailByAuthId: Record<string, string>,
): CompanyV1EmployeeBody {
  const email = emailByAuthId[employee._auth.toString()];

  const address: CompanyV1AddressResponseBody = new CompanyV1AddressResponseBody({
    address1: employee.profile.address,
    address2: employee.profile.address2,
    city: employee.profile.city,
    state: employee.profile.state,
    zipCode: employee.profile.zip,
  });

  return new CompanyV1EmployeeBody({
    address,
    userId: employee._id.toString(),
    firstName: employee.profile.first_name,
    lastName: employee.profile.last_name,
    email: email,
    title: employee.profile.role,
    phoneNumber: employee.profile.phone,
    dob: employee.profile.dob,
    payType: employee.profile.type,
    payAmount: employee.profile.pay_rate,
    employeeType: employee.profile.employee_type,
    employmentType: employee.profile.contractor ? CompanyV1EmploymentType.Contractor : CompanyV1EmploymentType.W2,
    startDate: employee.profile.start_date,
    active: employee.active,
    contractorType: employee.profile.contractor_type,
    contractorBusinessName: employee.profile.contractor_business_name,
    role: employee.role,
  });
}
