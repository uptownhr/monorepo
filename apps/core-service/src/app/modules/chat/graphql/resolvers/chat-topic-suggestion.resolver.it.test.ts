//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { withApp } from '../../../../__tests__/test-helper';
import { internalTokenForUser, TestUserData, withCustomer, withEmployee } from '../../../../__tests__/with-user';

describe('ChatTopicSuggestionResolver', () => {
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
    it('can see the default suggestion', async () => {
      const { client } = await withApp();

      const response = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(customer)}`)
        .send({
          query: `
          query GetMySuggestedTopics {
            getMySuggestedTopics {
              type
              recipients {
                id
                profile {
                  firstName
                  lastName
                }
              }
            }
          }
        `,
        });

      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.getMySuggestedTopics).toMatchObject([
        {
          type: 'feedback',
          recipients: expect.arrayContaining([
            {
              id: manager1.user._id.toString(),
              profile: {
                firstName: manager1.user.profile.first_name,
                lastName: manager1.user.profile.last_name,
              },
            },
            {
              id: manager2.user._id.toString(),
              profile: {
                firstName: manager2.user.profile.first_name,
                lastName: manager2.user.profile.last_name,
              },
            },
          ]),
        },
      ]);
    });
  });
});
