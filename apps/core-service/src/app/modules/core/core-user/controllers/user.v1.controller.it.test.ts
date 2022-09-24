//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { pojo, withApp } from '../../../../__tests__/test-helper';
import {
  internalTokenForUser,
  systemToken,
  TestUserData,
  withCustomer,
  withEmployee,
  withHrm,
} from '../../../../__tests__/with-user';
import type { UsersV1RequestBody } from '../../models/UsersV1RequestBody.model';
import { mapUserdocToUserDTO } from '../repositories/lib/map-userdoc-to-userdto';
import type { UserV1Body } from './models';
import { userDtoToBody } from './user.v1.controller';

describe('UserV1Controller', () => {
  let customer: TestUserData;
  let hrm: TestUserData;
  let manager: TestUserData;
  let employee1: TestUserData;
  let employee2: TestUserData;
  let contractor: TestUserData;

  // these users shouldn't be able to access the above
  let other: TestUserData;
  let otherEmployee: TestUserData;

  let profileBody1: UserV1Body;
  let profileBody2: UserV1Body;

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
    employee2 = await withEmployee(customer, manager);
    contractor = await withEmployee(customer, customer, {
      profile: { contractor: true, contractor_type: 'business', contractor_business_name: 'Legit.co' },
    });

    other = await withCustomer();
    otherEmployee = await withEmployee(other);
    profileBody1 = pojo(userDtoToBody(mapUserdocToUserDTO(employee1.user, employee1.auth, employee1.company)));
    profileBody2 = pojo(userDtoToBody(mapUserdocToUserDTO(employee2.user, employee2.auth, employee2.company)));
  });

  describe('One Employee', () => {
    describe('System', () => {
      it('service account can see profile profile', async () => {
        const { client } = await withApp();
        const response = await client
          .get(`/users/v1/user/${employee1.user._id.toString()}`)
          .set('Authorization', `Bearer ${systemToken()}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(profileBody1);
      });
      it('service account can access employee consumable token', async () => {
        const { client } = await withApp();
        const response = await client
          .get(`/users/v1/user/${employee1.user._id.toString()}/consumableToken`)
          .set('Authorization', `Bearer ${systemToken()}`);
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
      });
    });

    describe('Self', () => {
      it('user can see their own profile', async () => {
        const { client } = await withApp();
        const response = await client
          .get(`/users/v1/user/${employee1.user._id.toString()}`)
          .set('Authorization', `Bearer ${internalTokenForUser(employee1)}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(profileBody1);
      });
      it('user can access their consumable token', async () => {
        const { client } = await withApp();
        const response = await client
          .get(`/users/v1/user/${employee1.user._id.toString()}/consumableToken`)
          .set('Authorization', `Bearer ${internalTokenForUser(employee1)}`);
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
      });
    });

    describe('Company Owner', () => {
      it('can see employee profile', async () => {
        const { client } = await withApp();
        const response = await client
          .get(`/users/v1/user/${employee1.user._id.toString()}`)
          .set('Authorization', `Bearer ${internalTokenForUser(customer, { roles: ['company-owner', 'user'] })}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(profileBody1);
      });
      it('can access employee consumable token', async () => {
        const { client } = await withApp();
        const response = await client
          .get(`/users/v1/user/${employee1.user._id.toString()}/consumableToken`)
          .set('Authorization', `Bearer ${internalTokenForUser(customer, { roles: ['company-owner', 'user'] })}`);
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
      });
    });

    describe('Other Company Owner', () => {
      it('cannot see employee profile', async () => {
        const { client } = await withApp();
        const response = await client
          .get(`/users/v1/user/${employee1.user._id.toString()}`)
          .set('Authorization', `Bearer ${internalTokenForUser(other, { roles: ['company-owner', 'user'] })}`);
        expect(response.status).toBe(403);
      });
      it('cannot access employee consumable token', async () => {
        const { client } = await withApp();
        const response = await client
          .get(`/users/v1/user/${employee1.user._id.toString()}/consumableToken`)
          .set('Authorization', `Bearer ${internalTokenForUser(other, { roles: ['company-owner', 'user'] })}`);
        expect(response.status).toBe(403);
      });
    });

    describe('Other Employee', () => {
      it('cannot see the company employees', async () => {
        const { client } = await withApp();
        const response = await client
          .get(`/users/v1/user/${employee1.user._id.toString()}`)
          .set('Authorization', `Bearer ${internalTokenForUser(otherEmployee)}`);
        expect(response.status).toBe(403);
      });
      it("cannot access other employee's consumable tokens", async () => {
        const { client } = await withApp();
        const response = await client
          .get(`/users/v1/user/${employee1.user._id.toString()}/consumableToken`)
          .set('Authorization', `Bearer ${internalTokenForUser(otherEmployee)}`);
        expect(response.status).toBe(403);
      });
    });
  });

  describe('Many Employees', () => {
    describe('System', () => {
      it('service account can see all requested profiles', async () => {
        const { client } = await withApp();
        const payload: Partial<UsersV1RequestBody> = {
          userIds: [employee1.user._id.toString(), employee2.user._id.toString(), otherEmployee.user._id.toString()],
        };
        const response = await client
          .post(`/users/v1/user/by-id`)
          .set('Authorization', `Bearer ${systemToken()}`)
          .send(payload);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({
          users: [
            profileBody1,
            profileBody2,
            pojo(userDtoToBody(mapUserdocToUserDTO(otherEmployee.user, otherEmployee.auth, otherEmployee.company))),
          ],
        });
      });
    });

    describe('Self', () => {
      it('user can see their own profile', async () => {
        const { client } = await withApp();
        const payload: Partial<UsersV1RequestBody> = {
          userIds: [employee1.user._id.toString(), employee2.user._id.toString(), otherEmployee.user._id.toString()],
        };
        const response = await client
          .post(`/users/v1/user/by-id`)
          .set('Authorization', `Bearer ${internalTokenForUser(employee1)}`)
          .send(payload);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ users: [profileBody1] });
      });
    });

    describe('Company Owner', () => {
      it('can see requested profiles', async () => {
        const { client } = await withApp();
        const payload: Partial<UsersV1RequestBody> = {
          userIds: [employee1.user._id.toString(), employee2.user._id.toString(), otherEmployee.user._id.toString()],
        };
        const response = await client
          .post(`/users/v1/user/by-id`)
          .set('Authorization', `Bearer ${internalTokenForUser(customer, { roles: ['company-owner', 'user'] })}`)
          .send(payload);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ users: [profileBody1, profileBody2] });
      });
    });

    describe('Other Company Owner', () => {
      it('cannot see employee profile', async () => {
        const { client } = await withApp();
        const payload: Partial<UsersV1RequestBody> = {
          userIds: [employee1.user._id.toString(), employee2.user._id.toString()],
        };
        const response = await client
          .post(`/users/v1/user/by-id`)
          .set('Authorization', `Bearer ${internalTokenForUser(other, { roles: ['company-owner', 'user'] })}`)
          .send(payload);
        expect(response.status).toBe(201);
        expect(response.body.users).toHaveLength(0);
      });
    });

    describe('Other Employee', () => {
      it('cannot see the company employees', async () => {
        const { client } = await withApp();
        const payload: Partial<UsersV1RequestBody> = {
          userIds: [employee1.user._id.toString(), employee2.user._id.toString()],
        };
        const response = await client
          .post(`/users/v1/user/by-id`)
          .set('Authorization', `Bearer ${internalTokenForUser(otherEmployee)}`)
          .send(payload);
        expect(response.status).toBe(201);
        expect(response.body.users).toHaveLength(0);
      });
    });
  });

  describe('ConsumableTokens', () => {
    describe('getConsumableToken', () => {
      it('returns same token on subsequent requests with a differing expiration', async () => {
        const { client } = await withApp();
        const response1 = await client
          .get(`/users/v1/user/${employee1.user._id.toString()}/consumableToken`)
          .set('Authorization', `Bearer ${systemToken()}`);
        expect(response1.status).toBe(200);
        expect(response1.body.token).toBeDefined();
        expect(response1.body.expiresAt).toBeDefined();

        const response2 = await client
          .get(`/users/v1/user/${employee1.user._id.toString()}/consumableToken`)
          .set('Authorization', `Bearer ${systemToken()}`);
        expect(response2.status).toBe(200);
        expect(response2.body.token).toBeDefined();
        expect(response2.body.expiresAt).toBeDefined();

        expect(response1.body.token).toEqual(response2.body.token);
        expect(response1.body.expiresAt).not.toEqual(response2.body.expiresAt);
      });
      it("returns 404 when user doesn't exist", async () => {
        const fakeId = '5b8f907c284f5200a809ea0f';
        const { client } = await withApp();
        const response = await client
          .get(`/users/v1/user/${fakeId}/consumableToken`)
          .set('Authorization', `Bearer ${systemToken()}`);
        expect(response.status).toBe(404);
      });
    });
    describe('getUsernameFromConsumableToken', () => {
      it('returns username', async () => {
        const { client } = await withApp();
        const response1 = await client
          .get(`/users/v1/user/${employee1.user._id.toString()}/consumableToken`)
          .set('Authorization', `Bearer ${systemToken()}`);
        expect(response1.status).toBe(200);
        expect(response1.body.token).toBeDefined();
        expect(response1.body.expiresAt).toBeDefined();

        const response2 = await client
          .get(`/users/v1/user/consumableToken/${response1.body.token}/username`)
          .set('Authorization', `Bearer ${systemToken()}`);
        expect(response2.status).toBe(200);
        expect(response2.body.username).toBeDefined();
        expect(response2.body.userId).toBeDefined();
      });
      it('returns 404 when token not found', async () => {
        const { client } = await withApp();
        const token = 'nonexistent-test-token';
        const res = await client
          .get(`/users/v1/user/consumableToken/${token}/username`)
          .set('Authorization', `Bearer ${systemToken()}`);
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Token not found');
      });
    });
  });
});
