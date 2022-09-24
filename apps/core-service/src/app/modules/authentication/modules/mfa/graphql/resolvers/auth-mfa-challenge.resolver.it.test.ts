//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { TestUserData, withCustomer, withEmployee, withUserEnrolledInMFA } from '../../../../../../__tests__/with-user';

describe('SMS Login Challenge', () => {
  let customer: TestUserData;
  let employee: TestUserData;

  beforeEach(async function () {
    customer = await withCustomer({ profile: { role: 'Owner' } });
    employee = await withEmployee(customer, customer, { profile: { role: 'Employee' } });
    await withUserEnrolledInMFA(employee);
  });

  beforeAll(async () => {});
  afterAll(async () => {});

  describe('/auth/v1', () => {
    it('Returns 412 when trying to log in', async () => {
      const loginResponse = await employee.client.post('/auth/v1/login').send({
        email: employee.email,
        password: employee.password,
      });
      expect(loginResponse.status).toBe(412);
      expect(loginResponse.body.nonce).toBeDefined();
      expect(loginResponse.body.metadata).toBeDefined();
      expect(loginResponse.body.metadata.phoneLast4).toBe('9080');
    });

    it('Allows login after 412 with a challenge response', async () => {
      const loginResponse = await employee.client.post('/auth/v1/login').send({
        email: employee.email,
        password: employee.password,
      });
      expect(loginResponse.status).toBe(412);
      const nonce = loginResponse.body.nonce;

      const secondResponse = await employee.client.post('/auth/v1/login').send({
        email: employee.email,
        password: employee.password,
        mfa: {
          nonce,
          response: 'asdfasdf',
        },
      });
      expect(secondResponse.status).toBe(403);

      const thirdResponse = await employee.client.post('/auth/v1/login').send({
        email: employee.email,
        password: employee.password,
        mfa: {
          nonce,
          response: '000000',
        },
      });

      expect(thirdResponse.status).toBe(201);
      expect(thirdResponse.body.token).toBeDefined();
    });

    it('Returns the challenge in progress when attempting a second login', async () => {
      const loginResponse = await employee.client.post('/auth/v1/login').send({
        email: employee.email,
        password: employee.password,
      });
      expect(loginResponse.status).toBe(412);

      const secondResponse = await employee.client.post('/auth/v1/login').send({
        email: employee.email,
        password: employee.password,
      });
      expect(secondResponse.status).toBe(412);
      expect(secondResponse.body.nonce).toBeDefined();

      const nonce = secondResponse.body.nonce;
      const thirdResponse = await employee.client.post('/auth/v1/login').send({
        email: employee.email,
        password: employee.password,
        mfa: {
          nonce,
          response: '000000',
        },
      });

      expect(thirdResponse.status).toBe(201);
      expect(thirdResponse.body.token).toBeDefined();
    });

    it('re-using the nonce should fail', async () => {
      const loginResponse = await employee.client.post('/auth/v1/login').send({
        email: employee.email,
        password: employee.password,
      });
      expect(loginResponse.status).toBe(412);
      const nonce = loginResponse.body.nonce;

      const secondResponse = await employee.client.post('/auth/v1/login').send({
        email: employee.email,
        password: employee.password,
        mfa: {
          nonce,
          response: 'asdfasdf',
        },
      });
      expect(secondResponse.status).toBe(403);

      const thirdResponse = await employee.client.post('/auth/v1/login').send({
        email: employee.email,
        password: employee.password,
        mfa: {
          nonce,
          response: '000000',
        },
      });

      expect(thirdResponse.status).toBe(201);
      expect(thirdResponse.body.token).toBeDefined();

      const fourthResponse = await employee.client.post('/auth/v1/login').send({
        email: employee.email,
        password: employee.password,
        mfa: {
          nonce,
          response: '000000',
        },
      });

      expect(fourthResponse.status).toBe(404);
    });

    it('Logging in again should prompt another challenge', async () => {
      const loginResponse = await employee.client.post('/auth/v1/login').send({
        email: employee.email,
        password: employee.password,
      });
      expect(loginResponse.status).toBe(412);
      const nonce = loginResponse.body.nonce;

      const secondResponse = await employee.client.post('/auth/v1/login').send({
        email: employee.email,
        password: employee.password,
        mfa: {
          nonce,
          response: '000000',
        },
      });

      expect(secondResponse.status).toBe(201);
      expect(secondResponse.body.token).toBeDefined();

      const fourthResponse = await employee.client.post('/auth/v1/login').send({
        email: employee.email,
        password: employee.password,
      });

      expect(fourthResponse.status).toBe(412);
    });

    it('Passing "rememberDevice" will not prompt the challenge again', async () => {
      const loginResponse = await employee.client.post('/auth/v1/login').send({
        email: employee.email,
        password: employee.password,
      });
      expect(loginResponse.status).toBe(412);
      const nonce = loginResponse.body.nonce;

      const secondResponse = await employee.client.post('/auth/v1/login').send({
        email: employee.email,
        password: employee.password,
        mfa: {
          nonce,
          response: '000000',
          rememberDevice: true,
        },
      });

      expect(secondResponse.status).toBe(201);
      expect(secondResponse.body.token).toBeDefined();

      const fourthResponse = await employee.client.post('/auth/v1/login').send({
        email: employee.email,
        password: employee.password,
      });

      expect(fourthResponse.status).toBe(201);
    });
  });

  describe('/auth/v3', () => {
    it('Returns 412 when trying to log in', async () => {
      const loginResponse = await employee.client.post('/auth/v3/login').send({
        email: employee.email,
        password: employee.password,
      });
      expect(loginResponse.status).toBe(412);
      expect(loginResponse.body.nonce).toBeDefined();
      expect(loginResponse.body.metadata).toBeDefined();
      expect(loginResponse.body.metadata.phoneLast4).toBe('9080');
    });

    it('Allows login after 412 with a challenge response', async () => {
      const loginResponse = await employee.client.post('/auth/v3/login').send({
        email: employee.email,
        password: employee.password,
      });
      expect(loginResponse.status).toBe(412);
      const nonce = loginResponse.body.nonce;

      const secondResponse = await employee.client.post('/auth/v3/login').send({
        email: employee.email,
        password: employee.password,
        mfa: {
          nonce,
          response: 'asdfasdf',
        },
      });
      expect(secondResponse.status).toBe(403);

      const thirdResponse = await employee.client.post('/auth/v3/login').send({
        email: employee.email,
        password: employee.password,
        mfa: {
          nonce,
          response: '000000',
        },
      });

      expect(thirdResponse.status).toBe(201);
      expect(thirdResponse.body.accessToken).toBeDefined();
    });

    it('Returns the challenge in progress when attempting a second login', async () => {
      const loginResponse = await employee.client.post('/auth/v3/login').send({
        email: employee.email,
        password: employee.password,
      });
      expect(loginResponse.status).toBe(412);

      const secondResponse = await employee.client.post('/auth/v3/login').send({
        email: employee.email,
        password: employee.password,
      });
      expect(secondResponse.status).toBe(412);
      expect(secondResponse.body.nonce).toBeDefined();

      const nonce = secondResponse.body.nonce;
      const thirdResponse = await employee.client.post('/auth/v3/login').send({
        email: employee.email,
        password: employee.password,
        mfa: {
          nonce,
          response: '000000',
        },
      });

      expect(thirdResponse.status).toBe(201);
      expect(thirdResponse.body.accessToken).toBeDefined();
    });

    it('re-using the nonce should fail', async () => {
      const loginResponse = await employee.client.post('/auth/v3/login').send({
        email: employee.email,
        password: employee.password,
      });
      expect(loginResponse.status).toBe(412);
      const nonce = loginResponse.body.nonce;

      const secondResponse = await employee.client.post('/auth/v3/login').send({
        email: employee.email,
        password: employee.password,
        mfa: {
          nonce,
          response: 'asdfasdf',
        },
      });
      expect(secondResponse.status).toBe(403);

      const thirdResponse = await employee.client.post('/auth/v3/login').send({
        email: employee.email,
        password: employee.password,
        mfa: {
          nonce,
          response: '000000',
        },
      });

      expect(thirdResponse.status).toBe(201);
      expect(thirdResponse.body.accessToken).toBeDefined();

      const fourthResponse = await employee.client.post('/auth/v3/login').send({
        email: employee.email,
        password: employee.password,
        mfa: {
          nonce,
          response: '000000',
        },
      });

      expect(fourthResponse.status).toBe(404);
    });

    it('Logging in again should prompt another challenge', async () => {
      const loginResponse = await employee.client.post('/auth/v3/login').send({
        email: employee.email,
        password: employee.password,
      });
      expect(loginResponse.status).toBe(412);
      const nonce = loginResponse.body.nonce;

      const secondResponse = await employee.client.post('/auth/v3/login').send({
        email: employee.email,
        password: employee.password,
        mfa: {
          nonce,
          response: '000000',
        },
      });

      expect(secondResponse.status).toBe(201);
      expect(secondResponse.body.accessToken).toBeDefined();

      const fourthResponse = await employee.client.post('/auth/v3/login').send({
        email: employee.email,
        password: employee.password,
      });

      expect(fourthResponse.status).toBe(412);
    });

    it('Passing "rememberDevice" will not prompt the challenge again', async () => {
      const loginResponse = await employee.client.post('/auth/v3/login').send({
        email: employee.email,
        password: employee.password,
      });
      expect(loginResponse.status).toBe(412);
      const nonce = loginResponse.body.nonce;

      const secondResponse = await employee.client.post('/auth/v3/login').send({
        email: employee.email,
        password: employee.password,
        mfa: {
          nonce,
          response: '000000',
          rememberDevice: true,
        },
      });

      expect(secondResponse.status).toBe(201);
      expect(secondResponse.body.accessToken).toBeDefined();

      const fourthResponse = await employee.client.post('/auth/v3/login').send({
        email: employee.email,
        password: employee.password,
      });

      expect(fourthResponse.status).toBe(201);
    });
  });
});
