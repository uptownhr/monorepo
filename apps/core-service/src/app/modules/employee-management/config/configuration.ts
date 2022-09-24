//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { registerAs } from '@nestjs/config';

export const employeeManagementConfigurationFactory = () => ({
  db: {
    url: process.env.EMPLOYEE_MANAGEMENT_DATABASE_URL,
  },
});

export default registerAs('employee-management', employeeManagementConfigurationFactory);
