//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { faker } from '@faker-js/faker';
import { getModelToken } from '@nestjs/mongoose';
import { pojo, withApp } from '../../../../__tests__/test-helper';
import {
  internalTokenForUser,
  systemToken,
  TestUserData,
  withCustomer,
  withEmployee,
  withHrm,
} from '../../../../__tests__/with-user';
import { User } from '../../core-user/schemas/user.schema';
import { mapEmployeeToBody } from '../lib/map-employee-to-response';

describe('CompanyControllerV1 GetProfile', () => {
  let customer: TestUserData;
  let hrm: TestUserData;
  let manager: TestUserData;
  let employee: TestUserData;
  let other: TestUserData;

  beforeAll(async function () {
    customer = await withCustomer();
    other = await withCustomer();
    hrm = await withHrm();
    manager = await withEmployee(customer);
    employee = await withEmployee(customer, manager);
  });

  describe('HRM', () => {
    it('can see the company', async () => {
      const { client } = await withApp();
      const response = await client
        .get(`/companies/v1/company/${customer.company._id.toString()}/profile`)
        .set('Authorization', `Bearer ${internalTokenForUser(hrm)}`);
      const expected = {
        name: customer.company.name,
        email: customer.auth.email.toLowerCase(),
        id: customer.company._id.toString(),
        ownerId: customer.user._id.toString(),
        phone: customer.company.profile.phone,
        convertedAt: customer.company.converted_at.toISOString(),
        dba: customer.company.profile.dba,
        industry: customer.company.profile.industry,
        address: {
          address1: customer.company.profile.address,
          address2: customer.company.profile.address2,
          city: customer.company.profile.city,
          state: customer.company.profile.state,
          zipCode: customer.company.profile.zip,
        },
        payFrequency: customer.company.profile.pay_frequency,
      };
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expected);
    });
  });
  describe('Owner', () => {
    it('can see the company', async () => {
      const { client } = await withApp();
      const response = await client
        .get(`/companies/v1/company/${customer.company._id.toString()}/profile`)
        .set('Authorization', `Bearer ${internalTokenForUser(customer)}`);
      expect(response.status).toBe(200);
    });
  });

  describe('Employee', () => {
    it('can see the company', async () => {
      const { client } = await withApp();
      const response = await client
        .get(`/companies/v1/company/${customer.company._id.toString()}/profile`)
        .set('Authorization', `Bearer ${internalTokenForUser(employee)}`);
      expect(response.status).toBe(200);
    });
  });

  describe('Other', () => {
    it('cannot see the company', async () => {
      const { client } = await withApp();
      const response = await client
        .get(`/companies/v1/company/${customer.company._id.toString()}/profile`)
        .set('Authorization', `Bearer ${internalTokenForUser(other)}`);
      expect(response.status).toBe(403);
    });
  });
});

describe('CompanyControllerV1 Get Single Employee', () => {
  let customer: TestUserData;
  let hrm: TestUserData;
  let manager: TestUserData;
  let employee1: TestUserData;
  // let employee2: TestUserData;
  let contractor: TestUserData;

  // these users shouldn't be able to access the above
  let other: TestUserData;
  let otherEmployee: TestUserData;

  /**
   * This company has a total of 5 employees
   * - One Owner
   * - One Manager
   * - Two W2 employees
   * - One 1099 contractor
   */
  beforeAll(async function () {
    customer = await withCustomer();
    hrm = await withHrm();
    manager = await withEmployee(customer, customer, { permissions: { manager: true } });
    employee1 = await withEmployee(customer, manager);
    /* employee2 = */ await withEmployee(customer, manager);
    contractor = await withEmployee(customer, customer, {
      profile: { contractor: true, contractor_type: 'business', contractor_business_name: 'Legit.co' },
    });

    other = await withCustomer();
    otherEmployee = await withEmployee(other);
  });

  describe('System account', () => {
    it('can see an employee at the company', async () => {
      const { client } = await withApp();
      const response = await client
        .get(
          `/companies/v1/company/${customer.company._id.toString()}/employees/employee/${employee1.user._id.toString()}`,
        )
        .set('Authorization', `Bearer ${systemToken()}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(
        pojo(mapEmployeeToBody(employee1.user, { [employee1.auth._id.toString()]: employee1.auth.email })),
      );
    });

    it('can change data and ensure it isnt cached between requests', async () => {
      const { app, client } = await withApp();
      const response = await client
        .get(
          `/companies/v1/company/${customer.company._id.toString()}/employees/employee/${employee1.user._id.toString()}`,
        )
        .set('Authorization', `Bearer ${systemToken()}`);
      expect(response.status).toBe(200);
      //expect(response.body).toEqual(pojo(mapEmployeeToBody(employee1.user)));

      const userModel = await app.resolve(getModelToken(User.name));
      const userRecord = await userModel.findById(employee1.user._id).populate('_auth');
      userRecord.profile.pay_rate = faker.finance.amount().substring(1);
      userRecord.profile.first_name = faker.name.firstName();
      userRecord.profile.last_name = faker.name.lastName();
      await userRecord.save();

      const response2 = await client
        .get(
          `/companies/v1/company/${customer.company._id.toString()}/employees/employee/${employee1.user._id.toString()}`,
        )
        .set('Authorization', `Bearer ${systemToken()}`);
      expect(response2.status).toBe(200);
      // expect(response2.body).toEqual(pojo(mapEmployeeToBody(userRecord)));
      expect(response2.body).not.toStrictEqual(response.body);
    });
  });
});

describe('CompanyControllerV1 Get Employees', () => {
  let customer: TestUserData;
  let hrm: TestUserData;
  let manager: TestUserData;
  let employee1: TestUserData;
  // let employee2: TestUserData;
  let contractor: TestUserData;

  // these users shouldn't be able to access the above
  let other: TestUserData;
  let otherEmployee: TestUserData;

  /**
   * This company has a total of 5 employees
   * - One Owner
   * - One Manager
   * - Two W2 employees
   * - One 1099 contractor
   */
  beforeAll(async function () {
    customer = await withCustomer();
    hrm = await withHrm();
    manager = await withEmployee(customer, customer, { permissions: { manager: true } });
    employee1 = await withEmployee(customer, manager);
    /* employee2 = */ await withEmployee(customer, manager);
    contractor = await withEmployee(customer, customer, {
      profile: { contractor: true, contractor_type: 'business', contractor_business_name: 'Legit.co' },
    });

    other = await withCustomer();
    otherEmployee = await withEmployee(other);
  });

  describe('HRM', () => {
    it('can see all of the employees at the company', async () => {
      const { client } = await withApp();
      const response = await client
        .get(`/companies/v1/company/${customer.company._id.toString()}/employees`)
        .set('Authorization', `Bearer ${internalTokenForUser(hrm)}`);
      expect(response.status).toBe(200);
      expect(response.body.employees).toHaveLength(4);
    });
  });
  describe('Owner', () => {
    it('can see all of the employees at the company', async () => {
      const { client } = await withApp();
      const response = await client
        .get(`/companies/v1/company/${customer.company._id.toString()}/employees`)
        .set('Authorization', `Bearer ${internalTokenForUser(customer)}`);
      expect(response.status).toBe(200);
      expect(response.body.employees).toHaveLength(4);
    });
  });

  describe('Manager', () => {
    it('can see everybody at their company', async () => {
      const { client } = await withApp();
      const response = await client
        .get(`/companies/v1/company/${customer.company._id.toString()}/employees`)
        .set('Authorization', `Bearer ${internalTokenForUser(manager)}`);
      expect(response.status).toBe(200);
      expect(response.body.employees).toHaveLength(4);
    });
  });

  describe('Employee', () => {
    it('can see everybody at their company', async () => {
      const { client } = await withApp();
      const response = await client
        .get(`/companies/v1/company/${customer.company._id.toString()}/employees`)
        .set('Authorization', `Bearer ${internalTokenForUser(employee1)}`);
      expect(response.status).toBe(200);
      expect(response.body.employees).toHaveLength(4);
    });
  });

  describe('Other', () => {
    it('cannot see the company employees', async () => {
      const { client } = await withApp();
      const response = await client
        .get(`/companies/v1/company/${customer.company._id.toString()}/employees`)
        .set('Authorization', `Bearer ${internalTokenForUser(other)}`);
      expect(response.status).toBe(403);
    });
  });

  describe('Other Employee', () => {
    it('cannot see the company employees', async () => {
      const { client } = await withApp();
      const response = await client
        .get(`/companies/v1/company/${customer.company._id.toString()}/employees`)
        .set('Authorization', `Bearer ${internalTokenForUser(otherEmployee)}`);
      expect(response.status).toBe(403);
    });
  });

  describe('Contractor', () => {
    it('can still see employees', async () => {
      const { client } = await withApp();
      const response = await client
        .get(`/companies/v1/company/${customer.company._id.toString()}/employees`)
        .set('Authorization', `Bearer ${internalTokenForUser(contractor)}`);
      expect(response.status).toBe(200);
      expect(response.body.employees).toHaveLength(4);
    });
  });

  describe('With query params', () => {
    it('Should get only contractors', async () => {
      const { client } = await withApp();
      const response = await client
        .get(`/companies/v1/company/${customer.company._id.toString()}/employees?employmentType=1099`)
        .set('Authorization', `Bearer ${internalTokenForUser(customer)}`);
      expect(response.status).toBe(200);
      expect(response.body.employees).toHaveLength(1);
    });

    it('Should get only w2 employees', async () => {
      const { client } = await withApp();
      const response = await client
        .get(`/companies/v1/company/${customer.company._id.toString()}/employees?employmentType=w2`)
        .set('Authorization', `Bearer ${internalTokenForUser(customer)}`);
      expect(response.status).toBe(200);
      expect(response.body.employees).toHaveLength(4);
    });

    it('Should get only all employees', async () => {
      const { client } = await withApp();
      const response = await client
        .get(`/companies/v1/company/${customer.company._id.toString()}/employees?employmentType=all`)
        .set('Authorization', `Bearer ${internalTokenForUser(customer)}`);
      expect(response.status).toBe(200);
      expect(response.body.employees).toHaveLength(5);
    });
  });
});
