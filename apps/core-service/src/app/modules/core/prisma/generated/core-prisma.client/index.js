
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  decompressFromBase64,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index')


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

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
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


  const path = require('path')

const { findSync } = require('./runtime')
const fs = require('fs')

// some frameworks or bundlers replace or totally remove __dirname
const hasDirname = typeof __dirname !== 'undefined' && __dirname !== '/'

// will work in most cases, ie. if the client has not been bundled
const regularDirname = hasDirname && fs.existsSync(path.join(__dirname, 'schema.prisma')) && __dirname

// if the client has been bundled, we need to look for the folders
const foundDirname = !regularDirname && findSync(process.cwd(), [
    "apps/core-service/src/app/modules/core/prisma/generated/core-prisma.client",
    "core-service/src/app/modules/core/prisma/generated/core-prisma.client",
], ['d'], ['d'], 1)[0]

const dirname = regularDirname || foundDirname || __dirname

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

const dmmfString = "{\"datamodel\":{\"enums\":[{\"name\":\"CoreUserGroupType\",\"values\":[{\"name\":\"CUSTOM\",\"dbName\":null},{\"name\":\"EMPLOYEES\",\"dbName\":null},{\"name\":\"CONTRACTORS\",\"dbName\":null},{\"name\":\"MANAGERS\",\"dbName\":null},{\"name\":\"ADMINS\",\"dbName\":null},{\"name\":\"MANAGERS_WITH_REPORTS\",\"dbName\":null}],\"dbName\":null},{\"name\":\"CoreUserFeedbackValue\",\"values\":[{\"name\":\"BELOW_EXPECTATIONS\",\"dbName\":null},{\"name\":\"MEETS_EXPECTATIONS\",\"dbName\":null},{\"name\":\"ABOVE_EXPECTATIONS\",\"dbName\":null}],\"dbName\":null},{\"name\":\"AuthMfaType\",\"values\":[{\"name\":\"SMS\",\"dbName\":null},{\"name\":\"BACKUP\",\"dbName\":null},{\"name\":\"PASSWORD\",\"dbName\":null}],\"dbName\":null},{\"name\":\"WorkerRolePaytype\",\"values\":[{\"name\":\"Hourly\",\"dbName\":null},{\"name\":\"Salary\",\"dbName\":null},{\"name\":\"Contractor\",\"dbName\":null}],\"dbName\":null}],\"models\":[{\"name\":\"CoreUserGroup\",\"dbName\":\"core_user_group\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"companyId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"CoreUserGroupType\",\"default\":\"CUSTOM\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ownerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"members\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CoreUserGroupMembership\",\"relationName\":\"CoreUserGroupToCoreUserGroupMembership\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"CoreUserGroupMembership\",\"dbName\":\"core_user_group_membership\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groupId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CoreUserGroup\",\"relationName\":\"CoreUserGroupToCoreUserGroupMembership\",\"relationFromFields\":[\"groupId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"groupId\",\"userId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"groupId\",\"userId\"]}],\"isGenerated\":false},{\"name\":\"CoreUserFeedback\",\"dbName\":\"core_user_feedback\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"byUserId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"forUserId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"channelId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"messageId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"message\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"CoreUserFeedbackValue\",\"default\":\"MEETS_EXPECTATIONS\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"AuthMfaConfig\",\"dbName\":\"auth_mfa_config\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"confirmedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deletedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AuthMfaType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"configuration\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"AuthMfaChallenge\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AuthMfaChallenge\",\"relationName\":\"AuthMfaChallengeToAuthMfaConfig\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"AuthMfaChallengeAttempt\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AuthMfaChallengeAttempt\",\"relationName\":\"AuthMfaChallengeAttemptToAuthMfaConfig\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"AuthDevice\",\"dbName\":\"auth_mfa_device\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deviceId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userAgent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"AuthMfaChallenge\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AuthMfaChallenge\",\"relationName\":\"AuthDeviceToAuthMfaChallenge\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"authId\",\"deviceId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"authId\",\"deviceId\"]}],\"isGenerated\":false},{\"name\":\"AuthMfaChallenge\",\"dbName\":\"auth_mfa_challenge\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"succeededAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rememberUntil\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authDeviceId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authDevice\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AuthDevice\",\"relationName\":\"AuthDeviceToAuthMfaChallenge\",\"relationFromFields\":[\"authDeviceId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reason\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"AuthMfaChallengeAttempt\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AuthMfaChallengeAttempt\",\"relationName\":\"AuthMfaChallengeToAuthMfaChallengeAttempt\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"AuthMfaConfig\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AuthMfaConfig\",\"relationName\":\"AuthMfaChallengeToAuthMfaConfig\",\"relationFromFields\":[\"authMfaConfigId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authMfaConfigId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"AuthMfaChallengeAttempt\",\"dbName\":\"auth_mfa_challenge_attempt\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"wasSuccessful\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authMfaChallengeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"challenge\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AuthMfaChallenge\",\"relationName\":\"AuthMfaChallengeToAuthMfaChallengeAttempt\",\"relationFromFields\":[\"authMfaChallengeId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authMfaConfigId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authMfaConfig\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AuthMfaConfig\",\"relationName\":\"AuthMfaChallengeAttemptToAuthMfaConfig\",\"relationFromFields\":[\"authMfaConfigId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"CompanyRole\",\"dbName\":\"company_role\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deletedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"companyId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"workerRoles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"WorkerRole\",\"relationName\":\"CompanyRoleToWorkerRole\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"WorkerRole\",\"dbName\":\"worker_role\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isPrimary\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payRate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payType\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"WorkerRolePaytype\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deletedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"CompanyRole\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CompanyRole\",\"relationName\":\"CompanyRoleToWorkerRole\",\"relationFromFields\":[\"companyRoleId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"companyRoleId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}],\"types\":[]},\"mappings\":{\"modelOperations\":[{\"model\":\"CoreUserGroup\",\"plural\":\"coreUserGroups\",\"findUnique\":\"findUniqueCoreUserGroup\",\"findFirst\":\"findFirstCoreUserGroup\",\"findMany\":\"findManyCoreUserGroup\",\"create\":\"createOneCoreUserGroup\",\"createMany\":\"createManyCoreUserGroup\",\"delete\":\"deleteOneCoreUserGroup\",\"update\":\"updateOneCoreUserGroup\",\"deleteMany\":\"deleteManyCoreUserGroup\",\"updateMany\":\"updateManyCoreUserGroup\",\"upsert\":\"upsertOneCoreUserGroup\",\"aggregate\":\"aggregateCoreUserGroup\",\"groupBy\":\"groupByCoreUserGroup\"},{\"model\":\"CoreUserGroupMembership\",\"plural\":\"coreUserGroupMemberships\",\"findUnique\":\"findUniqueCoreUserGroupMembership\",\"findFirst\":\"findFirstCoreUserGroupMembership\",\"findMany\":\"findManyCoreUserGroupMembership\",\"create\":\"createOneCoreUserGroupMembership\",\"createMany\":\"createManyCoreUserGroupMembership\",\"delete\":\"deleteOneCoreUserGroupMembership\",\"update\":\"updateOneCoreUserGroupMembership\",\"deleteMany\":\"deleteManyCoreUserGroupMembership\",\"updateMany\":\"updateManyCoreUserGroupMembership\",\"upsert\":\"upsertOneCoreUserGroupMembership\",\"aggregate\":\"aggregateCoreUserGroupMembership\",\"groupBy\":\"groupByCoreUserGroupMembership\"},{\"model\":\"CoreUserFeedback\",\"plural\":\"coreUserFeedbacks\",\"findUnique\":\"findUniqueCoreUserFeedback\",\"findFirst\":\"findFirstCoreUserFeedback\",\"findMany\":\"findManyCoreUserFeedback\",\"create\":\"createOneCoreUserFeedback\",\"createMany\":\"createManyCoreUserFeedback\",\"delete\":\"deleteOneCoreUserFeedback\",\"update\":\"updateOneCoreUserFeedback\",\"deleteMany\":\"deleteManyCoreUserFeedback\",\"updateMany\":\"updateManyCoreUserFeedback\",\"upsert\":\"upsertOneCoreUserFeedback\",\"aggregate\":\"aggregateCoreUserFeedback\",\"groupBy\":\"groupByCoreUserFeedback\"},{\"model\":\"AuthMfaConfig\",\"plural\":\"authMfaConfigs\",\"findUnique\":\"findUniqueAuthMfaConfig\",\"findFirst\":\"findFirstAuthMfaConfig\",\"findMany\":\"findManyAuthMfaConfig\",\"create\":\"createOneAuthMfaConfig\",\"createMany\":\"createManyAuthMfaConfig\",\"delete\":\"deleteOneAuthMfaConfig\",\"update\":\"updateOneAuthMfaConfig\",\"deleteMany\":\"deleteManyAuthMfaConfig\",\"updateMany\":\"updateManyAuthMfaConfig\",\"upsert\":\"upsertOneAuthMfaConfig\",\"aggregate\":\"aggregateAuthMfaConfig\",\"groupBy\":\"groupByAuthMfaConfig\"},{\"model\":\"AuthDevice\",\"plural\":\"authDevices\",\"findUnique\":\"findUniqueAuthDevice\",\"findFirst\":\"findFirstAuthDevice\",\"findMany\":\"findManyAuthDevice\",\"create\":\"createOneAuthDevice\",\"createMany\":\"createManyAuthDevice\",\"delete\":\"deleteOneAuthDevice\",\"update\":\"updateOneAuthDevice\",\"deleteMany\":\"deleteManyAuthDevice\",\"updateMany\":\"updateManyAuthDevice\",\"upsert\":\"upsertOneAuthDevice\",\"aggregate\":\"aggregateAuthDevice\",\"groupBy\":\"groupByAuthDevice\"},{\"model\":\"AuthMfaChallenge\",\"plural\":\"authMfaChallenges\",\"findUnique\":\"findUniqueAuthMfaChallenge\",\"findFirst\":\"findFirstAuthMfaChallenge\",\"findMany\":\"findManyAuthMfaChallenge\",\"create\":\"createOneAuthMfaChallenge\",\"createMany\":\"createManyAuthMfaChallenge\",\"delete\":\"deleteOneAuthMfaChallenge\",\"update\":\"updateOneAuthMfaChallenge\",\"deleteMany\":\"deleteManyAuthMfaChallenge\",\"updateMany\":\"updateManyAuthMfaChallenge\",\"upsert\":\"upsertOneAuthMfaChallenge\",\"aggregate\":\"aggregateAuthMfaChallenge\",\"groupBy\":\"groupByAuthMfaChallenge\"},{\"model\":\"AuthMfaChallengeAttempt\",\"plural\":\"authMfaChallengeAttempts\",\"findUnique\":\"findUniqueAuthMfaChallengeAttempt\",\"findFirst\":\"findFirstAuthMfaChallengeAttempt\",\"findMany\":\"findManyAuthMfaChallengeAttempt\",\"create\":\"createOneAuthMfaChallengeAttempt\",\"createMany\":\"createManyAuthMfaChallengeAttempt\",\"delete\":\"deleteOneAuthMfaChallengeAttempt\",\"update\":\"updateOneAuthMfaChallengeAttempt\",\"deleteMany\":\"deleteManyAuthMfaChallengeAttempt\",\"updateMany\":\"updateManyAuthMfaChallengeAttempt\",\"upsert\":\"upsertOneAuthMfaChallengeAttempt\",\"aggregate\":\"aggregateAuthMfaChallengeAttempt\",\"groupBy\":\"groupByAuthMfaChallengeAttempt\"},{\"model\":\"CompanyRole\",\"plural\":\"companyRoles\",\"findUnique\":\"findUniqueCompanyRole\",\"findFirst\":\"findFirstCompanyRole\",\"findMany\":\"findManyCompanyRole\",\"create\":\"createOneCompanyRole\",\"createMany\":\"createManyCompanyRole\",\"delete\":\"deleteOneCompanyRole\",\"update\":\"updateOneCompanyRole\",\"deleteMany\":\"deleteManyCompanyRole\",\"updateMany\":\"updateManyCompanyRole\",\"upsert\":\"upsertOneCompanyRole\",\"aggregate\":\"aggregateCompanyRole\",\"groupBy\":\"groupByCompanyRole\"},{\"model\":\"WorkerRole\",\"plural\":\"workerRoles\",\"findUnique\":\"findUniqueWorkerRole\",\"findFirst\":\"findFirstWorkerRole\",\"findMany\":\"findManyWorkerRole\",\"create\":\"createOneWorkerRole\",\"createMany\":\"createManyWorkerRole\",\"delete\":\"deleteOneWorkerRole\",\"update\":\"updateOneWorkerRole\",\"deleteMany\":\"deleteManyWorkerRole\",\"updateMany\":\"updateManyWorkerRole\",\"upsert\":\"upsertOneWorkerRole\",\"aggregate\":\"aggregateWorkerRole\",\"groupBy\":\"groupByWorkerRole\"}],\"otherOperations\":{\"read\":[],\"write\":[\"executeRaw\",\"queryRaw\"]}}}"
const dmmf = JSON.parse(dmmfString)
exports.Prisma.dmmf = JSON.parse(dmmfString)

/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/home/uptown/Projects/uptownhr/uptownhr/apps/core-service/src/app/modules/core/prisma/generated/core-prisma.client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x"
      },
      {
        "fromEnvVar": null,
        "value": "linux-musl"
      },
      {
        "fromEnvVar": null,
        "value": "linux-arm64-openssl-1.1.x"
      },
      {
        "fromEnvVar": null,
        "value": "darwin-arm64"
      }
    ],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../../../../../../../../.env",
    "schemaEnvPath": "../../../../../../../../../.env"
  },
  "relativePath": "../..",
  "clientVersion": "4.2.1",
  "engineVersion": "2920a97877e12e055c1333079b8d19cee7f33826",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "dataProxy": false
}
config.document = dmmf
config.dirname = dirname




const { warnEnvConflicts } = require('./runtime/index')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

path.join(__dirname, "libquery_engine-debian-openssl-3.0.x.so.node");
path.join(process.cwd(), "apps/core-service/src/app/modules/core/prisma/generated/core-prisma.client/libquery_engine-debian-openssl-3.0.x.so.node")

path.join(__dirname, "libquery_engine-linux-musl.so.node");
path.join(process.cwd(), "apps/core-service/src/app/modules/core/prisma/generated/core-prisma.client/libquery_engine-linux-musl.so.node")

path.join(__dirname, "libquery_engine-linux-arm64-openssl-1.1.x.so.node");
path.join(process.cwd(), "apps/core-service/src/app/modules/core/prisma/generated/core-prisma.client/libquery_engine-linux-arm64-openssl-1.1.x.so.node")

path.join(__dirname, "libquery_engine-darwin-arm64.dylib.node");
path.join(process.cwd(), "apps/core-service/src/app/modules/core/prisma/generated/core-prisma.client/libquery_engine-darwin-arm64.dylib.node")
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "apps/core-service/src/app/modules/core/prisma/generated/core-prisma.client/schema.prisma")
