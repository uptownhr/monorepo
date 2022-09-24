//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { withApp } from '../../../../__tests__/test-helper';
import { sendMessageToUser } from '../../../../__tests__/with-messaging';
import { internalTokenForUser, TestUserData, withCustomer, withEmployee } from '../../../../__tests__/with-user';

describe('One-on-One Channel History Resolver', () => {
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

  describe('Employee', () => {
    it('should create empty conversation', async () => {
      const { client } = await withApp();

      const response = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(employee1)}`)
        .send({
          query: `
          query GetHistory($input: ConversationHistoryInput!) {
            getConversationHistory(input: $input) {
              id
            }
          }
        `,
          variables: {
            input: {
              userId: manager1.user._id.toString(),
            },
          },
        });

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.getConversationHistory).toHaveLength(0);
    });
  });

  it('Can get paginated conversation history', async () => {
    const { client } = await withApp();

    await sendMessageToUser(client, manager1, employee1, 'General Kenobi');
    await sendMessageToUser(client, employee1, manager1, 'Hello there!');
    await sendMessageToUser(client, manager1, employee1, 'Did you sign the TPS form');
    await sendMessageToUser(client, employee1, manager1, 'It went to billing this morning');
    await sendMessageToUser(client, employee1, manager1, 'How uncivilized.');

    const response = await client
      .post(`/graphql`)
      .set('Authorization', `Bearer ${internalTokenForUser(employee1)}`)
      .send({
        query: `
          query GetHistory($input: ConversationHistoryInput!) {
            getConversationHistory(input: $input) {
              id
            }
          }
        `,
        variables: {
          input: {
            userId: manager1.user._id.toString(),
            count: 3,
          },
        },
      });
    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.getConversationHistory).toHaveLength(3);

    const lastMessageId = response.body.data.getConversationHistory[2].id;
    const secondResponse = await client
      .post(`/graphql`)
      .set('Authorization', `Bearer ${internalTokenForUser(employee1)}`)
      .send({
        query: `
          query GetHistory($input: ConversationHistoryInput!) {
            getConversationHistory(input: $input) {
              id
            }
          }
        `,
        variables: {
          input: {
            userId: manager1.user._id.toString(),
            count: 3,
            afterId: lastMessageId,
          },
        },
      });
    expect(secondResponse.status).toBe(200);
    expect(secondResponse.body.errors).toBeUndefined();
    expect(secondResponse.body.data.getConversationHistory).toHaveLength(2);
  });
});
