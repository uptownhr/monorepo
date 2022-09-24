//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { withApp } from '../../../../__tests__/test-helper';
import { internalTokenForUser, TestUserData, withCustomer, withEmployee } from '../../../../__tests__/with-user';

describe('ChatRecipientResolver', () => {
  let customer: TestUserData;
  let manager1: TestUserData;
  let manager2: TestUserData;
  let employee1: TestUserData;
  let employee2: TestUserData;

  beforeAll(async function () {
    const { client } = await withApp();
    customer = await withCustomer({ profile: { role: 'Owner' } });
    manager1 = await withEmployee(customer, customer);
    manager2 = await withEmployee(customer, customer);
    employee1 = await withEmployee(customer, manager1);
    employee2 = await withEmployee(customer, manager2);
    await client
      .post(`/graphql`)
      .set('Authorization', `Bearer ${internalTokenForUser(customer)}`)
      .send({
        query: `mutation {
        forceInitializeUserGroups
      }`,
      });
  });

  describe('Company Owner', () => {
    it('should see all employees as recipients', async () => {
      const { client } = await withApp();

      const response = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(customer)}`)
        .send({
          query: `
          query {
            getMyChatRecipients {
              id
            }
          }
        `,
        });

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.getMyChatRecipients).toMatchObject([
        {
          id: manager1.user._id.toString(),
        },
        {
          id: manager2.user._id.toString(),
        },
        {
          id: employee1.user._id.toString(),
        },
        {
          id: employee2.user._id.toString(),
        },
      ]);
    });
  });

  describe('Employee', () => {
    it('should see their manager', async () => {
      const { client } = await withApp();

      const response = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(employee1)}`)
        .send({
          query: `
          query {
            getMyChatRecipients {
              id
            }
          }
        `,
        });

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.getMyChatRecipients).toMatchObject([
        {
          id: manager1.user._id.toString(),
        },
      ]);
    });
  });
});
