//=============================================================================
//Licensed Materials - Property of Bambee
//(C) Copyright Bambee 2022
//All Rights Reserved
//=============================================================================

import type { CurrentUser } from '@bambeehr/authentication';
import { subject } from '@casl/ability';
import { createMock } from 'ts-auto-mock';
import type { CoreUserDTO } from '../dto';
import { userDtoAbility } from './core-user.acl';

describe('Core User DTO ACLs', () => {
  const HRM = createMock<CoreUserDTO>({
    id: 'hrm',
    roles: ['hrm'],
  });
  const hrmCurrentUser = createMock<CurrentUser>({
    userId: 'hrm',
    roles: ['hrm'],
  });
  const OWNER = createMock<CoreUserDTO>({
    id: 'owner-1',
    companyId: 'company-1',
    roles: ['company-owner', 'user'],
    employment: {
      title: 'Company Owner',
    },
  });
  const ownerCurrentUser = createMock<CurrentUser>({
    userId: 'owner-1',
    roles: ['company-owner', 'user'],
    companyId: 'company-1',
  });

  const OTHER_OWNER = createMock<CoreUserDTO>({
    id: 'owner-2',
    companyId: 'company-2',
    roles: ['company-owner', 'user'],
    employment: {
      title: 'Company Owner',
    },
  });

  const OTHER_ADMIN = createMock<CoreUserDTO>({
    id: 'admin-2',
    companyId: 'company-2',
    roles: ['user'],
    employment: {
      title: 'Company Admin',
    },
  });
  const OTHER_MANAGER = createMock<CoreUserDTO>({
    id: 'manager-2',
    companyId: 'company-2',
    roles: ['employee'],
    permissions: { manager: true },
    employment: { title: 'Manager', managerId: 'admin-2' },
  });
  const OTHER_EMPLOYEE2 = createMock<CoreUserDTO>({
    id: 'employee-2',
    companyId: 'company-2',
    roles: ['employee'],
    employment: { title: 'Employee', managerId: 'manager-2' },
  });

  const ADMIN = createMock<CoreUserDTO>({
    id: 'admin-1',
    companyId: 'company-1',
    roles: ['company-owner', 'user'],
    employment: { title: 'oOmpany Admin' },
  });

  const MANAGER = createMock<CoreUserDTO>({
    id: 'manager-1',
    companyId: 'company-1',
    roles: ['employee'],
    permissions: { manager: true },
    employment: { title: 'Manager', managerId: 'admin' },
  });

  const EMPLOYEE1 = createMock<CoreUserDTO>({
    id: 'employee-1',
    companyId: 'company-1',
    roles: ['employee'],
    employment: { title: 'Employee', managerId: 'manager-1' },
  });
  const employeeCurrentUser = createMock<CurrentUser>({
    userId: 'employee-1',
    companyId: 'company-1',
    roles: ['employee'],
  });

  const EMPLOYEE2 = createMock<CoreUserDTO>({
    id: 'employee-2',
    companyId: 'company-1',
    roles: ['employee'],
    employment: { title: 'Employee', managerId: 'manager-1' },
  });

  describe('HRM', () => {
    it('can see everything', () => {
      const ab = userDtoAbility(HRM as any);
      ab.relevantRuleFor('read', subject('CoreUserDTO', OWNER), 'employment.payType');
      expect(ab.can('read', subject('CoreUserDTO', OWNER), 'employment.payType')).toBeTruthy();
    });
  });

  describe('Company Owner', () => {
    it('Cannot see employee at another company', () => {
      expect(userDtoAbility(OWNER as any).can('read', subject('CoreUserDTO', OTHER_EMPLOYEE2))).toBeFalsy();
    });
    it('can see any employee information here', () => {
      expect(userDtoAbility(OWNER as any).can('read', subject('CoreUserDTO', EMPLOYEE1))).toBeTruthy();
    });
  });

  describe('Company Admin', () => {});

  describe('Manager', () => {});

  describe('Employee', () => {
    it('can see their own pay type', () => {
      const ability = userDtoAbility(employeeCurrentUser);
      const rules = ability.relevantRuleFor('read', subject('CoreUserDTO', EMPLOYEE1), 'employment.payType');
      expect(
        userDtoAbility(employeeCurrentUser).can('read', subject('CoreUserDTO', EMPLOYEE1), 'employment.payType'),
      ).toBeTruthy();
    });
    it('cannot see anothers pay type', () => {
      expect(
        userDtoAbility(employeeCurrentUser).can('read', subject('CoreUserDTO', EMPLOYEE2), 'employment.payType'),
      ).toBeFalsy();
    });
    it('can see anothers name', () => {
      expect(
        userDtoAbility(employeeCurrentUser).can('read', subject('CoreUserDTO', EMPLOYEE2), 'profile.firstName'),
      ).toBeTruthy();
    });
  });

  // for debugging
  describe('Specific case', () => {
    const cu = {
      authId: '629fa2669e2490bf3e7fb1f5',
      email: 'shanny45+629fa266bbac76d7d2234f32@yahoo.com',
      name: 'Sebastian Jacobson',
      roles: ['employee'],
      tokenType: 'masq-v2',
      userId: '629fa2669e2490bf3e7fb1f6',
      companyId: '629fa2669e2490bf3e7fb1e5',
      deviceId: 'device-id',
    };
    const dto = {
      id: '629fa2669e2490bf3e7fb1f2',
      companyId: '629fa2669e2490bf3e7fb1e5',
      active: true,
      createdAt: {},
      primaryRole: 'employee',
      roles: ['employee'],
      timeZone: '',
      profile: {
        email: 'parker.labadie+629fa266bbac76d7d2234f31@hotmail.com',
        firstName: 'Trenton',
        lastName: 'Oberbrunner',
        phone: '609.542.3763 x106',
        dob: {},
        address: {
          line1: '74755 Ara Forges',
          line2: 'Suite 058',
          city: 'Placentia',
          state: 'Minnesota',
          zipCode: '55981-0836',
        },
        avatarUrl: 'https://fake.co/img/s.png',
      },
      employment: {
        payType: 'contractor',
        employeeType: undefined,
        classification: undefined,
        payRate: '16',
        payDay: 'Sun',
        payFrequency: 'Weekly',
        hoursPerWeek: undefined,
        startDate: '2022-06-08T16:59:21.791Z',
        stateWorksIn: undefined,
        isContractor: false,
        contractorBusinessName: null,
        contractorType: undefined,
        title: 'Manager',
        supervisor: 'Ashtyn Wuckert',
        managerId: '629fa2669e2490bf3e7fb1e7',
      },
      settings: {
        zendeskOrgMembershipId: null,
        zendeskUserId: null,
        zendeskEmail: null,
        intercomUserId: null,
        intercomEmail: '',
        hrEmailAlias: '',
        slackUserId: '',
        salesforceUserId: '',
        salesforceContactId: null,
        vonageExtension: '',
        vonageNumber: '',
        calendlySlug: '',
        pandaContactId: null,
      },
      states: {
        emailNotification: true,
        onboardRequest: false,
        onboarded: false,
        terminationRequest: false,
        terminated: false,
        selfSignupRegistered: true,
        selfSignupActivated: true,
        resignationLastDate: null,
        resignationStatus: '',
        viewedOnboardingInstructions: undefined,
        viewedInsuranceIntroduction: false,
        interestedInPersonalInsurance: false,
        viewedPersonalInsurance: false,
        viewedCovid: false,
        viewedTaskCenter: false,
        viewedVideoTourBusinessHealth: false,
        viewedVideoTourCabinet: false,
        viewedVideoTourPolicy: false,
        viewedVideoTourReportCards: false,
        viewedVideoTourStaffFolder: false,
      },
      permissions: {
        manager: true,
        approver: false,
        canCancelAccount: false,
        canRetractSignedPolicies: false,
        canEditGlobalPolicies: false,
        canViewPayrollTab: false,
      },
      _auth: {
        id: '629fa2669e2490bf3e7fb1f1',
        username: 'parker.labadie+629fa266bbac76d7d2234f31@hotmail.com',
        email: 'parker.labadie+629fa266bbac76d7d2234f31@hotmail.com',
        tosAcceptedAt: null,
        _userId: undefined,
      },
      _company: {
        id: '629fa2669e2490bf3e7fb1e5',
        name: 'MacGyver Inc',
        address: {
          line1: '1629 Marge Expressway',
          line2: 'Suite 955',
          city: 'Castro Valley',
          state: 'Wyoming',
          zipCode: '67145-7326',
        },
      },
    };
    it('should work', () => {
      const ab = userDtoAbility(cu as any);
      const rule = ab.relevantRuleFor('read', subject('CoreUserDTO', dto as any), 'profile.firstName');
      expect(ab.can('read', subject('CoreUserDTO', dto as any), 'profile.firstName')).toBeTruthy();
    });
  });
});
