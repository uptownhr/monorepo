//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import Redis from 'ioredis';
import { withApp } from '../../../../../../__tests__/test-helper';
import { TestUserData, withCustomer, withEmployee } from '../../../../../../__tests__/with-user';

describe('MFA SMS Enrollment', () => {
  let redis: Redis;
  let customer: TestUserData;
  let employee: TestUserData;
  let app;
  let client;

  beforeEach(async function () {
    ({ app, client } = await withApp());
    customer = await withCustomer({ profile: { role: 'Owner' } });
    employee = await withEmployee(customer, customer, { profile: { role: 'Employee' } });
  });

  beforeAll(async () => {
    redis = new Redis(process.env.REDIS_URL!);
  });
  afterAll(async () => {
    redis.disconnect();
  });

  it('Creates an enrollment', async () => {
    const response = await employee.client
      .post(`/graphql`)
      .set('Authorization', `Bearer ${employee.accessToken}`)
      .send({
        query: `mutation SmsEnrollment ($input: AuthMfaSmsEnrollmentInput!) {
          enrollMfaDevice(input: $input) {
            nonce
            expiration
          }
        }`,
        variables: {
          input: {
            mfaType: 'SMS',
            phoneNumber: '+12134569080',
          },
        },
      });

    expect(response.status).toBe(200);
  });
  it('Disallows an more than one SMS enrollment', async () => {
    const response = await employee.client
      .post(`/graphql`)
      .set('Authorization', `Bearer ${employee.accessToken}`)
      .set('User-Agent', 'Test Agent 1.0')
      .send({
        query: `mutation SmsEnrollment ($input: AuthMfaSmsEnrollmentInput!) {
          enrollMfaDevice(input: $input) {
            nonce
            expiration
          }
        }`,
        variables: {
          input: {
            mfaType: 'SMS',
            phoneNumber: '+12134569080',
          },
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.data.enrollMfaDevice.nonce).toBeDefined();

    const confirmationResponse = await employee.client
      .post(`/graphql`)
      .set('Authorization', `Bearer ${employee.accessToken}`)
      .set('User-Agent', 'Test Agent 1.0')
      .send({
        query: `mutation confirmUserMfaEnrollment ($input: AuthMfaChallengeResponseInput!) {
          confirmUserMfaEnrollment(input: $input) {
            backupCode
            mfaType
            createdAt
            lastDevice
            lastChallengedAt
          }
        }`,
        variables: {
          input: {
            nonce: response.body.data.enrollMfaDevice.nonce,
            response: '000000',
          },
        },
      });

    expect(confirmationResponse.status).toBe(200);
    expect(confirmationResponse.body.data.confirmUserMfaEnrollment.createdAt).toBeDefined();
    expect(confirmationResponse.body.data.confirmUserMfaEnrollment.lastChallengedAt).toBeDefined();
    expect(confirmationResponse.body.data.confirmUserMfaEnrollment.lastDevice).toEqual('Test Agent 1.0');

    // get active enrollments
    const enrollmentResponse = await employee.client
      .post('/graphql')
      .set('Authorization', `Bearer ${employee.accessToken}`)
      .set('User-Agent', 'Test Agent 1.0')
      .send({
        query: `query {
          getMyMfaEnrollments {
            mfaType
            createdAt
            lastDevice
            lastChallengedAt
          }
        }`,
      });
    expect(enrollmentResponse.status).toBe(200);
    expect(enrollmentResponse.body.data.getMyMfaEnrollments.length).toBe(1);
    expect(enrollmentResponse.body.data.getMyMfaEnrollments[0].mfaType).toBe('SMS');
    expect(enrollmentResponse.body.data.getMyMfaEnrollments[0].createdAt).toBeDefined();
    expect(enrollmentResponse.body.data.getMyMfaEnrollments[0].lastChallengedAt).toBeDefined();
    expect(enrollmentResponse.body.data.getMyMfaEnrollments[0].lastDevice).toEqual('Test Agent 1.0');
  });
});
