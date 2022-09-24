//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';

import * as jwt from 'jsonwebtoken';
import { withApp } from '../../../../../__tests__/test-helper';
import { addCompany, withCustomer } from '../../../../../__tests__/with-user';
import type supertest = require('supertest');

describe('V3LoginController', () => {
  let client: supertest.SuperTest<supertest.Test>;

  beforeAll(async function () {
    ({ client } = await withApp());
  });

  it('fails with invalid payload', async () => {
    const userInfo = await withCustomer({ profile: { role: 'Owner' } });
    const res = await client.post('/auth/v3/login').send({
      name: userInfo.email,
      pass: userInfo.password,
    });
    expect(res.status).toEqual(400);
  });

  it('fails with an invalid password', async () => {
    const userInfo = await withCustomer({ profile: { role: 'Owner' } });
    const res = await client.post('/auth/v3/login').send({
      email: userInfo.email,
      password: 'no-way',
    });

    expect(res.status).toEqual(401);
  });

  it('succeds with a legit username and password', async () => {
    const userInfo = await withCustomer({ profile: { role: 'Owner' } });
    const res = await client.post('/auth/v3/login').send({
      email: userInfo.email,
      password: userInfo.password,
    });

    expect(res.status).toEqual(201);
  });

  describe('Switch Companies', () => {
    it('adding to another company switches companies', async () => {
      const userInfo = await withCustomer({ profile: { role: 'Owner' } });
      const res = await client.post('/auth/v3/login').send({
        email: userInfo.email,
        password: userInfo.password,
      });
      expect(res.status).toEqual(201);
      const firstDecoded = jwt.decode(res.body.accessToken) as CurrentUser;

      const secondUserInfo = await addCompany(userInfo);
      expect(secondUserInfo.auth._id.toString()).toEqual(userInfo.auth._id.toString());
      expect(secondUserInfo.user._id.toString()).not.toEqual(userInfo.user._id.toString());
      expect(secondUserInfo.email).toEqual(userInfo.email);
      expect(secondUserInfo.password).toEqual(userInfo.password);

      const res2 = await client.post('/auth/v3/login').send({
        email: userInfo.email,
        password: userInfo.password,
      });
      expect(res2.status).toEqual(201);
      const secondDecoded = jwt.decode(res2.body.accessToken) as CurrentUser;
      expect(secondDecoded.userId).not.toEqual(firstDecoded.userId);
      expect(secondDecoded.authId).toEqual(firstDecoded.authId);
    });

    it('allows switching to another authorized company by userId', async () => {
      const userInfo = await withCustomer({ profile: { role: 'Owner' } });
      const secondUserInfo = await addCompany(userInfo);
      const loginToC2 = await client.post('/auth/v3/login').send({
        email: secondUserInfo.email,
        password: secondUserInfo.password,
      });
      expect(loginToC2.status).toBe(201);
      const firstDecoded = jwt.decode(loginToC2.body.accessToken) as CurrentUser;
      const switchResponse = await client
        .post('/auth/v3/switch/user')
        .set({
          Authorization: `Bearer ${loginToC2.body.accessToken}`,
          Cookie: loginToC2.headers['set-cookie'],
        })
        .send({
          userId: userInfo.user._id.toString(),
        });

      expect(switchResponse.status).toEqual(201);
      expect(switchResponse.body.accessToken).not.toEqual(loginToC2.body.accessToken);
      const secondDecoded = jwt.decode(switchResponse.body.accessToken) as CurrentUser;
      expect(secondDecoded.userId).not.toEqual(firstDecoded.userId);
      expect(secondDecoded.authId).toEqual(firstDecoded.authId);
    });

    it('allows switching to another authorized company by companyId', async () => {
      const userInfo = await withCustomer({ profile: { role: 'Owner' } });
      const secondUserInfo = await addCompany(userInfo);
      const loginToC2 = await client.post('/auth/v3/login').send({
        email: secondUserInfo.email,
        password: secondUserInfo.password,
      });
      expect(loginToC2.status).toBe(201);
      const firstDecoded = jwt.decode(loginToC2.body.accessToken) as CurrentUser;
      const switchResponse = await client
        .post('/auth/v3/switch/company')
        .set({
          Authorization: `Bearer ${loginToC2.body.accessToken}`,
          Cookie: loginToC2.headers['set-cookie'],
        })
        .send({
          companyId: userInfo.company._id.toString(),
        });

      expect(switchResponse.status).toEqual(201);
      expect(switchResponse.body.accessToken).not.toEqual(loginToC2.body.accessToken);
      const secondDecoded = jwt.decode(switchResponse.body.accessToken) as CurrentUser;
      expect(secondDecoded.userId).not.toEqual(firstDecoded.userId);
      expect(secondDecoded.authId).toEqual(firstDecoded.authId);
    });
  });
});
