//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { getModelToken } from '@nestjs/mongoose';
import { withApp } from '../../../../../__tests__/test-helper';
import {
  internalTokenForUser,
  TestUserData,
  withCustomer,
  withEmployee,
  withHrm,
} from '../../../../../__tests__/with-user';
import { User } from '../../../core-user/schemas/user.schema';

describe('Company Resolver', () => {
  let customer: TestUserData;
  let hrm: TestUserData;
  let manager: TestUserData;
  let employee: TestUserData;
  let other: TestUserData;
  let companyId: string;

  beforeAll(async function () {
    customer = await withCustomer({ profile: { role: 'Owner' } });
    other = await withCustomer();
    hrm = await withHrm();
    manager = await withEmployee(customer, customer, { profile: { role: 'Manager' } });
    employee = await withEmployee(customer, manager, { profile: { role: 'Employee' } });
    companyId = customer.company._id.toString();
  });

  describe('HRM', () => {
    it('can see the company', async () => {
      const { client } = await withApp();
      const response = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(hrm)}`)
        .send({
          query: `
        query GetCompany($id: ID!) {
          getCoreCompany(id: $id) {
            id
          }
        }
      `,
          variables: {
            id: companyId,
          },
        });
      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.getCoreCompany.id).toBe(companyId);
    });
  });
  describe('Owner', () => {
    it('can see the company', async () => {
      const { app, client } = await withApp();
      const userModel = await app.resolve(getModelToken(User.name));

      const response = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(customer)}`)
        .send({
          query: `
        query GetCompany($id: ID!) {
          getCoreCompany(id: $id) {
            id
            name
            employees {
              id
              profile {
                firstName
                lastName
                email
              }
              employment {
                title
                manager {
                  id
                  profile {
                    firstName
                    lastName
                    email
                  }
                  employment {
                    title
                  }
                }
              }
            }
          }
        }
      `,
          variables: {
            id: companyId,
          },
        });
      expect(response.status).toBe(200);
      expect(response.body.errors).toBeUndefined();
      expect(response.body.data.getCoreCompany).toEqual(
        expect.objectContaining({ id: companyId, name: customer.company.name }),
      );
      expect(response.body.data.getCoreCompany.employees).toHaveLength(3);
      expect(response.body.data.getCoreCompany.employees).toMatchObject([
        {
          id: customer.user._id.toString(),
          profile: {
            firstName: customer.user.profile.first_name,
            lastName: customer.user.profile.last_name,
            email: customer.auth.email,
          },
          employment: {
            title: 'Owner',
            manager: null,
          },
        },
        {
          id: manager.user._id.toString(),
          profile: {
            firstName: manager.user.profile.first_name,
            lastName: manager.user.profile.last_name,
            email: manager.auth.email,
          },
          employment: {
            title: 'Manager',
            manager: {
              id: customer.user._id.toString(),
              profile: {
                firstName: customer.user.profile.first_name,
                lastName: customer.user.profile.last_name,
                email: customer.auth.email,
              },
              employment: {
                title: 'Owner',
              },
            },
          },
        },
        {
          id: employee.user._id.toString(),
          profile: {
            firstName: employee.user.profile.first_name,
            lastName: employee.user.profile.last_name,
            email: employee.auth.email,
          },
          employment: {
            title: 'Employee',

            manager: {
              id: manager.user._id.toString(),
              profile: {
                firstName: manager.user.profile.first_name,
                lastName: manager.user.profile.last_name,
                email: manager.auth.email,
              },
              employment: {
                title: 'Manager',
              },
            },
          },
        },
      ]);
    });
  });

  describe('Employee', () => {
    it('can see the company', async () => {
      const { client } = await withApp();
      const response = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(employee)}`)
        .send({
          query: `
        query GetCompany($id: ID!) {
          getCoreCompany(id: $id) {
            id
          }
        }
      `,
          variables: {
            id: companyId,
          },
        });
      expect(response.body.errors).toBeUndefined();
    });

    it('can see partial data', async () => {
      const { client } = await withApp();
      const response = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(employee)}`)
        .send({
          query: `
        query GetCompany($id: ID!) {
          getCoreCompany(id: $id) {
            id
            employees {
              id
              profile {
                firstName
                lastName
                email
              }
              employment {
                title
              }
            }
          }
        }
      `,
          variables: {
            id: companyId,
          },
        });
      expect(response.body.data.getCoreCompany.employees).toMatchObject([
        {
          id: customer.user._id.toString(),
          profile: {
            firstName: customer.user.profile.first_name,
            lastName: customer.user.profile.last_name,
            email: customer.auth.email,
          },
          employment: {
            title: 'Owner',
          },
        },
        {
          id: manager.user._id.toString(),
          profile: {
            firstName: manager.user.profile.first_name,
            lastName: manager.user.profile.last_name,
            email: manager.auth.email,
          },
          employment: {
            title: 'Manager',
          },
        },
        {
          id: employee.user._id.toString(),
          profile: {
            firstName: employee.user.profile.first_name,
            lastName: employee.user.profile.last_name,
            email: employee.auth.email,
          },
          employment: {
            title: 'Employee',
            // manager: {
            //   id: manager.user._id.toString(),
            //   profile: {
            //     firstName: manager.user.profile.first_name,
            //     lastName: manager.user.profile.last_name,
            //     email: manager.auth.email,
            //   },
            //   employment: {
            //     title: 'Manager',
            //   },
            // },
          },
        },
      ]);
    });
  });

  describe('Other', () => {
    it('cannot see the company', async () => {
      const { client } = await withApp();
      const response = await client
        .post(`/graphql`)
        .set('Authorization', `Bearer ${internalTokenForUser(other)}`)
        .send({
          query: `
        query GetCompany($id: ID!) {
          getCoreCompany(id: $id) {
            id
          }
        }
      `,
          variables: {
            id: companyId,
          },
        });
      expect(response.body.errors[0].extensions.code).toBe('FORBIDDEN');
    });
  });
});
