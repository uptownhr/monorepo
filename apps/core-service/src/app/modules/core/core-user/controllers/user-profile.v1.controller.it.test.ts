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
import type { UpdateUserProfileV1Body, UserProfileV1Body } from './models';
import { userDtoToProfileResponse } from './models/UserProfileV1Body.model';
import { UserV1ContractorType } from './models/UserV1ContractorType.model';

describe('UserProfileV1Controller GetProfile', () => {
  let customer: TestUserData;
  let hrm: TestUserData;
  let manager: TestUserData;
  let employee1: TestUserData;
  let employee2: TestUserData;
  let contractor: TestUserData;

  // these users shouldn't be able to access the above
  let other: TestUserData;
  let otherEmployee: TestUserData;

  let profileBody1: UserProfileV1Body;
  let profileBody2: UserProfileV1Body;

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
    profileBody1 = pojo(
      userDtoToProfileResponse(mapUserdocToUserDTO(employee1.user, employee1.auth, employee1.company)),
    );
    profileBody2 = pojo(
      userDtoToProfileResponse(mapUserdocToUserDTO(employee2.user, employee2.auth, employee2.company)),
    );
  });

  describe('One Employee', () => {
    describe('System', () => {
      it('service account can see profile profile', async () => {
        const { client } = await withApp();
        const response = await client
          .get(`/users/v1/user/${employee1.user._id.toString()}/profile`)
          .set('Authorization', `Bearer ${systemToken()}`);
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(profileBody1);
      });
    });

    describe('Self', () => {
      it('user can see their own profile', async () => {
        const { client } = await withApp();
        const response = await client
          .get(`/users/v1/user/${employee1.user._id.toString()}/profile`)
          .set('Authorization', `Bearer ${internalTokenForUser(employee1)}`);
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(profileBody1);
      });
    });

    describe('Company Owner', () => {
      it('can see employee profile', async () => {
        const { client } = await withApp();
        const response = await client
          .get(`/users/v1/user/${employee1.user._id.toString()}/profile`)
          .set('Authorization', `Bearer ${internalTokenForUser(customer, { roles: ['company-owner', 'user'] })}`);
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(profileBody1);
      });
    });

    describe('Other Company Owner', () => {
      it('cannot see employee profile', async () => {
        const { client } = await withApp();
        const response = await client
          .get(`/users/v1/user/${employee1.user._id.toString()}/profile`)
          .set('Authorization', `Bearer ${internalTokenForUser(other, { roles: ['company-owner', 'user'] })}`);
        expect(response.status).toBe(403);
      });
    });

    describe('Other Employee', () => {
      it('cannot see the company employees', async () => {
        const { client } = await withApp();
        const response = await client
          .get(`/users/v1/user/${employee1.user._id.toString()}/profile`)
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
          .post(`/users/v1/user/by-id/profile`)
          .set('Authorization', `Bearer ${systemToken()}`)
          .send(payload);
        expect(response.status).toBe(201);
        expect(response.body).toStrictEqual({
          users: [
            profileBody1,
            profileBody2,
            pojo(
              userDtoToProfileResponse(
                mapUserdocToUserDTO(otherEmployee.user, otherEmployee.auth, otherEmployee.company),
              ),
            ),
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
          .post(`/users/v1/user/by-id/profile`)
          .set('Authorization', `Bearer ${internalTokenForUser(employee1)}`)
          .send(payload);
        expect(response.status).toBe(201);
        expect(response.body).toStrictEqual({ users: [profileBody1] });
      });
    });

    describe('Company Owner', () => {
      it('can see requested profiles', async () => {
        const { client } = await withApp();
        const payload: Partial<UsersV1RequestBody> = {
          userIds: [employee1.user._id.toString(), employee2.user._id.toString(), otherEmployee.user._id.toString()],
        };
        const response = await client
          .post(`/users/v1/user/by-id/profile`)
          .set('Authorization', `Bearer ${internalTokenForUser(customer, { roles: ['company-owner', 'user'] })}`)
          .send(payload);
        expect(response.status).toBe(201);
        expect(response.body).toStrictEqual({ users: [profileBody1, profileBody2] });
      });
    });

    describe('Other Company Owner', () => {
      it('cannot see employee profile', async () => {
        const { client } = await withApp();
        const payload: Partial<UsersV1RequestBody> = {
          userIds: [employee1.user._id.toString(), employee2.user._id.toString()],
        };
        const response = await client
          .post(`/users/v1/user/by-id/profile`)
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
          .post(`/users/v1/user/by-id/profile`)
          .set('Authorization', `Bearer ${internalTokenForUser(otherEmployee)}`)
          .send(payload);
        expect(response.status).toBe(201);
        expect(response.body.users).toHaveLength(0);
      });
    });
  });
});

describe('UserProfileV1Controller UpdateProfile', () => {
  let customer: TestUserData;
  let hrm: TestUserData;
  let manager: TestUserData;
  let employee1: TestUserData;
  // let employee2: TestUserData;
  let contractor: TestUserData;

  // these users shouldn't be able to access the above
  let other: TestUserData;
  let otherEmployee: TestUserData;

  let profileBody: UserProfileV1Body;

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
      profile: { contractor: true, contractor_type: 'individual', contractor_business_name: 'Legit.co' },
    });

    other = await withCustomer();
    otherEmployee = await withEmployee(other);
    profileBody = pojo(
      userDtoToProfileResponse(mapUserdocToUserDTO(employee1.user, employee1.auth, employee1.company)),
    );
  });

  const PAYLOAD: Partial<UpdateUserProfileV1Body> = {
    contractorBusinessName: 'Fake.co',
    contractorType: UserV1ContractorType.Business,
  };

  describe('System', () => {
    it('service account can updated the user profile', async () => {
      const { client } = await withApp();
      const firstValue = await client
        .get(`/users/v1/user/${employee1.user._id.toString()}/profile`)
        .set('Authorization', `Bearer ${systemToken()}`);
      expect(firstValue.status).toBe(200);
      expect(firstValue.body).toEqual(profileBody);

      const update = await client
        .patch(`/users/v1/user/${employee1.user._id.toString()}/profile`)
        .set('Authorization', `Bearer ${systemToken()}`)
        .send(PAYLOAD);
      expect(update.status).toBe(200);

      const secondValue = await client
        .get(`/users/v1/user/${employee1.user._id.toString()}/profile`)
        .set('Authorization', `Bearer ${systemToken()}`);
      expect(secondValue.status).toBe(200);
      expect(secondValue.body).toEqual({ ...profileBody, ...PAYLOAD });
    });
  });

  describe('Self', () => {
    it('cannot update employee profile', async () => {
      const { client } = await withApp();
      const update = await client
        .patch(`/users/v1/user/${employee1.user._id.toString()}/profile`)
        .set('Authorization', `Bearer ${internalTokenForUser(employee1)}`)
        .send(PAYLOAD);
      expect(update.status).toBe(403);
    });
  });

  describe('Company Owner', () => {
    it('cannot update employee profile', async () => {
      const { client } = await withApp();
      const update = await client
        .patch(`/users/v1/user/${employee1.user._id.toString()}/profile`)
        .set('Authorization', `Bearer ${internalTokenForUser(customer)}`)
        .send(PAYLOAD);
      expect(update.status).toBe(403);
    });
  });
});
