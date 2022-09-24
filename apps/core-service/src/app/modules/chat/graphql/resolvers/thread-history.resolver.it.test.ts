//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { withApp } from '../../../../__tests__/test-helper';
import { sendFeedbackMessage, sendReplyToUserThread } from '../../../../__tests__/with-messaging';
import { internalTokenForUser, TestUserData, withCustomer, withEmployee } from '../../../../__tests__/with-user';

describe('One-on-One Thread History Resolver', () => {
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

  describe('Manager', () => {
    it('can start a feedback thread', async () => {
      const { client } = await withApp();

      const messageResponse = await sendFeedbackMessage(
        client,
        manager1,
        employee1,
        'MeetsExpectations',
        'Well done so far',
      );
      const messageId = messageResponse.body.data.sendFeedbackMessage.id;
      await sendReplyToUserThread(client, manager1, employee1, messageId, 'This was a good week, yes?');
      await sendReplyToUserThread(client, employee1, manager1, messageId, 'It could have been bgetter :/');
      await sendReplyToUserThread(client, manager1, employee1, messageId, `Let's try again next week.`);

      const historyResponse = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(employee1)}`)
        .send({
          query: `
        query GetThreadHistory($input: ThreadHistoryInput!) {
          getThreadHistory(input: $input) {
            id
          }
        }
      `,
          variables: {
            input: {
              userId: manager1.user._id.toString(),
              parentId: messageId,
            },
          },
        });
      expect(historyResponse.body.data.getThreadHistory).toHaveLength(3); // should NOT include the parent.
    });
  });
});
