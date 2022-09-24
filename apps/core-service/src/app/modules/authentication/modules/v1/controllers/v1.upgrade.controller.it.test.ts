//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import * as jwt from 'jsonwebtoken';
import { withApp } from '../../../../../__tests__/test-helper';
import { TestUserData, withCustomer, withEmployee, withHrm } from '../../../../../__tests__/with-user';

import type supertest = require('supertest');

function generateJWT(payload: { user_id: string }, expiresIn = '24h') {
  return jwt.sign({ ...payload, created: new Date().getTime() }, process.env.TOKEN_SECRET!, { expiresIn });
}

describe('api-v2 Upgrade Controller', () => {
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

  it('allows upgrade from v0 token to v2 token', async () => {
    const v0Token = generateJWT({ user_id: customer.auth._id.toString() });
    const upgradeResponse = await client.get('/auth/v1/upgrade').set('Authorization', `Bearer ${v0Token}`);

    expect(upgradeResponse.status).toEqual(200);
    expect(upgradeResponse.body.token).not.toBeUndefined();
    expect(upgradeResponse.body.refreshToken).not.toBeUndefined();
  });
});
