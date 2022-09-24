//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { AwsUtil } from '@bambeehr/aws-i12e';
import { withApp, withAwsUtil } from '../../../../../__tests__/test-helper';
import { internalTokenForUser, TestUserData, withCustomer, withEmployee } from '../../../../../__tests__/with-user';

const FRAGMENT = `
query GetCompany($id: ID!) {
  getCoreCompany(id: $id) {
    id
    name
    groups {
      id
      type
      members {
        id
        profile {
          firstName
          lastName
        }
      }
    }
  }
}
`;

describe('CoreCompany Usergroup Resolver', () => {
  let customer: TestUserData;
  let manager: TestUserData;
  let employee: TestUserData;
  let employee2: TestUserData;
  let other: TestUserData;
  let companyId: string;
  let awsUtil: AwsUtil;

  beforeEach(async function () {
    awsUtil = withAwsUtil();
    const { client } = await withApp();

    customer = await withCustomer({ profile: { role: 'Owner' } });
    other = await withCustomer();
    manager = await withEmployee(customer, customer, { profile: { role: 'Manager' }, permissions: { manager: true } });
    employee = await withEmployee(customer, manager, { profile: { role: 'Employee' } });
    employee2 = await withEmployee(customer, manager, { profile: { role: 'Employee' } });
    companyId = customer.company._id.toString();

    // force the creation of user groups, but only once
    await client
      .post(`/graphql`)
      .set('Authorization', `Bearer ${internalTokenForUser(customer)}`)
      .send({
        query: `mutation {
            forceInitializeUserGroups
          }`,
      });
  });

  describe('Owner', () => {
    it('can see all company groups', async () => {
      const { client } = await withApp();
      const response = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(customer)}`)
        .send({
          query: FRAGMENT,
          variables: {
            id: companyId,
          },
        });
      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.getCoreCompany.groups).toHaveLength(5);
      expect(response.body.data.getCoreCompany).toEqual(
        expect.objectContaining({
          id: companyId,
          name: customer.company.name,
          groups: expect.arrayContaining([
            expect.objectContaining({
              type: 'Admin',
              members: expect.arrayContaining([
                {
                  id: customer.user._id.toString(),
                  profile: {
                    firstName: customer.user.profile.first_name,
                    lastName: customer.user.profile.last_name,
                  },
                },
              ]),
            }),
            expect.objectContaining({
              type: 'ManagersWithReports',
              members: expect.arrayContaining([
                {
                  id: manager.user._id.toString(),
                  profile: {
                    firstName: manager.user.profile.first_name,
                    lastName: manager.user.profile.last_name,
                  },
                },
                {
                  id: customer.user._id.toString(),
                  profile: {
                    firstName: customer.user.profile.first_name,
                    lastName: customer.user.profile.last_name,
                  },
                },
              ]),
            }),
          ]),
        }),
      );
    });
  });
  // describe.skip('Employee', () => {
  //   it('can only see company groups they are part of?', async () => {
  //     // TODO: product logic not defined yet
  //   });
  // });
});
