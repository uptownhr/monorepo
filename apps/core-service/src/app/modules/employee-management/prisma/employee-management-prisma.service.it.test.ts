//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { ConfigService } from '@nestjs/config';
import { employeeManagementConfigurationFactory } from '../config/configuration';
import { EmployeeManagementPrismaService } from './employee-management-prisma.service';

describe('employee-management-prisma.service', () => {
  const configuration = employeeManagementConfigurationFactory();

  const configService = new ConfigService({
    'employee-management': configuration,
  });

  const employeeManagementPrisma = new EmployeeManagementPrismaService(configService);

  it('can establish a connection to the db', async () => {
    await expect(employeeManagementPrisma.companyPerson.findMany()).resolves.toBeTruthy();
  });
});
