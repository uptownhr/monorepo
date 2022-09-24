//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { INTERNAL_ISSUER, signCurrentUser } from '@bambeehr/authentication';
import { INTERNAL_PRIVATE_KEY, JWT_PRIVATE_KEY } from '../../../../../__tests__/keys';
import { withApp } from '../../../../../__tests__/test-helper';
import { TestUserData, withCurrentUser, withCustomer, withEmployee } from '../../../../../__tests__/with-user';
import type supertest = require('supertest');

describe('SSO Token Controller', () => {
  let client: supertest.SuperTest<supertest.Test>;
  let owner: TestUserData;
  let employee: TestUserData;
  let internalAccessToken: string;
  let userAccessToken: string;

  beforeAll(async function () {
    ({ client } = await withApp());
  });

  beforeEach(async function () {
    owner = await withCustomer();
    employee = await withEmployee(owner);
    const currentUser = withCurrentUser(employee);
    internalAccessToken = signCurrentUser(currentUser, INTERNAL_PRIVATE_KEY, {
      issuer: INTERNAL_ISSUER,
    });
    userAccessToken = signCurrentUser(currentUser, JWT_PRIVATE_KEY);
  });

  describe('V3 Token Controller', () => {
    [
      { name: 'User Token', getToken: () => userAccessToken },
      { name: 'Internal Token', getToken: () => internalAccessToken },
    ].forEach((c) => {
      describe(c.name, () => {
        it('Requires a body to create a code', async () => {
          const codeResponse = await client
            .post('/auth/v3/token/create')
            .set('Authorization', `Bearer ${c.getToken()}`);
          expect(codeResponse.status).toEqual(400);
        });

        it('Can request a code', async () => {
          const codeResponse = await client
            .post('/auth/v3/token/create')
            .set('Authorization', `Bearer ${c.getToken()}`)
            .send({
              client_id: 'bambee-club',
            });
          expect(codeResponse.status).toEqual(201);
          expect(codeResponse.body.nonce).not.toBeUndefined();
          expect(typeof codeResponse.body.nonce).toEqual('string');
        });

        it('Allows for code conversion', async () => {
          const codeResponse = await client
            .post('/auth/v3/token/create')
            .set('Authorization', `Bearer ${c.getToken()}`)
            .send({
              client_id: 'bambee-club',
            });
          const convertResponse = await client.post('/auth/v3/token/convert').send({
            grant_type: 'code',
            client_id: 'bambee-club',
            client_secret: 'bambee-club-test',
            code: codeResponse.body.nonce,
          });

          expect(convertResponse.status).toEqual(201);
          expect(convertResponse.body.accessToken).not.toBeUndefined();
          expect(convertResponse.body.refreshToken).not.toBeUndefined();
          expect(convertResponse.body.expiration).not.toBeUndefined();

          const profileResponse = await client
            .get('/auth/v3/token/profile')
            .set('Authorization', `Bearer ${convertResponse.body.accessToken}`);
          expect(profileResponse.status).toEqual(200);
          expect(profileResponse.body.id).toEqual(employee.user._id.toString());
        });

        it('Allows for token refresh', async () => {
          const codeResponse = await client
            .post('/auth/v3/token/create')
            .set('Authorization', `Bearer ${c.getToken()}`)
            .send({
              client_id: 'bambee-club',
            });
          const convertResponse = await client.post('/auth/v3/token/convert').send({
            grant_type: 'code',
            client_id: 'bambee-club',
            client_secret: 'bambee-club-test',
            code: codeResponse.body.nonce,
          });

          const refreshResponse = await client.post('/auth/v3/token/refresh').send({
            grant_type: 'refresh_token',
            client_id: 'bambee-club',
            client_secret: 'bambee-club-test',
            access_token: convertResponse.body.accessToken,
            refresh_token: convertResponse.body.refreshToken,
          });

          expect(refreshResponse.status).toEqual(201);
          expect(refreshResponse.body.accessToken).not.toBeUndefined();
          expect(refreshResponse.body.refreshToken).not.toBeUndefined();
          expect(refreshResponse.body.expiration).not.toBeUndefined();

          const profileResponse = await client
            .get('/auth/v3/token/profile')
            .set('Authorization', `Bearer ${refreshResponse.body.accessToken}`);
          expect(profileResponse.status).toEqual(200);
          expect(profileResponse.body.id).toEqual(employee.user._id.toString());
        });

        it('Can use the SSO token to fetch a profile', async () => {
          const codeResponse = await client
            .post('/auth/v3/token/create')
            .set('Authorization', `Bearer ${c.getToken()}`)
            .send({
              client_id: 'bambee-club',
            });
          const convertResponse = await client.post('/auth/v3/token/convert').send({
            grant_type: 'code',
            client_id: 'bambee-club',
            client_secret: 'bambee-club-test',
            code: codeResponse.body.nonce,
          });

          const accessToken = convertResponse.body.accessToken;
          const profileResponse = await client
            .get('/auth/v3/token/profile')
            .set('Authorization', `Bearer ${accessToken}`);
          expect(profileResponse.status).toEqual(200);
          expect(profileResponse.body.id).toEqual(employee.user._id.toString());
          expect(profileResponse.body.email).toEqual(employee.email.toLocaleLowerCase());
        });
      });
    });
  });
});
