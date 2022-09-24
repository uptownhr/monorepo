//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

export enum UserGroupType {
  Custom = 'custom',
  Employees = 'employees', // all W2 employees
  Contractors = 'contractors', // all W2 contractors
  Managers = 'managers', // all user.permission.manager === true
  Admin = 'admin', // all user.role === 'user'
  ManagersWithReports = 'managers-with-reports',
}
