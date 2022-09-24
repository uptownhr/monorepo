//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { withApp } from '../../../../../__tests__/test-helper';
import {
  internalTokenForUser,
  TestUserData,
  withCustomer,
  withExemptEmployee,
  withHrm,
  withNonExemptEmployee,
} from '../../../../../__tests__/with-user';

import { faker } from '@faker-js/faker';

describe('UserEmployment Resolver', () => {
  let customer: TestUserData;
  let hrm: TestUserData;
  let manager: TestUserData;
  let employeeWithClassification: TestUserData;
  let other: TestUserData;
  let companyId: string;

  beforeEach(async function () {
    customer = await withCustomer({ profile: { role: 'Owner' } });
    other = await withCustomer();
    hrm = await withHrm();
    manager = await withExemptEmployee(customer, customer, {
      profile: { role: 'Manager', first_name: 'test', last_name: 'manager' },
    });
    employeeWithClassification = await withNonExemptEmployee(customer, manager, {
      profile: { role: 'Employee', classification: 'exempt', type: 'salary', employee_type: 'fulltime' },
    });
    companyId = customer.company._id.toString();
  });

  describe('Manager', () => {
    it('Can querry and update their employment', async () => {
      //getMyCoreUser
      const { client } = await withApp();
      const response = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(manager)}`)
        .send({
          query: `
            query GetCoreUser($id: ID!) {
              getCoreUserById(id: $id) {
                id
                employment {
                  payType
                  employeeType
                  isContractor
                  title
                  classification
                  manager {
                    id
                    profile {
                      firstName
                      lastName
                    }
                  }
                }
              }
            }
          `,
          variables: {
            id: employeeWithClassification.user._id.toString(),
          },
        });
      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.getCoreUserById).toEqual(
        expect.objectContaining({
          id: employeeWithClassification.user._id.toString(),
          employment: {
            payType: 'Salary',
            employeeType: 'FullTime',
            isContractor: false,
            title: employeeWithClassification.user.profile.role,
            classification: 'Exempt',
            manager: {
              id: manager.user._id.toString(),
              profile: {
                firstName: manager.user.profile.first_name,
                lastName: manager.user.profile.last_name,
              },
            },
          },
        }),
      );
      const newTitle = faker.company.bs();
      const updateResponse = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(hrm)}`)
        .send({
          query: `
          mutation UpdateUserEmployment($userId: ID!, $input: CoreUserEmploymentInput!) {
            updateCoreUserEmployment(id: $userId, input: $input) {
              payType
              employeeType
              isContractor
              title
              classification
              payDay
              payFrequency
              stateWorksIn
            }
          }
        `,
          variables: {
            userId: employeeWithClassification.user._id.toString(),
            input: {
              classification: 'NonExempt',
              isContractor: true,
              payType: 'Hourly',
              employeeType: 'PartTime',
              title: newTitle,
              payDay: 'wednesday',
              payFrequency: 'biweekly',
              stateWorksIn: 'Alaska',
            },
          },
        });

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.errors).toBeUndefined();
      expect(updateResponse.body.data.updateCoreUserEmployment).toEqual(
        expect.objectContaining({
          classification: 'NonExempt',
          isContractor: true,
          payType: 'Hourly',
          employeeType: 'PartTime',
          title: newTitle,
          payDay: 'wednesday',
          payFrequency: 'biweekly',
          stateWorksIn: 'AK',
        }),
      );
    });
  });

  describe('Employee', () => {
    it('cannot self-manage their employment info', async () => {
      const response = await employeeWithClassification.client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${employeeWithClassification.accessToken}`)
        .send({
          query: `
            query GetCoreUser($id: ID!) {
              getCoreUserById(id: $id) {
                id
                employment {
                  payType
                  employeeType
                  isContractor
                  title
                  classification
                  payDay
                  payFrequency
                }
              }
            }
          `,
          variables: {
            id: employeeWithClassification.user._id.toString(),
          },
        });

      /**
       * This update should not process at all
       */
      const newTitle = faker.company.bs();
      const updateResponse = await employeeWithClassification.client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${employeeWithClassification.accessToken}`)
        .send({
          query: `
          mutation UpdateUserEmployment($userId: ID!, $input: CoreUserEmploymentInput!) {
            updateCoreUserEmployment(id: $userId, input: $input) {
              payType
              employeeType
              isContractor
              title
              classification
              payDay
              payFrequency
            }
          }
        `,
          variables: {
            userId: employeeWithClassification.user._id.toString(),
            input: {
              classification: 'NonExempt',
              isContractor: true,
              payType: 'Hourly',
              employeeType: 'PartTime',
              title: newTitle,
              payDay: 'Wednesday',
              payFrequency: 'Bi-Weekly',
            },
          },
        });

      expect(updateResponse.body.data.updateCoreUserEmployment).toEqual(
        expect.objectContaining(response.body.data.getCoreUserById.employment),
      );
    });
  });
});
