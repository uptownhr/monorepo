//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { withApp } from '../../../../../__tests__/test-helper';
import { sendFeedbackMessage, sendMessageToUser } from '../../../../../__tests__/with-messaging';
import { internalTokenForUser, TestUserData, withCustomer, withEmployee } from '../../../../../__tests__/with-user';

describe('Feedback Message Resolver', () => {
  let customer: TestUserData;
  let manager1: TestUserData;
  let manager2: TestUserData;
  let employee1: TestUserData;
  let employee2: TestUserData;

  beforeEach(async function () {
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

  it('Manager can send a feedback message', async () => {
    const { client } = await withApp();
    const response = await sendFeedbackMessage(client, manager1, employee1, 'MeetsExpectations', 'Okay there.');

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.sendFeedbackMessage.id).not.toBeUndefined();
  });

  it('Manager can send multiple feedback messages and they appear in history.', async () => {
    const { client } = await withApp();

    await sendFeedbackMessage(client, manager1, employee1, 'BelowExpectations', 'You must do better');
    await sendFeedbackMessage(client, manager1, employee1, 'MeetsExpectations', 'Okay there.');
    await sendFeedbackMessage(client, manager1, employee1, 'AboveExpectations', 'I may have underestimated you.');
    await sendMessageToUser(client, manager1, employee1, 'This is a normal message');

    const history = await client
      .post(`/graphql`)
      .set('Authorization', `Bearer ${internalTokenForUser(manager1)}`)
      .send({
        query: `
        query GetHistory($input: ConversationHistoryInput!) {
          getConversationHistory(input: $input) {
            __typename ...on TextMessage {
              message
              type
            }
            __typename ...on FeedbackMessage {
              message
              type
              value
            }
          }
        }
      `,
        variables: {
          input: {
            userId: employee1.user._id.toString(),
          },
        },
      });

    expect(history.status).toBe(200);
    expect(history.body.errors).toBeUndefined();
    expect(history.body.data.getConversationHistory).toHaveLength(4);
    expect(history.body.data.getConversationHistory).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'Feedback',
          message: 'You must do better',
          value: 'BelowExpectations',
        }),
        expect.objectContaining({
          type: 'Feedback',
          message: 'Okay there.',
          value: 'MeetsExpectations',
        }),
        expect.objectContaining({
          type: 'Feedback',
          message: 'I may have underestimated you.',
          value: 'AboveExpectations',
        }),
        expect.objectContaining({
          type: 'Text',
          message: 'This is a normal message',
        }),
      ]),
    );
  });

  it('feedback items are available on the user model', async () => {
    const { client } = await withApp();

    await sendFeedbackMessage(client, manager1, employee1, 'BelowExpectations', 'You must do better');
    await sendFeedbackMessage(client, manager1, employee1, 'MeetsExpectations', 'Okay there.');
    await sendFeedbackMessage(client, manager1, employee1, 'AboveExpectations', 'I may have underestimated you.');
    await sendMessageToUser(client, manager1, employee1, 'This is a normal message');

    const response = await client
      .post(`/graphql`)
      .set('Authorization', `Bearer ${internalTokenForUser(employee1)}`)
      .send({
        query: `
        query GetMyCoreUser {
          getMyCoreUser {
            feedback {
              value
              byUser {
                id
              }
              date
              message {
                id
              }
            }
          }
        }
      `,
      });

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.getMyCoreUser.feedback).toHaveLength(3);
  });
});
