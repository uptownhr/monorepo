//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import { UserRole } from '@bambeehr/consts';
import { ObjectId } from 'bson';
import { UserGroupType } from '../types/UserGroupType';
import { CreateUserGroupRepository } from './create-user-group.repository';

describe('CreateUserGroupRepository', () => {
  const model: any = { find(): any {} };
  const OWNER = {
    role: UserRole.User,
    _id: new ObjectId(),
    _manager: undefined,
    profile: {
      first_name: 'Owner',
      last_name: 'User',
      contractor: false,
    },
    permissions: { manager: false },
  };
  const ADMIN1 = {
    role: UserRole.User,
    _id: new ObjectId(),
    _manager: OWNER._id,
    profile: {
      first_name: 'Admin1',
      last_name: 'User',
      contractor: false,
    },
    permissions: { manager: false },
  };
  const ADMIN2 = {
    role: UserRole.User,
    _id: new ObjectId(),
    _manager: OWNER._id,
    profile: {
      first_name: 'Admin2',
      last_name: 'User',
      contractor: false,
    },
    permissions: { manager: false },
  };
  const MANAGER1 = {
    role: UserRole.Employee,
    _id: new ObjectId(),
    _manager: OWNER._id,
    profile: {
      first_name: 'Manager1',
      last_name: 'Employee',
      contractor: false,
    },
    permissions: { manager: true },
  };
  const MANAGER2 = {
    role: UserRole.Employee,
    _id: new ObjectId(),
    _manager: OWNER._id,
    profile: {
      first_name: 'Manager2',
      last_name: 'Employee',
      contractor: false,
    },
    permissions: { manager: true },
  };
  const EMPLOYEE1 = {
    role: UserRole.Employee,
    _id: new ObjectId(),
    _manager: MANAGER1._id,
    profile: {
      first_name: 'Employee1',
      last_name: 'Employee',
      contractor: false,
    },
    permissions: { manager: false },
  };
  const EMPLOYEE2 = {
    role: UserRole.Employee,
    _id: new ObjectId(),
    _manager: MANAGER1._id,
    profile: {
      first_name: 'Employee2',
      last_name: 'Employee',
      contractor: false,
    },
    permissions: { manager: false },
  };
  const CONTRACTOR1 = {
    role: UserRole.Employee,
    _id: new ObjectId(),
    _manager: MANAGER2._id,
    profile: {
      first_name: 'Contractor1',
      last_name: 'Employee',
      contractor: true,
    },
    permissions: { manager: false },
  };
  const CONTRACTOR2 = {
    role: UserRole.Employee,
    _id: new ObjectId(),
    _manager: MANAGER2._id,
    profile: {
      first_name: 'Contractor2',
      last_name: 'Employee',
      contractor: true,
    },
    permissions: { manager: false },
  };
  jest
    .spyOn(model, 'find')
    .mockResolvedValue([OWNER, ADMIN1, ADMIN2, MANAGER1, MANAGER2, EMPLOYEE1, EMPLOYEE2, CONTRACTOR1, CONTRACTOR2]);

  it('gets the admin group', async () => {
    const companyId = new ObjectId().toString();
    const repo = new CreateUserGroupRepository(model);
    await expect(repo.getGroupsByType(companyId, UserGroupType.Admin)).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: `company:${companyId}:${UserGroupType.Admin}`,
          name: 'All Admins',
          type: UserGroupType.Admin,
          members: [OWNER._id.toString(), ADMIN1._id.toString(), ADMIN2._id.toString()],
        }),
      ]),
    );
  });

  it('gets the (w-2) employees group', async () => {
    const companyId = new ObjectId().toString();
    const repo = new CreateUserGroupRepository(model);
    await expect(repo.getGroupsByType(companyId, UserGroupType.Employees)).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: `company:${companyId}:${UserGroupType.Employees}`,
          name: 'All Employees',
          type: UserGroupType.Employees,
          members: [
            MANAGER1._id.toString(),
            MANAGER2._id.toString(),
            EMPLOYEE1._id.toString(),
            EMPLOYEE2._id.toString(),
          ],
        }),
      ]),
    );
  });

  it('gets the (1099) contractors group', async () => {
    const companyId = new ObjectId().toString();
    const repo = new CreateUserGroupRepository(model);
    await expect(repo.getGroupsByType(companyId, UserGroupType.Contractors)).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: `company:${companyId}:${UserGroupType.Contractors}`,
          name: 'All Contractors',
          type: UserGroupType.Contractors,
          members: [CONTRACTOR1._id.toString(), CONTRACTOR2._id.toString()],
        }),
      ]),
    );
  });

  it('gets the managers group', async () => {
    const companyId = new ObjectId().toString();
    const repo = new CreateUserGroupRepository(model);
    await expect(repo.getGroupsByType(companyId, UserGroupType.Managers)).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: `company:${companyId}:${UserGroupType.Managers}`,
          name: 'All Managers',
          type: UserGroupType.Managers,
          members: [MANAGER1._id.toString(), MANAGER2._id.toString()],
        }),
      ]),
    );
  });

  it('gets the direct-reports groups', async () => {
    const companyId = new ObjectId().toString();
    const repo = new CreateUserGroupRepository(model);
    await expect(repo.getGroupsByType(companyId, UserGroupType.ManagersWithReports)).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: `company:${companyId}:${UserGroupType.ManagersWithReports}:${OWNER._id.toString()}`,
          name: "Owner User's Team",
          type: UserGroupType.ManagersWithReports,
          ownerId: OWNER._id.toString(),
          members: expect.arrayContaining([
            OWNER._id.toString(),
            ADMIN1._id.toString(),
            ADMIN2._id.toString(),
            MANAGER1._id.toString(),
            MANAGER2._id.toString(),
          ]),
        }),
        expect.objectContaining({
          id: `company:${companyId}:${UserGroupType.ManagersWithReports}:${MANAGER1._id.toString()}`,
          name: "Manager1 Employee's Team",
          type: UserGroupType.ManagersWithReports,
          ownerId: MANAGER1._id.toString(),
          members: expect.arrayContaining([
            MANAGER1._id.toString(),
            EMPLOYEE1._id.toString(),
            EMPLOYEE2._id.toString(),
          ]),
        }),
        expect.objectContaining({
          id: `company:${companyId}:${UserGroupType.ManagersWithReports}:${MANAGER2._id.toString()}`,
          name: "Manager2 Employee's Team",
          type: UserGroupType.ManagersWithReports,
          ownerId: MANAGER2._id.toString(),
          members: expect.arrayContaining([
            MANAGER2._id.toString(),
            CONTRACTOR1._id.toString(),
            CONTRACTOR2._id.toString(),
          ]),
        }),
      ]),
    );
  });
});
