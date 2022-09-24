//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { BaseUser, NIL_OBJECT_ID, SERVICE_ISSUER, signCurrentUser, TokenType } from '@bambeehr/authentication';
import * as uuid from 'uuid';
import { INTERNAL_PRIVATE_KEY } from '../../../../../__tests__/keys';
import { withApp } from '../../../../../__tests__/test-helper';
import { TestUserData, withCustomer, withEmployee } from '../../../../../__tests__/with-user';
import type supertest = require('supertest');
const NONCE_PREFIX = 'auth-service:nonce';

describe('V3NonceController', () => {
  let owner: TestUserData;
  let employee: TestUserData;

  const SERVICE_PAYLOAD: BaseUser = {
    userId: NIL_OBJECT_ID,
    authId: NIL_OBJECT_ID,
    name: 'system-account',
    email: 'blackops+system-account@bambee.com',
    avatarUrl: `http://system-account`,
    roles: ['admin'],
    tokenType: TokenType.Service,
  };
  const SERVICE_TOKEN = signCurrentUser(SERVICE_PAYLOAD, INTERNAL_PRIVATE_KEY, {
    issuer: SERVICE_ISSUER,
  });
  const serviceAuthorization = `Bearer ${SERVICE_TOKEN}`;

  let client: supertest.SuperTest<supertest.Test>;

  beforeEach(async () => {
    ({ client } = await withApp());

    // redisClient = new ioredis(process.env.REDIS_URL);
    owner = await withCustomer();
    employee = await withEmployee(owner);
  });

  describe('POST /', () => {
    it('fails without a payload', async () => {
      const res = await client.post('/auth/internal/v3/nonce').set('Authorization', serviceAuthorization).send();
      expect(res.status).toEqual(412);
    });

    it('fails with bad request body', async () => {
      const res = await client.post('/auth/internal/v3/nonce').set('Authorization', serviceAuthorization).send({
        expires: '1m',
      });
      expect(res.status).toEqual(412);
    });

    it('generates a nonce without expiration (default 10m)', async () => {
      const testData = {
        authId: employee.auth._id.toString(),
        userId: employee.user._id.toString(),
        expiration: '5m',
      };
      const res = await client
        .post('/auth/internal/v3/nonce')
        .set('Authorization', serviceAuthorization)
        .send(testData);
      expect(res.status).toEqual(201);
      expect(typeof res.body.nonce).toEqual('string');
      const testVal = await client
        .get(`/auth/internal/v3/nonce/${res.body.nonce}`)
        .set('Authorization', serviceAuthorization);
      expect(testVal.body.authId).toEqual(testData.authId);
      expect(testVal.body.userId).toEqual(testData.userId);
    });

    it('Fails with an invalid expiration', async () => {
      const testData = {
        authId: employee.auth._id.toString(),
        userId: employee.user._id.toString(),
        expiration: 'logistics',
      };
      const req = await client
        .post('/auth/internal/v3/nonce')
        .set('Authorization', serviceAuthorization)
        .send(testData);
      expect(req.status).toEqual(400);
    });

    it('accepts a valid expiration', async () => {
      const testData = {
        authId: employee.auth._id.toString(),
        userId: employee.user._id.toString(),
      };
      const res = await client
        .post('/auth/internal/v3/nonce')
        .set('Authorization', serviceAuthorization)
        .send({ expiration: '1m', ...testData });

      expect(res.status).toEqual(201);
      expect(typeof res.body.nonce).toEqual('string');
      const testVal = await client
        .get(`/auth/internal/v3/nonce/${res.body.nonce}`)
        .set('Authorization', serviceAuthorization);
      expect(testVal.body.authId).toEqual(testData.authId);
      expect(testVal.body.userId).toEqual(testData.userId);
    });
  });

  describe('GET /{nonce_id}', () => {
    it('fails to verify a non-nonce', async () => {
      const nonceVal = uuid.v4();

      const res = await client.get(`/auth/internal/v3/nonce/${nonceVal}`).set('Authorization', serviceAuthorization);
      expect(res.status).toEqual(404);
    });

    it('successfully verifies a good nonce', async () => {
      const testData = {
        authId: employee.auth._id.toString(),
        userId: employee.user._id.toString(),
      };
      const req = await client
        .post('/auth/internal/v3/nonce')
        .send(testData)
        .set('Authorization', serviceAuthorization);
      expect(req.status).toEqual(201);
      const res = await client
        .get(`/auth/internal/v3/nonce/${req.body.nonce}`)
        .set('Authorization', serviceAuthorization);

      expect(res.status).toEqual(200);
      expect(res.body).toEqual(expect.objectContaining(testData));
    });

    it('fails when the nonce expires', async () => {
      const testData = {
        authId: employee.auth._id.toString(),
        userId: employee.user._id.toString(),
      };
      const req = await client
        .post('/auth/internal/v3/nonce')
        .set('Authorization', serviceAuthorization)
        .send({ expiration: '200ms', ...testData });
      expect(req.status).toEqual(201);
      const res1 = await client
        .get(`/auth/internal/v3/nonce/${req.body.nonce}`)
        .set('Authorization', serviceAuthorization);
      expect(res1.status).toEqual(200);
      expect(res1.body).toEqual(expect.objectContaining(testData));

      // wait for timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res2 = await client
        .get(`/auth/internal/v3/nonce/${req.body.nonce}`)
        .set('Authorization', serviceAuthorization);
      expect(res2.status).toEqual(404);
    });
  });

  describe('DEL /{nonce_id}', () => {
    it('fails to delete a non-nonce', async () => {
      const nonceVal = uuid.v4();

      const res = await client.del(`/auth/internal/v3/nonce/${nonceVal}`).set('Authorization', serviceAuthorization);
      expect(res.status).toEqual(404);
    });

    it('fails to delete a bad value', async () => {
      const res = await client.del(`/auth/internal/v3/nonce/logarithm`).set('Authorization', serviceAuthorization);
      expect(res.status).toEqual(412);
    });

    it('deletes a nonce', async () => {
      const testData = {
        authId: employee.auth._id.toString(),
        userId: employee.user._id.toString(),
      };
      const req = await client
        .post('/auth/internal/v3/nonce')
        .send(testData)
        .set('Authorization', serviceAuthorization);
      expect(req.status).toEqual(201);
      const res = await client
        .get(`/auth/internal/v3/nonce/${req.body.nonce}`)
        .set('Authorization', serviceAuthorization);

      expect(res.status).toEqual(200);
      expect(res.body).toEqual(expect.objectContaining(testData));
      const res1 = await client
        .del(`/auth/internal/v3/nonce/${req.body.nonce}`)
        .set('Authorization', serviceAuthorization);
      expect(res1.status).toEqual(200);

      // it should have been deleted now
      const res2 = await client
        .del(`/auth/internal/v3/nonce/${req.body.nonce}`)
        .set('Authorization', serviceAuthorization);
      expect(res2.status).toEqual(404);
    });
  });
});
