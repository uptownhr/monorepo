
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.2.1
 * Query Engine version: 2920a97877e12e055c1333079b8d19cee7f33826
 */
Prisma.prismaVersion = {
  client: "4.2.1",
  engine: "2920a97877e12e055c1333079b8d19cee7f33826"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.AuthDeviceScalarFieldEnum = makeEnum({
  id: 'id',
  authId: 'authId',
  deviceId: 'deviceId',
  userAgent: 'userAgent'
});

exports.Prisma.AuthMfaChallengeAttemptScalarFieldEnum = makeEnum({
  id: 'id',
  authId: 'authId',
  createdAt: 'createdAt',
  wasSuccessful: 'wasSuccessful',
  authMfaChallengeId: 'authMfaChallengeId',
  authMfaConfigId: 'authMfaConfigId'
});

exports.Prisma.AuthMfaChallengeScalarFieldEnum = makeEnum({
  id: 'id',
  authId: 'authId',
  createdAt: 'createdAt',
  succeededAt: 'succeededAt',
  rememberUntil: 'rememberUntil',
  authDeviceId: 'authDeviceId',
  reason: 'reason',
  authMfaConfigId: 'authMfaConfigId'
});

exports.Prisma.AuthMfaConfigScalarFieldEnum = makeEnum({
  id: 'id',
  authId: 'authId',
  createdAt: 'createdAt',
  confirmedAt: 'confirmedAt',
  deletedAt: 'deletedAt',
  type: 'type',
  configuration: 'configuration'
});

exports.Prisma.CompanyRoleScalarFieldEnum = makeEnum({
  id: 'id',
  title: 'title',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  companyId: 'companyId'
});

exports.Prisma.CoreUserFeedbackScalarFieldEnum = makeEnum({
  id: 'id',
  byUserId: 'byUserId',
  forUserId: 'forUserId',
  createdAt: 'createdAt',
  channelId: 'channelId',
  messageId: 'messageId',
  message: 'message',
  value: 'value'
});

exports.Prisma.CoreUserGroupMembershipScalarFieldEnum = makeEnum({
  id: 'id',
  groupId: 'groupId',
  userId: 'userId'
});

exports.Prisma.CoreUserGroupScalarFieldEnum = makeEnum({
  id: 'id',
  companyId: 'companyId',
  type: 'type',
  name: 'name',
  ownerId: 'ownerId'
});

exports.Prisma.JsonNullValueFilter = makeEnum({
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
});

exports.Prisma.JsonNullValueInput = makeEnum({
  JsonNull: Prisma.JsonNull
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.WorkerRoleScalarFieldEnum = makeEnum({
  id: 'id',
  isPrimary: 'isPrimary',
  payRate: 'payRate',
  payType: 'payType',
  userId: 'userId',
  deletedAt: 'deletedAt',
  createdAt: 'createdAt',
  companyRoleId: 'companyRoleId'
});
exports.AuthMfaType = makeEnum({
  SMS: 'SMS',
  BACKUP: 'BACKUP',
  PASSWORD: 'PASSWORD'
});

exports.CoreUserFeedbackValue = makeEnum({
  BELOW_EXPECTATIONS: 'BELOW_EXPECTATIONS',
  MEETS_EXPECTATIONS: 'MEETS_EXPECTATIONS',
  ABOVE_EXPECTATIONS: 'ABOVE_EXPECTATIONS'
});

exports.CoreUserGroupType = makeEnum({
  CUSTOM: 'CUSTOM',
  EMPLOYEES: 'EMPLOYEES',
  CONTRACTORS: 'CONTRACTORS',
  MANAGERS: 'MANAGERS',
  ADMINS: 'ADMINS',
  MANAGERS_WITH_REPORTS: 'MANAGERS_WITH_REPORTS'
});

exports.WorkerRolePaytype = makeEnum({
  Hourly: 'Hourly',
  Salary: 'Salary',
  Contractor: 'Contractor'
});

exports.Prisma.ModelName = makeEnum({
  CoreUserGroup: 'CoreUserGroup',
  CoreUserGroupMembership: 'CoreUserGroupMembership',
  CoreUserFeedback: 'CoreUserFeedback',
  AuthMfaConfig: 'AuthMfaConfig',
  AuthDevice: 'AuthDevice',
  AuthMfaChallenge: 'AuthMfaChallenge',
  AuthMfaChallengeAttempt: 'AuthMfaChallengeAttempt',
  CompanyRole: 'CompanyRole',
  WorkerRole: 'WorkerRole'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
