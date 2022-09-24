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
  withEmployee,
  withHrm,
} from '../../../../../__tests__/with-user';
import type supertest = require('supertest');

describe('V1MasqController', () => {
  let client: supertest.SuperTest<supertest.Test>;
  let masqTarget: TestUserData;
  let employee: TestUserData;
  let hrm: TestUserData;

  beforeEach(async function () {
    ({ client } = await withApp());
    masqTarget = await withCustomer();
    employee = await withEmployee(masqTarget);
    hrm = await withHrm();
  });

  it('Does not allow public access', async () => {
    const res = await client.post('/auth/internal/v3/masquerade').send({
      userId: masqTarget.user._id.toString(),
    });
    expect(res.status).toEqual(401);
  });

  it('Does not allow a non-hrm to create a masquerade', async () => {
    const res = await client
      .post('/auth/internal/v3/masquerade')
      .send({
        userId: masqTarget.user._id.toString(),
      })
      .set('Authorization', `Bearer ${internalTokenForUser(employee)}`);
    expect(res.status).toEqual(403);
  });

  it('Allows an HRM to create a masquerade', async () => {
    const res = await client
      .post('/auth/internal/v3/masquerade')
      .send({
        userId: masqTarget.user._id.toString(),
      })
      .set('Authorization', `Bearer ${internalTokenForUser(hrm)}`);
    expect(res.status).toEqual(201);
    expect(typeof res.body.accessToken).toEqual('string');
  });
});
