//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { AwsUtil } from '@bambeehr/aws-i12e';
import { withApp, withAwsUtil } from '../../../../../__tests__/test-helper';
import {
  internalTokenForUser,
  TestUserData,
  withCustomer,
  withEmployee,
  withHrm,
} from '../../../../../__tests__/with-user';

describe('UserProfile Resolver', () => {
  let customer: TestUserData;
  let hrm: TestUserData;
  let manager: TestUserData;
  let employee: TestUserData;
  let employee2: TestUserData;
  let employeeWithoutAddress: TestUserData;
  let other: TestUserData;
  let companyId: string;
  let awsUtil: AwsUtil;

  beforeEach(async function () {
    awsUtil = withAwsUtil();

    customer = await withCustomer({ profile: { role: 'Owner' } });
    other = await withCustomer();
    hrm = await withHrm();
    manager = await withEmployee(customer, customer, { profile: { role: 'Manager' } });
    employee = await withEmployee(customer, manager, { profile: { role: 'Employee' } });
    employee2 = await withEmployee(customer, manager, { profile: { role: 'Employee' } });
    companyId = customer.company._id.toString();
  });

  describe('Owner', () => {
    it('can query company and employees', async () => {
      const { client } = await withApp();
      const response = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(customer)}`)
        .send({
          query: `
          query GetMyCoreUser {
            getMyCoreUser {
              id
              profile {
                firstName
                lastName
                email
              }
              company {
                id
                name
                employees {
                  id
                  profile {
                    firstName
                    lastName
                    email
                  }
                }
              }
            }
          }
        `,
        });
      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.getMyCoreUser).toMatchObject({
        id: customer.user._id.toString(),
        profile: {
          firstName: customer.user.profile.first_name,
          lastName: customer.user.profile.last_name,
          email: customer.auth.email,
        },
        company: {
          id: customer.company._id.toString(),
          name: customer.company.name,
          employees: [
            {
              id: customer.user._id.toString(),
              profile: {
                firstName: customer.user.profile.first_name,
                lastName: customer.user.profile.last_name,
                email: customer.auth.email,
              },
            },
            {
              id: manager.user._id.toString(),
              profile: {
                firstName: manager.user.profile.first_name,
                lastName: manager.user.profile.last_name,
                email: manager.auth.email,
              },
            },
            {
              id: employee.user._id.toString(),
              profile: {
                firstName: employee.user.profile.first_name,
                lastName: employee.user.profile.last_name,
                email: employee.auth.email,
              },
            },
            {
              id: employee2.user._id.toString(),
              profile: {
                firstName: employee2.user.profile.first_name,
                lastName: employee2.user.profile.last_name,
                email: employee2.auth.email,
              },
            },
          ],
        },
      });
    });
  });
});
