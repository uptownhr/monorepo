//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { withApp } from '../../../../../__tests__/test-helper';
import { TestUserData, withCustomer, withEmployee, withHrm } from '../../../../../__tests__/with-user';
import type supertest = require('supertest');

describe('api-v2 Refresh Controller', () => {
  let client: supertest.SuperTest<supertest.Test>;
  let customer: TestUserData;
  let employee: TestUserData;
  let hrm: TestUserData;

  beforeEach(async function () {
    ({ client } = await withApp());
    customer = await withCustomer();
    employee = await withEmployee(customer);
    hrm = await withHrm();
  });

  it('allows v2 login and refresh', async () => {
    const loginResponse = await client.post('/auth/v1/login').send({
      email: customer.email,
      password: customer.password,
    });
    expect(loginResponse.status).toEqual(201);
    expect(loginResponse.body.token).not.toBeUndefined();
    expect(loginResponse.body.refreshToken).not.toBeUndefined();

    const refreshResponse = await client.post('/auth/v1/refresh').send({
      refreshToken: loginResponse.body.refreshToken,
    });

    expect(refreshResponse.status).toEqual(201);
    expect(refreshResponse.body.token).not.toBeUndefined();
    expect(refreshResponse.body.refreshToken).not.toBeUndefined();
  });
});
