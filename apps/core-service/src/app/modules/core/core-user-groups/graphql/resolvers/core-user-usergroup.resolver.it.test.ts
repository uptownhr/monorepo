//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { AwsUtil } from '@bambeehr/aws-i12e';
import { withApp, withAwsUtil } from '../../../../../__tests__/test-helper';
import { internalTokenForUser, TestUserData, withCustomer, withEmployee } from '../../../../../__tests__/with-user';

const FRAGMENT = `
query GetMyCoreUser {
  getMyCoreUser {
    id
    profile {
      firstName
      lastName
      email
    }
    groups {
      id
      type
      ownerId
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

describe('CoreUser Usergroup Resolver', () => {
  let customer: TestUserData;
  let manager: TestUserData;
  let employee: TestUserData;
  let employee2: TestUserData;
  let other: TestUserData;
  let companyId: string;
  let awsUtil: AwsUtil;

  beforeEach(async function () {
    const { client } = await withApp();
    awsUtil = withAwsUtil();

    customer = await withCustomer({ profile: { role: 'Owner' } });
    other = await withCustomer();
    manager = await withEmployee(customer, customer, { profile: { role: 'Manager' }, permissions: { manager: true } });
    employee = await withEmployee(customer, manager, { profile: { role: 'Employee' } });
    employee2 = await withEmployee(customer, manager, { profile: { role: 'Employee' } });
    companyId = customer.company._id.toString();
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
    it('should be in ADMIN and one MANAGER_WITH_REPORTS', async () => {
      const { client } = await withApp();
      // create them first
      const createRes = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(customer)}`)
        .send({
          query: `mutation {
            forceInitializeUserGroups
          }`,
        });
      expect(createRes.status).toEqual(200);
      const response = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(customer)}`)
        .send({
          query: FRAGMENT,
        });
      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.getMyCoreUser.groups).toHaveLength(2);
      // expect(response.body.data.getMyCoreUser).toEqual(
      //   expect.objectContaining({
      //     id: customer.user._id.toString(),
      //     profile: {
      //       firstName: customer.user.profile.first_name,
      //       lastName: customer.user.profile.last_name,
      //       email: customer.auth.email,
      //     },
      //     groups: expect.arrayContaining([
      //       expect.objectContaining({
      //         id: `company:${companyId}:admin`,
      //         type: 'Admin',
      //         members: expect.arrayContaining([
      //           expect.objectContaining({
      //             id: customer.user._id.toString(),
      //           }),
      //         ]),
      //       }),
      //       expect.objectContaining({
      //         id: `company:${companyId}:managers-with-reports:${customer.user._id.toString()}`,
      //         type: 'ManagersWithReports',
      //         ownerId: customer.user._id.toString(),
      //         members: expect.arrayContaining([
      //           expect.objectContaining({
      //             id: manager.user._id.toString(),
      //           }),
      //           expect.objectContaining({
      //             id: customer.user._id.toString(),
      //           }),
      //         ]),
      //       }),
      //       expect.objectContaining({
      //         id: `company:${companyId}:managers-with-reports:${manager.user._id.toString()}`,
      //         type: 'ManagersWithReports',
      //         ownerId: manager.user._id.toString(),
      //         members: expect.arrayContaining([
      //           expect.objectContaining({
      //             id: employee.user._id.toString(),
      //           }),
      //           expect.objectContaining({
      //             id: employee2.user._id.toString(),
      //           }),
      //         ]),
      //       }),
      //       expect.objectContaining({
      //         id: `company:${companyId}:managers}`,
      //         type: 'Managers',
      //         members: expect.arrayContaining([
      //           expect.objectContaining({
      //             id: customer.user._id.toString(),
      //           }),
      //           expect.objectContaining({
      //             id: manager.user._id.toString(),
      //           }),
      //         ]),
      //       }),
      //       expect.objectContaining({
      //         id: `company:${companyId}:managers}`,
      //         type: 'Employees',
      //       }),
      //     ]),
      //   }),
      // );
    });
  });
  describe('Manager', () => {
    it('should be in ALL EMPLOYEES, MANAGERS, MANAGER_WITH_REPORTS as owner, MANAGER_WITH_REPORTS as reportee', async () => {
      const { client } = await withApp();
      const response = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(manager)}`)
        .send({
          query: FRAGMENT,
        });

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.getMyCoreUser.groups).toHaveLength(4);
      // expect(response.body.data.getMyCoreUser).toEqual(
      //   expect.objectContaining({
      //     id: employee.user._id.toString(),
      //     groups: expect.arrayContaining([
      //       expect.objectContaining({ type: 'ManagersWithReports', ownerId: customer.user._id.toString() }),
      //       expect.objectContaining({ type: 'ManagersWithReports', ownerId: manager.user._id.toString() }),
      //       expect.objectContaining({
      //         type: 'Managers',
      //         ownerId: null,
      //         members: expect.arrayContaining([
      //           expect.objectContaining({ id: manager.user._id.toString() }),
      //           expect.objectContaining({ id: employee.user._id.toString() }),
      //           expect.objectContaining({ id: employee2.user._id.toString() }),
      //         ]),
      //       }),
      //       expect.objectContaining({ type: 'Employees', ownerId: null }),
      //     ]),
      //   }),
      // );
    });
  });
  describe('Employee', () => {
    it('is in two groups', async () => {
      const { client } = await withApp();
      const response = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(employee)}`)
        .send({
          query: FRAGMENT,
        });
      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.getMyCoreUser.groups).toHaveLength(2);
      // expect(response.body.data.getMyCoreUser).toEqual(
      //   expect.objectContaining({
      //     id: employee.user._id.toString(),
      //     profile: {
      //       firstName: employee.user.profile.first_name,
      //       lastName: employee.user.profile.last_name,
      //       email: employee.auth.email,
      //     },
      //     groups: expect.arrayContaining([
      //       {
      //         id: `company:${companyId}:managers-with-reports:${manager.user._id.toString()}`,
      //         type: 'ManagersWithReports',
      //         ownerId: manager.user._id.toString(),
      //         members: expect.arrayContaining([
      //           expect.objectContaining({
      //             id: manager.user._id.toString(),
      //             profile: {
      //               firstName: manager.user.profile.first_name,
      //               lastName: manager.user.profile.last_name,
      //             },
      //           }),
      //           expect.objectContaining({
      //             id: employee.user._id.toString(),
      //             profile: {
      //               firstName: employee.user.profile.first_name,
      //               lastName: employee.user.profile.last_name,
      //             },
      //           }),
      //           expect.objectContaining({
      //             id: employee2.user._id.toString(),
      //             profile: {
      //               firstName: employee2.user.profile.first_name,
      //               lastName: employee2.user.profile.last_name,
      //             },
      //           }),
      //         ]),
      //       },
      //       {
      //         id: `company:${companyId}:employees`,
      //         type: 'Employees',
      //         ownerId: null,
      //         members: expect.arrayContaining([
      //           expect.objectContaining({
      //             id: manager.user._id.toString(),
      //             profile: {
      //               firstName: manager.user.profile.first_name,
      //               lastName: manager.user.profile.last_name,
      //             },
      //           }),
      //           expect.objectContaining({
      //             id: employee.user._id.toString(),
      //             profile: {
      //               firstName: employee.user.profile.first_name,
      //               lastName: employee.user.profile.last_name,
      //             },
      //           }),
      //           expect.objectContaining({
      //             id: employee2.user._id.toString(),
      //             profile: {
      //               firstName: employee2.user.profile.first_name,
      //               lastName: employee2.user.profile.last_name,
      //             },
      //           }),
      //         ]),
      //       },
      //     ]),
      //   }),
      // );
    });
  });
});
