//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { AwsUtil } from '@bambeehr/aws-i12e';
import { faker } from '@faker-js/faker';
import { withApp, withAwsUtil } from '../../../../../__tests__/test-helper';
import {
  internalTokenForUser,
  TestUserData,
  withCustomer,
  withEmployee,
  withHrm,
} from '../../../../../__tests__/with-user';

describe('UserProfile Resolver', () => {
  let customer: TestUserData;
  let hrm: TestUserData;
  let manager: TestUserData;
  let employee: TestUserData;
  let employeeWithoutAddress: TestUserData;
  let other: TestUserData;
  let companyId: string;
  let awsUtil: AwsUtil;

  beforeEach(async function () {
    awsUtil = withAwsUtil();

    customer = await withCustomer({ profile: { role: 'Owner' } });
    other = await withCustomer();
    hrm = await withHrm();
    manager = await withEmployee(customer, customer, { profile: { role: 'Manager' } });
    employee = await withEmployee(customer, manager, { profile: { role: 'Employee' } });
    employeeWithoutAddress = await withEmployee(customer, manager, {
      profile: {
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        start_date: '',
        phone: '',
        dob: null,
        role: '',
      },
    });
    companyId = customer.company._id.toString();
  });

  describe('Employee', () => {
    it('can query with default address', async () => {
      const { client } = await withApp();
      const response = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(employeeWithoutAddress)}`)
        .send({
          query: `
          query GetMyCoreUser {
            getMyCoreUser {
              id
              employment {
                contractorBusinessName
                isContractor
                contractorType
                employeeType
                payRate
                payType
                startDate
                title
              }
              profile {
                firstName
                lastName
                dob
                phone
                email
                avatarUrl
                address {
                  city
                  line1
                  line2
                  state
                  zipCode
                }
              }
            }
          }
        `,
        });
      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.getMyCoreUser).toMatchObject({
        id: employeeWithoutAddress.user._id.toString(),
        profile: {
          firstName: employeeWithoutAddress.user.profile.first_name,
          lastName: employeeWithoutAddress.user.profile.last_name,
          email: employeeWithoutAddress.auth.email,
          avatarUrl: employeeWithoutAddress.user.profile.avatar_url,
          dob: null,
          phone: null,
          address: {
            line1: null,
            line2: null,
            city: null,
            state: null,
            zipCode: null,
          },
        },
      });
    });
    it('can query their own profile', async () => {
      //getMyCoreUser
      const { client } = await withApp();
      const response = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(employee)}`)
        .send({
          query: `
            query GetMyCoreUser {
              getMyCoreUser {
                id
                profile {
                  firstName
                  lastName
                  email
                  avatarUrl
                }
              }
            }
          `,
        });
      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.getMyCoreUser).toMatchObject({
        id: employee.user._id.toString(),
        profile: {
          firstName: employee.user.profile.first_name,
          lastName: employee.user.profile.last_name,
          email: employee.auth.email,
          avatarUrl: employee.user.profile.avatar_url,
        },
      });
    });

    it('can update their own profile', async () => {
      const { client } = await withApp();

      const response = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(employee)}`)
        .send({
          query: `
            query GetMyCoreUser {
              getMyCoreUser {
                id
                profile {
                  firstName
                  lastName
                  email
                }
              }
            }
          `,
        });

      const newFirstName = faker.name.firstName();
      const updateResponse = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(employee)}`)
        .send({
          query: `
          mutation UpdateUserProfile($userId: ID!, $input: CoreUserProfileInput!) {
            updateCoreUserProfile(id: $userId, input: $input) {
              firstName
              lastName
              email
            }
          }
        `,
          variables: {
            userId: employee.user._id.toString(),
            input: {
              firstName: newFirstName,
            },
          },
        });

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.errors).toBeUndefined();
      expect(updateResponse.body.data.updateCoreUserProfile).toMatchObject({
        firstName: newFirstName,
        lastName: employee.user.profile.last_name,
        email: employee.auth.email,
      });
    }, 25000);
  });

  it('can update an emergency contact', async () => {
    const { client } = await withApp();
    const name = faker.name.firstName();
    const email = faker.internet.email();
    const phone = faker.phone.number();
    const relationship = 'sister';

    const response = await client
      .post(`/graphql`)
      .set('Authorization', `Bearer ${internalTokenForUser(employee)}`)
      .send({
        query: `
            query GetMyCoreUser {
              getMyCoreUser {
                id
                profile {
                  emergencyContact {
                    name
                    relationship
                    phone
                    email
                  }
                }
              }
            }
          `,
      });

    expect(response.status).toBe(200);
    expect(response.body.data.getMyCoreUser.profile.emergencyContact).toMatchObject({
      name: null,
      email: null,
      phone: null,
      relationship: null,
    });
    const updateResponse = await client
      .post(`/graphql`)
      .set('Authorization', `Bearer ${internalTokenForUser(employee)}`)
      .send({
        query: `
          mutation UpdateUserProfile($userId: ID!, $input: CoreUserProfileInput!) {
            updateCoreUserProfile(id: $userId, input: $input) {
              emergencyContact {
                name
                relationship
                phone
                email
              }
            }
          }
        `,
        variables: {
          userId: employee.user._id.toString(),
          input: {
            emergencyContact: {
              name,
              email,
              phone,
              relationship,
            },
          },
        },
      });
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.data.updateCoreUserProfile.emergencyContact).toMatchObject({
      name,
      email,
      phone,
      relationship,
    });
  });
});
