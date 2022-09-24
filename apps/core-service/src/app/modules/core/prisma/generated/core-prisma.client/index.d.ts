
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model CoreUserGroup
 * 
 */
export type CoreUserGroup = {
  id: string
  companyId: string
  type: CoreUserGroupType
  name: string
  ownerId: string | null
}

/**
 * Model CoreUserGroupMembership
 * 
 */
export type CoreUserGroupMembership = {
  id: string
  groupId: string
  userId: string
}

/**
 * Model CoreUserFeedback
 * 
 */
export type CoreUserFeedback = {
  id: string
  byUserId: string
  forUserId: string
  createdAt: Date
  channelId: string | null
  messageId: bigint | null
  message: string | null
  value: CoreUserFeedbackValue
}

/**
 * Model AuthMfaConfig
 * 
 */
export type AuthMfaConfig = {
  id: string
  authId: string
  createdAt: Date
  confirmedAt: Date | null
  deletedAt: Date | null
  type: AuthMfaType
  configuration: Prisma.JsonValue
}

/**
 * Model AuthDevice
 * 
 */
export type AuthDevice = {
  id: string
  authId: string
  deviceId: string
  userAgent: string
}

/**
 * Model AuthMfaChallenge
 * 
 */
export type AuthMfaChallenge = {
  id: string
  authId: string
  createdAt: Date
  succeededAt: Date | null
  rememberUntil: Date
  authDeviceId: string
  reason: string | null
  authMfaConfigId: string | null
}

/**
 * Model AuthMfaChallengeAttempt
 * 
 */
export type AuthMfaChallengeAttempt = {
  id: string
  authId: string
  createdAt: Date
  wasSuccessful: boolean
  authMfaChallengeId: string
  authMfaConfigId: string
}

/**
 * Model CompanyRole
 * 
 */
export type CompanyRole = {
  id: string
  title: string
  deletedAt: Date | null
  createdAt: Date
  companyId: string
}

/**
 * Model WorkerRole
 * 
 */
export type WorkerRole = {
  id: string
  isPrimary: boolean
  payRate: Prisma.Decimal
  payType: WorkerRolePaytype
  userId: string
  deletedAt: Date | null
  createdAt: Date
  companyRoleId: string
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const AuthMfaType: {
  SMS: 'SMS',
  BACKUP: 'BACKUP',
  PASSWORD: 'PASSWORD'
};

export type AuthMfaType = (typeof AuthMfaType)[keyof typeof AuthMfaType]


export const CoreUserFeedbackValue: {
  BELOW_EXPECTATIONS: 'BELOW_EXPECTATIONS',
  MEETS_EXPECTATIONS: 'MEETS_EXPECTATIONS',
  ABOVE_EXPECTATIONS: 'ABOVE_EXPECTATIONS'
};

export type CoreUserFeedbackValue = (typeof CoreUserFeedbackValue)[keyof typeof CoreUserFeedbackValue]


export const CoreUserGroupType: {
  CUSTOM: 'CUSTOM',
  EMPLOYEES: 'EMPLOYEES',
  CONTRACTORS: 'CONTRACTORS',
  MANAGERS: 'MANAGERS',
  ADMINS: 'ADMINS',
  MANAGERS_WITH_REPORTS: 'MANAGERS_WITH_REPORTS'
};

export type CoreUserGroupType = (typeof CoreUserGroupType)[keyof typeof CoreUserGroupType]


export const WorkerRolePaytype: {
  Hourly: 'Hourly',
  Salary: 'Salary',
  Contractor: 'Contractor'
};

export type WorkerRolePaytype = (typeof WorkerRolePaytype)[keyof typeof WorkerRolePaytype]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more CoreUserGroups
 * const coreUserGroups = await prisma.coreUserGroup.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more CoreUserGroups
   * const coreUserGroups = await prisma.coreUserGroup.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.coreUserGroup`: Exposes CRUD operations for the **CoreUserGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CoreUserGroups
    * const coreUserGroups = await prisma.coreUserGroup.findMany()
    * ```
    */
  get coreUserGroup(): Prisma.CoreUserGroupDelegate<GlobalReject>;

  /**
   * `prisma.coreUserGroupMembership`: Exposes CRUD operations for the **CoreUserGroupMembership** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CoreUserGroupMemberships
    * const coreUserGroupMemberships = await prisma.coreUserGroupMembership.findMany()
    * ```
    */
  get coreUserGroupMembership(): Prisma.CoreUserGroupMembershipDelegate<GlobalReject>;

  /**
   * `prisma.coreUserFeedback`: Exposes CRUD operations for the **CoreUserFeedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CoreUserFeedbacks
    * const coreUserFeedbacks = await prisma.coreUserFeedback.findMany()
    * ```
    */
  get coreUserFeedback(): Prisma.CoreUserFeedbackDelegate<GlobalReject>;

  /**
   * `prisma.authMfaConfig`: Exposes CRUD operations for the **AuthMfaConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthMfaConfigs
    * const authMfaConfigs = await prisma.authMfaConfig.findMany()
    * ```
    */
  get authMfaConfig(): Prisma.AuthMfaConfigDelegate<GlobalReject>;

  /**
   * `prisma.authDevice`: Exposes CRUD operations for the **AuthDevice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthDevices
    * const authDevices = await prisma.authDevice.findMany()
    * ```
    */
  get authDevice(): Prisma.AuthDeviceDelegate<GlobalReject>;

  /**
   * `prisma.authMfaChallenge`: Exposes CRUD operations for the **AuthMfaChallenge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthMfaChallenges
    * const authMfaChallenges = await prisma.authMfaChallenge.findMany()
    * ```
    */
  get authMfaChallenge(): Prisma.AuthMfaChallengeDelegate<GlobalReject>;

  /**
   * `prisma.authMfaChallengeAttempt`: Exposes CRUD operations for the **AuthMfaChallengeAttempt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthMfaChallengeAttempts
    * const authMfaChallengeAttempts = await prisma.authMfaChallengeAttempt.findMany()
    * ```
    */
  get authMfaChallengeAttempt(): Prisma.AuthMfaChallengeAttemptDelegate<GlobalReject>;

  /**
   * `prisma.companyRole`: Exposes CRUD operations for the **CompanyRole** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompanyRoles
    * const companyRoles = await prisma.companyRole.findMany()
    * ```
    */
  get companyRole(): Prisma.CompanyRoleDelegate<GlobalReject>;

  /**
   * `prisma.workerRole`: Exposes CRUD operations for the **WorkerRole** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkerRoles
    * const workerRoles = await prisma.workerRole.findMany()
    * ```
    */
  get workerRole(): Prisma.WorkerRoleDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export import Metrics = runtime.Metrics
  export import Metric = runtime.Metric
  export import MetricHistogram = runtime.MetricHistogram
  export import MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
   * Prisma Client JS version: 4.2.1
   * Query Engine version: 2920a97877e12e055c1333079b8d19cee7f33826
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    CoreUserGroup: 'CoreUserGroup',
    CoreUserGroupMembership: 'CoreUserGroupMembership',
    CoreUserFeedback: 'CoreUserFeedback',
    AuthMfaConfig: 'AuthMfaConfig',
    AuthDevice: 'AuthDevice',
    AuthMfaChallenge: 'AuthMfaChallenge',
    AuthMfaChallengeAttempt: 'AuthMfaChallengeAttempt',
    CompanyRole: 'CompanyRole',
    WorkerRole: 'WorkerRole'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CoreUserGroupCountOutputType
   */


  export type CoreUserGroupCountOutputType = {
    members: number
  }

  export type CoreUserGroupCountOutputTypeSelect = {
    members?: boolean
  }

  export type CoreUserGroupCountOutputTypeGetPayload<
    S extends boolean | null | undefined | CoreUserGroupCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? CoreUserGroupCountOutputType
    : S extends undefined
    ? never
    : S extends CoreUserGroupCountOutputTypeArgs
    ?'include' extends U
    ? CoreUserGroupCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof CoreUserGroupCountOutputType ? CoreUserGroupCountOutputType[P] : never
  } 
    : CoreUserGroupCountOutputType
  : CoreUserGroupCountOutputType




  // Custom InputTypes

  /**
   * CoreUserGroupCountOutputType without action
   */
  export type CoreUserGroupCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the CoreUserGroupCountOutputType
     * 
    **/
    select?: CoreUserGroupCountOutputTypeSelect | null
  }



  /**
   * Count Type AuthMfaConfigCountOutputType
   */


  export type AuthMfaConfigCountOutputType = {
    AuthMfaChallenge: number
    AuthMfaChallengeAttempt: number
  }

  export type AuthMfaConfigCountOutputTypeSelect = {
    AuthMfaChallenge?: boolean
    AuthMfaChallengeAttempt?: boolean
  }

  export type AuthMfaConfigCountOutputTypeGetPayload<
    S extends boolean | null | undefined | AuthMfaConfigCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? AuthMfaConfigCountOutputType
    : S extends undefined
    ? never
    : S extends AuthMfaConfigCountOutputTypeArgs
    ?'include' extends U
    ? AuthMfaConfigCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof AuthMfaConfigCountOutputType ? AuthMfaConfigCountOutputType[P] : never
  } 
    : AuthMfaConfigCountOutputType
  : AuthMfaConfigCountOutputType




  // Custom InputTypes

  /**
   * AuthMfaConfigCountOutputType without action
   */
  export type AuthMfaConfigCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the AuthMfaConfigCountOutputType
     * 
    **/
    select?: AuthMfaConfigCountOutputTypeSelect | null
  }



  /**
   * Count Type AuthDeviceCountOutputType
   */


  export type AuthDeviceCountOutputType = {
    AuthMfaChallenge: number
  }

  export type AuthDeviceCountOutputTypeSelect = {
    AuthMfaChallenge?: boolean
  }

  export type AuthDeviceCountOutputTypeGetPayload<
    S extends boolean | null | undefined | AuthDeviceCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? AuthDeviceCountOutputType
    : S extends undefined
    ? never
    : S extends AuthDeviceCountOutputTypeArgs
    ?'include' extends U
    ? AuthDeviceCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof AuthDeviceCountOutputType ? AuthDeviceCountOutputType[P] : never
  } 
    : AuthDeviceCountOutputType
  : AuthDeviceCountOutputType




  // Custom InputTypes

  /**
   * AuthDeviceCountOutputType without action
   */
  export type AuthDeviceCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the AuthDeviceCountOutputType
     * 
    **/
    select?: AuthDeviceCountOutputTypeSelect | null
  }



  /**
   * Count Type AuthMfaChallengeCountOutputType
   */


  export type AuthMfaChallengeCountOutputType = {
    AuthMfaChallengeAttempt: number
  }

  export type AuthMfaChallengeCountOutputTypeSelect = {
    AuthMfaChallengeAttempt?: boolean
  }

  export type AuthMfaChallengeCountOutputTypeGetPayload<
    S extends boolean | null | undefined | AuthMfaChallengeCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? AuthMfaChallengeCountOutputType
    : S extends undefined
    ? never
    : S extends AuthMfaChallengeCountOutputTypeArgs
    ?'include' extends U
    ? AuthMfaChallengeCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof AuthMfaChallengeCountOutputType ? AuthMfaChallengeCountOutputType[P] : never
  } 
    : AuthMfaChallengeCountOutputType
  : AuthMfaChallengeCountOutputType




  // Custom InputTypes

  /**
   * AuthMfaChallengeCountOutputType without action
   */
  export type AuthMfaChallengeCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the AuthMfaChallengeCountOutputType
     * 
    **/
    select?: AuthMfaChallengeCountOutputTypeSelect | null
  }



  /**
   * Count Type CompanyRoleCountOutputType
   */


  export type CompanyRoleCountOutputType = {
    workerRoles: number
  }

  export type CompanyRoleCountOutputTypeSelect = {
    workerRoles?: boolean
  }

  export type CompanyRoleCountOutputTypeGetPayload<
    S extends boolean | null | undefined | CompanyRoleCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? CompanyRoleCountOutputType
    : S extends undefined
    ? never
    : S extends CompanyRoleCountOutputTypeArgs
    ?'include' extends U
    ? CompanyRoleCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof CompanyRoleCountOutputType ? CompanyRoleCountOutputType[P] : never
  } 
    : CompanyRoleCountOutputType
  : CompanyRoleCountOutputType




  // Custom InputTypes

  /**
   * CompanyRoleCountOutputType without action
   */
  export type CompanyRoleCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the CompanyRoleCountOutputType
     * 
    **/
    select?: CompanyRoleCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model CoreUserGroup
   */


  export type AggregateCoreUserGroup = {
    _count: CoreUserGroupCountAggregateOutputType | null
    _min: CoreUserGroupMinAggregateOutputType | null
    _max: CoreUserGroupMaxAggregateOutputType | null
  }

  export type CoreUserGroupMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    type: CoreUserGroupType | null
    name: string | null
    ownerId: string | null
  }

  export type CoreUserGroupMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    type: CoreUserGroupType | null
    name: string | null
    ownerId: string | null
  }

  export type CoreUserGroupCountAggregateOutputType = {
    id: number
    companyId: number
    type: number
    name: number
    ownerId: number
    _all: number
  }


  export type CoreUserGroupMinAggregateInputType = {
    id?: true
    companyId?: true
    type?: true
    name?: true
    ownerId?: true
  }

  export type CoreUserGroupMaxAggregateInputType = {
    id?: true
    companyId?: true
    type?: true
    name?: true
    ownerId?: true
  }

  export type CoreUserGroupCountAggregateInputType = {
    id?: true
    companyId?: true
    type?: true
    name?: true
    ownerId?: true
    _all?: true
  }

  export type CoreUserGroupAggregateArgs = {
    /**
     * Filter which CoreUserGroup to aggregate.
     * 
    **/
    where?: CoreUserGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreUserGroups to fetch.
     * 
    **/
    orderBy?: Enumerable<CoreUserGroupOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CoreUserGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreUserGroups from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreUserGroups.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CoreUserGroups
    **/
    _count?: true | CoreUserGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CoreUserGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CoreUserGroupMaxAggregateInputType
  }

  export type GetCoreUserGroupAggregateType<T extends CoreUserGroupAggregateArgs> = {
        [P in keyof T & keyof AggregateCoreUserGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCoreUserGroup[P]>
      : GetScalarType<T[P], AggregateCoreUserGroup[P]>
  }




  export type CoreUserGroupGroupByArgs = {
    where?: CoreUserGroupWhereInput
    orderBy?: Enumerable<CoreUserGroupOrderByWithAggregationInput>
    by: Array<CoreUserGroupScalarFieldEnum>
    having?: CoreUserGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CoreUserGroupCountAggregateInputType | true
    _min?: CoreUserGroupMinAggregateInputType
    _max?: CoreUserGroupMaxAggregateInputType
  }


  export type CoreUserGroupGroupByOutputType = {
    id: string
    companyId: string
    type: CoreUserGroupType
    name: string
    ownerId: string | null
    _count: CoreUserGroupCountAggregateOutputType | null
    _min: CoreUserGroupMinAggregateOutputType | null
    _max: CoreUserGroupMaxAggregateOutputType | null
  }

  type GetCoreUserGroupGroupByPayload<T extends CoreUserGroupGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CoreUserGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CoreUserGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CoreUserGroupGroupByOutputType[P]>
            : GetScalarType<T[P], CoreUserGroupGroupByOutputType[P]>
        }
      >
    >


  export type CoreUserGroupSelect = {
    id?: boolean
    companyId?: boolean
    type?: boolean
    name?: boolean
    ownerId?: boolean
    members?: boolean | CoreUserGroupMembershipFindManyArgs
    _count?: boolean | CoreUserGroupCountOutputTypeArgs
  }

  export type CoreUserGroupInclude = {
    members?: boolean | CoreUserGroupMembershipFindManyArgs
    _count?: boolean | CoreUserGroupCountOutputTypeArgs
  }

  export type CoreUserGroupGetPayload<
    S extends boolean | null | undefined | CoreUserGroupArgs,
    U = keyof S
      > = S extends true
        ? CoreUserGroup
    : S extends undefined
    ? never
    : S extends CoreUserGroupArgs | CoreUserGroupFindManyArgs
    ?'include' extends U
    ? CoreUserGroup  & {
    [P in TrueKeys<S['include']>]:
        P extends 'members' ? Array < CoreUserGroupMembershipGetPayload<S['include'][P]>>  :
        P extends '_count' ? CoreUserGroupCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'members' ? Array < CoreUserGroupMembershipGetPayload<S['select'][P]>>  :
        P extends '_count' ? CoreUserGroupCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof CoreUserGroup ? CoreUserGroup[P] : never
  } 
    : CoreUserGroup
  : CoreUserGroup


  type CoreUserGroupCountArgs = Merge<
    Omit<CoreUserGroupFindManyArgs, 'select' | 'include'> & {
      select?: CoreUserGroupCountAggregateInputType | true
    }
  >

  export interface CoreUserGroupDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one CoreUserGroup that matches the filter.
     * @param {CoreUserGroupFindUniqueArgs} args - Arguments to find a CoreUserGroup
     * @example
     * // Get one CoreUserGroup
     * const coreUserGroup = await prisma.coreUserGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CoreUserGroupFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CoreUserGroupFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'CoreUserGroup'> extends True ? CheckSelect<T, Prisma__CoreUserGroupClient<CoreUserGroup>, Prisma__CoreUserGroupClient<CoreUserGroupGetPayload<T>>> : CheckSelect<T, Prisma__CoreUserGroupClient<CoreUserGroup | null >, Prisma__CoreUserGroupClient<CoreUserGroupGetPayload<T> | null >>

    /**
     * Find the first CoreUserGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserGroupFindFirstArgs} args - Arguments to find a CoreUserGroup
     * @example
     * // Get one CoreUserGroup
     * const coreUserGroup = await prisma.coreUserGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CoreUserGroupFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CoreUserGroupFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'CoreUserGroup'> extends True ? CheckSelect<T, Prisma__CoreUserGroupClient<CoreUserGroup>, Prisma__CoreUserGroupClient<CoreUserGroupGetPayload<T>>> : CheckSelect<T, Prisma__CoreUserGroupClient<CoreUserGroup | null >, Prisma__CoreUserGroupClient<CoreUserGroupGetPayload<T> | null >>

    /**
     * Find zero or more CoreUserGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserGroupFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CoreUserGroups
     * const coreUserGroups = await prisma.coreUserGroup.findMany()
     * 
     * // Get first 10 CoreUserGroups
     * const coreUserGroups = await prisma.coreUserGroup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const coreUserGroupWithIdOnly = await prisma.coreUserGroup.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CoreUserGroupFindManyArgs>(
      args?: SelectSubset<T, CoreUserGroupFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<CoreUserGroup>>, PrismaPromise<Array<CoreUserGroupGetPayload<T>>>>

    /**
     * Create a CoreUserGroup.
     * @param {CoreUserGroupCreateArgs} args - Arguments to create a CoreUserGroup.
     * @example
     * // Create one CoreUserGroup
     * const CoreUserGroup = await prisma.coreUserGroup.create({
     *   data: {
     *     // ... data to create a CoreUserGroup
     *   }
     * })
     * 
    **/
    create<T extends CoreUserGroupCreateArgs>(
      args: SelectSubset<T, CoreUserGroupCreateArgs>
    ): CheckSelect<T, Prisma__CoreUserGroupClient<CoreUserGroup>, Prisma__CoreUserGroupClient<CoreUserGroupGetPayload<T>>>

    /**
     * Create many CoreUserGroups.
     *     @param {CoreUserGroupCreateManyArgs} args - Arguments to create many CoreUserGroups.
     *     @example
     *     // Create many CoreUserGroups
     *     const coreUserGroup = await prisma.coreUserGroup.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CoreUserGroupCreateManyArgs>(
      args?: SelectSubset<T, CoreUserGroupCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a CoreUserGroup.
     * @param {CoreUserGroupDeleteArgs} args - Arguments to delete one CoreUserGroup.
     * @example
     * // Delete one CoreUserGroup
     * const CoreUserGroup = await prisma.coreUserGroup.delete({
     *   where: {
     *     // ... filter to delete one CoreUserGroup
     *   }
     * })
     * 
    **/
    delete<T extends CoreUserGroupDeleteArgs>(
      args: SelectSubset<T, CoreUserGroupDeleteArgs>
    ): CheckSelect<T, Prisma__CoreUserGroupClient<CoreUserGroup>, Prisma__CoreUserGroupClient<CoreUserGroupGetPayload<T>>>

    /**
     * Update one CoreUserGroup.
     * @param {CoreUserGroupUpdateArgs} args - Arguments to update one CoreUserGroup.
     * @example
     * // Update one CoreUserGroup
     * const coreUserGroup = await prisma.coreUserGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CoreUserGroupUpdateArgs>(
      args: SelectSubset<T, CoreUserGroupUpdateArgs>
    ): CheckSelect<T, Prisma__CoreUserGroupClient<CoreUserGroup>, Prisma__CoreUserGroupClient<CoreUserGroupGetPayload<T>>>

    /**
     * Delete zero or more CoreUserGroups.
     * @param {CoreUserGroupDeleteManyArgs} args - Arguments to filter CoreUserGroups to delete.
     * @example
     * // Delete a few CoreUserGroups
     * const { count } = await prisma.coreUserGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CoreUserGroupDeleteManyArgs>(
      args?: SelectSubset<T, CoreUserGroupDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more CoreUserGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CoreUserGroups
     * const coreUserGroup = await prisma.coreUserGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CoreUserGroupUpdateManyArgs>(
      args: SelectSubset<T, CoreUserGroupUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one CoreUserGroup.
     * @param {CoreUserGroupUpsertArgs} args - Arguments to update or create a CoreUserGroup.
     * @example
     * // Update or create a CoreUserGroup
     * const coreUserGroup = await prisma.coreUserGroup.upsert({
     *   create: {
     *     // ... data to create a CoreUserGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CoreUserGroup we want to update
     *   }
     * })
    **/
    upsert<T extends CoreUserGroupUpsertArgs>(
      args: SelectSubset<T, CoreUserGroupUpsertArgs>
    ): CheckSelect<T, Prisma__CoreUserGroupClient<CoreUserGroup>, Prisma__CoreUserGroupClient<CoreUserGroupGetPayload<T>>>

    /**
     * Find one CoreUserGroup that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {CoreUserGroupFindUniqueOrThrowArgs} args - Arguments to find a CoreUserGroup
     * @example
     * // Get one CoreUserGroup
     * const coreUserGroup = await prisma.coreUserGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CoreUserGroupFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CoreUserGroupFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__CoreUserGroupClient<CoreUserGroup>, Prisma__CoreUserGroupClient<CoreUserGroupGetPayload<T>>>

    /**
     * Find the first CoreUserGroup that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserGroupFindFirstOrThrowArgs} args - Arguments to find a CoreUserGroup
     * @example
     * // Get one CoreUserGroup
     * const coreUserGroup = await prisma.coreUserGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CoreUserGroupFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CoreUserGroupFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__CoreUserGroupClient<CoreUserGroup>, Prisma__CoreUserGroupClient<CoreUserGroupGetPayload<T>>>

    /**
     * Count the number of CoreUserGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserGroupCountArgs} args - Arguments to filter CoreUserGroups to count.
     * @example
     * // Count the number of CoreUserGroups
     * const count = await prisma.coreUserGroup.count({
     *   where: {
     *     // ... the filter for the CoreUserGroups we want to count
     *   }
     * })
    **/
    count<T extends CoreUserGroupCountArgs>(
      args?: Subset<T, CoreUserGroupCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CoreUserGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CoreUserGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CoreUserGroupAggregateArgs>(args: Subset<T, CoreUserGroupAggregateArgs>): PrismaPromise<GetCoreUserGroupAggregateType<T>>

    /**
     * Group by CoreUserGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserGroupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CoreUserGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CoreUserGroupGroupByArgs['orderBy'] }
        : { orderBy?: CoreUserGroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CoreUserGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCoreUserGroupGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for CoreUserGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CoreUserGroupClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    members<T extends CoreUserGroupMembershipFindManyArgs = {}>(args?: Subset<T, CoreUserGroupMembershipFindManyArgs>): CheckSelect<T, PrismaPromise<Array<CoreUserGroupMembership>>, PrismaPromise<Array<CoreUserGroupMembershipGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * CoreUserGroup base type for findUnique actions
   */
  export type CoreUserGroupFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the CoreUserGroup
     * 
    **/
    select?: CoreUserGroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CoreUserGroupInclude | null
    /**
     * Filter, which CoreUserGroup to fetch.
     * 
    **/
    where: CoreUserGroupWhereUniqueInput
  }

  /**
   * CoreUserGroup: findUnique
   */
  export interface CoreUserGroupFindUniqueArgs extends CoreUserGroupFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CoreUserGroup base type for findFirst actions
   */
  export type CoreUserGroupFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the CoreUserGroup
     * 
    **/
    select?: CoreUserGroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CoreUserGroupInclude | null
    /**
     * Filter, which CoreUserGroup to fetch.
     * 
    **/
    where?: CoreUserGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreUserGroups to fetch.
     * 
    **/
    orderBy?: Enumerable<CoreUserGroupOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CoreUserGroups.
     * 
    **/
    cursor?: CoreUserGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreUserGroups from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreUserGroups.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CoreUserGroups.
     * 
    **/
    distinct?: Enumerable<CoreUserGroupScalarFieldEnum>
  }

  /**
   * CoreUserGroup: findFirst
   */
  export interface CoreUserGroupFindFirstArgs extends CoreUserGroupFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CoreUserGroup findMany
   */
  export type CoreUserGroupFindManyArgs = {
    /**
     * Select specific fields to fetch from the CoreUserGroup
     * 
    **/
    select?: CoreUserGroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CoreUserGroupInclude | null
    /**
     * Filter, which CoreUserGroups to fetch.
     * 
    **/
    where?: CoreUserGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreUserGroups to fetch.
     * 
    **/
    orderBy?: Enumerable<CoreUserGroupOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CoreUserGroups.
     * 
    **/
    cursor?: CoreUserGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreUserGroups from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreUserGroups.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CoreUserGroupScalarFieldEnum>
  }


  /**
   * CoreUserGroup create
   */
  export type CoreUserGroupCreateArgs = {
    /**
     * Select specific fields to fetch from the CoreUserGroup
     * 
    **/
    select?: CoreUserGroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CoreUserGroupInclude | null
    /**
     * The data needed to create a CoreUserGroup.
     * 
    **/
    data: XOR<CoreUserGroupCreateInput, CoreUserGroupUncheckedCreateInput>
  }


  /**
   * CoreUserGroup createMany
   */
  export type CoreUserGroupCreateManyArgs = {
    /**
     * The data used to create many CoreUserGroups.
     * 
    **/
    data: Enumerable<CoreUserGroupCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * CoreUserGroup update
   */
  export type CoreUserGroupUpdateArgs = {
    /**
     * Select specific fields to fetch from the CoreUserGroup
     * 
    **/
    select?: CoreUserGroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CoreUserGroupInclude | null
    /**
     * The data needed to update a CoreUserGroup.
     * 
    **/
    data: XOR<CoreUserGroupUpdateInput, CoreUserGroupUncheckedUpdateInput>
    /**
     * Choose, which CoreUserGroup to update.
     * 
    **/
    where: CoreUserGroupWhereUniqueInput
  }


  /**
   * CoreUserGroup updateMany
   */
  export type CoreUserGroupUpdateManyArgs = {
    /**
     * The data used to update CoreUserGroups.
     * 
    **/
    data: XOR<CoreUserGroupUpdateManyMutationInput, CoreUserGroupUncheckedUpdateManyInput>
    /**
     * Filter which CoreUserGroups to update
     * 
    **/
    where?: CoreUserGroupWhereInput
  }


  /**
   * CoreUserGroup upsert
   */
  export type CoreUserGroupUpsertArgs = {
    /**
     * Select specific fields to fetch from the CoreUserGroup
     * 
    **/
    select?: CoreUserGroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CoreUserGroupInclude | null
    /**
     * The filter to search for the CoreUserGroup to update in case it exists.
     * 
    **/
    where: CoreUserGroupWhereUniqueInput
    /**
     * In case the CoreUserGroup found by the `where` argument doesn't exist, create a new CoreUserGroup with this data.
     * 
    **/
    create: XOR<CoreUserGroupCreateInput, CoreUserGroupUncheckedCreateInput>
    /**
     * In case the CoreUserGroup was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CoreUserGroupUpdateInput, CoreUserGroupUncheckedUpdateInput>
  }


  /**
   * CoreUserGroup delete
   */
  export type CoreUserGroupDeleteArgs = {
    /**
     * Select specific fields to fetch from the CoreUserGroup
     * 
    **/
    select?: CoreUserGroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CoreUserGroupInclude | null
    /**
     * Filter which CoreUserGroup to delete.
     * 
    **/
    where: CoreUserGroupWhereUniqueInput
  }


  /**
   * CoreUserGroup deleteMany
   */
  export type CoreUserGroupDeleteManyArgs = {
    /**
     * Filter which CoreUserGroups to delete
     * 
    **/
    where?: CoreUserGroupWhereInput
  }


  /**
   * CoreUserGroup: findUniqueOrThrow
   */
  export type CoreUserGroupFindUniqueOrThrowArgs = CoreUserGroupFindUniqueArgsBase
      

  /**
   * CoreUserGroup: findFirstOrThrow
   */
  export type CoreUserGroupFindFirstOrThrowArgs = CoreUserGroupFindFirstArgsBase
      

  /**
   * CoreUserGroup without action
   */
  export type CoreUserGroupArgs = {
    /**
     * Select specific fields to fetch from the CoreUserGroup
     * 
    **/
    select?: CoreUserGroupSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CoreUserGroupInclude | null
  }



  /**
   * Model CoreUserGroupMembership
   */


  export type AggregateCoreUserGroupMembership = {
    _count: CoreUserGroupMembershipCountAggregateOutputType | null
    _min: CoreUserGroupMembershipMinAggregateOutputType | null
    _max: CoreUserGroupMembershipMaxAggregateOutputType | null
  }

  export type CoreUserGroupMembershipMinAggregateOutputType = {
    id: string | null
    groupId: string | null
    userId: string | null
  }

  export type CoreUserGroupMembershipMaxAggregateOutputType = {
    id: string | null
    groupId: string | null
    userId: string | null
  }

  export type CoreUserGroupMembershipCountAggregateOutputType = {
    id: number
    groupId: number
    userId: number
    _all: number
  }


  export type CoreUserGroupMembershipMinAggregateInputType = {
    id?: true
    groupId?: true
    userId?: true
  }

  export type CoreUserGroupMembershipMaxAggregateInputType = {
    id?: true
    groupId?: true
    userId?: true
  }

  export type CoreUserGroupMembershipCountAggregateInputType = {
    id?: true
    groupId?: true
    userId?: true
    _all?: true
  }

  export type CoreUserGroupMembershipAggregateArgs = {
    /**
     * Filter which CoreUserGroupMembership to aggregate.
     * 
    **/
    where?: CoreUserGroupMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreUserGroupMemberships to fetch.
     * 
    **/
    orderBy?: Enumerable<CoreUserGroupMembershipOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CoreUserGroupMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreUserGroupMemberships from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreUserGroupMemberships.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CoreUserGroupMemberships
    **/
    _count?: true | CoreUserGroupMembershipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CoreUserGroupMembershipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CoreUserGroupMembershipMaxAggregateInputType
  }

  export type GetCoreUserGroupMembershipAggregateType<T extends CoreUserGroupMembershipAggregateArgs> = {
        [P in keyof T & keyof AggregateCoreUserGroupMembership]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCoreUserGroupMembership[P]>
      : GetScalarType<T[P], AggregateCoreUserGroupMembership[P]>
  }




  export type CoreUserGroupMembershipGroupByArgs = {
    where?: CoreUserGroupMembershipWhereInput
    orderBy?: Enumerable<CoreUserGroupMembershipOrderByWithAggregationInput>
    by: Array<CoreUserGroupMembershipScalarFieldEnum>
    having?: CoreUserGroupMembershipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CoreUserGroupMembershipCountAggregateInputType | true
    _min?: CoreUserGroupMembershipMinAggregateInputType
    _max?: CoreUserGroupMembershipMaxAggregateInputType
  }


  export type CoreUserGroupMembershipGroupByOutputType = {
    id: string
    groupId: string
    userId: string
    _count: CoreUserGroupMembershipCountAggregateOutputType | null
    _min: CoreUserGroupMembershipMinAggregateOutputType | null
    _max: CoreUserGroupMembershipMaxAggregateOutputType | null
  }

  type GetCoreUserGroupMembershipGroupByPayload<T extends CoreUserGroupMembershipGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CoreUserGroupMembershipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CoreUserGroupMembershipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CoreUserGroupMembershipGroupByOutputType[P]>
            : GetScalarType<T[P], CoreUserGroupMembershipGroupByOutputType[P]>
        }
      >
    >


  export type CoreUserGroupMembershipSelect = {
    id?: boolean
    groupId?: boolean
    userId?: boolean
    group?: boolean | CoreUserGroupArgs
  }

  export type CoreUserGroupMembershipInclude = {
    group?: boolean | CoreUserGroupArgs
  }

  export type CoreUserGroupMembershipGetPayload<
    S extends boolean | null | undefined | CoreUserGroupMembershipArgs,
    U = keyof S
      > = S extends true
        ? CoreUserGroupMembership
    : S extends undefined
    ? never
    : S extends CoreUserGroupMembershipArgs | CoreUserGroupMembershipFindManyArgs
    ?'include' extends U
    ? CoreUserGroupMembership  & {
    [P in TrueKeys<S['include']>]:
        P extends 'group' ? CoreUserGroupGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'group' ? CoreUserGroupGetPayload<S['select'][P]> :  P extends keyof CoreUserGroupMembership ? CoreUserGroupMembership[P] : never
  } 
    : CoreUserGroupMembership
  : CoreUserGroupMembership


  type CoreUserGroupMembershipCountArgs = Merge<
    Omit<CoreUserGroupMembershipFindManyArgs, 'select' | 'include'> & {
      select?: CoreUserGroupMembershipCountAggregateInputType | true
    }
  >

  export interface CoreUserGroupMembershipDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one CoreUserGroupMembership that matches the filter.
     * @param {CoreUserGroupMembershipFindUniqueArgs} args - Arguments to find a CoreUserGroupMembership
     * @example
     * // Get one CoreUserGroupMembership
     * const coreUserGroupMembership = await prisma.coreUserGroupMembership.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CoreUserGroupMembershipFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CoreUserGroupMembershipFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'CoreUserGroupMembership'> extends True ? CheckSelect<T, Prisma__CoreUserGroupMembershipClient<CoreUserGroupMembership>, Prisma__CoreUserGroupMembershipClient<CoreUserGroupMembershipGetPayload<T>>> : CheckSelect<T, Prisma__CoreUserGroupMembershipClient<CoreUserGroupMembership | null >, Prisma__CoreUserGroupMembershipClient<CoreUserGroupMembershipGetPayload<T> | null >>

    /**
     * Find the first CoreUserGroupMembership that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserGroupMembershipFindFirstArgs} args - Arguments to find a CoreUserGroupMembership
     * @example
     * // Get one CoreUserGroupMembership
     * const coreUserGroupMembership = await prisma.coreUserGroupMembership.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CoreUserGroupMembershipFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CoreUserGroupMembershipFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'CoreUserGroupMembership'> extends True ? CheckSelect<T, Prisma__CoreUserGroupMembershipClient<CoreUserGroupMembership>, Prisma__CoreUserGroupMembershipClient<CoreUserGroupMembershipGetPayload<T>>> : CheckSelect<T, Prisma__CoreUserGroupMembershipClient<CoreUserGroupMembership | null >, Prisma__CoreUserGroupMembershipClient<CoreUserGroupMembershipGetPayload<T> | null >>

    /**
     * Find zero or more CoreUserGroupMemberships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserGroupMembershipFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CoreUserGroupMemberships
     * const coreUserGroupMemberships = await prisma.coreUserGroupMembership.findMany()
     * 
     * // Get first 10 CoreUserGroupMemberships
     * const coreUserGroupMemberships = await prisma.coreUserGroupMembership.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const coreUserGroupMembershipWithIdOnly = await prisma.coreUserGroupMembership.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CoreUserGroupMembershipFindManyArgs>(
      args?: SelectSubset<T, CoreUserGroupMembershipFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<CoreUserGroupMembership>>, PrismaPromise<Array<CoreUserGroupMembershipGetPayload<T>>>>

    /**
     * Create a CoreUserGroupMembership.
     * @param {CoreUserGroupMembershipCreateArgs} args - Arguments to create a CoreUserGroupMembership.
     * @example
     * // Create one CoreUserGroupMembership
     * const CoreUserGroupMembership = await prisma.coreUserGroupMembership.create({
     *   data: {
     *     // ... data to create a CoreUserGroupMembership
     *   }
     * })
     * 
    **/
    create<T extends CoreUserGroupMembershipCreateArgs>(
      args: SelectSubset<T, CoreUserGroupMembershipCreateArgs>
    ): CheckSelect<T, Prisma__CoreUserGroupMembershipClient<CoreUserGroupMembership>, Prisma__CoreUserGroupMembershipClient<CoreUserGroupMembershipGetPayload<T>>>

    /**
     * Create many CoreUserGroupMemberships.
     *     @param {CoreUserGroupMembershipCreateManyArgs} args - Arguments to create many CoreUserGroupMemberships.
     *     @example
     *     // Create many CoreUserGroupMemberships
     *     const coreUserGroupMembership = await prisma.coreUserGroupMembership.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CoreUserGroupMembershipCreateManyArgs>(
      args?: SelectSubset<T, CoreUserGroupMembershipCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a CoreUserGroupMembership.
     * @param {CoreUserGroupMembershipDeleteArgs} args - Arguments to delete one CoreUserGroupMembership.
     * @example
     * // Delete one CoreUserGroupMembership
     * const CoreUserGroupMembership = await prisma.coreUserGroupMembership.delete({
     *   where: {
     *     // ... filter to delete one CoreUserGroupMembership
     *   }
     * })
     * 
    **/
    delete<T extends CoreUserGroupMembershipDeleteArgs>(
      args: SelectSubset<T, CoreUserGroupMembershipDeleteArgs>
    ): CheckSelect<T, Prisma__CoreUserGroupMembershipClient<CoreUserGroupMembership>, Prisma__CoreUserGroupMembershipClient<CoreUserGroupMembershipGetPayload<T>>>

    /**
     * Update one CoreUserGroupMembership.
     * @param {CoreUserGroupMembershipUpdateArgs} args - Arguments to update one CoreUserGroupMembership.
     * @example
     * // Update one CoreUserGroupMembership
     * const coreUserGroupMembership = await prisma.coreUserGroupMembership.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CoreUserGroupMembershipUpdateArgs>(
      args: SelectSubset<T, CoreUserGroupMembershipUpdateArgs>
    ): CheckSelect<T, Prisma__CoreUserGroupMembershipClient<CoreUserGroupMembership>, Prisma__CoreUserGroupMembershipClient<CoreUserGroupMembershipGetPayload<T>>>

    /**
     * Delete zero or more CoreUserGroupMemberships.
     * @param {CoreUserGroupMembershipDeleteManyArgs} args - Arguments to filter CoreUserGroupMemberships to delete.
     * @example
     * // Delete a few CoreUserGroupMemberships
     * const { count } = await prisma.coreUserGroupMembership.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CoreUserGroupMembershipDeleteManyArgs>(
      args?: SelectSubset<T, CoreUserGroupMembershipDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more CoreUserGroupMemberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserGroupMembershipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CoreUserGroupMemberships
     * const coreUserGroupMembership = await prisma.coreUserGroupMembership.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CoreUserGroupMembershipUpdateManyArgs>(
      args: SelectSubset<T, CoreUserGroupMembershipUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one CoreUserGroupMembership.
     * @param {CoreUserGroupMembershipUpsertArgs} args - Arguments to update or create a CoreUserGroupMembership.
     * @example
     * // Update or create a CoreUserGroupMembership
     * const coreUserGroupMembership = await prisma.coreUserGroupMembership.upsert({
     *   create: {
     *     // ... data to create a CoreUserGroupMembership
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CoreUserGroupMembership we want to update
     *   }
     * })
    **/
    upsert<T extends CoreUserGroupMembershipUpsertArgs>(
      args: SelectSubset<T, CoreUserGroupMembershipUpsertArgs>
    ): CheckSelect<T, Prisma__CoreUserGroupMembershipClient<CoreUserGroupMembership>, Prisma__CoreUserGroupMembershipClient<CoreUserGroupMembershipGetPayload<T>>>

    /**
     * Find one CoreUserGroupMembership that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {CoreUserGroupMembershipFindUniqueOrThrowArgs} args - Arguments to find a CoreUserGroupMembership
     * @example
     * // Get one CoreUserGroupMembership
     * const coreUserGroupMembership = await prisma.coreUserGroupMembership.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CoreUserGroupMembershipFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CoreUserGroupMembershipFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__CoreUserGroupMembershipClient<CoreUserGroupMembership>, Prisma__CoreUserGroupMembershipClient<CoreUserGroupMembershipGetPayload<T>>>

    /**
     * Find the first CoreUserGroupMembership that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserGroupMembershipFindFirstOrThrowArgs} args - Arguments to find a CoreUserGroupMembership
     * @example
     * // Get one CoreUserGroupMembership
     * const coreUserGroupMembership = await prisma.coreUserGroupMembership.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CoreUserGroupMembershipFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CoreUserGroupMembershipFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__CoreUserGroupMembershipClient<CoreUserGroupMembership>, Prisma__CoreUserGroupMembershipClient<CoreUserGroupMembershipGetPayload<T>>>

    /**
     * Count the number of CoreUserGroupMemberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserGroupMembershipCountArgs} args - Arguments to filter CoreUserGroupMemberships to count.
     * @example
     * // Count the number of CoreUserGroupMemberships
     * const count = await prisma.coreUserGroupMembership.count({
     *   where: {
     *     // ... the filter for the CoreUserGroupMemberships we want to count
     *   }
     * })
    **/
    count<T extends CoreUserGroupMembershipCountArgs>(
      args?: Subset<T, CoreUserGroupMembershipCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CoreUserGroupMembershipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CoreUserGroupMembership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserGroupMembershipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CoreUserGroupMembershipAggregateArgs>(args: Subset<T, CoreUserGroupMembershipAggregateArgs>): PrismaPromise<GetCoreUserGroupMembershipAggregateType<T>>

    /**
     * Group by CoreUserGroupMembership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserGroupMembershipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CoreUserGroupMembershipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CoreUserGroupMembershipGroupByArgs['orderBy'] }
        : { orderBy?: CoreUserGroupMembershipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CoreUserGroupMembershipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCoreUserGroupMembershipGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for CoreUserGroupMembership.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CoreUserGroupMembershipClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    group<T extends CoreUserGroupArgs = {}>(args?: Subset<T, CoreUserGroupArgs>): CheckSelect<T, Prisma__CoreUserGroupClient<CoreUserGroup | null >, Prisma__CoreUserGroupClient<CoreUserGroupGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * CoreUserGroupMembership base type for findUnique actions
   */
  export type CoreUserGroupMembershipFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the CoreUserGroupMembership
     * 
    **/
    select?: CoreUserGroupMembershipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CoreUserGroupMembershipInclude | null
    /**
     * Filter, which CoreUserGroupMembership to fetch.
     * 
    **/
    where: CoreUserGroupMembershipWhereUniqueInput
  }

  /**
   * CoreUserGroupMembership: findUnique
   */
  export interface CoreUserGroupMembershipFindUniqueArgs extends CoreUserGroupMembershipFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CoreUserGroupMembership base type for findFirst actions
   */
  export type CoreUserGroupMembershipFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the CoreUserGroupMembership
     * 
    **/
    select?: CoreUserGroupMembershipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CoreUserGroupMembershipInclude | null
    /**
     * Filter, which CoreUserGroupMembership to fetch.
     * 
    **/
    where?: CoreUserGroupMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreUserGroupMemberships to fetch.
     * 
    **/
    orderBy?: Enumerable<CoreUserGroupMembershipOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CoreUserGroupMemberships.
     * 
    **/
    cursor?: CoreUserGroupMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreUserGroupMemberships from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreUserGroupMemberships.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CoreUserGroupMemberships.
     * 
    **/
    distinct?: Enumerable<CoreUserGroupMembershipScalarFieldEnum>
  }

  /**
   * CoreUserGroupMembership: findFirst
   */
  export interface CoreUserGroupMembershipFindFirstArgs extends CoreUserGroupMembershipFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CoreUserGroupMembership findMany
   */
  export type CoreUserGroupMembershipFindManyArgs = {
    /**
     * Select specific fields to fetch from the CoreUserGroupMembership
     * 
    **/
    select?: CoreUserGroupMembershipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CoreUserGroupMembershipInclude | null
    /**
     * Filter, which CoreUserGroupMemberships to fetch.
     * 
    **/
    where?: CoreUserGroupMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreUserGroupMemberships to fetch.
     * 
    **/
    orderBy?: Enumerable<CoreUserGroupMembershipOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CoreUserGroupMemberships.
     * 
    **/
    cursor?: CoreUserGroupMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreUserGroupMemberships from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreUserGroupMemberships.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CoreUserGroupMembershipScalarFieldEnum>
  }


  /**
   * CoreUserGroupMembership create
   */
  export type CoreUserGroupMembershipCreateArgs = {
    /**
     * Select specific fields to fetch from the CoreUserGroupMembership
     * 
    **/
    select?: CoreUserGroupMembershipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CoreUserGroupMembershipInclude | null
    /**
     * The data needed to create a CoreUserGroupMembership.
     * 
    **/
    data: XOR<CoreUserGroupMembershipCreateInput, CoreUserGroupMembershipUncheckedCreateInput>
  }


  /**
   * CoreUserGroupMembership createMany
   */
  export type CoreUserGroupMembershipCreateManyArgs = {
    /**
     * The data used to create many CoreUserGroupMemberships.
     * 
    **/
    data: Enumerable<CoreUserGroupMembershipCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * CoreUserGroupMembership update
   */
  export type CoreUserGroupMembershipUpdateArgs = {
    /**
     * Select specific fields to fetch from the CoreUserGroupMembership
     * 
    **/
    select?: CoreUserGroupMembershipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CoreUserGroupMembershipInclude | null
    /**
     * The data needed to update a CoreUserGroupMembership.
     * 
    **/
    data: XOR<CoreUserGroupMembershipUpdateInput, CoreUserGroupMembershipUncheckedUpdateInput>
    /**
     * Choose, which CoreUserGroupMembership to update.
     * 
    **/
    where: CoreUserGroupMembershipWhereUniqueInput
  }


  /**
   * CoreUserGroupMembership updateMany
   */
  export type CoreUserGroupMembershipUpdateManyArgs = {
    /**
     * The data used to update CoreUserGroupMemberships.
     * 
    **/
    data: XOR<CoreUserGroupMembershipUpdateManyMutationInput, CoreUserGroupMembershipUncheckedUpdateManyInput>
    /**
     * Filter which CoreUserGroupMemberships to update
     * 
    **/
    where?: CoreUserGroupMembershipWhereInput
  }


  /**
   * CoreUserGroupMembership upsert
   */
  export type CoreUserGroupMembershipUpsertArgs = {
    /**
     * Select specific fields to fetch from the CoreUserGroupMembership
     * 
    **/
    select?: CoreUserGroupMembershipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CoreUserGroupMembershipInclude | null
    /**
     * The filter to search for the CoreUserGroupMembership to update in case it exists.
     * 
    **/
    where: CoreUserGroupMembershipWhereUniqueInput
    /**
     * In case the CoreUserGroupMembership found by the `where` argument doesn't exist, create a new CoreUserGroupMembership with this data.
     * 
    **/
    create: XOR<CoreUserGroupMembershipCreateInput, CoreUserGroupMembershipUncheckedCreateInput>
    /**
     * In case the CoreUserGroupMembership was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CoreUserGroupMembershipUpdateInput, CoreUserGroupMembershipUncheckedUpdateInput>
  }


  /**
   * CoreUserGroupMembership delete
   */
  export type CoreUserGroupMembershipDeleteArgs = {
    /**
     * Select specific fields to fetch from the CoreUserGroupMembership
     * 
    **/
    select?: CoreUserGroupMembershipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CoreUserGroupMembershipInclude | null
    /**
     * Filter which CoreUserGroupMembership to delete.
     * 
    **/
    where: CoreUserGroupMembershipWhereUniqueInput
  }


  /**
   * CoreUserGroupMembership deleteMany
   */
  export type CoreUserGroupMembershipDeleteManyArgs = {
    /**
     * Filter which CoreUserGroupMemberships to delete
     * 
    **/
    where?: CoreUserGroupMembershipWhereInput
  }


  /**
   * CoreUserGroupMembership: findUniqueOrThrow
   */
  export type CoreUserGroupMembershipFindUniqueOrThrowArgs = CoreUserGroupMembershipFindUniqueArgsBase
      

  /**
   * CoreUserGroupMembership: findFirstOrThrow
   */
  export type CoreUserGroupMembershipFindFirstOrThrowArgs = CoreUserGroupMembershipFindFirstArgsBase
      

  /**
   * CoreUserGroupMembership without action
   */
  export type CoreUserGroupMembershipArgs = {
    /**
     * Select specific fields to fetch from the CoreUserGroupMembership
     * 
    **/
    select?: CoreUserGroupMembershipSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CoreUserGroupMembershipInclude | null
  }



  /**
   * Model CoreUserFeedback
   */


  export type AggregateCoreUserFeedback = {
    _count: CoreUserFeedbackCountAggregateOutputType | null
    _avg: CoreUserFeedbackAvgAggregateOutputType | null
    _sum: CoreUserFeedbackSumAggregateOutputType | null
    _min: CoreUserFeedbackMinAggregateOutputType | null
    _max: CoreUserFeedbackMaxAggregateOutputType | null
  }

  export type CoreUserFeedbackAvgAggregateOutputType = {
    messageId: number | null
  }

  export type CoreUserFeedbackSumAggregateOutputType = {
    messageId: bigint | null
  }

  export type CoreUserFeedbackMinAggregateOutputType = {
    id: string | null
    byUserId: string | null
    forUserId: string | null
    createdAt: Date | null
    channelId: string | null
    messageId: bigint | null
    message: string | null
    value: CoreUserFeedbackValue | null
  }

  export type CoreUserFeedbackMaxAggregateOutputType = {
    id: string | null
    byUserId: string | null
    forUserId: string | null
    createdAt: Date | null
    channelId: string | null
    messageId: bigint | null
    message: string | null
    value: CoreUserFeedbackValue | null
  }

  export type CoreUserFeedbackCountAggregateOutputType = {
    id: number
    byUserId: number
    forUserId: number
    createdAt: number
    channelId: number
    messageId: number
    message: number
    value: number
    _all: number
  }


  export type CoreUserFeedbackAvgAggregateInputType = {
    messageId?: true
  }

  export type CoreUserFeedbackSumAggregateInputType = {
    messageId?: true
  }

  export type CoreUserFeedbackMinAggregateInputType = {
    id?: true
    byUserId?: true
    forUserId?: true
    createdAt?: true
    channelId?: true
    messageId?: true
    message?: true
    value?: true
  }

  export type CoreUserFeedbackMaxAggregateInputType = {
    id?: true
    byUserId?: true
    forUserId?: true
    createdAt?: true
    channelId?: true
    messageId?: true
    message?: true
    value?: true
  }

  export type CoreUserFeedbackCountAggregateInputType = {
    id?: true
    byUserId?: true
    forUserId?: true
    createdAt?: true
    channelId?: true
    messageId?: true
    message?: true
    value?: true
    _all?: true
  }

  export type CoreUserFeedbackAggregateArgs = {
    /**
     * Filter which CoreUserFeedback to aggregate.
     * 
    **/
    where?: CoreUserFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreUserFeedbacks to fetch.
     * 
    **/
    orderBy?: Enumerable<CoreUserFeedbackOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CoreUserFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreUserFeedbacks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreUserFeedbacks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CoreUserFeedbacks
    **/
    _count?: true | CoreUserFeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CoreUserFeedbackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CoreUserFeedbackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CoreUserFeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CoreUserFeedbackMaxAggregateInputType
  }

  export type GetCoreUserFeedbackAggregateType<T extends CoreUserFeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateCoreUserFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCoreUserFeedback[P]>
      : GetScalarType<T[P], AggregateCoreUserFeedback[P]>
  }




  export type CoreUserFeedbackGroupByArgs = {
    where?: CoreUserFeedbackWhereInput
    orderBy?: Enumerable<CoreUserFeedbackOrderByWithAggregationInput>
    by: Array<CoreUserFeedbackScalarFieldEnum>
    having?: CoreUserFeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CoreUserFeedbackCountAggregateInputType | true
    _avg?: CoreUserFeedbackAvgAggregateInputType
    _sum?: CoreUserFeedbackSumAggregateInputType
    _min?: CoreUserFeedbackMinAggregateInputType
    _max?: CoreUserFeedbackMaxAggregateInputType
  }


  export type CoreUserFeedbackGroupByOutputType = {
    id: string
    byUserId: string
    forUserId: string
    createdAt: Date
    channelId: string | null
    messageId: bigint | null
    message: string | null
    value: CoreUserFeedbackValue
    _count: CoreUserFeedbackCountAggregateOutputType | null
    _avg: CoreUserFeedbackAvgAggregateOutputType | null
    _sum: CoreUserFeedbackSumAggregateOutputType | null
    _min: CoreUserFeedbackMinAggregateOutputType | null
    _max: CoreUserFeedbackMaxAggregateOutputType | null
  }

  type GetCoreUserFeedbackGroupByPayload<T extends CoreUserFeedbackGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CoreUserFeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CoreUserFeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CoreUserFeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], CoreUserFeedbackGroupByOutputType[P]>
        }
      >
    >


  export type CoreUserFeedbackSelect = {
    id?: boolean
    byUserId?: boolean
    forUserId?: boolean
    createdAt?: boolean
    channelId?: boolean
    messageId?: boolean
    message?: boolean
    value?: boolean
  }

  export type CoreUserFeedbackGetPayload<
    S extends boolean | null | undefined | CoreUserFeedbackArgs,
    U = keyof S
      > = S extends true
        ? CoreUserFeedback
    : S extends undefined
    ? never
    : S extends CoreUserFeedbackArgs | CoreUserFeedbackFindManyArgs
    ?'include' extends U
    ? CoreUserFeedback 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof CoreUserFeedback ? CoreUserFeedback[P] : never
  } 
    : CoreUserFeedback
  : CoreUserFeedback


  type CoreUserFeedbackCountArgs = Merge<
    Omit<CoreUserFeedbackFindManyArgs, 'select' | 'include'> & {
      select?: CoreUserFeedbackCountAggregateInputType | true
    }
  >

  export interface CoreUserFeedbackDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one CoreUserFeedback that matches the filter.
     * @param {CoreUserFeedbackFindUniqueArgs} args - Arguments to find a CoreUserFeedback
     * @example
     * // Get one CoreUserFeedback
     * const coreUserFeedback = await prisma.coreUserFeedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CoreUserFeedbackFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CoreUserFeedbackFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'CoreUserFeedback'> extends True ? CheckSelect<T, Prisma__CoreUserFeedbackClient<CoreUserFeedback>, Prisma__CoreUserFeedbackClient<CoreUserFeedbackGetPayload<T>>> : CheckSelect<T, Prisma__CoreUserFeedbackClient<CoreUserFeedback | null >, Prisma__CoreUserFeedbackClient<CoreUserFeedbackGetPayload<T> | null >>

    /**
     * Find the first CoreUserFeedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserFeedbackFindFirstArgs} args - Arguments to find a CoreUserFeedback
     * @example
     * // Get one CoreUserFeedback
     * const coreUserFeedback = await prisma.coreUserFeedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CoreUserFeedbackFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CoreUserFeedbackFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'CoreUserFeedback'> extends True ? CheckSelect<T, Prisma__CoreUserFeedbackClient<CoreUserFeedback>, Prisma__CoreUserFeedbackClient<CoreUserFeedbackGetPayload<T>>> : CheckSelect<T, Prisma__CoreUserFeedbackClient<CoreUserFeedback | null >, Prisma__CoreUserFeedbackClient<CoreUserFeedbackGetPayload<T> | null >>

    /**
     * Find zero or more CoreUserFeedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserFeedbackFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CoreUserFeedbacks
     * const coreUserFeedbacks = await prisma.coreUserFeedback.findMany()
     * 
     * // Get first 10 CoreUserFeedbacks
     * const coreUserFeedbacks = await prisma.coreUserFeedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const coreUserFeedbackWithIdOnly = await prisma.coreUserFeedback.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CoreUserFeedbackFindManyArgs>(
      args?: SelectSubset<T, CoreUserFeedbackFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<CoreUserFeedback>>, PrismaPromise<Array<CoreUserFeedbackGetPayload<T>>>>

    /**
     * Create a CoreUserFeedback.
     * @param {CoreUserFeedbackCreateArgs} args - Arguments to create a CoreUserFeedback.
     * @example
     * // Create one CoreUserFeedback
     * const CoreUserFeedback = await prisma.coreUserFeedback.create({
     *   data: {
     *     // ... data to create a CoreUserFeedback
     *   }
     * })
     * 
    **/
    create<T extends CoreUserFeedbackCreateArgs>(
      args: SelectSubset<T, CoreUserFeedbackCreateArgs>
    ): CheckSelect<T, Prisma__CoreUserFeedbackClient<CoreUserFeedback>, Prisma__CoreUserFeedbackClient<CoreUserFeedbackGetPayload<T>>>

    /**
     * Create many CoreUserFeedbacks.
     *     @param {CoreUserFeedbackCreateManyArgs} args - Arguments to create many CoreUserFeedbacks.
     *     @example
     *     // Create many CoreUserFeedbacks
     *     const coreUserFeedback = await prisma.coreUserFeedback.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CoreUserFeedbackCreateManyArgs>(
      args?: SelectSubset<T, CoreUserFeedbackCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a CoreUserFeedback.
     * @param {CoreUserFeedbackDeleteArgs} args - Arguments to delete one CoreUserFeedback.
     * @example
     * // Delete one CoreUserFeedback
     * const CoreUserFeedback = await prisma.coreUserFeedback.delete({
     *   where: {
     *     // ... filter to delete one CoreUserFeedback
     *   }
     * })
     * 
    **/
    delete<T extends CoreUserFeedbackDeleteArgs>(
      args: SelectSubset<T, CoreUserFeedbackDeleteArgs>
    ): CheckSelect<T, Prisma__CoreUserFeedbackClient<CoreUserFeedback>, Prisma__CoreUserFeedbackClient<CoreUserFeedbackGetPayload<T>>>

    /**
     * Update one CoreUserFeedback.
     * @param {CoreUserFeedbackUpdateArgs} args - Arguments to update one CoreUserFeedback.
     * @example
     * // Update one CoreUserFeedback
     * const coreUserFeedback = await prisma.coreUserFeedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CoreUserFeedbackUpdateArgs>(
      args: SelectSubset<T, CoreUserFeedbackUpdateArgs>
    ): CheckSelect<T, Prisma__CoreUserFeedbackClient<CoreUserFeedback>, Prisma__CoreUserFeedbackClient<CoreUserFeedbackGetPayload<T>>>

    /**
     * Delete zero or more CoreUserFeedbacks.
     * @param {CoreUserFeedbackDeleteManyArgs} args - Arguments to filter CoreUserFeedbacks to delete.
     * @example
     * // Delete a few CoreUserFeedbacks
     * const { count } = await prisma.coreUserFeedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CoreUserFeedbackDeleteManyArgs>(
      args?: SelectSubset<T, CoreUserFeedbackDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more CoreUserFeedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserFeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CoreUserFeedbacks
     * const coreUserFeedback = await prisma.coreUserFeedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CoreUserFeedbackUpdateManyArgs>(
      args: SelectSubset<T, CoreUserFeedbackUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one CoreUserFeedback.
     * @param {CoreUserFeedbackUpsertArgs} args - Arguments to update or create a CoreUserFeedback.
     * @example
     * // Update or create a CoreUserFeedback
     * const coreUserFeedback = await prisma.coreUserFeedback.upsert({
     *   create: {
     *     // ... data to create a CoreUserFeedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CoreUserFeedback we want to update
     *   }
     * })
    **/
    upsert<T extends CoreUserFeedbackUpsertArgs>(
      args: SelectSubset<T, CoreUserFeedbackUpsertArgs>
    ): CheckSelect<T, Prisma__CoreUserFeedbackClient<CoreUserFeedback>, Prisma__CoreUserFeedbackClient<CoreUserFeedbackGetPayload<T>>>

    /**
     * Find one CoreUserFeedback that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {CoreUserFeedbackFindUniqueOrThrowArgs} args - Arguments to find a CoreUserFeedback
     * @example
     * // Get one CoreUserFeedback
     * const coreUserFeedback = await prisma.coreUserFeedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CoreUserFeedbackFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CoreUserFeedbackFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__CoreUserFeedbackClient<CoreUserFeedback>, Prisma__CoreUserFeedbackClient<CoreUserFeedbackGetPayload<T>>>

    /**
     * Find the first CoreUserFeedback that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserFeedbackFindFirstOrThrowArgs} args - Arguments to find a CoreUserFeedback
     * @example
     * // Get one CoreUserFeedback
     * const coreUserFeedback = await prisma.coreUserFeedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CoreUserFeedbackFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CoreUserFeedbackFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__CoreUserFeedbackClient<CoreUserFeedback>, Prisma__CoreUserFeedbackClient<CoreUserFeedbackGetPayload<T>>>

    /**
     * Count the number of CoreUserFeedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserFeedbackCountArgs} args - Arguments to filter CoreUserFeedbacks to count.
     * @example
     * // Count the number of CoreUserFeedbacks
     * const count = await prisma.coreUserFeedback.count({
     *   where: {
     *     // ... the filter for the CoreUserFeedbacks we want to count
     *   }
     * })
    **/
    count<T extends CoreUserFeedbackCountArgs>(
      args?: Subset<T, CoreUserFeedbackCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CoreUserFeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CoreUserFeedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserFeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CoreUserFeedbackAggregateArgs>(args: Subset<T, CoreUserFeedbackAggregateArgs>): PrismaPromise<GetCoreUserFeedbackAggregateType<T>>

    /**
     * Group by CoreUserFeedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CoreUserFeedbackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CoreUserFeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CoreUserFeedbackGroupByArgs['orderBy'] }
        : { orderBy?: CoreUserFeedbackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CoreUserFeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCoreUserFeedbackGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for CoreUserFeedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CoreUserFeedbackClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * CoreUserFeedback base type for findUnique actions
   */
  export type CoreUserFeedbackFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the CoreUserFeedback
     * 
    **/
    select?: CoreUserFeedbackSelect | null
    /**
     * Filter, which CoreUserFeedback to fetch.
     * 
    **/
    where: CoreUserFeedbackWhereUniqueInput
  }

  /**
   * CoreUserFeedback: findUnique
   */
  export interface CoreUserFeedbackFindUniqueArgs extends CoreUserFeedbackFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CoreUserFeedback base type for findFirst actions
   */
  export type CoreUserFeedbackFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the CoreUserFeedback
     * 
    **/
    select?: CoreUserFeedbackSelect | null
    /**
     * Filter, which CoreUserFeedback to fetch.
     * 
    **/
    where?: CoreUserFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreUserFeedbacks to fetch.
     * 
    **/
    orderBy?: Enumerable<CoreUserFeedbackOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CoreUserFeedbacks.
     * 
    **/
    cursor?: CoreUserFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreUserFeedbacks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreUserFeedbacks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CoreUserFeedbacks.
     * 
    **/
    distinct?: Enumerable<CoreUserFeedbackScalarFieldEnum>
  }

  /**
   * CoreUserFeedback: findFirst
   */
  export interface CoreUserFeedbackFindFirstArgs extends CoreUserFeedbackFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CoreUserFeedback findMany
   */
  export type CoreUserFeedbackFindManyArgs = {
    /**
     * Select specific fields to fetch from the CoreUserFeedback
     * 
    **/
    select?: CoreUserFeedbackSelect | null
    /**
     * Filter, which CoreUserFeedbacks to fetch.
     * 
    **/
    where?: CoreUserFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CoreUserFeedbacks to fetch.
     * 
    **/
    orderBy?: Enumerable<CoreUserFeedbackOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CoreUserFeedbacks.
     * 
    **/
    cursor?: CoreUserFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CoreUserFeedbacks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CoreUserFeedbacks.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CoreUserFeedbackScalarFieldEnum>
  }


  /**
   * CoreUserFeedback create
   */
  export type CoreUserFeedbackCreateArgs = {
    /**
     * Select specific fields to fetch from the CoreUserFeedback
     * 
    **/
    select?: CoreUserFeedbackSelect | null
    /**
     * The data needed to create a CoreUserFeedback.
     * 
    **/
    data: XOR<CoreUserFeedbackCreateInput, CoreUserFeedbackUncheckedCreateInput>
  }


  /**
   * CoreUserFeedback createMany
   */
  export type CoreUserFeedbackCreateManyArgs = {
    /**
     * The data used to create many CoreUserFeedbacks.
     * 
    **/
    data: Enumerable<CoreUserFeedbackCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * CoreUserFeedback update
   */
  export type CoreUserFeedbackUpdateArgs = {
    /**
     * Select specific fields to fetch from the CoreUserFeedback
     * 
    **/
    select?: CoreUserFeedbackSelect | null
    /**
     * The data needed to update a CoreUserFeedback.
     * 
    **/
    data: XOR<CoreUserFeedbackUpdateInput, CoreUserFeedbackUncheckedUpdateInput>
    /**
     * Choose, which CoreUserFeedback to update.
     * 
    **/
    where: CoreUserFeedbackWhereUniqueInput
  }


  /**
   * CoreUserFeedback updateMany
   */
  export type CoreUserFeedbackUpdateManyArgs = {
    /**
     * The data used to update CoreUserFeedbacks.
     * 
    **/
    data: XOR<CoreUserFeedbackUpdateManyMutationInput, CoreUserFeedbackUncheckedUpdateManyInput>
    /**
     * Filter which CoreUserFeedbacks to update
     * 
    **/
    where?: CoreUserFeedbackWhereInput
  }


  /**
   * CoreUserFeedback upsert
   */
  export type CoreUserFeedbackUpsertArgs = {
    /**
     * Select specific fields to fetch from the CoreUserFeedback
     * 
    **/
    select?: CoreUserFeedbackSelect | null
    /**
     * The filter to search for the CoreUserFeedback to update in case it exists.
     * 
    **/
    where: CoreUserFeedbackWhereUniqueInput
    /**
     * In case the CoreUserFeedback found by the `where` argument doesn't exist, create a new CoreUserFeedback with this data.
     * 
    **/
    create: XOR<CoreUserFeedbackCreateInput, CoreUserFeedbackUncheckedCreateInput>
    /**
     * In case the CoreUserFeedback was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CoreUserFeedbackUpdateInput, CoreUserFeedbackUncheckedUpdateInput>
  }


  /**
   * CoreUserFeedback delete
   */
  export type CoreUserFeedbackDeleteArgs = {
    /**
     * Select specific fields to fetch from the CoreUserFeedback
     * 
    **/
    select?: CoreUserFeedbackSelect | null
    /**
     * Filter which CoreUserFeedback to delete.
     * 
    **/
    where: CoreUserFeedbackWhereUniqueInput
  }


  /**
   * CoreUserFeedback deleteMany
   */
  export type CoreUserFeedbackDeleteManyArgs = {
    /**
     * Filter which CoreUserFeedbacks to delete
     * 
    **/
    where?: CoreUserFeedbackWhereInput
  }


  /**
   * CoreUserFeedback: findUniqueOrThrow
   */
  export type CoreUserFeedbackFindUniqueOrThrowArgs = CoreUserFeedbackFindUniqueArgsBase
      

  /**
   * CoreUserFeedback: findFirstOrThrow
   */
  export type CoreUserFeedbackFindFirstOrThrowArgs = CoreUserFeedbackFindFirstArgsBase
      

  /**
   * CoreUserFeedback without action
   */
  export type CoreUserFeedbackArgs = {
    /**
     * Select specific fields to fetch from the CoreUserFeedback
     * 
    **/
    select?: CoreUserFeedbackSelect | null
  }



  /**
   * Model AuthMfaConfig
   */


  export type AggregateAuthMfaConfig = {
    _count: AuthMfaConfigCountAggregateOutputType | null
    _min: AuthMfaConfigMinAggregateOutputType | null
    _max: AuthMfaConfigMaxAggregateOutputType | null
  }

  export type AuthMfaConfigMinAggregateOutputType = {
    id: string | null
    authId: string | null
    createdAt: Date | null
    confirmedAt: Date | null
    deletedAt: Date | null
    type: AuthMfaType | null
  }

  export type AuthMfaConfigMaxAggregateOutputType = {
    id: string | null
    authId: string | null
    createdAt: Date | null
    confirmedAt: Date | null
    deletedAt: Date | null
    type: AuthMfaType | null
  }

  export type AuthMfaConfigCountAggregateOutputType = {
    id: number
    authId: number
    createdAt: number
    confirmedAt: number
    deletedAt: number
    type: number
    configuration: number
    _all: number
  }


  export type AuthMfaConfigMinAggregateInputType = {
    id?: true
    authId?: true
    createdAt?: true
    confirmedAt?: true
    deletedAt?: true
    type?: true
  }

  export type AuthMfaConfigMaxAggregateInputType = {
    id?: true
    authId?: true
    createdAt?: true
    confirmedAt?: true
    deletedAt?: true
    type?: true
  }

  export type AuthMfaConfigCountAggregateInputType = {
    id?: true
    authId?: true
    createdAt?: true
    confirmedAt?: true
    deletedAt?: true
    type?: true
    configuration?: true
    _all?: true
  }

  export type AuthMfaConfigAggregateArgs = {
    /**
     * Filter which AuthMfaConfig to aggregate.
     * 
    **/
    where?: AuthMfaConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthMfaConfigs to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthMfaConfigOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AuthMfaConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthMfaConfigs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthMfaConfigs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthMfaConfigs
    **/
    _count?: true | AuthMfaConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthMfaConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthMfaConfigMaxAggregateInputType
  }

  export type GetAuthMfaConfigAggregateType<T extends AuthMfaConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthMfaConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthMfaConfig[P]>
      : GetScalarType<T[P], AggregateAuthMfaConfig[P]>
  }




  export type AuthMfaConfigGroupByArgs = {
    where?: AuthMfaConfigWhereInput
    orderBy?: Enumerable<AuthMfaConfigOrderByWithAggregationInput>
    by: Array<AuthMfaConfigScalarFieldEnum>
    having?: AuthMfaConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthMfaConfigCountAggregateInputType | true
    _min?: AuthMfaConfigMinAggregateInputType
    _max?: AuthMfaConfigMaxAggregateInputType
  }


  export type AuthMfaConfigGroupByOutputType = {
    id: string
    authId: string
    createdAt: Date
    confirmedAt: Date | null
    deletedAt: Date | null
    type: AuthMfaType
    configuration: JsonValue
    _count: AuthMfaConfigCountAggregateOutputType | null
    _min: AuthMfaConfigMinAggregateOutputType | null
    _max: AuthMfaConfigMaxAggregateOutputType | null
  }

  type GetAuthMfaConfigGroupByPayload<T extends AuthMfaConfigGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AuthMfaConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthMfaConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthMfaConfigGroupByOutputType[P]>
            : GetScalarType<T[P], AuthMfaConfigGroupByOutputType[P]>
        }
      >
    >


  export type AuthMfaConfigSelect = {
    id?: boolean
    authId?: boolean
    createdAt?: boolean
    confirmedAt?: boolean
    deletedAt?: boolean
    type?: boolean
    configuration?: boolean
    AuthMfaChallenge?: boolean | AuthMfaChallengeFindManyArgs
    AuthMfaChallengeAttempt?: boolean | AuthMfaChallengeAttemptFindManyArgs
    _count?: boolean | AuthMfaConfigCountOutputTypeArgs
  }

  export type AuthMfaConfigInclude = {
    AuthMfaChallenge?: boolean | AuthMfaChallengeFindManyArgs
    AuthMfaChallengeAttempt?: boolean | AuthMfaChallengeAttemptFindManyArgs
    _count?: boolean | AuthMfaConfigCountOutputTypeArgs
  }

  export type AuthMfaConfigGetPayload<
    S extends boolean | null | undefined | AuthMfaConfigArgs,
    U = keyof S
      > = S extends true
        ? AuthMfaConfig
    : S extends undefined
    ? never
    : S extends AuthMfaConfigArgs | AuthMfaConfigFindManyArgs
    ?'include' extends U
    ? AuthMfaConfig  & {
    [P in TrueKeys<S['include']>]:
        P extends 'AuthMfaChallenge' ? Array < AuthMfaChallengeGetPayload<S['include'][P]>>  :
        P extends 'AuthMfaChallengeAttempt' ? Array < AuthMfaChallengeAttemptGetPayload<S['include'][P]>>  :
        P extends '_count' ? AuthMfaConfigCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'AuthMfaChallenge' ? Array < AuthMfaChallengeGetPayload<S['select'][P]>>  :
        P extends 'AuthMfaChallengeAttempt' ? Array < AuthMfaChallengeAttemptGetPayload<S['select'][P]>>  :
        P extends '_count' ? AuthMfaConfigCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof AuthMfaConfig ? AuthMfaConfig[P] : never
  } 
    : AuthMfaConfig
  : AuthMfaConfig


  type AuthMfaConfigCountArgs = Merge<
    Omit<AuthMfaConfigFindManyArgs, 'select' | 'include'> & {
      select?: AuthMfaConfigCountAggregateInputType | true
    }
  >

  export interface AuthMfaConfigDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one AuthMfaConfig that matches the filter.
     * @param {AuthMfaConfigFindUniqueArgs} args - Arguments to find a AuthMfaConfig
     * @example
     * // Get one AuthMfaConfig
     * const authMfaConfig = await prisma.authMfaConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AuthMfaConfigFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AuthMfaConfigFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'AuthMfaConfig'> extends True ? CheckSelect<T, Prisma__AuthMfaConfigClient<AuthMfaConfig>, Prisma__AuthMfaConfigClient<AuthMfaConfigGetPayload<T>>> : CheckSelect<T, Prisma__AuthMfaConfigClient<AuthMfaConfig | null >, Prisma__AuthMfaConfigClient<AuthMfaConfigGetPayload<T> | null >>

    /**
     * Find the first AuthMfaConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaConfigFindFirstArgs} args - Arguments to find a AuthMfaConfig
     * @example
     * // Get one AuthMfaConfig
     * const authMfaConfig = await prisma.authMfaConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AuthMfaConfigFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AuthMfaConfigFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'AuthMfaConfig'> extends True ? CheckSelect<T, Prisma__AuthMfaConfigClient<AuthMfaConfig>, Prisma__AuthMfaConfigClient<AuthMfaConfigGetPayload<T>>> : CheckSelect<T, Prisma__AuthMfaConfigClient<AuthMfaConfig | null >, Prisma__AuthMfaConfigClient<AuthMfaConfigGetPayload<T> | null >>

    /**
     * Find zero or more AuthMfaConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaConfigFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthMfaConfigs
     * const authMfaConfigs = await prisma.authMfaConfig.findMany()
     * 
     * // Get first 10 AuthMfaConfigs
     * const authMfaConfigs = await prisma.authMfaConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authMfaConfigWithIdOnly = await prisma.authMfaConfig.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AuthMfaConfigFindManyArgs>(
      args?: SelectSubset<T, AuthMfaConfigFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<AuthMfaConfig>>, PrismaPromise<Array<AuthMfaConfigGetPayload<T>>>>

    /**
     * Create a AuthMfaConfig.
     * @param {AuthMfaConfigCreateArgs} args - Arguments to create a AuthMfaConfig.
     * @example
     * // Create one AuthMfaConfig
     * const AuthMfaConfig = await prisma.authMfaConfig.create({
     *   data: {
     *     // ... data to create a AuthMfaConfig
     *   }
     * })
     * 
    **/
    create<T extends AuthMfaConfigCreateArgs>(
      args: SelectSubset<T, AuthMfaConfigCreateArgs>
    ): CheckSelect<T, Prisma__AuthMfaConfigClient<AuthMfaConfig>, Prisma__AuthMfaConfigClient<AuthMfaConfigGetPayload<T>>>

    /**
     * Create many AuthMfaConfigs.
     *     @param {AuthMfaConfigCreateManyArgs} args - Arguments to create many AuthMfaConfigs.
     *     @example
     *     // Create many AuthMfaConfigs
     *     const authMfaConfig = await prisma.authMfaConfig.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AuthMfaConfigCreateManyArgs>(
      args?: SelectSubset<T, AuthMfaConfigCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a AuthMfaConfig.
     * @param {AuthMfaConfigDeleteArgs} args - Arguments to delete one AuthMfaConfig.
     * @example
     * // Delete one AuthMfaConfig
     * const AuthMfaConfig = await prisma.authMfaConfig.delete({
     *   where: {
     *     // ... filter to delete one AuthMfaConfig
     *   }
     * })
     * 
    **/
    delete<T extends AuthMfaConfigDeleteArgs>(
      args: SelectSubset<T, AuthMfaConfigDeleteArgs>
    ): CheckSelect<T, Prisma__AuthMfaConfigClient<AuthMfaConfig>, Prisma__AuthMfaConfigClient<AuthMfaConfigGetPayload<T>>>

    /**
     * Update one AuthMfaConfig.
     * @param {AuthMfaConfigUpdateArgs} args - Arguments to update one AuthMfaConfig.
     * @example
     * // Update one AuthMfaConfig
     * const authMfaConfig = await prisma.authMfaConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AuthMfaConfigUpdateArgs>(
      args: SelectSubset<T, AuthMfaConfigUpdateArgs>
    ): CheckSelect<T, Prisma__AuthMfaConfigClient<AuthMfaConfig>, Prisma__AuthMfaConfigClient<AuthMfaConfigGetPayload<T>>>

    /**
     * Delete zero or more AuthMfaConfigs.
     * @param {AuthMfaConfigDeleteManyArgs} args - Arguments to filter AuthMfaConfigs to delete.
     * @example
     * // Delete a few AuthMfaConfigs
     * const { count } = await prisma.authMfaConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AuthMfaConfigDeleteManyArgs>(
      args?: SelectSubset<T, AuthMfaConfigDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthMfaConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthMfaConfigs
     * const authMfaConfig = await prisma.authMfaConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AuthMfaConfigUpdateManyArgs>(
      args: SelectSubset<T, AuthMfaConfigUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one AuthMfaConfig.
     * @param {AuthMfaConfigUpsertArgs} args - Arguments to update or create a AuthMfaConfig.
     * @example
     * // Update or create a AuthMfaConfig
     * const authMfaConfig = await prisma.authMfaConfig.upsert({
     *   create: {
     *     // ... data to create a AuthMfaConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthMfaConfig we want to update
     *   }
     * })
    **/
    upsert<T extends AuthMfaConfigUpsertArgs>(
      args: SelectSubset<T, AuthMfaConfigUpsertArgs>
    ): CheckSelect<T, Prisma__AuthMfaConfigClient<AuthMfaConfig>, Prisma__AuthMfaConfigClient<AuthMfaConfigGetPayload<T>>>

    /**
     * Find one AuthMfaConfig that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {AuthMfaConfigFindUniqueOrThrowArgs} args - Arguments to find a AuthMfaConfig
     * @example
     * // Get one AuthMfaConfig
     * const authMfaConfig = await prisma.authMfaConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AuthMfaConfigFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AuthMfaConfigFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__AuthMfaConfigClient<AuthMfaConfig>, Prisma__AuthMfaConfigClient<AuthMfaConfigGetPayload<T>>>

    /**
     * Find the first AuthMfaConfig that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaConfigFindFirstOrThrowArgs} args - Arguments to find a AuthMfaConfig
     * @example
     * // Get one AuthMfaConfig
     * const authMfaConfig = await prisma.authMfaConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AuthMfaConfigFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AuthMfaConfigFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__AuthMfaConfigClient<AuthMfaConfig>, Prisma__AuthMfaConfigClient<AuthMfaConfigGetPayload<T>>>

    /**
     * Count the number of AuthMfaConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaConfigCountArgs} args - Arguments to filter AuthMfaConfigs to count.
     * @example
     * // Count the number of AuthMfaConfigs
     * const count = await prisma.authMfaConfig.count({
     *   where: {
     *     // ... the filter for the AuthMfaConfigs we want to count
     *   }
     * })
    **/
    count<T extends AuthMfaConfigCountArgs>(
      args?: Subset<T, AuthMfaConfigCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthMfaConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthMfaConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthMfaConfigAggregateArgs>(args: Subset<T, AuthMfaConfigAggregateArgs>): PrismaPromise<GetAuthMfaConfigAggregateType<T>>

    /**
     * Group by AuthMfaConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthMfaConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthMfaConfigGroupByArgs['orderBy'] }
        : { orderBy?: AuthMfaConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthMfaConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthMfaConfigGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthMfaConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AuthMfaConfigClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    AuthMfaChallenge<T extends AuthMfaChallengeFindManyArgs = {}>(args?: Subset<T, AuthMfaChallengeFindManyArgs>): CheckSelect<T, PrismaPromise<Array<AuthMfaChallenge>>, PrismaPromise<Array<AuthMfaChallengeGetPayload<T>>>>;

    AuthMfaChallengeAttempt<T extends AuthMfaChallengeAttemptFindManyArgs = {}>(args?: Subset<T, AuthMfaChallengeAttemptFindManyArgs>): CheckSelect<T, PrismaPromise<Array<AuthMfaChallengeAttempt>>, PrismaPromise<Array<AuthMfaChallengeAttemptGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * AuthMfaConfig base type for findUnique actions
   */
  export type AuthMfaConfigFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the AuthMfaConfig
     * 
    **/
    select?: AuthMfaConfigSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaConfigInclude | null
    /**
     * Filter, which AuthMfaConfig to fetch.
     * 
    **/
    where: AuthMfaConfigWhereUniqueInput
  }

  /**
   * AuthMfaConfig: findUnique
   */
  export interface AuthMfaConfigFindUniqueArgs extends AuthMfaConfigFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AuthMfaConfig base type for findFirst actions
   */
  export type AuthMfaConfigFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the AuthMfaConfig
     * 
    **/
    select?: AuthMfaConfigSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaConfigInclude | null
    /**
     * Filter, which AuthMfaConfig to fetch.
     * 
    **/
    where?: AuthMfaConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthMfaConfigs to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthMfaConfigOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthMfaConfigs.
     * 
    **/
    cursor?: AuthMfaConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthMfaConfigs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthMfaConfigs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthMfaConfigs.
     * 
    **/
    distinct?: Enumerable<AuthMfaConfigScalarFieldEnum>
  }

  /**
   * AuthMfaConfig: findFirst
   */
  export interface AuthMfaConfigFindFirstArgs extends AuthMfaConfigFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AuthMfaConfig findMany
   */
  export type AuthMfaConfigFindManyArgs = {
    /**
     * Select specific fields to fetch from the AuthMfaConfig
     * 
    **/
    select?: AuthMfaConfigSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaConfigInclude | null
    /**
     * Filter, which AuthMfaConfigs to fetch.
     * 
    **/
    where?: AuthMfaConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthMfaConfigs to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthMfaConfigOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthMfaConfigs.
     * 
    **/
    cursor?: AuthMfaConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthMfaConfigs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthMfaConfigs.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AuthMfaConfigScalarFieldEnum>
  }


  /**
   * AuthMfaConfig create
   */
  export type AuthMfaConfigCreateArgs = {
    /**
     * Select specific fields to fetch from the AuthMfaConfig
     * 
    **/
    select?: AuthMfaConfigSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaConfigInclude | null
    /**
     * The data needed to create a AuthMfaConfig.
     * 
    **/
    data: XOR<AuthMfaConfigCreateInput, AuthMfaConfigUncheckedCreateInput>
  }


  /**
   * AuthMfaConfig createMany
   */
  export type AuthMfaConfigCreateManyArgs = {
    /**
     * The data used to create many AuthMfaConfigs.
     * 
    **/
    data: Enumerable<AuthMfaConfigCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * AuthMfaConfig update
   */
  export type AuthMfaConfigUpdateArgs = {
    /**
     * Select specific fields to fetch from the AuthMfaConfig
     * 
    **/
    select?: AuthMfaConfigSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaConfigInclude | null
    /**
     * The data needed to update a AuthMfaConfig.
     * 
    **/
    data: XOR<AuthMfaConfigUpdateInput, AuthMfaConfigUncheckedUpdateInput>
    /**
     * Choose, which AuthMfaConfig to update.
     * 
    **/
    where: AuthMfaConfigWhereUniqueInput
  }


  /**
   * AuthMfaConfig updateMany
   */
  export type AuthMfaConfigUpdateManyArgs = {
    /**
     * The data used to update AuthMfaConfigs.
     * 
    **/
    data: XOR<AuthMfaConfigUpdateManyMutationInput, AuthMfaConfigUncheckedUpdateManyInput>
    /**
     * Filter which AuthMfaConfigs to update
     * 
    **/
    where?: AuthMfaConfigWhereInput
  }


  /**
   * AuthMfaConfig upsert
   */
  export type AuthMfaConfigUpsertArgs = {
    /**
     * Select specific fields to fetch from the AuthMfaConfig
     * 
    **/
    select?: AuthMfaConfigSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaConfigInclude | null
    /**
     * The filter to search for the AuthMfaConfig to update in case it exists.
     * 
    **/
    where: AuthMfaConfigWhereUniqueInput
    /**
     * In case the AuthMfaConfig found by the `where` argument doesn't exist, create a new AuthMfaConfig with this data.
     * 
    **/
    create: XOR<AuthMfaConfigCreateInput, AuthMfaConfigUncheckedCreateInput>
    /**
     * In case the AuthMfaConfig was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AuthMfaConfigUpdateInput, AuthMfaConfigUncheckedUpdateInput>
  }


  /**
   * AuthMfaConfig delete
   */
  export type AuthMfaConfigDeleteArgs = {
    /**
     * Select specific fields to fetch from the AuthMfaConfig
     * 
    **/
    select?: AuthMfaConfigSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaConfigInclude | null
    /**
     * Filter which AuthMfaConfig to delete.
     * 
    **/
    where: AuthMfaConfigWhereUniqueInput
  }


  /**
   * AuthMfaConfig deleteMany
   */
  export type AuthMfaConfigDeleteManyArgs = {
    /**
     * Filter which AuthMfaConfigs to delete
     * 
    **/
    where?: AuthMfaConfigWhereInput
  }


  /**
   * AuthMfaConfig: findUniqueOrThrow
   */
  export type AuthMfaConfigFindUniqueOrThrowArgs = AuthMfaConfigFindUniqueArgsBase
      

  /**
   * AuthMfaConfig: findFirstOrThrow
   */
  export type AuthMfaConfigFindFirstOrThrowArgs = AuthMfaConfigFindFirstArgsBase
      

  /**
   * AuthMfaConfig without action
   */
  export type AuthMfaConfigArgs = {
    /**
     * Select specific fields to fetch from the AuthMfaConfig
     * 
    **/
    select?: AuthMfaConfigSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaConfigInclude | null
  }



  /**
   * Model AuthDevice
   */


  export type AggregateAuthDevice = {
    _count: AuthDeviceCountAggregateOutputType | null
    _min: AuthDeviceMinAggregateOutputType | null
    _max: AuthDeviceMaxAggregateOutputType | null
  }

  export type AuthDeviceMinAggregateOutputType = {
    id: string | null
    authId: string | null
    deviceId: string | null
    userAgent: string | null
  }

  export type AuthDeviceMaxAggregateOutputType = {
    id: string | null
    authId: string | null
    deviceId: string | null
    userAgent: string | null
  }

  export type AuthDeviceCountAggregateOutputType = {
    id: number
    authId: number
    deviceId: number
    userAgent: number
    _all: number
  }


  export type AuthDeviceMinAggregateInputType = {
    id?: true
    authId?: true
    deviceId?: true
    userAgent?: true
  }

  export type AuthDeviceMaxAggregateInputType = {
    id?: true
    authId?: true
    deviceId?: true
    userAgent?: true
  }

  export type AuthDeviceCountAggregateInputType = {
    id?: true
    authId?: true
    deviceId?: true
    userAgent?: true
    _all?: true
  }

  export type AuthDeviceAggregateArgs = {
    /**
     * Filter which AuthDevice to aggregate.
     * 
    **/
    where?: AuthDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthDevices to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthDeviceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AuthDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthDevices from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthDevices.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthDevices
    **/
    _count?: true | AuthDeviceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthDeviceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthDeviceMaxAggregateInputType
  }

  export type GetAuthDeviceAggregateType<T extends AuthDeviceAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthDevice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthDevice[P]>
      : GetScalarType<T[P], AggregateAuthDevice[P]>
  }




  export type AuthDeviceGroupByArgs = {
    where?: AuthDeviceWhereInput
    orderBy?: Enumerable<AuthDeviceOrderByWithAggregationInput>
    by: Array<AuthDeviceScalarFieldEnum>
    having?: AuthDeviceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthDeviceCountAggregateInputType | true
    _min?: AuthDeviceMinAggregateInputType
    _max?: AuthDeviceMaxAggregateInputType
  }


  export type AuthDeviceGroupByOutputType = {
    id: string
    authId: string
    deviceId: string
    userAgent: string
    _count: AuthDeviceCountAggregateOutputType | null
    _min: AuthDeviceMinAggregateOutputType | null
    _max: AuthDeviceMaxAggregateOutputType | null
  }

  type GetAuthDeviceGroupByPayload<T extends AuthDeviceGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AuthDeviceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthDeviceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthDeviceGroupByOutputType[P]>
            : GetScalarType<T[P], AuthDeviceGroupByOutputType[P]>
        }
      >
    >


  export type AuthDeviceSelect = {
    id?: boolean
    authId?: boolean
    deviceId?: boolean
    userAgent?: boolean
    AuthMfaChallenge?: boolean | AuthMfaChallengeFindManyArgs
    _count?: boolean | AuthDeviceCountOutputTypeArgs
  }

  export type AuthDeviceInclude = {
    AuthMfaChallenge?: boolean | AuthMfaChallengeFindManyArgs
    _count?: boolean | AuthDeviceCountOutputTypeArgs
  }

  export type AuthDeviceGetPayload<
    S extends boolean | null | undefined | AuthDeviceArgs,
    U = keyof S
      > = S extends true
        ? AuthDevice
    : S extends undefined
    ? never
    : S extends AuthDeviceArgs | AuthDeviceFindManyArgs
    ?'include' extends U
    ? AuthDevice  & {
    [P in TrueKeys<S['include']>]:
        P extends 'AuthMfaChallenge' ? Array < AuthMfaChallengeGetPayload<S['include'][P]>>  :
        P extends '_count' ? AuthDeviceCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'AuthMfaChallenge' ? Array < AuthMfaChallengeGetPayload<S['select'][P]>>  :
        P extends '_count' ? AuthDeviceCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof AuthDevice ? AuthDevice[P] : never
  } 
    : AuthDevice
  : AuthDevice


  type AuthDeviceCountArgs = Merge<
    Omit<AuthDeviceFindManyArgs, 'select' | 'include'> & {
      select?: AuthDeviceCountAggregateInputType | true
    }
  >

  export interface AuthDeviceDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one AuthDevice that matches the filter.
     * @param {AuthDeviceFindUniqueArgs} args - Arguments to find a AuthDevice
     * @example
     * // Get one AuthDevice
     * const authDevice = await prisma.authDevice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AuthDeviceFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AuthDeviceFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'AuthDevice'> extends True ? CheckSelect<T, Prisma__AuthDeviceClient<AuthDevice>, Prisma__AuthDeviceClient<AuthDeviceGetPayload<T>>> : CheckSelect<T, Prisma__AuthDeviceClient<AuthDevice | null >, Prisma__AuthDeviceClient<AuthDeviceGetPayload<T> | null >>

    /**
     * Find the first AuthDevice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthDeviceFindFirstArgs} args - Arguments to find a AuthDevice
     * @example
     * // Get one AuthDevice
     * const authDevice = await prisma.authDevice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AuthDeviceFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AuthDeviceFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'AuthDevice'> extends True ? CheckSelect<T, Prisma__AuthDeviceClient<AuthDevice>, Prisma__AuthDeviceClient<AuthDeviceGetPayload<T>>> : CheckSelect<T, Prisma__AuthDeviceClient<AuthDevice | null >, Prisma__AuthDeviceClient<AuthDeviceGetPayload<T> | null >>

    /**
     * Find zero or more AuthDevices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthDeviceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthDevices
     * const authDevices = await prisma.authDevice.findMany()
     * 
     * // Get first 10 AuthDevices
     * const authDevices = await prisma.authDevice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authDeviceWithIdOnly = await prisma.authDevice.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AuthDeviceFindManyArgs>(
      args?: SelectSubset<T, AuthDeviceFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<AuthDevice>>, PrismaPromise<Array<AuthDeviceGetPayload<T>>>>

    /**
     * Create a AuthDevice.
     * @param {AuthDeviceCreateArgs} args - Arguments to create a AuthDevice.
     * @example
     * // Create one AuthDevice
     * const AuthDevice = await prisma.authDevice.create({
     *   data: {
     *     // ... data to create a AuthDevice
     *   }
     * })
     * 
    **/
    create<T extends AuthDeviceCreateArgs>(
      args: SelectSubset<T, AuthDeviceCreateArgs>
    ): CheckSelect<T, Prisma__AuthDeviceClient<AuthDevice>, Prisma__AuthDeviceClient<AuthDeviceGetPayload<T>>>

    /**
     * Create many AuthDevices.
     *     @param {AuthDeviceCreateManyArgs} args - Arguments to create many AuthDevices.
     *     @example
     *     // Create many AuthDevices
     *     const authDevice = await prisma.authDevice.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AuthDeviceCreateManyArgs>(
      args?: SelectSubset<T, AuthDeviceCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a AuthDevice.
     * @param {AuthDeviceDeleteArgs} args - Arguments to delete one AuthDevice.
     * @example
     * // Delete one AuthDevice
     * const AuthDevice = await prisma.authDevice.delete({
     *   where: {
     *     // ... filter to delete one AuthDevice
     *   }
     * })
     * 
    **/
    delete<T extends AuthDeviceDeleteArgs>(
      args: SelectSubset<T, AuthDeviceDeleteArgs>
    ): CheckSelect<T, Prisma__AuthDeviceClient<AuthDevice>, Prisma__AuthDeviceClient<AuthDeviceGetPayload<T>>>

    /**
     * Update one AuthDevice.
     * @param {AuthDeviceUpdateArgs} args - Arguments to update one AuthDevice.
     * @example
     * // Update one AuthDevice
     * const authDevice = await prisma.authDevice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AuthDeviceUpdateArgs>(
      args: SelectSubset<T, AuthDeviceUpdateArgs>
    ): CheckSelect<T, Prisma__AuthDeviceClient<AuthDevice>, Prisma__AuthDeviceClient<AuthDeviceGetPayload<T>>>

    /**
     * Delete zero or more AuthDevices.
     * @param {AuthDeviceDeleteManyArgs} args - Arguments to filter AuthDevices to delete.
     * @example
     * // Delete a few AuthDevices
     * const { count } = await prisma.authDevice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AuthDeviceDeleteManyArgs>(
      args?: SelectSubset<T, AuthDeviceDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthDevices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthDeviceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthDevices
     * const authDevice = await prisma.authDevice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AuthDeviceUpdateManyArgs>(
      args: SelectSubset<T, AuthDeviceUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one AuthDevice.
     * @param {AuthDeviceUpsertArgs} args - Arguments to update or create a AuthDevice.
     * @example
     * // Update or create a AuthDevice
     * const authDevice = await prisma.authDevice.upsert({
     *   create: {
     *     // ... data to create a AuthDevice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthDevice we want to update
     *   }
     * })
    **/
    upsert<T extends AuthDeviceUpsertArgs>(
      args: SelectSubset<T, AuthDeviceUpsertArgs>
    ): CheckSelect<T, Prisma__AuthDeviceClient<AuthDevice>, Prisma__AuthDeviceClient<AuthDeviceGetPayload<T>>>

    /**
     * Find one AuthDevice that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {AuthDeviceFindUniqueOrThrowArgs} args - Arguments to find a AuthDevice
     * @example
     * // Get one AuthDevice
     * const authDevice = await prisma.authDevice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AuthDeviceFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AuthDeviceFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__AuthDeviceClient<AuthDevice>, Prisma__AuthDeviceClient<AuthDeviceGetPayload<T>>>

    /**
     * Find the first AuthDevice that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthDeviceFindFirstOrThrowArgs} args - Arguments to find a AuthDevice
     * @example
     * // Get one AuthDevice
     * const authDevice = await prisma.authDevice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AuthDeviceFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AuthDeviceFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__AuthDeviceClient<AuthDevice>, Prisma__AuthDeviceClient<AuthDeviceGetPayload<T>>>

    /**
     * Count the number of AuthDevices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthDeviceCountArgs} args - Arguments to filter AuthDevices to count.
     * @example
     * // Count the number of AuthDevices
     * const count = await prisma.authDevice.count({
     *   where: {
     *     // ... the filter for the AuthDevices we want to count
     *   }
     * })
    **/
    count<T extends AuthDeviceCountArgs>(
      args?: Subset<T, AuthDeviceCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthDeviceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthDevice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthDeviceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthDeviceAggregateArgs>(args: Subset<T, AuthDeviceAggregateArgs>): PrismaPromise<GetAuthDeviceAggregateType<T>>

    /**
     * Group by AuthDevice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthDeviceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthDeviceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthDeviceGroupByArgs['orderBy'] }
        : { orderBy?: AuthDeviceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthDeviceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthDeviceGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthDevice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AuthDeviceClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    AuthMfaChallenge<T extends AuthMfaChallengeFindManyArgs = {}>(args?: Subset<T, AuthMfaChallengeFindManyArgs>): CheckSelect<T, PrismaPromise<Array<AuthMfaChallenge>>, PrismaPromise<Array<AuthMfaChallengeGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * AuthDevice base type for findUnique actions
   */
  export type AuthDeviceFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the AuthDevice
     * 
    **/
    select?: AuthDeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthDeviceInclude | null
    /**
     * Filter, which AuthDevice to fetch.
     * 
    **/
    where: AuthDeviceWhereUniqueInput
  }

  /**
   * AuthDevice: findUnique
   */
  export interface AuthDeviceFindUniqueArgs extends AuthDeviceFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AuthDevice base type for findFirst actions
   */
  export type AuthDeviceFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the AuthDevice
     * 
    **/
    select?: AuthDeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthDeviceInclude | null
    /**
     * Filter, which AuthDevice to fetch.
     * 
    **/
    where?: AuthDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthDevices to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthDeviceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthDevices.
     * 
    **/
    cursor?: AuthDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthDevices from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthDevices.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthDevices.
     * 
    **/
    distinct?: Enumerable<AuthDeviceScalarFieldEnum>
  }

  /**
   * AuthDevice: findFirst
   */
  export interface AuthDeviceFindFirstArgs extends AuthDeviceFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AuthDevice findMany
   */
  export type AuthDeviceFindManyArgs = {
    /**
     * Select specific fields to fetch from the AuthDevice
     * 
    **/
    select?: AuthDeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthDeviceInclude | null
    /**
     * Filter, which AuthDevices to fetch.
     * 
    **/
    where?: AuthDeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthDevices to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthDeviceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthDevices.
     * 
    **/
    cursor?: AuthDeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthDevices from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthDevices.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AuthDeviceScalarFieldEnum>
  }


  /**
   * AuthDevice create
   */
  export type AuthDeviceCreateArgs = {
    /**
     * Select specific fields to fetch from the AuthDevice
     * 
    **/
    select?: AuthDeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthDeviceInclude | null
    /**
     * The data needed to create a AuthDevice.
     * 
    **/
    data: XOR<AuthDeviceCreateInput, AuthDeviceUncheckedCreateInput>
  }


  /**
   * AuthDevice createMany
   */
  export type AuthDeviceCreateManyArgs = {
    /**
     * The data used to create many AuthDevices.
     * 
    **/
    data: Enumerable<AuthDeviceCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * AuthDevice update
   */
  export type AuthDeviceUpdateArgs = {
    /**
     * Select specific fields to fetch from the AuthDevice
     * 
    **/
    select?: AuthDeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthDeviceInclude | null
    /**
     * The data needed to update a AuthDevice.
     * 
    **/
    data: XOR<AuthDeviceUpdateInput, AuthDeviceUncheckedUpdateInput>
    /**
     * Choose, which AuthDevice to update.
     * 
    **/
    where: AuthDeviceWhereUniqueInput
  }


  /**
   * AuthDevice updateMany
   */
  export type AuthDeviceUpdateManyArgs = {
    /**
     * The data used to update AuthDevices.
     * 
    **/
    data: XOR<AuthDeviceUpdateManyMutationInput, AuthDeviceUncheckedUpdateManyInput>
    /**
     * Filter which AuthDevices to update
     * 
    **/
    where?: AuthDeviceWhereInput
  }


  /**
   * AuthDevice upsert
   */
  export type AuthDeviceUpsertArgs = {
    /**
     * Select specific fields to fetch from the AuthDevice
     * 
    **/
    select?: AuthDeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthDeviceInclude | null
    /**
     * The filter to search for the AuthDevice to update in case it exists.
     * 
    **/
    where: AuthDeviceWhereUniqueInput
    /**
     * In case the AuthDevice found by the `where` argument doesn't exist, create a new AuthDevice with this data.
     * 
    **/
    create: XOR<AuthDeviceCreateInput, AuthDeviceUncheckedCreateInput>
    /**
     * In case the AuthDevice was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AuthDeviceUpdateInput, AuthDeviceUncheckedUpdateInput>
  }


  /**
   * AuthDevice delete
   */
  export type AuthDeviceDeleteArgs = {
    /**
     * Select specific fields to fetch from the AuthDevice
     * 
    **/
    select?: AuthDeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthDeviceInclude | null
    /**
     * Filter which AuthDevice to delete.
     * 
    **/
    where: AuthDeviceWhereUniqueInput
  }


  /**
   * AuthDevice deleteMany
   */
  export type AuthDeviceDeleteManyArgs = {
    /**
     * Filter which AuthDevices to delete
     * 
    **/
    where?: AuthDeviceWhereInput
  }


  /**
   * AuthDevice: findUniqueOrThrow
   */
  export type AuthDeviceFindUniqueOrThrowArgs = AuthDeviceFindUniqueArgsBase
      

  /**
   * AuthDevice: findFirstOrThrow
   */
  export type AuthDeviceFindFirstOrThrowArgs = AuthDeviceFindFirstArgsBase
      

  /**
   * AuthDevice without action
   */
  export type AuthDeviceArgs = {
    /**
     * Select specific fields to fetch from the AuthDevice
     * 
    **/
    select?: AuthDeviceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthDeviceInclude | null
  }



  /**
   * Model AuthMfaChallenge
   */


  export type AggregateAuthMfaChallenge = {
    _count: AuthMfaChallengeCountAggregateOutputType | null
    _min: AuthMfaChallengeMinAggregateOutputType | null
    _max: AuthMfaChallengeMaxAggregateOutputType | null
  }

  export type AuthMfaChallengeMinAggregateOutputType = {
    id: string | null
    authId: string | null
    createdAt: Date | null
    succeededAt: Date | null
    rememberUntil: Date | null
    authDeviceId: string | null
    reason: string | null
    authMfaConfigId: string | null
  }

  export type AuthMfaChallengeMaxAggregateOutputType = {
    id: string | null
    authId: string | null
    createdAt: Date | null
    succeededAt: Date | null
    rememberUntil: Date | null
    authDeviceId: string | null
    reason: string | null
    authMfaConfigId: string | null
  }

  export type AuthMfaChallengeCountAggregateOutputType = {
    id: number
    authId: number
    createdAt: number
    succeededAt: number
    rememberUntil: number
    authDeviceId: number
    reason: number
    authMfaConfigId: number
    _all: number
  }


  export type AuthMfaChallengeMinAggregateInputType = {
    id?: true
    authId?: true
    createdAt?: true
    succeededAt?: true
    rememberUntil?: true
    authDeviceId?: true
    reason?: true
    authMfaConfigId?: true
  }

  export type AuthMfaChallengeMaxAggregateInputType = {
    id?: true
    authId?: true
    createdAt?: true
    succeededAt?: true
    rememberUntil?: true
    authDeviceId?: true
    reason?: true
    authMfaConfigId?: true
  }

  export type AuthMfaChallengeCountAggregateInputType = {
    id?: true
    authId?: true
    createdAt?: true
    succeededAt?: true
    rememberUntil?: true
    authDeviceId?: true
    reason?: true
    authMfaConfigId?: true
    _all?: true
  }

  export type AuthMfaChallengeAggregateArgs = {
    /**
     * Filter which AuthMfaChallenge to aggregate.
     * 
    **/
    where?: AuthMfaChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthMfaChallenges to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthMfaChallengeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AuthMfaChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthMfaChallenges from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthMfaChallenges.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthMfaChallenges
    **/
    _count?: true | AuthMfaChallengeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthMfaChallengeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthMfaChallengeMaxAggregateInputType
  }

  export type GetAuthMfaChallengeAggregateType<T extends AuthMfaChallengeAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthMfaChallenge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthMfaChallenge[P]>
      : GetScalarType<T[P], AggregateAuthMfaChallenge[P]>
  }




  export type AuthMfaChallengeGroupByArgs = {
    where?: AuthMfaChallengeWhereInput
    orderBy?: Enumerable<AuthMfaChallengeOrderByWithAggregationInput>
    by: Array<AuthMfaChallengeScalarFieldEnum>
    having?: AuthMfaChallengeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthMfaChallengeCountAggregateInputType | true
    _min?: AuthMfaChallengeMinAggregateInputType
    _max?: AuthMfaChallengeMaxAggregateInputType
  }


  export type AuthMfaChallengeGroupByOutputType = {
    id: string
    authId: string
    createdAt: Date
    succeededAt: Date | null
    rememberUntil: Date
    authDeviceId: string
    reason: string | null
    authMfaConfigId: string | null
    _count: AuthMfaChallengeCountAggregateOutputType | null
    _min: AuthMfaChallengeMinAggregateOutputType | null
    _max: AuthMfaChallengeMaxAggregateOutputType | null
  }

  type GetAuthMfaChallengeGroupByPayload<T extends AuthMfaChallengeGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AuthMfaChallengeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthMfaChallengeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthMfaChallengeGroupByOutputType[P]>
            : GetScalarType<T[P], AuthMfaChallengeGroupByOutputType[P]>
        }
      >
    >


  export type AuthMfaChallengeSelect = {
    id?: boolean
    authId?: boolean
    createdAt?: boolean
    succeededAt?: boolean
    rememberUntil?: boolean
    authDeviceId?: boolean
    authDevice?: boolean | AuthDeviceArgs
    reason?: boolean
    AuthMfaChallengeAttempt?: boolean | AuthMfaChallengeAttemptFindManyArgs
    AuthMfaConfig?: boolean | AuthMfaConfigArgs
    authMfaConfigId?: boolean
    _count?: boolean | AuthMfaChallengeCountOutputTypeArgs
  }

  export type AuthMfaChallengeInclude = {
    authDevice?: boolean | AuthDeviceArgs
    AuthMfaChallengeAttempt?: boolean | AuthMfaChallengeAttemptFindManyArgs
    AuthMfaConfig?: boolean | AuthMfaConfigArgs
    _count?: boolean | AuthMfaChallengeCountOutputTypeArgs
  }

  export type AuthMfaChallengeGetPayload<
    S extends boolean | null | undefined | AuthMfaChallengeArgs,
    U = keyof S
      > = S extends true
        ? AuthMfaChallenge
    : S extends undefined
    ? never
    : S extends AuthMfaChallengeArgs | AuthMfaChallengeFindManyArgs
    ?'include' extends U
    ? AuthMfaChallenge  & {
    [P in TrueKeys<S['include']>]:
        P extends 'authDevice' ? AuthDeviceGetPayload<S['include'][P]> :
        P extends 'AuthMfaChallengeAttempt' ? Array < AuthMfaChallengeAttemptGetPayload<S['include'][P]>>  :
        P extends 'AuthMfaConfig' ? AuthMfaConfigGetPayload<S['include'][P]> | null :
        P extends '_count' ? AuthMfaChallengeCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'authDevice' ? AuthDeviceGetPayload<S['select'][P]> :
        P extends 'AuthMfaChallengeAttempt' ? Array < AuthMfaChallengeAttemptGetPayload<S['select'][P]>>  :
        P extends 'AuthMfaConfig' ? AuthMfaConfigGetPayload<S['select'][P]> | null :
        P extends '_count' ? AuthMfaChallengeCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof AuthMfaChallenge ? AuthMfaChallenge[P] : never
  } 
    : AuthMfaChallenge
  : AuthMfaChallenge


  type AuthMfaChallengeCountArgs = Merge<
    Omit<AuthMfaChallengeFindManyArgs, 'select' | 'include'> & {
      select?: AuthMfaChallengeCountAggregateInputType | true
    }
  >

  export interface AuthMfaChallengeDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one AuthMfaChallenge that matches the filter.
     * @param {AuthMfaChallengeFindUniqueArgs} args - Arguments to find a AuthMfaChallenge
     * @example
     * // Get one AuthMfaChallenge
     * const authMfaChallenge = await prisma.authMfaChallenge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AuthMfaChallengeFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AuthMfaChallengeFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'AuthMfaChallenge'> extends True ? CheckSelect<T, Prisma__AuthMfaChallengeClient<AuthMfaChallenge>, Prisma__AuthMfaChallengeClient<AuthMfaChallengeGetPayload<T>>> : CheckSelect<T, Prisma__AuthMfaChallengeClient<AuthMfaChallenge | null >, Prisma__AuthMfaChallengeClient<AuthMfaChallengeGetPayload<T> | null >>

    /**
     * Find the first AuthMfaChallenge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaChallengeFindFirstArgs} args - Arguments to find a AuthMfaChallenge
     * @example
     * // Get one AuthMfaChallenge
     * const authMfaChallenge = await prisma.authMfaChallenge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AuthMfaChallengeFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AuthMfaChallengeFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'AuthMfaChallenge'> extends True ? CheckSelect<T, Prisma__AuthMfaChallengeClient<AuthMfaChallenge>, Prisma__AuthMfaChallengeClient<AuthMfaChallengeGetPayload<T>>> : CheckSelect<T, Prisma__AuthMfaChallengeClient<AuthMfaChallenge | null >, Prisma__AuthMfaChallengeClient<AuthMfaChallengeGetPayload<T> | null >>

    /**
     * Find zero or more AuthMfaChallenges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaChallengeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthMfaChallenges
     * const authMfaChallenges = await prisma.authMfaChallenge.findMany()
     * 
     * // Get first 10 AuthMfaChallenges
     * const authMfaChallenges = await prisma.authMfaChallenge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authMfaChallengeWithIdOnly = await prisma.authMfaChallenge.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AuthMfaChallengeFindManyArgs>(
      args?: SelectSubset<T, AuthMfaChallengeFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<AuthMfaChallenge>>, PrismaPromise<Array<AuthMfaChallengeGetPayload<T>>>>

    /**
     * Create a AuthMfaChallenge.
     * @param {AuthMfaChallengeCreateArgs} args - Arguments to create a AuthMfaChallenge.
     * @example
     * // Create one AuthMfaChallenge
     * const AuthMfaChallenge = await prisma.authMfaChallenge.create({
     *   data: {
     *     // ... data to create a AuthMfaChallenge
     *   }
     * })
     * 
    **/
    create<T extends AuthMfaChallengeCreateArgs>(
      args: SelectSubset<T, AuthMfaChallengeCreateArgs>
    ): CheckSelect<T, Prisma__AuthMfaChallengeClient<AuthMfaChallenge>, Prisma__AuthMfaChallengeClient<AuthMfaChallengeGetPayload<T>>>

    /**
     * Create many AuthMfaChallenges.
     *     @param {AuthMfaChallengeCreateManyArgs} args - Arguments to create many AuthMfaChallenges.
     *     @example
     *     // Create many AuthMfaChallenges
     *     const authMfaChallenge = await prisma.authMfaChallenge.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AuthMfaChallengeCreateManyArgs>(
      args?: SelectSubset<T, AuthMfaChallengeCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a AuthMfaChallenge.
     * @param {AuthMfaChallengeDeleteArgs} args - Arguments to delete one AuthMfaChallenge.
     * @example
     * // Delete one AuthMfaChallenge
     * const AuthMfaChallenge = await prisma.authMfaChallenge.delete({
     *   where: {
     *     // ... filter to delete one AuthMfaChallenge
     *   }
     * })
     * 
    **/
    delete<T extends AuthMfaChallengeDeleteArgs>(
      args: SelectSubset<T, AuthMfaChallengeDeleteArgs>
    ): CheckSelect<T, Prisma__AuthMfaChallengeClient<AuthMfaChallenge>, Prisma__AuthMfaChallengeClient<AuthMfaChallengeGetPayload<T>>>

    /**
     * Update one AuthMfaChallenge.
     * @param {AuthMfaChallengeUpdateArgs} args - Arguments to update one AuthMfaChallenge.
     * @example
     * // Update one AuthMfaChallenge
     * const authMfaChallenge = await prisma.authMfaChallenge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AuthMfaChallengeUpdateArgs>(
      args: SelectSubset<T, AuthMfaChallengeUpdateArgs>
    ): CheckSelect<T, Prisma__AuthMfaChallengeClient<AuthMfaChallenge>, Prisma__AuthMfaChallengeClient<AuthMfaChallengeGetPayload<T>>>

    /**
     * Delete zero or more AuthMfaChallenges.
     * @param {AuthMfaChallengeDeleteManyArgs} args - Arguments to filter AuthMfaChallenges to delete.
     * @example
     * // Delete a few AuthMfaChallenges
     * const { count } = await prisma.authMfaChallenge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AuthMfaChallengeDeleteManyArgs>(
      args?: SelectSubset<T, AuthMfaChallengeDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthMfaChallenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaChallengeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthMfaChallenges
     * const authMfaChallenge = await prisma.authMfaChallenge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AuthMfaChallengeUpdateManyArgs>(
      args: SelectSubset<T, AuthMfaChallengeUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one AuthMfaChallenge.
     * @param {AuthMfaChallengeUpsertArgs} args - Arguments to update or create a AuthMfaChallenge.
     * @example
     * // Update or create a AuthMfaChallenge
     * const authMfaChallenge = await prisma.authMfaChallenge.upsert({
     *   create: {
     *     // ... data to create a AuthMfaChallenge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthMfaChallenge we want to update
     *   }
     * })
    **/
    upsert<T extends AuthMfaChallengeUpsertArgs>(
      args: SelectSubset<T, AuthMfaChallengeUpsertArgs>
    ): CheckSelect<T, Prisma__AuthMfaChallengeClient<AuthMfaChallenge>, Prisma__AuthMfaChallengeClient<AuthMfaChallengeGetPayload<T>>>

    /**
     * Find one AuthMfaChallenge that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {AuthMfaChallengeFindUniqueOrThrowArgs} args - Arguments to find a AuthMfaChallenge
     * @example
     * // Get one AuthMfaChallenge
     * const authMfaChallenge = await prisma.authMfaChallenge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AuthMfaChallengeFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AuthMfaChallengeFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__AuthMfaChallengeClient<AuthMfaChallenge>, Prisma__AuthMfaChallengeClient<AuthMfaChallengeGetPayload<T>>>

    /**
     * Find the first AuthMfaChallenge that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaChallengeFindFirstOrThrowArgs} args - Arguments to find a AuthMfaChallenge
     * @example
     * // Get one AuthMfaChallenge
     * const authMfaChallenge = await prisma.authMfaChallenge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AuthMfaChallengeFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AuthMfaChallengeFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__AuthMfaChallengeClient<AuthMfaChallenge>, Prisma__AuthMfaChallengeClient<AuthMfaChallengeGetPayload<T>>>

    /**
     * Count the number of AuthMfaChallenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaChallengeCountArgs} args - Arguments to filter AuthMfaChallenges to count.
     * @example
     * // Count the number of AuthMfaChallenges
     * const count = await prisma.authMfaChallenge.count({
     *   where: {
     *     // ... the filter for the AuthMfaChallenges we want to count
     *   }
     * })
    **/
    count<T extends AuthMfaChallengeCountArgs>(
      args?: Subset<T, AuthMfaChallengeCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthMfaChallengeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthMfaChallenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaChallengeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthMfaChallengeAggregateArgs>(args: Subset<T, AuthMfaChallengeAggregateArgs>): PrismaPromise<GetAuthMfaChallengeAggregateType<T>>

    /**
     * Group by AuthMfaChallenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaChallengeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthMfaChallengeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthMfaChallengeGroupByArgs['orderBy'] }
        : { orderBy?: AuthMfaChallengeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthMfaChallengeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthMfaChallengeGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthMfaChallenge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AuthMfaChallengeClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    authDevice<T extends AuthDeviceArgs = {}>(args?: Subset<T, AuthDeviceArgs>): CheckSelect<T, Prisma__AuthDeviceClient<AuthDevice | null >, Prisma__AuthDeviceClient<AuthDeviceGetPayload<T> | null >>;

    AuthMfaChallengeAttempt<T extends AuthMfaChallengeAttemptFindManyArgs = {}>(args?: Subset<T, AuthMfaChallengeAttemptFindManyArgs>): CheckSelect<T, PrismaPromise<Array<AuthMfaChallengeAttempt>>, PrismaPromise<Array<AuthMfaChallengeAttemptGetPayload<T>>>>;

    AuthMfaConfig<T extends AuthMfaConfigArgs = {}>(args?: Subset<T, AuthMfaConfigArgs>): CheckSelect<T, Prisma__AuthMfaConfigClient<AuthMfaConfig | null >, Prisma__AuthMfaConfigClient<AuthMfaConfigGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * AuthMfaChallenge base type for findUnique actions
   */
  export type AuthMfaChallengeFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the AuthMfaChallenge
     * 
    **/
    select?: AuthMfaChallengeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaChallengeInclude | null
    /**
     * Filter, which AuthMfaChallenge to fetch.
     * 
    **/
    where: AuthMfaChallengeWhereUniqueInput
  }

  /**
   * AuthMfaChallenge: findUnique
   */
  export interface AuthMfaChallengeFindUniqueArgs extends AuthMfaChallengeFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AuthMfaChallenge base type for findFirst actions
   */
  export type AuthMfaChallengeFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the AuthMfaChallenge
     * 
    **/
    select?: AuthMfaChallengeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaChallengeInclude | null
    /**
     * Filter, which AuthMfaChallenge to fetch.
     * 
    **/
    where?: AuthMfaChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthMfaChallenges to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthMfaChallengeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthMfaChallenges.
     * 
    **/
    cursor?: AuthMfaChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthMfaChallenges from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthMfaChallenges.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthMfaChallenges.
     * 
    **/
    distinct?: Enumerable<AuthMfaChallengeScalarFieldEnum>
  }

  /**
   * AuthMfaChallenge: findFirst
   */
  export interface AuthMfaChallengeFindFirstArgs extends AuthMfaChallengeFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AuthMfaChallenge findMany
   */
  export type AuthMfaChallengeFindManyArgs = {
    /**
     * Select specific fields to fetch from the AuthMfaChallenge
     * 
    **/
    select?: AuthMfaChallengeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaChallengeInclude | null
    /**
     * Filter, which AuthMfaChallenges to fetch.
     * 
    **/
    where?: AuthMfaChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthMfaChallenges to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthMfaChallengeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthMfaChallenges.
     * 
    **/
    cursor?: AuthMfaChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthMfaChallenges from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthMfaChallenges.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AuthMfaChallengeScalarFieldEnum>
  }


  /**
   * AuthMfaChallenge create
   */
  export type AuthMfaChallengeCreateArgs = {
    /**
     * Select specific fields to fetch from the AuthMfaChallenge
     * 
    **/
    select?: AuthMfaChallengeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaChallengeInclude | null
    /**
     * The data needed to create a AuthMfaChallenge.
     * 
    **/
    data: XOR<AuthMfaChallengeCreateInput, AuthMfaChallengeUncheckedCreateInput>
  }


  /**
   * AuthMfaChallenge createMany
   */
  export type AuthMfaChallengeCreateManyArgs = {
    /**
     * The data used to create many AuthMfaChallenges.
     * 
    **/
    data: Enumerable<AuthMfaChallengeCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * AuthMfaChallenge update
   */
  export type AuthMfaChallengeUpdateArgs = {
    /**
     * Select specific fields to fetch from the AuthMfaChallenge
     * 
    **/
    select?: AuthMfaChallengeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaChallengeInclude | null
    /**
     * The data needed to update a AuthMfaChallenge.
     * 
    **/
    data: XOR<AuthMfaChallengeUpdateInput, AuthMfaChallengeUncheckedUpdateInput>
    /**
     * Choose, which AuthMfaChallenge to update.
     * 
    **/
    where: AuthMfaChallengeWhereUniqueInput
  }


  /**
   * AuthMfaChallenge updateMany
   */
  export type AuthMfaChallengeUpdateManyArgs = {
    /**
     * The data used to update AuthMfaChallenges.
     * 
    **/
    data: XOR<AuthMfaChallengeUpdateManyMutationInput, AuthMfaChallengeUncheckedUpdateManyInput>
    /**
     * Filter which AuthMfaChallenges to update
     * 
    **/
    where?: AuthMfaChallengeWhereInput
  }


  /**
   * AuthMfaChallenge upsert
   */
  export type AuthMfaChallengeUpsertArgs = {
    /**
     * Select specific fields to fetch from the AuthMfaChallenge
     * 
    **/
    select?: AuthMfaChallengeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaChallengeInclude | null
    /**
     * The filter to search for the AuthMfaChallenge to update in case it exists.
     * 
    **/
    where: AuthMfaChallengeWhereUniqueInput
    /**
     * In case the AuthMfaChallenge found by the `where` argument doesn't exist, create a new AuthMfaChallenge with this data.
     * 
    **/
    create: XOR<AuthMfaChallengeCreateInput, AuthMfaChallengeUncheckedCreateInput>
    /**
     * In case the AuthMfaChallenge was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AuthMfaChallengeUpdateInput, AuthMfaChallengeUncheckedUpdateInput>
  }


  /**
   * AuthMfaChallenge delete
   */
  export type AuthMfaChallengeDeleteArgs = {
    /**
     * Select specific fields to fetch from the AuthMfaChallenge
     * 
    **/
    select?: AuthMfaChallengeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaChallengeInclude | null
    /**
     * Filter which AuthMfaChallenge to delete.
     * 
    **/
    where: AuthMfaChallengeWhereUniqueInput
  }


  /**
   * AuthMfaChallenge deleteMany
   */
  export type AuthMfaChallengeDeleteManyArgs = {
    /**
     * Filter which AuthMfaChallenges to delete
     * 
    **/
    where?: AuthMfaChallengeWhereInput
  }


  /**
   * AuthMfaChallenge: findUniqueOrThrow
   */
  export type AuthMfaChallengeFindUniqueOrThrowArgs = AuthMfaChallengeFindUniqueArgsBase
      

  /**
   * AuthMfaChallenge: findFirstOrThrow
   */
  export type AuthMfaChallengeFindFirstOrThrowArgs = AuthMfaChallengeFindFirstArgsBase
      

  /**
   * AuthMfaChallenge without action
   */
  export type AuthMfaChallengeArgs = {
    /**
     * Select specific fields to fetch from the AuthMfaChallenge
     * 
    **/
    select?: AuthMfaChallengeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaChallengeInclude | null
  }



  /**
   * Model AuthMfaChallengeAttempt
   */


  export type AggregateAuthMfaChallengeAttempt = {
    _count: AuthMfaChallengeAttemptCountAggregateOutputType | null
    _min: AuthMfaChallengeAttemptMinAggregateOutputType | null
    _max: AuthMfaChallengeAttemptMaxAggregateOutputType | null
  }

  export type AuthMfaChallengeAttemptMinAggregateOutputType = {
    id: string | null
    authId: string | null
    createdAt: Date | null
    wasSuccessful: boolean | null
    authMfaChallengeId: string | null
    authMfaConfigId: string | null
  }

  export type AuthMfaChallengeAttemptMaxAggregateOutputType = {
    id: string | null
    authId: string | null
    createdAt: Date | null
    wasSuccessful: boolean | null
    authMfaChallengeId: string | null
    authMfaConfigId: string | null
  }

  export type AuthMfaChallengeAttemptCountAggregateOutputType = {
    id: number
    authId: number
    createdAt: number
    wasSuccessful: number
    authMfaChallengeId: number
    authMfaConfigId: number
    _all: number
  }


  export type AuthMfaChallengeAttemptMinAggregateInputType = {
    id?: true
    authId?: true
    createdAt?: true
    wasSuccessful?: true
    authMfaChallengeId?: true
    authMfaConfigId?: true
  }

  export type AuthMfaChallengeAttemptMaxAggregateInputType = {
    id?: true
    authId?: true
    createdAt?: true
    wasSuccessful?: true
    authMfaChallengeId?: true
    authMfaConfigId?: true
  }

  export type AuthMfaChallengeAttemptCountAggregateInputType = {
    id?: true
    authId?: true
    createdAt?: true
    wasSuccessful?: true
    authMfaChallengeId?: true
    authMfaConfigId?: true
    _all?: true
  }

  export type AuthMfaChallengeAttemptAggregateArgs = {
    /**
     * Filter which AuthMfaChallengeAttempt to aggregate.
     * 
    **/
    where?: AuthMfaChallengeAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthMfaChallengeAttempts to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthMfaChallengeAttemptOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AuthMfaChallengeAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthMfaChallengeAttempts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthMfaChallengeAttempts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthMfaChallengeAttempts
    **/
    _count?: true | AuthMfaChallengeAttemptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthMfaChallengeAttemptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthMfaChallengeAttemptMaxAggregateInputType
  }

  export type GetAuthMfaChallengeAttemptAggregateType<T extends AuthMfaChallengeAttemptAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthMfaChallengeAttempt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthMfaChallengeAttempt[P]>
      : GetScalarType<T[P], AggregateAuthMfaChallengeAttempt[P]>
  }




  export type AuthMfaChallengeAttemptGroupByArgs = {
    where?: AuthMfaChallengeAttemptWhereInput
    orderBy?: Enumerable<AuthMfaChallengeAttemptOrderByWithAggregationInput>
    by: Array<AuthMfaChallengeAttemptScalarFieldEnum>
    having?: AuthMfaChallengeAttemptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthMfaChallengeAttemptCountAggregateInputType | true
    _min?: AuthMfaChallengeAttemptMinAggregateInputType
    _max?: AuthMfaChallengeAttemptMaxAggregateInputType
  }


  export type AuthMfaChallengeAttemptGroupByOutputType = {
    id: string
    authId: string
    createdAt: Date
    wasSuccessful: boolean
    authMfaChallengeId: string
    authMfaConfigId: string
    _count: AuthMfaChallengeAttemptCountAggregateOutputType | null
    _min: AuthMfaChallengeAttemptMinAggregateOutputType | null
    _max: AuthMfaChallengeAttemptMaxAggregateOutputType | null
  }

  type GetAuthMfaChallengeAttemptGroupByPayload<T extends AuthMfaChallengeAttemptGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AuthMfaChallengeAttemptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthMfaChallengeAttemptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthMfaChallengeAttemptGroupByOutputType[P]>
            : GetScalarType<T[P], AuthMfaChallengeAttemptGroupByOutputType[P]>
        }
      >
    >


  export type AuthMfaChallengeAttemptSelect = {
    id?: boolean
    authId?: boolean
    createdAt?: boolean
    wasSuccessful?: boolean
    authMfaChallengeId?: boolean
    challenge?: boolean | AuthMfaChallengeArgs
    authMfaConfigId?: boolean
    authMfaConfig?: boolean | AuthMfaConfigArgs
  }

  export type AuthMfaChallengeAttemptInclude = {
    challenge?: boolean | AuthMfaChallengeArgs
    authMfaConfig?: boolean | AuthMfaConfigArgs
  }

  export type AuthMfaChallengeAttemptGetPayload<
    S extends boolean | null | undefined | AuthMfaChallengeAttemptArgs,
    U = keyof S
      > = S extends true
        ? AuthMfaChallengeAttempt
    : S extends undefined
    ? never
    : S extends AuthMfaChallengeAttemptArgs | AuthMfaChallengeAttemptFindManyArgs
    ?'include' extends U
    ? AuthMfaChallengeAttempt  & {
    [P in TrueKeys<S['include']>]:
        P extends 'challenge' ? AuthMfaChallengeGetPayload<S['include'][P]> :
        P extends 'authMfaConfig' ? AuthMfaConfigGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'challenge' ? AuthMfaChallengeGetPayload<S['select'][P]> :
        P extends 'authMfaConfig' ? AuthMfaConfigGetPayload<S['select'][P]> :  P extends keyof AuthMfaChallengeAttempt ? AuthMfaChallengeAttempt[P] : never
  } 
    : AuthMfaChallengeAttempt
  : AuthMfaChallengeAttempt


  type AuthMfaChallengeAttemptCountArgs = Merge<
    Omit<AuthMfaChallengeAttemptFindManyArgs, 'select' | 'include'> & {
      select?: AuthMfaChallengeAttemptCountAggregateInputType | true
    }
  >

  export interface AuthMfaChallengeAttemptDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one AuthMfaChallengeAttempt that matches the filter.
     * @param {AuthMfaChallengeAttemptFindUniqueArgs} args - Arguments to find a AuthMfaChallengeAttempt
     * @example
     * // Get one AuthMfaChallengeAttempt
     * const authMfaChallengeAttempt = await prisma.authMfaChallengeAttempt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AuthMfaChallengeAttemptFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AuthMfaChallengeAttemptFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'AuthMfaChallengeAttempt'> extends True ? CheckSelect<T, Prisma__AuthMfaChallengeAttemptClient<AuthMfaChallengeAttempt>, Prisma__AuthMfaChallengeAttemptClient<AuthMfaChallengeAttemptGetPayload<T>>> : CheckSelect<T, Prisma__AuthMfaChallengeAttemptClient<AuthMfaChallengeAttempt | null >, Prisma__AuthMfaChallengeAttemptClient<AuthMfaChallengeAttemptGetPayload<T> | null >>

    /**
     * Find the first AuthMfaChallengeAttempt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaChallengeAttemptFindFirstArgs} args - Arguments to find a AuthMfaChallengeAttempt
     * @example
     * // Get one AuthMfaChallengeAttempt
     * const authMfaChallengeAttempt = await prisma.authMfaChallengeAttempt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AuthMfaChallengeAttemptFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AuthMfaChallengeAttemptFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'AuthMfaChallengeAttempt'> extends True ? CheckSelect<T, Prisma__AuthMfaChallengeAttemptClient<AuthMfaChallengeAttempt>, Prisma__AuthMfaChallengeAttemptClient<AuthMfaChallengeAttemptGetPayload<T>>> : CheckSelect<T, Prisma__AuthMfaChallengeAttemptClient<AuthMfaChallengeAttempt | null >, Prisma__AuthMfaChallengeAttemptClient<AuthMfaChallengeAttemptGetPayload<T> | null >>

    /**
     * Find zero or more AuthMfaChallengeAttempts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaChallengeAttemptFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthMfaChallengeAttempts
     * const authMfaChallengeAttempts = await prisma.authMfaChallengeAttempt.findMany()
     * 
     * // Get first 10 AuthMfaChallengeAttempts
     * const authMfaChallengeAttempts = await prisma.authMfaChallengeAttempt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authMfaChallengeAttemptWithIdOnly = await prisma.authMfaChallengeAttempt.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AuthMfaChallengeAttemptFindManyArgs>(
      args?: SelectSubset<T, AuthMfaChallengeAttemptFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<AuthMfaChallengeAttempt>>, PrismaPromise<Array<AuthMfaChallengeAttemptGetPayload<T>>>>

    /**
     * Create a AuthMfaChallengeAttempt.
     * @param {AuthMfaChallengeAttemptCreateArgs} args - Arguments to create a AuthMfaChallengeAttempt.
     * @example
     * // Create one AuthMfaChallengeAttempt
     * const AuthMfaChallengeAttempt = await prisma.authMfaChallengeAttempt.create({
     *   data: {
     *     // ... data to create a AuthMfaChallengeAttempt
     *   }
     * })
     * 
    **/
    create<T extends AuthMfaChallengeAttemptCreateArgs>(
      args: SelectSubset<T, AuthMfaChallengeAttemptCreateArgs>
    ): CheckSelect<T, Prisma__AuthMfaChallengeAttemptClient<AuthMfaChallengeAttempt>, Prisma__AuthMfaChallengeAttemptClient<AuthMfaChallengeAttemptGetPayload<T>>>

    /**
     * Create many AuthMfaChallengeAttempts.
     *     @param {AuthMfaChallengeAttemptCreateManyArgs} args - Arguments to create many AuthMfaChallengeAttempts.
     *     @example
     *     // Create many AuthMfaChallengeAttempts
     *     const authMfaChallengeAttempt = await prisma.authMfaChallengeAttempt.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AuthMfaChallengeAttemptCreateManyArgs>(
      args?: SelectSubset<T, AuthMfaChallengeAttemptCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a AuthMfaChallengeAttempt.
     * @param {AuthMfaChallengeAttemptDeleteArgs} args - Arguments to delete one AuthMfaChallengeAttempt.
     * @example
     * // Delete one AuthMfaChallengeAttempt
     * const AuthMfaChallengeAttempt = await prisma.authMfaChallengeAttempt.delete({
     *   where: {
     *     // ... filter to delete one AuthMfaChallengeAttempt
     *   }
     * })
     * 
    **/
    delete<T extends AuthMfaChallengeAttemptDeleteArgs>(
      args: SelectSubset<T, AuthMfaChallengeAttemptDeleteArgs>
    ): CheckSelect<T, Prisma__AuthMfaChallengeAttemptClient<AuthMfaChallengeAttempt>, Prisma__AuthMfaChallengeAttemptClient<AuthMfaChallengeAttemptGetPayload<T>>>

    /**
     * Update one AuthMfaChallengeAttempt.
     * @param {AuthMfaChallengeAttemptUpdateArgs} args - Arguments to update one AuthMfaChallengeAttempt.
     * @example
     * // Update one AuthMfaChallengeAttempt
     * const authMfaChallengeAttempt = await prisma.authMfaChallengeAttempt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AuthMfaChallengeAttemptUpdateArgs>(
      args: SelectSubset<T, AuthMfaChallengeAttemptUpdateArgs>
    ): CheckSelect<T, Prisma__AuthMfaChallengeAttemptClient<AuthMfaChallengeAttempt>, Prisma__AuthMfaChallengeAttemptClient<AuthMfaChallengeAttemptGetPayload<T>>>

    /**
     * Delete zero or more AuthMfaChallengeAttempts.
     * @param {AuthMfaChallengeAttemptDeleteManyArgs} args - Arguments to filter AuthMfaChallengeAttempts to delete.
     * @example
     * // Delete a few AuthMfaChallengeAttempts
     * const { count } = await prisma.authMfaChallengeAttempt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AuthMfaChallengeAttemptDeleteManyArgs>(
      args?: SelectSubset<T, AuthMfaChallengeAttemptDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthMfaChallengeAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaChallengeAttemptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthMfaChallengeAttempts
     * const authMfaChallengeAttempt = await prisma.authMfaChallengeAttempt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AuthMfaChallengeAttemptUpdateManyArgs>(
      args: SelectSubset<T, AuthMfaChallengeAttemptUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one AuthMfaChallengeAttempt.
     * @param {AuthMfaChallengeAttemptUpsertArgs} args - Arguments to update or create a AuthMfaChallengeAttempt.
     * @example
     * // Update or create a AuthMfaChallengeAttempt
     * const authMfaChallengeAttempt = await prisma.authMfaChallengeAttempt.upsert({
     *   create: {
     *     // ... data to create a AuthMfaChallengeAttempt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthMfaChallengeAttempt we want to update
     *   }
     * })
    **/
    upsert<T extends AuthMfaChallengeAttemptUpsertArgs>(
      args: SelectSubset<T, AuthMfaChallengeAttemptUpsertArgs>
    ): CheckSelect<T, Prisma__AuthMfaChallengeAttemptClient<AuthMfaChallengeAttempt>, Prisma__AuthMfaChallengeAttemptClient<AuthMfaChallengeAttemptGetPayload<T>>>

    /**
     * Find one AuthMfaChallengeAttempt that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {AuthMfaChallengeAttemptFindUniqueOrThrowArgs} args - Arguments to find a AuthMfaChallengeAttempt
     * @example
     * // Get one AuthMfaChallengeAttempt
     * const authMfaChallengeAttempt = await prisma.authMfaChallengeAttempt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AuthMfaChallengeAttemptFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AuthMfaChallengeAttemptFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__AuthMfaChallengeAttemptClient<AuthMfaChallengeAttempt>, Prisma__AuthMfaChallengeAttemptClient<AuthMfaChallengeAttemptGetPayload<T>>>

    /**
     * Find the first AuthMfaChallengeAttempt that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaChallengeAttemptFindFirstOrThrowArgs} args - Arguments to find a AuthMfaChallengeAttempt
     * @example
     * // Get one AuthMfaChallengeAttempt
     * const authMfaChallengeAttempt = await prisma.authMfaChallengeAttempt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AuthMfaChallengeAttemptFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AuthMfaChallengeAttemptFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__AuthMfaChallengeAttemptClient<AuthMfaChallengeAttempt>, Prisma__AuthMfaChallengeAttemptClient<AuthMfaChallengeAttemptGetPayload<T>>>

    /**
     * Count the number of AuthMfaChallengeAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaChallengeAttemptCountArgs} args - Arguments to filter AuthMfaChallengeAttempts to count.
     * @example
     * // Count the number of AuthMfaChallengeAttempts
     * const count = await prisma.authMfaChallengeAttempt.count({
     *   where: {
     *     // ... the filter for the AuthMfaChallengeAttempts we want to count
     *   }
     * })
    **/
    count<T extends AuthMfaChallengeAttemptCountArgs>(
      args?: Subset<T, AuthMfaChallengeAttemptCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthMfaChallengeAttemptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthMfaChallengeAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaChallengeAttemptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthMfaChallengeAttemptAggregateArgs>(args: Subset<T, AuthMfaChallengeAttemptAggregateArgs>): PrismaPromise<GetAuthMfaChallengeAttemptAggregateType<T>>

    /**
     * Group by AuthMfaChallengeAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthMfaChallengeAttemptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthMfaChallengeAttemptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthMfaChallengeAttemptGroupByArgs['orderBy'] }
        : { orderBy?: AuthMfaChallengeAttemptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthMfaChallengeAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthMfaChallengeAttemptGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthMfaChallengeAttempt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AuthMfaChallengeAttemptClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    challenge<T extends AuthMfaChallengeArgs = {}>(args?: Subset<T, AuthMfaChallengeArgs>): CheckSelect<T, Prisma__AuthMfaChallengeClient<AuthMfaChallenge | null >, Prisma__AuthMfaChallengeClient<AuthMfaChallengeGetPayload<T> | null >>;

    authMfaConfig<T extends AuthMfaConfigArgs = {}>(args?: Subset<T, AuthMfaConfigArgs>): CheckSelect<T, Prisma__AuthMfaConfigClient<AuthMfaConfig | null >, Prisma__AuthMfaConfigClient<AuthMfaConfigGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * AuthMfaChallengeAttempt base type for findUnique actions
   */
  export type AuthMfaChallengeAttemptFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the AuthMfaChallengeAttempt
     * 
    **/
    select?: AuthMfaChallengeAttemptSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaChallengeAttemptInclude | null
    /**
     * Filter, which AuthMfaChallengeAttempt to fetch.
     * 
    **/
    where: AuthMfaChallengeAttemptWhereUniqueInput
  }

  /**
   * AuthMfaChallengeAttempt: findUnique
   */
  export interface AuthMfaChallengeAttemptFindUniqueArgs extends AuthMfaChallengeAttemptFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AuthMfaChallengeAttempt base type for findFirst actions
   */
  export type AuthMfaChallengeAttemptFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the AuthMfaChallengeAttempt
     * 
    **/
    select?: AuthMfaChallengeAttemptSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaChallengeAttemptInclude | null
    /**
     * Filter, which AuthMfaChallengeAttempt to fetch.
     * 
    **/
    where?: AuthMfaChallengeAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthMfaChallengeAttempts to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthMfaChallengeAttemptOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthMfaChallengeAttempts.
     * 
    **/
    cursor?: AuthMfaChallengeAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthMfaChallengeAttempts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthMfaChallengeAttempts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthMfaChallengeAttempts.
     * 
    **/
    distinct?: Enumerable<AuthMfaChallengeAttemptScalarFieldEnum>
  }

  /**
   * AuthMfaChallengeAttempt: findFirst
   */
  export interface AuthMfaChallengeAttemptFindFirstArgs extends AuthMfaChallengeAttemptFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AuthMfaChallengeAttempt findMany
   */
  export type AuthMfaChallengeAttemptFindManyArgs = {
    /**
     * Select specific fields to fetch from the AuthMfaChallengeAttempt
     * 
    **/
    select?: AuthMfaChallengeAttemptSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaChallengeAttemptInclude | null
    /**
     * Filter, which AuthMfaChallengeAttempts to fetch.
     * 
    **/
    where?: AuthMfaChallengeAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthMfaChallengeAttempts to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthMfaChallengeAttemptOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthMfaChallengeAttempts.
     * 
    **/
    cursor?: AuthMfaChallengeAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthMfaChallengeAttempts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthMfaChallengeAttempts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AuthMfaChallengeAttemptScalarFieldEnum>
  }


  /**
   * AuthMfaChallengeAttempt create
   */
  export type AuthMfaChallengeAttemptCreateArgs = {
    /**
     * Select specific fields to fetch from the AuthMfaChallengeAttempt
     * 
    **/
    select?: AuthMfaChallengeAttemptSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaChallengeAttemptInclude | null
    /**
     * The data needed to create a AuthMfaChallengeAttempt.
     * 
    **/
    data: XOR<AuthMfaChallengeAttemptCreateInput, AuthMfaChallengeAttemptUncheckedCreateInput>
  }


  /**
   * AuthMfaChallengeAttempt createMany
   */
  export type AuthMfaChallengeAttemptCreateManyArgs = {
    /**
     * The data used to create many AuthMfaChallengeAttempts.
     * 
    **/
    data: Enumerable<AuthMfaChallengeAttemptCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * AuthMfaChallengeAttempt update
   */
  export type AuthMfaChallengeAttemptUpdateArgs = {
    /**
     * Select specific fields to fetch from the AuthMfaChallengeAttempt
     * 
    **/
    select?: AuthMfaChallengeAttemptSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaChallengeAttemptInclude | null
    /**
     * The data needed to update a AuthMfaChallengeAttempt.
     * 
    **/
    data: XOR<AuthMfaChallengeAttemptUpdateInput, AuthMfaChallengeAttemptUncheckedUpdateInput>
    /**
     * Choose, which AuthMfaChallengeAttempt to update.
     * 
    **/
    where: AuthMfaChallengeAttemptWhereUniqueInput
  }


  /**
   * AuthMfaChallengeAttempt updateMany
   */
  export type AuthMfaChallengeAttemptUpdateManyArgs = {
    /**
     * The data used to update AuthMfaChallengeAttempts.
     * 
    **/
    data: XOR<AuthMfaChallengeAttemptUpdateManyMutationInput, AuthMfaChallengeAttemptUncheckedUpdateManyInput>
    /**
     * Filter which AuthMfaChallengeAttempts to update
     * 
    **/
    where?: AuthMfaChallengeAttemptWhereInput
  }


  /**
   * AuthMfaChallengeAttempt upsert
   */
  export type AuthMfaChallengeAttemptUpsertArgs = {
    /**
     * Select specific fields to fetch from the AuthMfaChallengeAttempt
     * 
    **/
    select?: AuthMfaChallengeAttemptSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaChallengeAttemptInclude | null
    /**
     * The filter to search for the AuthMfaChallengeAttempt to update in case it exists.
     * 
    **/
    where: AuthMfaChallengeAttemptWhereUniqueInput
    /**
     * In case the AuthMfaChallengeAttempt found by the `where` argument doesn't exist, create a new AuthMfaChallengeAttempt with this data.
     * 
    **/
    create: XOR<AuthMfaChallengeAttemptCreateInput, AuthMfaChallengeAttemptUncheckedCreateInput>
    /**
     * In case the AuthMfaChallengeAttempt was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AuthMfaChallengeAttemptUpdateInput, AuthMfaChallengeAttemptUncheckedUpdateInput>
  }


  /**
   * AuthMfaChallengeAttempt delete
   */
  export type AuthMfaChallengeAttemptDeleteArgs = {
    /**
     * Select specific fields to fetch from the AuthMfaChallengeAttempt
     * 
    **/
    select?: AuthMfaChallengeAttemptSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaChallengeAttemptInclude | null
    /**
     * Filter which AuthMfaChallengeAttempt to delete.
     * 
    **/
    where: AuthMfaChallengeAttemptWhereUniqueInput
  }


  /**
   * AuthMfaChallengeAttempt deleteMany
   */
  export type AuthMfaChallengeAttemptDeleteManyArgs = {
    /**
     * Filter which AuthMfaChallengeAttempts to delete
     * 
    **/
    where?: AuthMfaChallengeAttemptWhereInput
  }


  /**
   * AuthMfaChallengeAttempt: findUniqueOrThrow
   */
  export type AuthMfaChallengeAttemptFindUniqueOrThrowArgs = AuthMfaChallengeAttemptFindUniqueArgsBase
      

  /**
   * AuthMfaChallengeAttempt: findFirstOrThrow
   */
  export type AuthMfaChallengeAttemptFindFirstOrThrowArgs = AuthMfaChallengeAttemptFindFirstArgsBase
      

  /**
   * AuthMfaChallengeAttempt without action
   */
  export type AuthMfaChallengeAttemptArgs = {
    /**
     * Select specific fields to fetch from the AuthMfaChallengeAttempt
     * 
    **/
    select?: AuthMfaChallengeAttemptSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AuthMfaChallengeAttemptInclude | null
  }



  /**
   * Model CompanyRole
   */


  export type AggregateCompanyRole = {
    _count: CompanyRoleCountAggregateOutputType | null
    _min: CompanyRoleMinAggregateOutputType | null
    _max: CompanyRoleMaxAggregateOutputType | null
  }

  export type CompanyRoleMinAggregateOutputType = {
    id: string | null
    title: string | null
    deletedAt: Date | null
    createdAt: Date | null
    companyId: string | null
  }

  export type CompanyRoleMaxAggregateOutputType = {
    id: string | null
    title: string | null
    deletedAt: Date | null
    createdAt: Date | null
    companyId: string | null
  }

  export type CompanyRoleCountAggregateOutputType = {
    id: number
    title: number
    deletedAt: number
    createdAt: number
    companyId: number
    _all: number
  }


  export type CompanyRoleMinAggregateInputType = {
    id?: true
    title?: true
    deletedAt?: true
    createdAt?: true
    companyId?: true
  }

  export type CompanyRoleMaxAggregateInputType = {
    id?: true
    title?: true
    deletedAt?: true
    createdAt?: true
    companyId?: true
  }

  export type CompanyRoleCountAggregateInputType = {
    id?: true
    title?: true
    deletedAt?: true
    createdAt?: true
    companyId?: true
    _all?: true
  }

  export type CompanyRoleAggregateArgs = {
    /**
     * Filter which CompanyRole to aggregate.
     * 
    **/
    where?: CompanyRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyRoles to fetch.
     * 
    **/
    orderBy?: Enumerable<CompanyRoleOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CompanyRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyRoles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyRoles.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompanyRoles
    **/
    _count?: true | CompanyRoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyRoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyRoleMaxAggregateInputType
  }

  export type GetCompanyRoleAggregateType<T extends CompanyRoleAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanyRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanyRole[P]>
      : GetScalarType<T[P], AggregateCompanyRole[P]>
  }




  export type CompanyRoleGroupByArgs = {
    where?: CompanyRoleWhereInput
    orderBy?: Enumerable<CompanyRoleOrderByWithAggregationInput>
    by: Array<CompanyRoleScalarFieldEnum>
    having?: CompanyRoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyRoleCountAggregateInputType | true
    _min?: CompanyRoleMinAggregateInputType
    _max?: CompanyRoleMaxAggregateInputType
  }


  export type CompanyRoleGroupByOutputType = {
    id: string
    title: string
    deletedAt: Date | null
    createdAt: Date
    companyId: string
    _count: CompanyRoleCountAggregateOutputType | null
    _min: CompanyRoleMinAggregateOutputType | null
    _max: CompanyRoleMaxAggregateOutputType | null
  }

  type GetCompanyRoleGroupByPayload<T extends CompanyRoleGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CompanyRoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyRoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyRoleGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyRoleGroupByOutputType[P]>
        }
      >
    >


  export type CompanyRoleSelect = {
    id?: boolean
    title?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    companyId?: boolean
    workerRoles?: boolean | WorkerRoleFindManyArgs
    _count?: boolean | CompanyRoleCountOutputTypeArgs
  }

  export type CompanyRoleInclude = {
    workerRoles?: boolean | WorkerRoleFindManyArgs
    _count?: boolean | CompanyRoleCountOutputTypeArgs
  }

  export type CompanyRoleGetPayload<
    S extends boolean | null | undefined | CompanyRoleArgs,
    U = keyof S
      > = S extends true
        ? CompanyRole
    : S extends undefined
    ? never
    : S extends CompanyRoleArgs | CompanyRoleFindManyArgs
    ?'include' extends U
    ? CompanyRole  & {
    [P in TrueKeys<S['include']>]:
        P extends 'workerRoles' ? Array < WorkerRoleGetPayload<S['include'][P]>>  :
        P extends '_count' ? CompanyRoleCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'workerRoles' ? Array < WorkerRoleGetPayload<S['select'][P]>>  :
        P extends '_count' ? CompanyRoleCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof CompanyRole ? CompanyRole[P] : never
  } 
    : CompanyRole
  : CompanyRole


  type CompanyRoleCountArgs = Merge<
    Omit<CompanyRoleFindManyArgs, 'select' | 'include'> & {
      select?: CompanyRoleCountAggregateInputType | true
    }
  >

  export interface CompanyRoleDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one CompanyRole that matches the filter.
     * @param {CompanyRoleFindUniqueArgs} args - Arguments to find a CompanyRole
     * @example
     * // Get one CompanyRole
     * const companyRole = await prisma.companyRole.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CompanyRoleFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CompanyRoleFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'CompanyRole'> extends True ? CheckSelect<T, Prisma__CompanyRoleClient<CompanyRole>, Prisma__CompanyRoleClient<CompanyRoleGetPayload<T>>> : CheckSelect<T, Prisma__CompanyRoleClient<CompanyRole | null >, Prisma__CompanyRoleClient<CompanyRoleGetPayload<T> | null >>

    /**
     * Find the first CompanyRole that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyRoleFindFirstArgs} args - Arguments to find a CompanyRole
     * @example
     * // Get one CompanyRole
     * const companyRole = await prisma.companyRole.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CompanyRoleFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CompanyRoleFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'CompanyRole'> extends True ? CheckSelect<T, Prisma__CompanyRoleClient<CompanyRole>, Prisma__CompanyRoleClient<CompanyRoleGetPayload<T>>> : CheckSelect<T, Prisma__CompanyRoleClient<CompanyRole | null >, Prisma__CompanyRoleClient<CompanyRoleGetPayload<T> | null >>

    /**
     * Find zero or more CompanyRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyRoleFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompanyRoles
     * const companyRoles = await prisma.companyRole.findMany()
     * 
     * // Get first 10 CompanyRoles
     * const companyRoles = await prisma.companyRole.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyRoleWithIdOnly = await prisma.companyRole.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CompanyRoleFindManyArgs>(
      args?: SelectSubset<T, CompanyRoleFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<CompanyRole>>, PrismaPromise<Array<CompanyRoleGetPayload<T>>>>

    /**
     * Create a CompanyRole.
     * @param {CompanyRoleCreateArgs} args - Arguments to create a CompanyRole.
     * @example
     * // Create one CompanyRole
     * const CompanyRole = await prisma.companyRole.create({
     *   data: {
     *     // ... data to create a CompanyRole
     *   }
     * })
     * 
    **/
    create<T extends CompanyRoleCreateArgs>(
      args: SelectSubset<T, CompanyRoleCreateArgs>
    ): CheckSelect<T, Prisma__CompanyRoleClient<CompanyRole>, Prisma__CompanyRoleClient<CompanyRoleGetPayload<T>>>

    /**
     * Create many CompanyRoles.
     *     @param {CompanyRoleCreateManyArgs} args - Arguments to create many CompanyRoles.
     *     @example
     *     // Create many CompanyRoles
     *     const companyRole = await prisma.companyRole.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CompanyRoleCreateManyArgs>(
      args?: SelectSubset<T, CompanyRoleCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a CompanyRole.
     * @param {CompanyRoleDeleteArgs} args - Arguments to delete one CompanyRole.
     * @example
     * // Delete one CompanyRole
     * const CompanyRole = await prisma.companyRole.delete({
     *   where: {
     *     // ... filter to delete one CompanyRole
     *   }
     * })
     * 
    **/
    delete<T extends CompanyRoleDeleteArgs>(
      args: SelectSubset<T, CompanyRoleDeleteArgs>
    ): CheckSelect<T, Prisma__CompanyRoleClient<CompanyRole>, Prisma__CompanyRoleClient<CompanyRoleGetPayload<T>>>

    /**
     * Update one CompanyRole.
     * @param {CompanyRoleUpdateArgs} args - Arguments to update one CompanyRole.
     * @example
     * // Update one CompanyRole
     * const companyRole = await prisma.companyRole.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CompanyRoleUpdateArgs>(
      args: SelectSubset<T, CompanyRoleUpdateArgs>
    ): CheckSelect<T, Prisma__CompanyRoleClient<CompanyRole>, Prisma__CompanyRoleClient<CompanyRoleGetPayload<T>>>

    /**
     * Delete zero or more CompanyRoles.
     * @param {CompanyRoleDeleteManyArgs} args - Arguments to filter CompanyRoles to delete.
     * @example
     * // Delete a few CompanyRoles
     * const { count } = await prisma.companyRole.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CompanyRoleDeleteManyArgs>(
      args?: SelectSubset<T, CompanyRoleDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyRoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompanyRoles
     * const companyRole = await prisma.companyRole.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CompanyRoleUpdateManyArgs>(
      args: SelectSubset<T, CompanyRoleUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one CompanyRole.
     * @param {CompanyRoleUpsertArgs} args - Arguments to update or create a CompanyRole.
     * @example
     * // Update or create a CompanyRole
     * const companyRole = await prisma.companyRole.upsert({
     *   create: {
     *     // ... data to create a CompanyRole
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompanyRole we want to update
     *   }
     * })
    **/
    upsert<T extends CompanyRoleUpsertArgs>(
      args: SelectSubset<T, CompanyRoleUpsertArgs>
    ): CheckSelect<T, Prisma__CompanyRoleClient<CompanyRole>, Prisma__CompanyRoleClient<CompanyRoleGetPayload<T>>>

    /**
     * Find one CompanyRole that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {CompanyRoleFindUniqueOrThrowArgs} args - Arguments to find a CompanyRole
     * @example
     * // Get one CompanyRole
     * const companyRole = await prisma.companyRole.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CompanyRoleFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CompanyRoleFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__CompanyRoleClient<CompanyRole>, Prisma__CompanyRoleClient<CompanyRoleGetPayload<T>>>

    /**
     * Find the first CompanyRole that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyRoleFindFirstOrThrowArgs} args - Arguments to find a CompanyRole
     * @example
     * // Get one CompanyRole
     * const companyRole = await prisma.companyRole.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CompanyRoleFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CompanyRoleFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__CompanyRoleClient<CompanyRole>, Prisma__CompanyRoleClient<CompanyRoleGetPayload<T>>>

    /**
     * Count the number of CompanyRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyRoleCountArgs} args - Arguments to filter CompanyRoles to count.
     * @example
     * // Count the number of CompanyRoles
     * const count = await prisma.companyRole.count({
     *   where: {
     *     // ... the filter for the CompanyRoles we want to count
     *   }
     * })
    **/
    count<T extends CompanyRoleCountArgs>(
      args?: Subset<T, CompanyRoleCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyRoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompanyRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyRoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyRoleAggregateArgs>(args: Subset<T, CompanyRoleAggregateArgs>): PrismaPromise<GetCompanyRoleAggregateType<T>>

    /**
     * Group by CompanyRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyRoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyRoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyRoleGroupByArgs['orderBy'] }
        : { orderBy?: CompanyRoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyRoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyRoleGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompanyRole.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CompanyRoleClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    workerRoles<T extends WorkerRoleFindManyArgs = {}>(args?: Subset<T, WorkerRoleFindManyArgs>): CheckSelect<T, PrismaPromise<Array<WorkerRole>>, PrismaPromise<Array<WorkerRoleGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * CompanyRole base type for findUnique actions
   */
  export type CompanyRoleFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the CompanyRole
     * 
    **/
    select?: CompanyRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompanyRoleInclude | null
    /**
     * Filter, which CompanyRole to fetch.
     * 
    **/
    where: CompanyRoleWhereUniqueInput
  }

  /**
   * CompanyRole: findUnique
   */
  export interface CompanyRoleFindUniqueArgs extends CompanyRoleFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CompanyRole base type for findFirst actions
   */
  export type CompanyRoleFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the CompanyRole
     * 
    **/
    select?: CompanyRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompanyRoleInclude | null
    /**
     * Filter, which CompanyRole to fetch.
     * 
    **/
    where?: CompanyRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyRoles to fetch.
     * 
    **/
    orderBy?: Enumerable<CompanyRoleOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyRoles.
     * 
    **/
    cursor?: CompanyRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyRoles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyRoles.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyRoles.
     * 
    **/
    distinct?: Enumerable<CompanyRoleScalarFieldEnum>
  }

  /**
   * CompanyRole: findFirst
   */
  export interface CompanyRoleFindFirstArgs extends CompanyRoleFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CompanyRole findMany
   */
  export type CompanyRoleFindManyArgs = {
    /**
     * Select specific fields to fetch from the CompanyRole
     * 
    **/
    select?: CompanyRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompanyRoleInclude | null
    /**
     * Filter, which CompanyRoles to fetch.
     * 
    **/
    where?: CompanyRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyRoles to fetch.
     * 
    **/
    orderBy?: Enumerable<CompanyRoleOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompanyRoles.
     * 
    **/
    cursor?: CompanyRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyRoles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyRoles.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CompanyRoleScalarFieldEnum>
  }


  /**
   * CompanyRole create
   */
  export type CompanyRoleCreateArgs = {
    /**
     * Select specific fields to fetch from the CompanyRole
     * 
    **/
    select?: CompanyRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompanyRoleInclude | null
    /**
     * The data needed to create a CompanyRole.
     * 
    **/
    data: XOR<CompanyRoleCreateInput, CompanyRoleUncheckedCreateInput>
  }


  /**
   * CompanyRole createMany
   */
  export type CompanyRoleCreateManyArgs = {
    /**
     * The data used to create many CompanyRoles.
     * 
    **/
    data: Enumerable<CompanyRoleCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * CompanyRole update
   */
  export type CompanyRoleUpdateArgs = {
    /**
     * Select specific fields to fetch from the CompanyRole
     * 
    **/
    select?: CompanyRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompanyRoleInclude | null
    /**
     * The data needed to update a CompanyRole.
     * 
    **/
    data: XOR<CompanyRoleUpdateInput, CompanyRoleUncheckedUpdateInput>
    /**
     * Choose, which CompanyRole to update.
     * 
    **/
    where: CompanyRoleWhereUniqueInput
  }


  /**
   * CompanyRole updateMany
   */
  export type CompanyRoleUpdateManyArgs = {
    /**
     * The data used to update CompanyRoles.
     * 
    **/
    data: XOR<CompanyRoleUpdateManyMutationInput, CompanyRoleUncheckedUpdateManyInput>
    /**
     * Filter which CompanyRoles to update
     * 
    **/
    where?: CompanyRoleWhereInput
  }


  /**
   * CompanyRole upsert
   */
  export type CompanyRoleUpsertArgs = {
    /**
     * Select specific fields to fetch from the CompanyRole
     * 
    **/
    select?: CompanyRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompanyRoleInclude | null
    /**
     * The filter to search for the CompanyRole to update in case it exists.
     * 
    **/
    where: CompanyRoleWhereUniqueInput
    /**
     * In case the CompanyRole found by the `where` argument doesn't exist, create a new CompanyRole with this data.
     * 
    **/
    create: XOR<CompanyRoleCreateInput, CompanyRoleUncheckedCreateInput>
    /**
     * In case the CompanyRole was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CompanyRoleUpdateInput, CompanyRoleUncheckedUpdateInput>
  }


  /**
   * CompanyRole delete
   */
  export type CompanyRoleDeleteArgs = {
    /**
     * Select specific fields to fetch from the CompanyRole
     * 
    **/
    select?: CompanyRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompanyRoleInclude | null
    /**
     * Filter which CompanyRole to delete.
     * 
    **/
    where: CompanyRoleWhereUniqueInput
  }


  /**
   * CompanyRole deleteMany
   */
  export type CompanyRoleDeleteManyArgs = {
    /**
     * Filter which CompanyRoles to delete
     * 
    **/
    where?: CompanyRoleWhereInput
  }


  /**
   * CompanyRole: findUniqueOrThrow
   */
  export type CompanyRoleFindUniqueOrThrowArgs = CompanyRoleFindUniqueArgsBase
      

  /**
   * CompanyRole: findFirstOrThrow
   */
  export type CompanyRoleFindFirstOrThrowArgs = CompanyRoleFindFirstArgsBase
      

  /**
   * CompanyRole without action
   */
  export type CompanyRoleArgs = {
    /**
     * Select specific fields to fetch from the CompanyRole
     * 
    **/
    select?: CompanyRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompanyRoleInclude | null
  }



  /**
   * Model WorkerRole
   */


  export type AggregateWorkerRole = {
    _count: WorkerRoleCountAggregateOutputType | null
    _avg: WorkerRoleAvgAggregateOutputType | null
    _sum: WorkerRoleSumAggregateOutputType | null
    _min: WorkerRoleMinAggregateOutputType | null
    _max: WorkerRoleMaxAggregateOutputType | null
  }

  export type WorkerRoleAvgAggregateOutputType = {
    payRate: Decimal | null
  }

  export type WorkerRoleSumAggregateOutputType = {
    payRate: Decimal | null
  }

  export type WorkerRoleMinAggregateOutputType = {
    id: string | null
    isPrimary: boolean | null
    payRate: Decimal | null
    payType: WorkerRolePaytype | null
    userId: string | null
    deletedAt: Date | null
    createdAt: Date | null
    companyRoleId: string | null
  }

  export type WorkerRoleMaxAggregateOutputType = {
    id: string | null
    isPrimary: boolean | null
    payRate: Decimal | null
    payType: WorkerRolePaytype | null
    userId: string | null
    deletedAt: Date | null
    createdAt: Date | null
    companyRoleId: string | null
  }

  export type WorkerRoleCountAggregateOutputType = {
    id: number
    isPrimary: number
    payRate: number
    payType: number
    userId: number
    deletedAt: number
    createdAt: number
    companyRoleId: number
    _all: number
  }


  export type WorkerRoleAvgAggregateInputType = {
    payRate?: true
  }

  export type WorkerRoleSumAggregateInputType = {
    payRate?: true
  }

  export type WorkerRoleMinAggregateInputType = {
    id?: true
    isPrimary?: true
    payRate?: true
    payType?: true
    userId?: true
    deletedAt?: true
    createdAt?: true
    companyRoleId?: true
  }

  export type WorkerRoleMaxAggregateInputType = {
    id?: true
    isPrimary?: true
    payRate?: true
    payType?: true
    userId?: true
    deletedAt?: true
    createdAt?: true
    companyRoleId?: true
  }

  export type WorkerRoleCountAggregateInputType = {
    id?: true
    isPrimary?: true
    payRate?: true
    payType?: true
    userId?: true
    deletedAt?: true
    createdAt?: true
    companyRoleId?: true
    _all?: true
  }

  export type WorkerRoleAggregateArgs = {
    /**
     * Filter which WorkerRole to aggregate.
     * 
    **/
    where?: WorkerRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkerRoles to fetch.
     * 
    **/
    orderBy?: Enumerable<WorkerRoleOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: WorkerRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkerRoles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkerRoles.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkerRoles
    **/
    _count?: true | WorkerRoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WorkerRoleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WorkerRoleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkerRoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkerRoleMaxAggregateInputType
  }

  export type GetWorkerRoleAggregateType<T extends WorkerRoleAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkerRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkerRole[P]>
      : GetScalarType<T[P], AggregateWorkerRole[P]>
  }




  export type WorkerRoleGroupByArgs = {
    where?: WorkerRoleWhereInput
    orderBy?: Enumerable<WorkerRoleOrderByWithAggregationInput>
    by: Array<WorkerRoleScalarFieldEnum>
    having?: WorkerRoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkerRoleCountAggregateInputType | true
    _avg?: WorkerRoleAvgAggregateInputType
    _sum?: WorkerRoleSumAggregateInputType
    _min?: WorkerRoleMinAggregateInputType
    _max?: WorkerRoleMaxAggregateInputType
  }


  export type WorkerRoleGroupByOutputType = {
    id: string
    isPrimary: boolean
    payRate: Decimal
    payType: WorkerRolePaytype
    userId: string
    deletedAt: Date | null
    createdAt: Date
    companyRoleId: string
    _count: WorkerRoleCountAggregateOutputType | null
    _avg: WorkerRoleAvgAggregateOutputType | null
    _sum: WorkerRoleSumAggregateOutputType | null
    _min: WorkerRoleMinAggregateOutputType | null
    _max: WorkerRoleMaxAggregateOutputType | null
  }

  type GetWorkerRoleGroupByPayload<T extends WorkerRoleGroupByArgs> = PrismaPromise<
    Array<
      PickArray<WorkerRoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkerRoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkerRoleGroupByOutputType[P]>
            : GetScalarType<T[P], WorkerRoleGroupByOutputType[P]>
        }
      >
    >


  export type WorkerRoleSelect = {
    id?: boolean
    isPrimary?: boolean
    payRate?: boolean
    payType?: boolean
    userId?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    CompanyRole?: boolean | CompanyRoleArgs
    companyRoleId?: boolean
  }

  export type WorkerRoleInclude = {
    CompanyRole?: boolean | CompanyRoleArgs
  }

  export type WorkerRoleGetPayload<
    S extends boolean | null | undefined | WorkerRoleArgs,
    U = keyof S
      > = S extends true
        ? WorkerRole
    : S extends undefined
    ? never
    : S extends WorkerRoleArgs | WorkerRoleFindManyArgs
    ?'include' extends U
    ? WorkerRole  & {
    [P in TrueKeys<S['include']>]:
        P extends 'CompanyRole' ? CompanyRoleGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'CompanyRole' ? CompanyRoleGetPayload<S['select'][P]> :  P extends keyof WorkerRole ? WorkerRole[P] : never
  } 
    : WorkerRole
  : WorkerRole


  type WorkerRoleCountArgs = Merge<
    Omit<WorkerRoleFindManyArgs, 'select' | 'include'> & {
      select?: WorkerRoleCountAggregateInputType | true
    }
  >

  export interface WorkerRoleDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one WorkerRole that matches the filter.
     * @param {WorkerRoleFindUniqueArgs} args - Arguments to find a WorkerRole
     * @example
     * // Get one WorkerRole
     * const workerRole = await prisma.workerRole.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WorkerRoleFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, WorkerRoleFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'WorkerRole'> extends True ? CheckSelect<T, Prisma__WorkerRoleClient<WorkerRole>, Prisma__WorkerRoleClient<WorkerRoleGetPayload<T>>> : CheckSelect<T, Prisma__WorkerRoleClient<WorkerRole | null >, Prisma__WorkerRoleClient<WorkerRoleGetPayload<T> | null >>

    /**
     * Find the first WorkerRole that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkerRoleFindFirstArgs} args - Arguments to find a WorkerRole
     * @example
     * // Get one WorkerRole
     * const workerRole = await prisma.workerRole.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WorkerRoleFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, WorkerRoleFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'WorkerRole'> extends True ? CheckSelect<T, Prisma__WorkerRoleClient<WorkerRole>, Prisma__WorkerRoleClient<WorkerRoleGetPayload<T>>> : CheckSelect<T, Prisma__WorkerRoleClient<WorkerRole | null >, Prisma__WorkerRoleClient<WorkerRoleGetPayload<T> | null >>

    /**
     * Find zero or more WorkerRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkerRoleFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkerRoles
     * const workerRoles = await prisma.workerRole.findMany()
     * 
     * // Get first 10 WorkerRoles
     * const workerRoles = await prisma.workerRole.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workerRoleWithIdOnly = await prisma.workerRole.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends WorkerRoleFindManyArgs>(
      args?: SelectSubset<T, WorkerRoleFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<WorkerRole>>, PrismaPromise<Array<WorkerRoleGetPayload<T>>>>

    /**
     * Create a WorkerRole.
     * @param {WorkerRoleCreateArgs} args - Arguments to create a WorkerRole.
     * @example
     * // Create one WorkerRole
     * const WorkerRole = await prisma.workerRole.create({
     *   data: {
     *     // ... data to create a WorkerRole
     *   }
     * })
     * 
    **/
    create<T extends WorkerRoleCreateArgs>(
      args: SelectSubset<T, WorkerRoleCreateArgs>
    ): CheckSelect<T, Prisma__WorkerRoleClient<WorkerRole>, Prisma__WorkerRoleClient<WorkerRoleGetPayload<T>>>

    /**
     * Create many WorkerRoles.
     *     @param {WorkerRoleCreateManyArgs} args - Arguments to create many WorkerRoles.
     *     @example
     *     // Create many WorkerRoles
     *     const workerRole = await prisma.workerRole.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends WorkerRoleCreateManyArgs>(
      args?: SelectSubset<T, WorkerRoleCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a WorkerRole.
     * @param {WorkerRoleDeleteArgs} args - Arguments to delete one WorkerRole.
     * @example
     * // Delete one WorkerRole
     * const WorkerRole = await prisma.workerRole.delete({
     *   where: {
     *     // ... filter to delete one WorkerRole
     *   }
     * })
     * 
    **/
    delete<T extends WorkerRoleDeleteArgs>(
      args: SelectSubset<T, WorkerRoleDeleteArgs>
    ): CheckSelect<T, Prisma__WorkerRoleClient<WorkerRole>, Prisma__WorkerRoleClient<WorkerRoleGetPayload<T>>>

    /**
     * Update one WorkerRole.
     * @param {WorkerRoleUpdateArgs} args - Arguments to update one WorkerRole.
     * @example
     * // Update one WorkerRole
     * const workerRole = await prisma.workerRole.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WorkerRoleUpdateArgs>(
      args: SelectSubset<T, WorkerRoleUpdateArgs>
    ): CheckSelect<T, Prisma__WorkerRoleClient<WorkerRole>, Prisma__WorkerRoleClient<WorkerRoleGetPayload<T>>>

    /**
     * Delete zero or more WorkerRoles.
     * @param {WorkerRoleDeleteManyArgs} args - Arguments to filter WorkerRoles to delete.
     * @example
     * // Delete a few WorkerRoles
     * const { count } = await prisma.workerRole.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WorkerRoleDeleteManyArgs>(
      args?: SelectSubset<T, WorkerRoleDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkerRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkerRoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkerRoles
     * const workerRole = await prisma.workerRole.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WorkerRoleUpdateManyArgs>(
      args: SelectSubset<T, WorkerRoleUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one WorkerRole.
     * @param {WorkerRoleUpsertArgs} args - Arguments to update or create a WorkerRole.
     * @example
     * // Update or create a WorkerRole
     * const workerRole = await prisma.workerRole.upsert({
     *   create: {
     *     // ... data to create a WorkerRole
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkerRole we want to update
     *   }
     * })
    **/
    upsert<T extends WorkerRoleUpsertArgs>(
      args: SelectSubset<T, WorkerRoleUpsertArgs>
    ): CheckSelect<T, Prisma__WorkerRoleClient<WorkerRole>, Prisma__WorkerRoleClient<WorkerRoleGetPayload<T>>>

    /**
     * Find one WorkerRole that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {WorkerRoleFindUniqueOrThrowArgs} args - Arguments to find a WorkerRole
     * @example
     * // Get one WorkerRole
     * const workerRole = await prisma.workerRole.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WorkerRoleFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, WorkerRoleFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__WorkerRoleClient<WorkerRole>, Prisma__WorkerRoleClient<WorkerRoleGetPayload<T>>>

    /**
     * Find the first WorkerRole that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkerRoleFindFirstOrThrowArgs} args - Arguments to find a WorkerRole
     * @example
     * // Get one WorkerRole
     * const workerRole = await prisma.workerRole.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WorkerRoleFindFirstOrThrowArgs>(
      args?: SelectSubset<T, WorkerRoleFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__WorkerRoleClient<WorkerRole>, Prisma__WorkerRoleClient<WorkerRoleGetPayload<T>>>

    /**
     * Count the number of WorkerRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkerRoleCountArgs} args - Arguments to filter WorkerRoles to count.
     * @example
     * // Count the number of WorkerRoles
     * const count = await prisma.workerRole.count({
     *   where: {
     *     // ... the filter for the WorkerRoles we want to count
     *   }
     * })
    **/
    count<T extends WorkerRoleCountArgs>(
      args?: Subset<T, WorkerRoleCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkerRoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkerRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkerRoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WorkerRoleAggregateArgs>(args: Subset<T, WorkerRoleAggregateArgs>): PrismaPromise<GetWorkerRoleAggregateType<T>>

    /**
     * Group by WorkerRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkerRoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WorkerRoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkerRoleGroupByArgs['orderBy'] }
        : { orderBy?: WorkerRoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WorkerRoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkerRoleGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkerRole.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__WorkerRoleClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    CompanyRole<T extends CompanyRoleArgs = {}>(args?: Subset<T, CompanyRoleArgs>): CheckSelect<T, Prisma__CompanyRoleClient<CompanyRole | null >, Prisma__CompanyRoleClient<CompanyRoleGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * WorkerRole base type for findUnique actions
   */
  export type WorkerRoleFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the WorkerRole
     * 
    **/
    select?: WorkerRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WorkerRoleInclude | null
    /**
     * Filter, which WorkerRole to fetch.
     * 
    **/
    where: WorkerRoleWhereUniqueInput
  }

  /**
   * WorkerRole: findUnique
   */
  export interface WorkerRoleFindUniqueArgs extends WorkerRoleFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * WorkerRole base type for findFirst actions
   */
  export type WorkerRoleFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the WorkerRole
     * 
    **/
    select?: WorkerRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WorkerRoleInclude | null
    /**
     * Filter, which WorkerRole to fetch.
     * 
    **/
    where?: WorkerRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkerRoles to fetch.
     * 
    **/
    orderBy?: Enumerable<WorkerRoleOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkerRoles.
     * 
    **/
    cursor?: WorkerRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkerRoles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkerRoles.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkerRoles.
     * 
    **/
    distinct?: Enumerable<WorkerRoleScalarFieldEnum>
  }

  /**
   * WorkerRole: findFirst
   */
  export interface WorkerRoleFindFirstArgs extends WorkerRoleFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * WorkerRole findMany
   */
  export type WorkerRoleFindManyArgs = {
    /**
     * Select specific fields to fetch from the WorkerRole
     * 
    **/
    select?: WorkerRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WorkerRoleInclude | null
    /**
     * Filter, which WorkerRoles to fetch.
     * 
    **/
    where?: WorkerRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkerRoles to fetch.
     * 
    **/
    orderBy?: Enumerable<WorkerRoleOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkerRoles.
     * 
    **/
    cursor?: WorkerRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkerRoles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkerRoles.
     * 
    **/
    skip?: number
    distinct?: Enumerable<WorkerRoleScalarFieldEnum>
  }


  /**
   * WorkerRole create
   */
  export type WorkerRoleCreateArgs = {
    /**
     * Select specific fields to fetch from the WorkerRole
     * 
    **/
    select?: WorkerRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WorkerRoleInclude | null
    /**
     * The data needed to create a WorkerRole.
     * 
    **/
    data: XOR<WorkerRoleCreateInput, WorkerRoleUncheckedCreateInput>
  }


  /**
   * WorkerRole createMany
   */
  export type WorkerRoleCreateManyArgs = {
    /**
     * The data used to create many WorkerRoles.
     * 
    **/
    data: Enumerable<WorkerRoleCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * WorkerRole update
   */
  export type WorkerRoleUpdateArgs = {
    /**
     * Select specific fields to fetch from the WorkerRole
     * 
    **/
    select?: WorkerRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WorkerRoleInclude | null
    /**
     * The data needed to update a WorkerRole.
     * 
    **/
    data: XOR<WorkerRoleUpdateInput, WorkerRoleUncheckedUpdateInput>
    /**
     * Choose, which WorkerRole to update.
     * 
    **/
    where: WorkerRoleWhereUniqueInput
  }


  /**
   * WorkerRole updateMany
   */
  export type WorkerRoleUpdateManyArgs = {
    /**
     * The data used to update WorkerRoles.
     * 
    **/
    data: XOR<WorkerRoleUpdateManyMutationInput, WorkerRoleUncheckedUpdateManyInput>
    /**
     * Filter which WorkerRoles to update
     * 
    **/
    where?: WorkerRoleWhereInput
  }


  /**
   * WorkerRole upsert
   */
  export type WorkerRoleUpsertArgs = {
    /**
     * Select specific fields to fetch from the WorkerRole
     * 
    **/
    select?: WorkerRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WorkerRoleInclude | null
    /**
     * The filter to search for the WorkerRole to update in case it exists.
     * 
    **/
    where: WorkerRoleWhereUniqueInput
    /**
     * In case the WorkerRole found by the `where` argument doesn't exist, create a new WorkerRole with this data.
     * 
    **/
    create: XOR<WorkerRoleCreateInput, WorkerRoleUncheckedCreateInput>
    /**
     * In case the WorkerRole was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<WorkerRoleUpdateInput, WorkerRoleUncheckedUpdateInput>
  }


  /**
   * WorkerRole delete
   */
  export type WorkerRoleDeleteArgs = {
    /**
     * Select specific fields to fetch from the WorkerRole
     * 
    **/
    select?: WorkerRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WorkerRoleInclude | null
    /**
     * Filter which WorkerRole to delete.
     * 
    **/
    where: WorkerRoleWhereUniqueInput
  }


  /**
   * WorkerRole deleteMany
   */
  export type WorkerRoleDeleteManyArgs = {
    /**
     * Filter which WorkerRoles to delete
     * 
    **/
    where?: WorkerRoleWhereInput
  }


  /**
   * WorkerRole: findUniqueOrThrow
   */
  export type WorkerRoleFindUniqueOrThrowArgs = WorkerRoleFindUniqueArgsBase
      

  /**
   * WorkerRole: findFirstOrThrow
   */
  export type WorkerRoleFindFirstOrThrowArgs = WorkerRoleFindFirstArgsBase
      

  /**
   * WorkerRole without action
   */
  export type WorkerRoleArgs = {
    /**
     * Select specific fields to fetch from the WorkerRole
     * 
    **/
    select?: WorkerRoleSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: WorkerRoleInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const AuthDeviceScalarFieldEnum: {
    id: 'id',
    authId: 'authId',
    deviceId: 'deviceId',
    userAgent: 'userAgent'
  };

  export type AuthDeviceScalarFieldEnum = (typeof AuthDeviceScalarFieldEnum)[keyof typeof AuthDeviceScalarFieldEnum]


  export const AuthMfaChallengeAttemptScalarFieldEnum: {
    id: 'id',
    authId: 'authId',
    createdAt: 'createdAt',
    wasSuccessful: 'wasSuccessful',
    authMfaChallengeId: 'authMfaChallengeId',
    authMfaConfigId: 'authMfaConfigId'
  };

  export type AuthMfaChallengeAttemptScalarFieldEnum = (typeof AuthMfaChallengeAttemptScalarFieldEnum)[keyof typeof AuthMfaChallengeAttemptScalarFieldEnum]


  export const AuthMfaChallengeScalarFieldEnum: {
    id: 'id',
    authId: 'authId',
    createdAt: 'createdAt',
    succeededAt: 'succeededAt',
    rememberUntil: 'rememberUntil',
    authDeviceId: 'authDeviceId',
    reason: 'reason',
    authMfaConfigId: 'authMfaConfigId'
  };

  export type AuthMfaChallengeScalarFieldEnum = (typeof AuthMfaChallengeScalarFieldEnum)[keyof typeof AuthMfaChallengeScalarFieldEnum]


  export const AuthMfaConfigScalarFieldEnum: {
    id: 'id',
    authId: 'authId',
    createdAt: 'createdAt',
    confirmedAt: 'confirmedAt',
    deletedAt: 'deletedAt',
    type: 'type',
    configuration: 'configuration'
  };

  export type AuthMfaConfigScalarFieldEnum = (typeof AuthMfaConfigScalarFieldEnum)[keyof typeof AuthMfaConfigScalarFieldEnum]


  export const CompanyRoleScalarFieldEnum: {
    id: 'id',
    title: 'title',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    companyId: 'companyId'
  };

  export type CompanyRoleScalarFieldEnum = (typeof CompanyRoleScalarFieldEnum)[keyof typeof CompanyRoleScalarFieldEnum]


  export const CoreUserFeedbackScalarFieldEnum: {
    id: 'id',
    byUserId: 'byUserId',
    forUserId: 'forUserId',
    createdAt: 'createdAt',
    channelId: 'channelId',
    messageId: 'messageId',
    message: 'message',
    value: 'value'
  };

  export type CoreUserFeedbackScalarFieldEnum = (typeof CoreUserFeedbackScalarFieldEnum)[keyof typeof CoreUserFeedbackScalarFieldEnum]


  export const CoreUserGroupMembershipScalarFieldEnum: {
    id: 'id',
    groupId: 'groupId',
    userId: 'userId'
  };

  export type CoreUserGroupMembershipScalarFieldEnum = (typeof CoreUserGroupMembershipScalarFieldEnum)[keyof typeof CoreUserGroupMembershipScalarFieldEnum]


  export const CoreUserGroupScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    type: 'type',
    name: 'name',
    ownerId: 'ownerId'
  };

  export type CoreUserGroupScalarFieldEnum = (typeof CoreUserGroupScalarFieldEnum)[keyof typeof CoreUserGroupScalarFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const WorkerRoleScalarFieldEnum: {
    id: 'id',
    isPrimary: 'isPrimary',
    payRate: 'payRate',
    payType: 'payType',
    userId: 'userId',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    companyRoleId: 'companyRoleId'
  };

  export type WorkerRoleScalarFieldEnum = (typeof WorkerRoleScalarFieldEnum)[keyof typeof WorkerRoleScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type CoreUserGroupWhereInput = {
    AND?: Enumerable<CoreUserGroupWhereInput>
    OR?: Enumerable<CoreUserGroupWhereInput>
    NOT?: Enumerable<CoreUserGroupWhereInput>
    id?: StringFilter | string
    companyId?: StringFilter | string
    type?: EnumCoreUserGroupTypeFilter | CoreUserGroupType
    name?: StringFilter | string
    ownerId?: StringNullableFilter | string | null
    members?: CoreUserGroupMembershipListRelationFilter
  }

  export type CoreUserGroupOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    ownerId?: SortOrder
    members?: CoreUserGroupMembershipOrderByRelationAggregateInput
  }

  export type CoreUserGroupWhereUniqueInput = {
    id?: string
  }

  export type CoreUserGroupOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    ownerId?: SortOrder
    _count?: CoreUserGroupCountOrderByAggregateInput
    _max?: CoreUserGroupMaxOrderByAggregateInput
    _min?: CoreUserGroupMinOrderByAggregateInput
  }

  export type CoreUserGroupScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CoreUserGroupScalarWhereWithAggregatesInput>
    OR?: Enumerable<CoreUserGroupScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CoreUserGroupScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    companyId?: StringWithAggregatesFilter | string
    type?: EnumCoreUserGroupTypeWithAggregatesFilter | CoreUserGroupType
    name?: StringWithAggregatesFilter | string
    ownerId?: StringNullableWithAggregatesFilter | string | null
  }

  export type CoreUserGroupMembershipWhereInput = {
    AND?: Enumerable<CoreUserGroupMembershipWhereInput>
    OR?: Enumerable<CoreUserGroupMembershipWhereInput>
    NOT?: Enumerable<CoreUserGroupMembershipWhereInput>
    id?: StringFilter | string
    groupId?: StringFilter | string
    userId?: StringFilter | string
    group?: XOR<CoreUserGroupRelationFilter, CoreUserGroupWhereInput>
  }

  export type CoreUserGroupMembershipOrderByWithRelationInput = {
    id?: SortOrder
    groupId?: SortOrder
    userId?: SortOrder
    group?: CoreUserGroupOrderByWithRelationInput
  }

  export type CoreUserGroupMembershipWhereUniqueInput = {
    id?: string
    groupId_userId?: CoreUserGroupMembershipGroupIdUserIdCompoundUniqueInput
  }

  export type CoreUserGroupMembershipOrderByWithAggregationInput = {
    id?: SortOrder
    groupId?: SortOrder
    userId?: SortOrder
    _count?: CoreUserGroupMembershipCountOrderByAggregateInput
    _max?: CoreUserGroupMembershipMaxOrderByAggregateInput
    _min?: CoreUserGroupMembershipMinOrderByAggregateInput
  }

  export type CoreUserGroupMembershipScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CoreUserGroupMembershipScalarWhereWithAggregatesInput>
    OR?: Enumerable<CoreUserGroupMembershipScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CoreUserGroupMembershipScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    groupId?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
  }

  export type CoreUserFeedbackWhereInput = {
    AND?: Enumerable<CoreUserFeedbackWhereInput>
    OR?: Enumerable<CoreUserFeedbackWhereInput>
    NOT?: Enumerable<CoreUserFeedbackWhereInput>
    id?: StringFilter | string
    byUserId?: StringFilter | string
    forUserId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    channelId?: StringNullableFilter | string | null
    messageId?: BigIntNullableFilter | bigint | number | null
    message?: StringNullableFilter | string | null
    value?: EnumCoreUserFeedbackValueFilter | CoreUserFeedbackValue
  }

  export type CoreUserFeedbackOrderByWithRelationInput = {
    id?: SortOrder
    byUserId?: SortOrder
    forUserId?: SortOrder
    createdAt?: SortOrder
    channelId?: SortOrder
    messageId?: SortOrder
    message?: SortOrder
    value?: SortOrder
  }

  export type CoreUserFeedbackWhereUniqueInput = {
    id?: string
  }

  export type CoreUserFeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    byUserId?: SortOrder
    forUserId?: SortOrder
    createdAt?: SortOrder
    channelId?: SortOrder
    messageId?: SortOrder
    message?: SortOrder
    value?: SortOrder
    _count?: CoreUserFeedbackCountOrderByAggregateInput
    _avg?: CoreUserFeedbackAvgOrderByAggregateInput
    _max?: CoreUserFeedbackMaxOrderByAggregateInput
    _min?: CoreUserFeedbackMinOrderByAggregateInput
    _sum?: CoreUserFeedbackSumOrderByAggregateInput
  }

  export type CoreUserFeedbackScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CoreUserFeedbackScalarWhereWithAggregatesInput>
    OR?: Enumerable<CoreUserFeedbackScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CoreUserFeedbackScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    byUserId?: StringWithAggregatesFilter | string
    forUserId?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    channelId?: StringNullableWithAggregatesFilter | string | null
    messageId?: BigIntNullableWithAggregatesFilter | bigint | number | null
    message?: StringNullableWithAggregatesFilter | string | null
    value?: EnumCoreUserFeedbackValueWithAggregatesFilter | CoreUserFeedbackValue
  }

  export type AuthMfaConfigWhereInput = {
    AND?: Enumerable<AuthMfaConfigWhereInput>
    OR?: Enumerable<AuthMfaConfigWhereInput>
    NOT?: Enumerable<AuthMfaConfigWhereInput>
    id?: StringFilter | string
    authId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    confirmedAt?: DateTimeNullableFilter | Date | string | null
    deletedAt?: DateTimeNullableFilter | Date | string | null
    type?: EnumAuthMfaTypeFilter | AuthMfaType
    configuration?: JsonFilter
    AuthMfaChallenge?: AuthMfaChallengeListRelationFilter
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptListRelationFilter
  }

  export type AuthMfaConfigOrderByWithRelationInput = {
    id?: SortOrder
    authId?: SortOrder
    createdAt?: SortOrder
    confirmedAt?: SortOrder
    deletedAt?: SortOrder
    type?: SortOrder
    configuration?: SortOrder
    AuthMfaChallenge?: AuthMfaChallengeOrderByRelationAggregateInput
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptOrderByRelationAggregateInput
  }

  export type AuthMfaConfigWhereUniqueInput = {
    id?: string
  }

  export type AuthMfaConfigOrderByWithAggregationInput = {
    id?: SortOrder
    authId?: SortOrder
    createdAt?: SortOrder
    confirmedAt?: SortOrder
    deletedAt?: SortOrder
    type?: SortOrder
    configuration?: SortOrder
    _count?: AuthMfaConfigCountOrderByAggregateInput
    _max?: AuthMfaConfigMaxOrderByAggregateInput
    _min?: AuthMfaConfigMinOrderByAggregateInput
  }

  export type AuthMfaConfigScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AuthMfaConfigScalarWhereWithAggregatesInput>
    OR?: Enumerable<AuthMfaConfigScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AuthMfaConfigScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    authId?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    confirmedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    type?: EnumAuthMfaTypeWithAggregatesFilter | AuthMfaType
    configuration?: JsonWithAggregatesFilter
  }

  export type AuthDeviceWhereInput = {
    AND?: Enumerable<AuthDeviceWhereInput>
    OR?: Enumerable<AuthDeviceWhereInput>
    NOT?: Enumerable<AuthDeviceWhereInput>
    id?: StringFilter | string
    authId?: StringFilter | string
    deviceId?: StringFilter | string
    userAgent?: StringFilter | string
    AuthMfaChallenge?: AuthMfaChallengeListRelationFilter
  }

  export type AuthDeviceOrderByWithRelationInput = {
    id?: SortOrder
    authId?: SortOrder
    deviceId?: SortOrder
    userAgent?: SortOrder
    AuthMfaChallenge?: AuthMfaChallengeOrderByRelationAggregateInput
  }

  export type AuthDeviceWhereUniqueInput = {
    id?: string
    authId_deviceId?: AuthDeviceAuthIdDeviceIdCompoundUniqueInput
  }

  export type AuthDeviceOrderByWithAggregationInput = {
    id?: SortOrder
    authId?: SortOrder
    deviceId?: SortOrder
    userAgent?: SortOrder
    _count?: AuthDeviceCountOrderByAggregateInput
    _max?: AuthDeviceMaxOrderByAggregateInput
    _min?: AuthDeviceMinOrderByAggregateInput
  }

  export type AuthDeviceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AuthDeviceScalarWhereWithAggregatesInput>
    OR?: Enumerable<AuthDeviceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AuthDeviceScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    authId?: StringWithAggregatesFilter | string
    deviceId?: StringWithAggregatesFilter | string
    userAgent?: StringWithAggregatesFilter | string
  }

  export type AuthMfaChallengeWhereInput = {
    AND?: Enumerable<AuthMfaChallengeWhereInput>
    OR?: Enumerable<AuthMfaChallengeWhereInput>
    NOT?: Enumerable<AuthMfaChallengeWhereInput>
    id?: StringFilter | string
    authId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    succeededAt?: DateTimeNullableFilter | Date | string | null
    rememberUntil?: DateTimeFilter | Date | string
    authDeviceId?: StringFilter | string
    authDevice?: XOR<AuthDeviceRelationFilter, AuthDeviceWhereInput>
    reason?: StringNullableFilter | string | null
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptListRelationFilter
    AuthMfaConfig?: XOR<AuthMfaConfigRelationFilter, AuthMfaConfigWhereInput> | null
    authMfaConfigId?: StringNullableFilter | string | null
  }

  export type AuthMfaChallengeOrderByWithRelationInput = {
    id?: SortOrder
    authId?: SortOrder
    createdAt?: SortOrder
    succeededAt?: SortOrder
    rememberUntil?: SortOrder
    authDeviceId?: SortOrder
    authDevice?: AuthDeviceOrderByWithRelationInput
    reason?: SortOrder
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptOrderByRelationAggregateInput
    AuthMfaConfig?: AuthMfaConfigOrderByWithRelationInput
    authMfaConfigId?: SortOrder
  }

  export type AuthMfaChallengeWhereUniqueInput = {
    id?: string
  }

  export type AuthMfaChallengeOrderByWithAggregationInput = {
    id?: SortOrder
    authId?: SortOrder
    createdAt?: SortOrder
    succeededAt?: SortOrder
    rememberUntil?: SortOrder
    authDeviceId?: SortOrder
    reason?: SortOrder
    authMfaConfigId?: SortOrder
    _count?: AuthMfaChallengeCountOrderByAggregateInput
    _max?: AuthMfaChallengeMaxOrderByAggregateInput
    _min?: AuthMfaChallengeMinOrderByAggregateInput
  }

  export type AuthMfaChallengeScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AuthMfaChallengeScalarWhereWithAggregatesInput>
    OR?: Enumerable<AuthMfaChallengeScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AuthMfaChallengeScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    authId?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    succeededAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    rememberUntil?: DateTimeWithAggregatesFilter | Date | string
    authDeviceId?: StringWithAggregatesFilter | string
    reason?: StringNullableWithAggregatesFilter | string | null
    authMfaConfigId?: StringNullableWithAggregatesFilter | string | null
  }

  export type AuthMfaChallengeAttemptWhereInput = {
    AND?: Enumerable<AuthMfaChallengeAttemptWhereInput>
    OR?: Enumerable<AuthMfaChallengeAttemptWhereInput>
    NOT?: Enumerable<AuthMfaChallengeAttemptWhereInput>
    id?: StringFilter | string
    authId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    wasSuccessful?: BoolFilter | boolean
    authMfaChallengeId?: StringFilter | string
    challenge?: XOR<AuthMfaChallengeRelationFilter, AuthMfaChallengeWhereInput>
    authMfaConfigId?: StringFilter | string
    authMfaConfig?: XOR<AuthMfaConfigRelationFilter, AuthMfaConfigWhereInput>
  }

  export type AuthMfaChallengeAttemptOrderByWithRelationInput = {
    id?: SortOrder
    authId?: SortOrder
    createdAt?: SortOrder
    wasSuccessful?: SortOrder
    authMfaChallengeId?: SortOrder
    challenge?: AuthMfaChallengeOrderByWithRelationInput
    authMfaConfigId?: SortOrder
    authMfaConfig?: AuthMfaConfigOrderByWithRelationInput
  }

  export type AuthMfaChallengeAttemptWhereUniqueInput = {
    id?: string
  }

  export type AuthMfaChallengeAttemptOrderByWithAggregationInput = {
    id?: SortOrder
    authId?: SortOrder
    createdAt?: SortOrder
    wasSuccessful?: SortOrder
    authMfaChallengeId?: SortOrder
    authMfaConfigId?: SortOrder
    _count?: AuthMfaChallengeAttemptCountOrderByAggregateInput
    _max?: AuthMfaChallengeAttemptMaxOrderByAggregateInput
    _min?: AuthMfaChallengeAttemptMinOrderByAggregateInput
  }

  export type AuthMfaChallengeAttemptScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AuthMfaChallengeAttemptScalarWhereWithAggregatesInput>
    OR?: Enumerable<AuthMfaChallengeAttemptScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AuthMfaChallengeAttemptScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    authId?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    wasSuccessful?: BoolWithAggregatesFilter | boolean
    authMfaChallengeId?: StringWithAggregatesFilter | string
    authMfaConfigId?: StringWithAggregatesFilter | string
  }

  export type CompanyRoleWhereInput = {
    AND?: Enumerable<CompanyRoleWhereInput>
    OR?: Enumerable<CompanyRoleWhereInput>
    NOT?: Enumerable<CompanyRoleWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    deletedAt?: DateTimeNullableFilter | Date | string | null
    createdAt?: DateTimeFilter | Date | string
    companyId?: StringFilter | string
    workerRoles?: WorkerRoleListRelationFilter
  }

  export type CompanyRoleOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    companyId?: SortOrder
    workerRoles?: WorkerRoleOrderByRelationAggregateInput
  }

  export type CompanyRoleWhereUniqueInput = {
    id?: string
  }

  export type CompanyRoleOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    companyId?: SortOrder
    _count?: CompanyRoleCountOrderByAggregateInput
    _max?: CompanyRoleMaxOrderByAggregateInput
    _min?: CompanyRoleMinOrderByAggregateInput
  }

  export type CompanyRoleScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CompanyRoleScalarWhereWithAggregatesInput>
    OR?: Enumerable<CompanyRoleScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CompanyRoleScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    companyId?: StringWithAggregatesFilter | string
  }

  export type WorkerRoleWhereInput = {
    AND?: Enumerable<WorkerRoleWhereInput>
    OR?: Enumerable<WorkerRoleWhereInput>
    NOT?: Enumerable<WorkerRoleWhereInput>
    id?: StringFilter | string
    isPrimary?: BoolFilter | boolean
    payRate?: DecimalFilter | Decimal | DecimalJsLike | number | string
    payType?: EnumWorkerRolePaytypeFilter | WorkerRolePaytype
    userId?: StringFilter | string
    deletedAt?: DateTimeNullableFilter | Date | string | null
    createdAt?: DateTimeFilter | Date | string
    CompanyRole?: XOR<CompanyRoleRelationFilter, CompanyRoleWhereInput>
    companyRoleId?: StringFilter | string
  }

  export type WorkerRoleOrderByWithRelationInput = {
    id?: SortOrder
    isPrimary?: SortOrder
    payRate?: SortOrder
    payType?: SortOrder
    userId?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    CompanyRole?: CompanyRoleOrderByWithRelationInput
    companyRoleId?: SortOrder
  }

  export type WorkerRoleWhereUniqueInput = {
    id?: string
  }

  export type WorkerRoleOrderByWithAggregationInput = {
    id?: SortOrder
    isPrimary?: SortOrder
    payRate?: SortOrder
    payType?: SortOrder
    userId?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    companyRoleId?: SortOrder
    _count?: WorkerRoleCountOrderByAggregateInput
    _avg?: WorkerRoleAvgOrderByAggregateInput
    _max?: WorkerRoleMaxOrderByAggregateInput
    _min?: WorkerRoleMinOrderByAggregateInput
    _sum?: WorkerRoleSumOrderByAggregateInput
  }

  export type WorkerRoleScalarWhereWithAggregatesInput = {
    AND?: Enumerable<WorkerRoleScalarWhereWithAggregatesInput>
    OR?: Enumerable<WorkerRoleScalarWhereWithAggregatesInput>
    NOT?: Enumerable<WorkerRoleScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    isPrimary?: BoolWithAggregatesFilter | boolean
    payRate?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    payType?: EnumWorkerRolePaytypeWithAggregatesFilter | WorkerRolePaytype
    userId?: StringWithAggregatesFilter | string
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    companyRoleId?: StringWithAggregatesFilter | string
  }

  export type CoreUserGroupCreateInput = {
    id?: string
    companyId: string
    type?: CoreUserGroupType
    name: string
    ownerId?: string | null
    members?: CoreUserGroupMembershipCreateNestedManyWithoutGroupInput
  }

  export type CoreUserGroupUncheckedCreateInput = {
    id?: string
    companyId: string
    type?: CoreUserGroupType
    name: string
    ownerId?: string | null
    members?: CoreUserGroupMembershipUncheckedCreateNestedManyWithoutGroupInput
  }

  export type CoreUserGroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    type?: EnumCoreUserGroupTypeFieldUpdateOperationsInput | CoreUserGroupType
    name?: StringFieldUpdateOperationsInput | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    members?: CoreUserGroupMembershipUpdateManyWithoutGroupNestedInput
  }

  export type CoreUserGroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    type?: EnumCoreUserGroupTypeFieldUpdateOperationsInput | CoreUserGroupType
    name?: StringFieldUpdateOperationsInput | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
    members?: CoreUserGroupMembershipUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type CoreUserGroupCreateManyInput = {
    id?: string
    companyId: string
    type?: CoreUserGroupType
    name: string
    ownerId?: string | null
  }

  export type CoreUserGroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    type?: EnumCoreUserGroupTypeFieldUpdateOperationsInput | CoreUserGroupType
    name?: StringFieldUpdateOperationsInput | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CoreUserGroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    type?: EnumCoreUserGroupTypeFieldUpdateOperationsInput | CoreUserGroupType
    name?: StringFieldUpdateOperationsInput | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CoreUserGroupMembershipCreateInput = {
    id?: string
    userId: string
    group: CoreUserGroupCreateNestedOneWithoutMembersInput
  }

  export type CoreUserGroupMembershipUncheckedCreateInput = {
    id?: string
    groupId: string
    userId: string
  }

  export type CoreUserGroupMembershipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    group?: CoreUserGroupUpdateOneRequiredWithoutMembersNestedInput
  }

  export type CoreUserGroupMembershipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type CoreUserGroupMembershipCreateManyInput = {
    id?: string
    groupId: string
    userId: string
  }

  export type CoreUserGroupMembershipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type CoreUserGroupMembershipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type CoreUserFeedbackCreateInput = {
    id?: string
    byUserId: string
    forUserId: string
    createdAt?: Date | string
    channelId?: string | null
    messageId?: bigint | number | null
    message?: string | null
    value?: CoreUserFeedbackValue
  }

  export type CoreUserFeedbackUncheckedCreateInput = {
    id?: string
    byUserId: string
    forUserId: string
    createdAt?: Date | string
    channelId?: string | null
    messageId?: bigint | number | null
    message?: string | null
    value?: CoreUserFeedbackValue
  }

  export type CoreUserFeedbackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    byUserId?: StringFieldUpdateOperationsInput | string
    forUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    messageId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    value?: EnumCoreUserFeedbackValueFieldUpdateOperationsInput | CoreUserFeedbackValue
  }

  export type CoreUserFeedbackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    byUserId?: StringFieldUpdateOperationsInput | string
    forUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    messageId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    value?: EnumCoreUserFeedbackValueFieldUpdateOperationsInput | CoreUserFeedbackValue
  }

  export type CoreUserFeedbackCreateManyInput = {
    id?: string
    byUserId: string
    forUserId: string
    createdAt?: Date | string
    channelId?: string | null
    messageId?: bigint | number | null
    message?: string | null
    value?: CoreUserFeedbackValue
  }

  export type CoreUserFeedbackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    byUserId?: StringFieldUpdateOperationsInput | string
    forUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    messageId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    value?: EnumCoreUserFeedbackValueFieldUpdateOperationsInput | CoreUserFeedbackValue
  }

  export type CoreUserFeedbackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    byUserId?: StringFieldUpdateOperationsInput | string
    forUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    messageId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    value?: EnumCoreUserFeedbackValueFieldUpdateOperationsInput | CoreUserFeedbackValue
  }

  export type AuthMfaConfigCreateInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    confirmedAt?: Date | string | null
    deletedAt?: Date | string | null
    type: AuthMfaType
    configuration: JsonNullValueInput | InputJsonValue
    AuthMfaChallenge?: AuthMfaChallengeCreateNestedManyWithoutAuthMfaConfigInput
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptCreateNestedManyWithoutAuthMfaConfigInput
  }

  export type AuthMfaConfigUncheckedCreateInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    confirmedAt?: Date | string | null
    deletedAt?: Date | string | null
    type: AuthMfaType
    configuration: JsonNullValueInput | InputJsonValue
    AuthMfaChallenge?: AuthMfaChallengeUncheckedCreateNestedManyWithoutAuthMfaConfigInput
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptUncheckedCreateNestedManyWithoutAuthMfaConfigInput
  }

  export type AuthMfaConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    type?: EnumAuthMfaTypeFieldUpdateOperationsInput | AuthMfaType
    configuration?: JsonNullValueInput | InputJsonValue
    AuthMfaChallenge?: AuthMfaChallengeUpdateManyWithoutAuthMfaConfigNestedInput
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptUpdateManyWithoutAuthMfaConfigNestedInput
  }

  export type AuthMfaConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    type?: EnumAuthMfaTypeFieldUpdateOperationsInput | AuthMfaType
    configuration?: JsonNullValueInput | InputJsonValue
    AuthMfaChallenge?: AuthMfaChallengeUncheckedUpdateManyWithoutAuthMfaConfigNestedInput
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptUncheckedUpdateManyWithoutAuthMfaConfigNestedInput
  }

  export type AuthMfaConfigCreateManyInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    confirmedAt?: Date | string | null
    deletedAt?: Date | string | null
    type: AuthMfaType
    configuration: JsonNullValueInput | InputJsonValue
  }

  export type AuthMfaConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    type?: EnumAuthMfaTypeFieldUpdateOperationsInput | AuthMfaType
    configuration?: JsonNullValueInput | InputJsonValue
  }

  export type AuthMfaConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    type?: EnumAuthMfaTypeFieldUpdateOperationsInput | AuthMfaType
    configuration?: JsonNullValueInput | InputJsonValue
  }

  export type AuthDeviceCreateInput = {
    id?: string
    authId: string
    deviceId: string
    userAgent: string
    AuthMfaChallenge?: AuthMfaChallengeCreateNestedManyWithoutAuthDeviceInput
  }

  export type AuthDeviceUncheckedCreateInput = {
    id?: string
    authId: string
    deviceId: string
    userAgent: string
    AuthMfaChallenge?: AuthMfaChallengeUncheckedCreateNestedManyWithoutAuthDeviceInput
  }

  export type AuthDeviceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    AuthMfaChallenge?: AuthMfaChallengeUpdateManyWithoutAuthDeviceNestedInput
  }

  export type AuthDeviceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    AuthMfaChallenge?: AuthMfaChallengeUncheckedUpdateManyWithoutAuthDeviceNestedInput
  }

  export type AuthDeviceCreateManyInput = {
    id?: string
    authId: string
    deviceId: string
    userAgent: string
  }

  export type AuthDeviceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
  }

  export type AuthDeviceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
  }

  export type AuthMfaChallengeCreateInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    succeededAt?: Date | string | null
    rememberUntil?: Date | string
    authDevice: AuthDeviceCreateNestedOneWithoutAuthMfaChallengeInput
    reason?: string | null
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptCreateNestedManyWithoutChallengeInput
    AuthMfaConfig?: AuthMfaConfigCreateNestedOneWithoutAuthMfaChallengeInput
  }

  export type AuthMfaChallengeUncheckedCreateInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    succeededAt?: Date | string | null
    rememberUntil?: Date | string
    authDeviceId: string
    reason?: string | null
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptUncheckedCreateNestedManyWithoutChallengeInput
    authMfaConfigId?: string | null
  }

  export type AuthMfaChallengeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    succeededAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rememberUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    authDevice?: AuthDeviceUpdateOneRequiredWithoutAuthMfaChallengeNestedInput
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptUpdateManyWithoutChallengeNestedInput
    AuthMfaConfig?: AuthMfaConfigUpdateOneWithoutAuthMfaChallengeNestedInput
  }

  export type AuthMfaChallengeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    succeededAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rememberUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    authDeviceId?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptUncheckedUpdateManyWithoutChallengeNestedInput
    authMfaConfigId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthMfaChallengeCreateManyInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    succeededAt?: Date | string | null
    rememberUntil?: Date | string
    authDeviceId: string
    reason?: string | null
    authMfaConfigId?: string | null
  }

  export type AuthMfaChallengeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    succeededAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rememberUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthMfaChallengeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    succeededAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rememberUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    authDeviceId?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    authMfaConfigId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthMfaChallengeAttemptCreateInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    wasSuccessful?: boolean
    challenge: AuthMfaChallengeCreateNestedOneWithoutAuthMfaChallengeAttemptInput
    authMfaConfig: AuthMfaConfigCreateNestedOneWithoutAuthMfaChallengeAttemptInput
  }

  export type AuthMfaChallengeAttemptUncheckedCreateInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    wasSuccessful?: boolean
    authMfaChallengeId: string
    authMfaConfigId: string
  }

  export type AuthMfaChallengeAttemptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wasSuccessful?: BoolFieldUpdateOperationsInput | boolean
    challenge?: AuthMfaChallengeUpdateOneRequiredWithoutAuthMfaChallengeAttemptNestedInput
    authMfaConfig?: AuthMfaConfigUpdateOneRequiredWithoutAuthMfaChallengeAttemptNestedInput
  }

  export type AuthMfaChallengeAttemptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wasSuccessful?: BoolFieldUpdateOperationsInput | boolean
    authMfaChallengeId?: StringFieldUpdateOperationsInput | string
    authMfaConfigId?: StringFieldUpdateOperationsInput | string
  }

  export type AuthMfaChallengeAttemptCreateManyInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    wasSuccessful?: boolean
    authMfaChallengeId: string
    authMfaConfigId: string
  }

  export type AuthMfaChallengeAttemptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wasSuccessful?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AuthMfaChallengeAttemptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wasSuccessful?: BoolFieldUpdateOperationsInput | boolean
    authMfaChallengeId?: StringFieldUpdateOperationsInput | string
    authMfaConfigId?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyRoleCreateInput = {
    id?: string
    title: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    companyId: string
    workerRoles?: WorkerRoleCreateNestedManyWithoutCompanyRoleInput
  }

  export type CompanyRoleUncheckedCreateInput = {
    id?: string
    title: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    companyId: string
    workerRoles?: WorkerRoleUncheckedCreateNestedManyWithoutCompanyRoleInput
  }

  export type CompanyRoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
    workerRoles?: WorkerRoleUpdateManyWithoutCompanyRoleNestedInput
  }

  export type CompanyRoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
    workerRoles?: WorkerRoleUncheckedUpdateManyWithoutCompanyRoleNestedInput
  }

  export type CompanyRoleCreateManyInput = {
    id?: string
    title: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    companyId: string
  }

  export type CompanyRoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyRoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type WorkerRoleCreateInput = {
    id?: string
    isPrimary?: boolean
    payRate: Decimal | DecimalJsLike | number | string
    payType: WorkerRolePaytype
    userId: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    CompanyRole: CompanyRoleCreateNestedOneWithoutWorkerRolesInput
  }

  export type WorkerRoleUncheckedCreateInput = {
    id?: string
    isPrimary?: boolean
    payRate: Decimal | DecimalJsLike | number | string
    payType: WorkerRolePaytype
    userId: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    companyRoleId: string
  }

  export type WorkerRoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    payRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payType?: EnumWorkerRolePaytypeFieldUpdateOperationsInput | WorkerRolePaytype
    userId?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    CompanyRole?: CompanyRoleUpdateOneRequiredWithoutWorkerRolesNestedInput
  }

  export type WorkerRoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    payRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payType?: EnumWorkerRolePaytypeFieldUpdateOperationsInput | WorkerRolePaytype
    userId?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyRoleId?: StringFieldUpdateOperationsInput | string
  }

  export type WorkerRoleCreateManyInput = {
    id?: string
    isPrimary?: boolean
    payRate: Decimal | DecimalJsLike | number | string
    payType: WorkerRolePaytype
    userId: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    companyRoleId: string
  }

  export type WorkerRoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    payRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payType?: EnumWorkerRolePaytypeFieldUpdateOperationsInput | WorkerRolePaytype
    userId?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkerRoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    payRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payType?: EnumWorkerRolePaytypeFieldUpdateOperationsInput | WorkerRolePaytype
    userId?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyRoleId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type EnumCoreUserGroupTypeFilter = {
    equals?: CoreUserGroupType
    in?: Enumerable<CoreUserGroupType>
    notIn?: Enumerable<CoreUserGroupType>
    not?: NestedEnumCoreUserGroupTypeFilter | CoreUserGroupType
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type CoreUserGroupMembershipListRelationFilter = {
    every?: CoreUserGroupMembershipWhereInput
    some?: CoreUserGroupMembershipWhereInput
    none?: CoreUserGroupMembershipWhereInput
  }

  export type CoreUserGroupMembershipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CoreUserGroupCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    ownerId?: SortOrder
  }

  export type CoreUserGroupMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    ownerId?: SortOrder
  }

  export type CoreUserGroupMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    type?: SortOrder
    name?: SortOrder
    ownerId?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type EnumCoreUserGroupTypeWithAggregatesFilter = {
    equals?: CoreUserGroupType
    in?: Enumerable<CoreUserGroupType>
    notIn?: Enumerable<CoreUserGroupType>
    not?: NestedEnumCoreUserGroupTypeWithAggregatesFilter | CoreUserGroupType
    _count?: NestedIntFilter
    _min?: NestedEnumCoreUserGroupTypeFilter
    _max?: NestedEnumCoreUserGroupTypeFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type CoreUserGroupRelationFilter = {
    is?: CoreUserGroupWhereInput
    isNot?: CoreUserGroupWhereInput
  }

  export type CoreUserGroupMembershipGroupIdUserIdCompoundUniqueInput = {
    groupId: string
    userId: string
  }

  export type CoreUserGroupMembershipCountOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    userId?: SortOrder
  }

  export type CoreUserGroupMembershipMaxOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    userId?: SortOrder
  }

  export type CoreUserGroupMembershipMinOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    userId?: SortOrder
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type BigIntNullableFilter = {
    equals?: bigint | number | null
    in?: Enumerable<bigint> | Enumerable<number> | null
    notIn?: Enumerable<bigint> | Enumerable<number> | null
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntNullableFilter | bigint | number | null
  }

  export type EnumCoreUserFeedbackValueFilter = {
    equals?: CoreUserFeedbackValue
    in?: Enumerable<CoreUserFeedbackValue>
    notIn?: Enumerable<CoreUserFeedbackValue>
    not?: NestedEnumCoreUserFeedbackValueFilter | CoreUserFeedbackValue
  }

  export type CoreUserFeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    byUserId?: SortOrder
    forUserId?: SortOrder
    createdAt?: SortOrder
    channelId?: SortOrder
    messageId?: SortOrder
    message?: SortOrder
    value?: SortOrder
  }

  export type CoreUserFeedbackAvgOrderByAggregateInput = {
    messageId?: SortOrder
  }

  export type CoreUserFeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    byUserId?: SortOrder
    forUserId?: SortOrder
    createdAt?: SortOrder
    channelId?: SortOrder
    messageId?: SortOrder
    message?: SortOrder
    value?: SortOrder
  }

  export type CoreUserFeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    byUserId?: SortOrder
    forUserId?: SortOrder
    createdAt?: SortOrder
    channelId?: SortOrder
    messageId?: SortOrder
    message?: SortOrder
    value?: SortOrder
  }

  export type CoreUserFeedbackSumOrderByAggregateInput = {
    messageId?: SortOrder
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type BigIntNullableWithAggregatesFilter = {
    equals?: bigint | number | null
    in?: Enumerable<bigint> | Enumerable<number> | null
    notIn?: Enumerable<bigint> | Enumerable<number> | null
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntNullableWithAggregatesFilter | bigint | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedBigIntNullableFilter
    _min?: NestedBigIntNullableFilter
    _max?: NestedBigIntNullableFilter
  }

  export type EnumCoreUserFeedbackValueWithAggregatesFilter = {
    equals?: CoreUserFeedbackValue
    in?: Enumerable<CoreUserFeedbackValue>
    notIn?: Enumerable<CoreUserFeedbackValue>
    not?: NestedEnumCoreUserFeedbackValueWithAggregatesFilter | CoreUserFeedbackValue
    _count?: NestedIntFilter
    _min?: NestedEnumCoreUserFeedbackValueFilter
    _max?: NestedEnumCoreUserFeedbackValueFilter
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type EnumAuthMfaTypeFilter = {
    equals?: AuthMfaType
    in?: Enumerable<AuthMfaType>
    notIn?: Enumerable<AuthMfaType>
    not?: NestedEnumAuthMfaTypeFilter | AuthMfaType
  }
  export type JsonFilter = 
    | PatchUndefined<
        Either<Required<JsonFilterBase>, Exclude<keyof Required<JsonFilterBase>, 'path'>>,
        Required<JsonFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase>, 'path'>>

  export type JsonFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
  }

  export type AuthMfaChallengeListRelationFilter = {
    every?: AuthMfaChallengeWhereInput
    some?: AuthMfaChallengeWhereInput
    none?: AuthMfaChallengeWhereInput
  }

  export type AuthMfaChallengeAttemptListRelationFilter = {
    every?: AuthMfaChallengeAttemptWhereInput
    some?: AuthMfaChallengeAttemptWhereInput
    none?: AuthMfaChallengeAttemptWhereInput
  }

  export type AuthMfaChallengeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuthMfaChallengeAttemptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuthMfaConfigCountOrderByAggregateInput = {
    id?: SortOrder
    authId?: SortOrder
    createdAt?: SortOrder
    confirmedAt?: SortOrder
    deletedAt?: SortOrder
    type?: SortOrder
    configuration?: SortOrder
  }

  export type AuthMfaConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    authId?: SortOrder
    createdAt?: SortOrder
    confirmedAt?: SortOrder
    deletedAt?: SortOrder
    type?: SortOrder
  }

  export type AuthMfaConfigMinOrderByAggregateInput = {
    id?: SortOrder
    authId?: SortOrder
    createdAt?: SortOrder
    confirmedAt?: SortOrder
    deletedAt?: SortOrder
    type?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type EnumAuthMfaTypeWithAggregatesFilter = {
    equals?: AuthMfaType
    in?: Enumerable<AuthMfaType>
    notIn?: Enumerable<AuthMfaType>
    not?: NestedEnumAuthMfaTypeWithAggregatesFilter | AuthMfaType
    _count?: NestedIntFilter
    _min?: NestedEnumAuthMfaTypeFilter
    _max?: NestedEnumAuthMfaTypeFilter
  }
  export type JsonWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase>, Exclude<keyof Required<JsonWithAggregatesFilterBase>, 'path'>>,
        Required<JsonWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase>, 'path'>>

  export type JsonWithAggregatesFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
    _count?: NestedIntFilter
    _min?: NestedJsonFilter
    _max?: NestedJsonFilter
  }

  export type AuthDeviceAuthIdDeviceIdCompoundUniqueInput = {
    authId: string
    deviceId: string
  }

  export type AuthDeviceCountOrderByAggregateInput = {
    id?: SortOrder
    authId?: SortOrder
    deviceId?: SortOrder
    userAgent?: SortOrder
  }

  export type AuthDeviceMaxOrderByAggregateInput = {
    id?: SortOrder
    authId?: SortOrder
    deviceId?: SortOrder
    userAgent?: SortOrder
  }

  export type AuthDeviceMinOrderByAggregateInput = {
    id?: SortOrder
    authId?: SortOrder
    deviceId?: SortOrder
    userAgent?: SortOrder
  }

  export type AuthDeviceRelationFilter = {
    is?: AuthDeviceWhereInput
    isNot?: AuthDeviceWhereInput
  }

  export type AuthMfaConfigRelationFilter = {
    is?: AuthMfaConfigWhereInput
    isNot?: AuthMfaConfigWhereInput
  }

  export type AuthMfaChallengeCountOrderByAggregateInput = {
    id?: SortOrder
    authId?: SortOrder
    createdAt?: SortOrder
    succeededAt?: SortOrder
    rememberUntil?: SortOrder
    authDeviceId?: SortOrder
    reason?: SortOrder
    authMfaConfigId?: SortOrder
  }

  export type AuthMfaChallengeMaxOrderByAggregateInput = {
    id?: SortOrder
    authId?: SortOrder
    createdAt?: SortOrder
    succeededAt?: SortOrder
    rememberUntil?: SortOrder
    authDeviceId?: SortOrder
    reason?: SortOrder
    authMfaConfigId?: SortOrder
  }

  export type AuthMfaChallengeMinOrderByAggregateInput = {
    id?: SortOrder
    authId?: SortOrder
    createdAt?: SortOrder
    succeededAt?: SortOrder
    rememberUntil?: SortOrder
    authDeviceId?: SortOrder
    reason?: SortOrder
    authMfaConfigId?: SortOrder
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type AuthMfaChallengeRelationFilter = {
    is?: AuthMfaChallengeWhereInput
    isNot?: AuthMfaChallengeWhereInput
  }

  export type AuthMfaChallengeAttemptCountOrderByAggregateInput = {
    id?: SortOrder
    authId?: SortOrder
    createdAt?: SortOrder
    wasSuccessful?: SortOrder
    authMfaChallengeId?: SortOrder
    authMfaConfigId?: SortOrder
  }

  export type AuthMfaChallengeAttemptMaxOrderByAggregateInput = {
    id?: SortOrder
    authId?: SortOrder
    createdAt?: SortOrder
    wasSuccessful?: SortOrder
    authMfaChallengeId?: SortOrder
    authMfaConfigId?: SortOrder
  }

  export type AuthMfaChallengeAttemptMinOrderByAggregateInput = {
    id?: SortOrder
    authId?: SortOrder
    createdAt?: SortOrder
    wasSuccessful?: SortOrder
    authMfaChallengeId?: SortOrder
    authMfaConfigId?: SortOrder
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type WorkerRoleListRelationFilter = {
    every?: WorkerRoleWhereInput
    some?: WorkerRoleWhereInput
    none?: WorkerRoleWhereInput
  }

  export type WorkerRoleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyRoleCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    companyId?: SortOrder
  }

  export type CompanyRoleMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    companyId?: SortOrder
  }

  export type CompanyRoleMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    companyId?: SortOrder
  }

  export type DecimalFilter = {
    equals?: Decimal | DecimalJsLike | number | string
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalFilter | Decimal | DecimalJsLike | number | string
  }

  export type EnumWorkerRolePaytypeFilter = {
    equals?: WorkerRolePaytype
    in?: Enumerable<WorkerRolePaytype>
    notIn?: Enumerable<WorkerRolePaytype>
    not?: NestedEnumWorkerRolePaytypeFilter | WorkerRolePaytype
  }

  export type CompanyRoleRelationFilter = {
    is?: CompanyRoleWhereInput
    isNot?: CompanyRoleWhereInput
  }

  export type WorkerRoleCountOrderByAggregateInput = {
    id?: SortOrder
    isPrimary?: SortOrder
    payRate?: SortOrder
    payType?: SortOrder
    userId?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    companyRoleId?: SortOrder
  }

  export type WorkerRoleAvgOrderByAggregateInput = {
    payRate?: SortOrder
  }

  export type WorkerRoleMaxOrderByAggregateInput = {
    id?: SortOrder
    isPrimary?: SortOrder
    payRate?: SortOrder
    payType?: SortOrder
    userId?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    companyRoleId?: SortOrder
  }

  export type WorkerRoleMinOrderByAggregateInput = {
    id?: SortOrder
    isPrimary?: SortOrder
    payRate?: SortOrder
    payType?: SortOrder
    userId?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    companyRoleId?: SortOrder
  }

  export type WorkerRoleSumOrderByAggregateInput = {
    payRate?: SortOrder
  }

  export type DecimalWithAggregatesFilter = {
    equals?: Decimal | DecimalJsLike | number | string
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter
    _avg?: NestedDecimalFilter
    _sum?: NestedDecimalFilter
    _min?: NestedDecimalFilter
    _max?: NestedDecimalFilter
  }

  export type EnumWorkerRolePaytypeWithAggregatesFilter = {
    equals?: WorkerRolePaytype
    in?: Enumerable<WorkerRolePaytype>
    notIn?: Enumerable<WorkerRolePaytype>
    not?: NestedEnumWorkerRolePaytypeWithAggregatesFilter | WorkerRolePaytype
    _count?: NestedIntFilter
    _min?: NestedEnumWorkerRolePaytypeFilter
    _max?: NestedEnumWorkerRolePaytypeFilter
  }

  export type CoreUserGroupMembershipCreateNestedManyWithoutGroupInput = {
    create?: XOR<Enumerable<CoreUserGroupMembershipCreateWithoutGroupInput>, Enumerable<CoreUserGroupMembershipUncheckedCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<CoreUserGroupMembershipCreateOrConnectWithoutGroupInput>
    createMany?: CoreUserGroupMembershipCreateManyGroupInputEnvelope
    connect?: Enumerable<CoreUserGroupMembershipWhereUniqueInput>
  }

  export type CoreUserGroupMembershipUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<Enumerable<CoreUserGroupMembershipCreateWithoutGroupInput>, Enumerable<CoreUserGroupMembershipUncheckedCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<CoreUserGroupMembershipCreateOrConnectWithoutGroupInput>
    createMany?: CoreUserGroupMembershipCreateManyGroupInputEnvelope
    connect?: Enumerable<CoreUserGroupMembershipWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumCoreUserGroupTypeFieldUpdateOperationsInput = {
    set?: CoreUserGroupType
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CoreUserGroupMembershipUpdateManyWithoutGroupNestedInput = {
    create?: XOR<Enumerable<CoreUserGroupMembershipCreateWithoutGroupInput>, Enumerable<CoreUserGroupMembershipUncheckedCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<CoreUserGroupMembershipCreateOrConnectWithoutGroupInput>
    upsert?: Enumerable<CoreUserGroupMembershipUpsertWithWhereUniqueWithoutGroupInput>
    createMany?: CoreUserGroupMembershipCreateManyGroupInputEnvelope
    set?: Enumerable<CoreUserGroupMembershipWhereUniqueInput>
    disconnect?: Enumerable<CoreUserGroupMembershipWhereUniqueInput>
    delete?: Enumerable<CoreUserGroupMembershipWhereUniqueInput>
    connect?: Enumerable<CoreUserGroupMembershipWhereUniqueInput>
    update?: Enumerable<CoreUserGroupMembershipUpdateWithWhereUniqueWithoutGroupInput>
    updateMany?: Enumerable<CoreUserGroupMembershipUpdateManyWithWhereWithoutGroupInput>
    deleteMany?: Enumerable<CoreUserGroupMembershipScalarWhereInput>
  }

  export type CoreUserGroupMembershipUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<Enumerable<CoreUserGroupMembershipCreateWithoutGroupInput>, Enumerable<CoreUserGroupMembershipUncheckedCreateWithoutGroupInput>>
    connectOrCreate?: Enumerable<CoreUserGroupMembershipCreateOrConnectWithoutGroupInput>
    upsert?: Enumerable<CoreUserGroupMembershipUpsertWithWhereUniqueWithoutGroupInput>
    createMany?: CoreUserGroupMembershipCreateManyGroupInputEnvelope
    set?: Enumerable<CoreUserGroupMembershipWhereUniqueInput>
    disconnect?: Enumerable<CoreUserGroupMembershipWhereUniqueInput>
    delete?: Enumerable<CoreUserGroupMembershipWhereUniqueInput>
    connect?: Enumerable<CoreUserGroupMembershipWhereUniqueInput>
    update?: Enumerable<CoreUserGroupMembershipUpdateWithWhereUniqueWithoutGroupInput>
    updateMany?: Enumerable<CoreUserGroupMembershipUpdateManyWithWhereWithoutGroupInput>
    deleteMany?: Enumerable<CoreUserGroupMembershipScalarWhereInput>
  }

  export type CoreUserGroupCreateNestedOneWithoutMembersInput = {
    create?: XOR<CoreUserGroupCreateWithoutMembersInput, CoreUserGroupUncheckedCreateWithoutMembersInput>
    connectOrCreate?: CoreUserGroupCreateOrConnectWithoutMembersInput
    connect?: CoreUserGroupWhereUniqueInput
  }

  export type CoreUserGroupUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<CoreUserGroupCreateWithoutMembersInput, CoreUserGroupUncheckedCreateWithoutMembersInput>
    connectOrCreate?: CoreUserGroupCreateOrConnectWithoutMembersInput
    upsert?: CoreUserGroupUpsertWithoutMembersInput
    connect?: CoreUserGroupWhereUniqueInput
    update?: XOR<CoreUserGroupUpdateWithoutMembersInput, CoreUserGroupUncheckedUpdateWithoutMembersInput>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumCoreUserFeedbackValueFieldUpdateOperationsInput = {
    set?: CoreUserFeedbackValue
  }

  export type AuthMfaChallengeCreateNestedManyWithoutAuthMfaConfigInput = {
    create?: XOR<Enumerable<AuthMfaChallengeCreateWithoutAuthMfaConfigInput>, Enumerable<AuthMfaChallengeUncheckedCreateWithoutAuthMfaConfigInput>>
    connectOrCreate?: Enumerable<AuthMfaChallengeCreateOrConnectWithoutAuthMfaConfigInput>
    createMany?: AuthMfaChallengeCreateManyAuthMfaConfigInputEnvelope
    connect?: Enumerable<AuthMfaChallengeWhereUniqueInput>
  }

  export type AuthMfaChallengeAttemptCreateNestedManyWithoutAuthMfaConfigInput = {
    create?: XOR<Enumerable<AuthMfaChallengeAttemptCreateWithoutAuthMfaConfigInput>, Enumerable<AuthMfaChallengeAttemptUncheckedCreateWithoutAuthMfaConfigInput>>
    connectOrCreate?: Enumerable<AuthMfaChallengeAttemptCreateOrConnectWithoutAuthMfaConfigInput>
    createMany?: AuthMfaChallengeAttemptCreateManyAuthMfaConfigInputEnvelope
    connect?: Enumerable<AuthMfaChallengeAttemptWhereUniqueInput>
  }

  export type AuthMfaChallengeUncheckedCreateNestedManyWithoutAuthMfaConfigInput = {
    create?: XOR<Enumerable<AuthMfaChallengeCreateWithoutAuthMfaConfigInput>, Enumerable<AuthMfaChallengeUncheckedCreateWithoutAuthMfaConfigInput>>
    connectOrCreate?: Enumerable<AuthMfaChallengeCreateOrConnectWithoutAuthMfaConfigInput>
    createMany?: AuthMfaChallengeCreateManyAuthMfaConfigInputEnvelope
    connect?: Enumerable<AuthMfaChallengeWhereUniqueInput>
  }

  export type AuthMfaChallengeAttemptUncheckedCreateNestedManyWithoutAuthMfaConfigInput = {
    create?: XOR<Enumerable<AuthMfaChallengeAttemptCreateWithoutAuthMfaConfigInput>, Enumerable<AuthMfaChallengeAttemptUncheckedCreateWithoutAuthMfaConfigInput>>
    connectOrCreate?: Enumerable<AuthMfaChallengeAttemptCreateOrConnectWithoutAuthMfaConfigInput>
    createMany?: AuthMfaChallengeAttemptCreateManyAuthMfaConfigInputEnvelope
    connect?: Enumerable<AuthMfaChallengeAttemptWhereUniqueInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumAuthMfaTypeFieldUpdateOperationsInput = {
    set?: AuthMfaType
  }

  export type AuthMfaChallengeUpdateManyWithoutAuthMfaConfigNestedInput = {
    create?: XOR<Enumerable<AuthMfaChallengeCreateWithoutAuthMfaConfigInput>, Enumerable<AuthMfaChallengeUncheckedCreateWithoutAuthMfaConfigInput>>
    connectOrCreate?: Enumerable<AuthMfaChallengeCreateOrConnectWithoutAuthMfaConfigInput>
    upsert?: Enumerable<AuthMfaChallengeUpsertWithWhereUniqueWithoutAuthMfaConfigInput>
    createMany?: AuthMfaChallengeCreateManyAuthMfaConfigInputEnvelope
    set?: Enumerable<AuthMfaChallengeWhereUniqueInput>
    disconnect?: Enumerable<AuthMfaChallengeWhereUniqueInput>
    delete?: Enumerable<AuthMfaChallengeWhereUniqueInput>
    connect?: Enumerable<AuthMfaChallengeWhereUniqueInput>
    update?: Enumerable<AuthMfaChallengeUpdateWithWhereUniqueWithoutAuthMfaConfigInput>
    updateMany?: Enumerable<AuthMfaChallengeUpdateManyWithWhereWithoutAuthMfaConfigInput>
    deleteMany?: Enumerable<AuthMfaChallengeScalarWhereInput>
  }

  export type AuthMfaChallengeAttemptUpdateManyWithoutAuthMfaConfigNestedInput = {
    create?: XOR<Enumerable<AuthMfaChallengeAttemptCreateWithoutAuthMfaConfigInput>, Enumerable<AuthMfaChallengeAttemptUncheckedCreateWithoutAuthMfaConfigInput>>
    connectOrCreate?: Enumerable<AuthMfaChallengeAttemptCreateOrConnectWithoutAuthMfaConfigInput>
    upsert?: Enumerable<AuthMfaChallengeAttemptUpsertWithWhereUniqueWithoutAuthMfaConfigInput>
    createMany?: AuthMfaChallengeAttemptCreateManyAuthMfaConfigInputEnvelope
    set?: Enumerable<AuthMfaChallengeAttemptWhereUniqueInput>
    disconnect?: Enumerable<AuthMfaChallengeAttemptWhereUniqueInput>
    delete?: Enumerable<AuthMfaChallengeAttemptWhereUniqueInput>
    connect?: Enumerable<AuthMfaChallengeAttemptWhereUniqueInput>
    update?: Enumerable<AuthMfaChallengeAttemptUpdateWithWhereUniqueWithoutAuthMfaConfigInput>
    updateMany?: Enumerable<AuthMfaChallengeAttemptUpdateManyWithWhereWithoutAuthMfaConfigInput>
    deleteMany?: Enumerable<AuthMfaChallengeAttemptScalarWhereInput>
  }

  export type AuthMfaChallengeUncheckedUpdateManyWithoutAuthMfaConfigNestedInput = {
    create?: XOR<Enumerable<AuthMfaChallengeCreateWithoutAuthMfaConfigInput>, Enumerable<AuthMfaChallengeUncheckedCreateWithoutAuthMfaConfigInput>>
    connectOrCreate?: Enumerable<AuthMfaChallengeCreateOrConnectWithoutAuthMfaConfigInput>
    upsert?: Enumerable<AuthMfaChallengeUpsertWithWhereUniqueWithoutAuthMfaConfigInput>
    createMany?: AuthMfaChallengeCreateManyAuthMfaConfigInputEnvelope
    set?: Enumerable<AuthMfaChallengeWhereUniqueInput>
    disconnect?: Enumerable<AuthMfaChallengeWhereUniqueInput>
    delete?: Enumerable<AuthMfaChallengeWhereUniqueInput>
    connect?: Enumerable<AuthMfaChallengeWhereUniqueInput>
    update?: Enumerable<AuthMfaChallengeUpdateWithWhereUniqueWithoutAuthMfaConfigInput>
    updateMany?: Enumerable<AuthMfaChallengeUpdateManyWithWhereWithoutAuthMfaConfigInput>
    deleteMany?: Enumerable<AuthMfaChallengeScalarWhereInput>
  }

  export type AuthMfaChallengeAttemptUncheckedUpdateManyWithoutAuthMfaConfigNestedInput = {
    create?: XOR<Enumerable<AuthMfaChallengeAttemptCreateWithoutAuthMfaConfigInput>, Enumerable<AuthMfaChallengeAttemptUncheckedCreateWithoutAuthMfaConfigInput>>
    connectOrCreate?: Enumerable<AuthMfaChallengeAttemptCreateOrConnectWithoutAuthMfaConfigInput>
    upsert?: Enumerable<AuthMfaChallengeAttemptUpsertWithWhereUniqueWithoutAuthMfaConfigInput>
    createMany?: AuthMfaChallengeAttemptCreateManyAuthMfaConfigInputEnvelope
    set?: Enumerable<AuthMfaChallengeAttemptWhereUniqueInput>
    disconnect?: Enumerable<AuthMfaChallengeAttemptWhereUniqueInput>
    delete?: Enumerable<AuthMfaChallengeAttemptWhereUniqueInput>
    connect?: Enumerable<AuthMfaChallengeAttemptWhereUniqueInput>
    update?: Enumerable<AuthMfaChallengeAttemptUpdateWithWhereUniqueWithoutAuthMfaConfigInput>
    updateMany?: Enumerable<AuthMfaChallengeAttemptUpdateManyWithWhereWithoutAuthMfaConfigInput>
    deleteMany?: Enumerable<AuthMfaChallengeAttemptScalarWhereInput>
  }

  export type AuthMfaChallengeCreateNestedManyWithoutAuthDeviceInput = {
    create?: XOR<Enumerable<AuthMfaChallengeCreateWithoutAuthDeviceInput>, Enumerable<AuthMfaChallengeUncheckedCreateWithoutAuthDeviceInput>>
    connectOrCreate?: Enumerable<AuthMfaChallengeCreateOrConnectWithoutAuthDeviceInput>
    createMany?: AuthMfaChallengeCreateManyAuthDeviceInputEnvelope
    connect?: Enumerable<AuthMfaChallengeWhereUniqueInput>
  }

  export type AuthMfaChallengeUncheckedCreateNestedManyWithoutAuthDeviceInput = {
    create?: XOR<Enumerable<AuthMfaChallengeCreateWithoutAuthDeviceInput>, Enumerable<AuthMfaChallengeUncheckedCreateWithoutAuthDeviceInput>>
    connectOrCreate?: Enumerable<AuthMfaChallengeCreateOrConnectWithoutAuthDeviceInput>
    createMany?: AuthMfaChallengeCreateManyAuthDeviceInputEnvelope
    connect?: Enumerable<AuthMfaChallengeWhereUniqueInput>
  }

  export type AuthMfaChallengeUpdateManyWithoutAuthDeviceNestedInput = {
    create?: XOR<Enumerable<AuthMfaChallengeCreateWithoutAuthDeviceInput>, Enumerable<AuthMfaChallengeUncheckedCreateWithoutAuthDeviceInput>>
    connectOrCreate?: Enumerable<AuthMfaChallengeCreateOrConnectWithoutAuthDeviceInput>
    upsert?: Enumerable<AuthMfaChallengeUpsertWithWhereUniqueWithoutAuthDeviceInput>
    createMany?: AuthMfaChallengeCreateManyAuthDeviceInputEnvelope
    set?: Enumerable<AuthMfaChallengeWhereUniqueInput>
    disconnect?: Enumerable<AuthMfaChallengeWhereUniqueInput>
    delete?: Enumerable<AuthMfaChallengeWhereUniqueInput>
    connect?: Enumerable<AuthMfaChallengeWhereUniqueInput>
    update?: Enumerable<AuthMfaChallengeUpdateWithWhereUniqueWithoutAuthDeviceInput>
    updateMany?: Enumerable<AuthMfaChallengeUpdateManyWithWhereWithoutAuthDeviceInput>
    deleteMany?: Enumerable<AuthMfaChallengeScalarWhereInput>
  }

  export type AuthMfaChallengeUncheckedUpdateManyWithoutAuthDeviceNestedInput = {
    create?: XOR<Enumerable<AuthMfaChallengeCreateWithoutAuthDeviceInput>, Enumerable<AuthMfaChallengeUncheckedCreateWithoutAuthDeviceInput>>
    connectOrCreate?: Enumerable<AuthMfaChallengeCreateOrConnectWithoutAuthDeviceInput>
    upsert?: Enumerable<AuthMfaChallengeUpsertWithWhereUniqueWithoutAuthDeviceInput>
    createMany?: AuthMfaChallengeCreateManyAuthDeviceInputEnvelope
    set?: Enumerable<AuthMfaChallengeWhereUniqueInput>
    disconnect?: Enumerable<AuthMfaChallengeWhereUniqueInput>
    delete?: Enumerable<AuthMfaChallengeWhereUniqueInput>
    connect?: Enumerable<AuthMfaChallengeWhereUniqueInput>
    update?: Enumerable<AuthMfaChallengeUpdateWithWhereUniqueWithoutAuthDeviceInput>
    updateMany?: Enumerable<AuthMfaChallengeUpdateManyWithWhereWithoutAuthDeviceInput>
    deleteMany?: Enumerable<AuthMfaChallengeScalarWhereInput>
  }

  export type AuthDeviceCreateNestedOneWithoutAuthMfaChallengeInput = {
    create?: XOR<AuthDeviceCreateWithoutAuthMfaChallengeInput, AuthDeviceUncheckedCreateWithoutAuthMfaChallengeInput>
    connectOrCreate?: AuthDeviceCreateOrConnectWithoutAuthMfaChallengeInput
    connect?: AuthDeviceWhereUniqueInput
  }

  export type AuthMfaChallengeAttemptCreateNestedManyWithoutChallengeInput = {
    create?: XOR<Enumerable<AuthMfaChallengeAttemptCreateWithoutChallengeInput>, Enumerable<AuthMfaChallengeAttemptUncheckedCreateWithoutChallengeInput>>
    connectOrCreate?: Enumerable<AuthMfaChallengeAttemptCreateOrConnectWithoutChallengeInput>
    createMany?: AuthMfaChallengeAttemptCreateManyChallengeInputEnvelope
    connect?: Enumerable<AuthMfaChallengeAttemptWhereUniqueInput>
  }

  export type AuthMfaConfigCreateNestedOneWithoutAuthMfaChallengeInput = {
    create?: XOR<AuthMfaConfigCreateWithoutAuthMfaChallengeInput, AuthMfaConfigUncheckedCreateWithoutAuthMfaChallengeInput>
    connectOrCreate?: AuthMfaConfigCreateOrConnectWithoutAuthMfaChallengeInput
    connect?: AuthMfaConfigWhereUniqueInput
  }

  export type AuthMfaChallengeAttemptUncheckedCreateNestedManyWithoutChallengeInput = {
    create?: XOR<Enumerable<AuthMfaChallengeAttemptCreateWithoutChallengeInput>, Enumerable<AuthMfaChallengeAttemptUncheckedCreateWithoutChallengeInput>>
    connectOrCreate?: Enumerable<AuthMfaChallengeAttemptCreateOrConnectWithoutChallengeInput>
    createMany?: AuthMfaChallengeAttemptCreateManyChallengeInputEnvelope
    connect?: Enumerable<AuthMfaChallengeAttemptWhereUniqueInput>
  }

  export type AuthDeviceUpdateOneRequiredWithoutAuthMfaChallengeNestedInput = {
    create?: XOR<AuthDeviceCreateWithoutAuthMfaChallengeInput, AuthDeviceUncheckedCreateWithoutAuthMfaChallengeInput>
    connectOrCreate?: AuthDeviceCreateOrConnectWithoutAuthMfaChallengeInput
    upsert?: AuthDeviceUpsertWithoutAuthMfaChallengeInput
    connect?: AuthDeviceWhereUniqueInput
    update?: XOR<AuthDeviceUpdateWithoutAuthMfaChallengeInput, AuthDeviceUncheckedUpdateWithoutAuthMfaChallengeInput>
  }

  export type AuthMfaChallengeAttemptUpdateManyWithoutChallengeNestedInput = {
    create?: XOR<Enumerable<AuthMfaChallengeAttemptCreateWithoutChallengeInput>, Enumerable<AuthMfaChallengeAttemptUncheckedCreateWithoutChallengeInput>>
    connectOrCreate?: Enumerable<AuthMfaChallengeAttemptCreateOrConnectWithoutChallengeInput>
    upsert?: Enumerable<AuthMfaChallengeAttemptUpsertWithWhereUniqueWithoutChallengeInput>
    createMany?: AuthMfaChallengeAttemptCreateManyChallengeInputEnvelope
    set?: Enumerable<AuthMfaChallengeAttemptWhereUniqueInput>
    disconnect?: Enumerable<AuthMfaChallengeAttemptWhereUniqueInput>
    delete?: Enumerable<AuthMfaChallengeAttemptWhereUniqueInput>
    connect?: Enumerable<AuthMfaChallengeAttemptWhereUniqueInput>
    update?: Enumerable<AuthMfaChallengeAttemptUpdateWithWhereUniqueWithoutChallengeInput>
    updateMany?: Enumerable<AuthMfaChallengeAttemptUpdateManyWithWhereWithoutChallengeInput>
    deleteMany?: Enumerable<AuthMfaChallengeAttemptScalarWhereInput>
  }

  export type AuthMfaConfigUpdateOneWithoutAuthMfaChallengeNestedInput = {
    create?: XOR<AuthMfaConfigCreateWithoutAuthMfaChallengeInput, AuthMfaConfigUncheckedCreateWithoutAuthMfaChallengeInput>
    connectOrCreate?: AuthMfaConfigCreateOrConnectWithoutAuthMfaChallengeInput
    upsert?: AuthMfaConfigUpsertWithoutAuthMfaChallengeInput
    disconnect?: boolean
    delete?: boolean
    connect?: AuthMfaConfigWhereUniqueInput
    update?: XOR<AuthMfaConfigUpdateWithoutAuthMfaChallengeInput, AuthMfaConfigUncheckedUpdateWithoutAuthMfaChallengeInput>
  }

  export type AuthMfaChallengeAttemptUncheckedUpdateManyWithoutChallengeNestedInput = {
    create?: XOR<Enumerable<AuthMfaChallengeAttemptCreateWithoutChallengeInput>, Enumerable<AuthMfaChallengeAttemptUncheckedCreateWithoutChallengeInput>>
    connectOrCreate?: Enumerable<AuthMfaChallengeAttemptCreateOrConnectWithoutChallengeInput>
    upsert?: Enumerable<AuthMfaChallengeAttemptUpsertWithWhereUniqueWithoutChallengeInput>
    createMany?: AuthMfaChallengeAttemptCreateManyChallengeInputEnvelope
    set?: Enumerable<AuthMfaChallengeAttemptWhereUniqueInput>
    disconnect?: Enumerable<AuthMfaChallengeAttemptWhereUniqueInput>
    delete?: Enumerable<AuthMfaChallengeAttemptWhereUniqueInput>
    connect?: Enumerable<AuthMfaChallengeAttemptWhereUniqueInput>
    update?: Enumerable<AuthMfaChallengeAttemptUpdateWithWhereUniqueWithoutChallengeInput>
    updateMany?: Enumerable<AuthMfaChallengeAttemptUpdateManyWithWhereWithoutChallengeInput>
    deleteMany?: Enumerable<AuthMfaChallengeAttemptScalarWhereInput>
  }

  export type AuthMfaChallengeCreateNestedOneWithoutAuthMfaChallengeAttemptInput = {
    create?: XOR<AuthMfaChallengeCreateWithoutAuthMfaChallengeAttemptInput, AuthMfaChallengeUncheckedCreateWithoutAuthMfaChallengeAttemptInput>
    connectOrCreate?: AuthMfaChallengeCreateOrConnectWithoutAuthMfaChallengeAttemptInput
    connect?: AuthMfaChallengeWhereUniqueInput
  }

  export type AuthMfaConfigCreateNestedOneWithoutAuthMfaChallengeAttemptInput = {
    create?: XOR<AuthMfaConfigCreateWithoutAuthMfaChallengeAttemptInput, AuthMfaConfigUncheckedCreateWithoutAuthMfaChallengeAttemptInput>
    connectOrCreate?: AuthMfaConfigCreateOrConnectWithoutAuthMfaChallengeAttemptInput
    connect?: AuthMfaConfigWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type AuthMfaChallengeUpdateOneRequiredWithoutAuthMfaChallengeAttemptNestedInput = {
    create?: XOR<AuthMfaChallengeCreateWithoutAuthMfaChallengeAttemptInput, AuthMfaChallengeUncheckedCreateWithoutAuthMfaChallengeAttemptInput>
    connectOrCreate?: AuthMfaChallengeCreateOrConnectWithoutAuthMfaChallengeAttemptInput
    upsert?: AuthMfaChallengeUpsertWithoutAuthMfaChallengeAttemptInput
    connect?: AuthMfaChallengeWhereUniqueInput
    update?: XOR<AuthMfaChallengeUpdateWithoutAuthMfaChallengeAttemptInput, AuthMfaChallengeUncheckedUpdateWithoutAuthMfaChallengeAttemptInput>
  }

  export type AuthMfaConfigUpdateOneRequiredWithoutAuthMfaChallengeAttemptNestedInput = {
    create?: XOR<AuthMfaConfigCreateWithoutAuthMfaChallengeAttemptInput, AuthMfaConfigUncheckedCreateWithoutAuthMfaChallengeAttemptInput>
    connectOrCreate?: AuthMfaConfigCreateOrConnectWithoutAuthMfaChallengeAttemptInput
    upsert?: AuthMfaConfigUpsertWithoutAuthMfaChallengeAttemptInput
    connect?: AuthMfaConfigWhereUniqueInput
    update?: XOR<AuthMfaConfigUpdateWithoutAuthMfaChallengeAttemptInput, AuthMfaConfigUncheckedUpdateWithoutAuthMfaChallengeAttemptInput>
  }

  export type WorkerRoleCreateNestedManyWithoutCompanyRoleInput = {
    create?: XOR<Enumerable<WorkerRoleCreateWithoutCompanyRoleInput>, Enumerable<WorkerRoleUncheckedCreateWithoutCompanyRoleInput>>
    connectOrCreate?: Enumerable<WorkerRoleCreateOrConnectWithoutCompanyRoleInput>
    createMany?: WorkerRoleCreateManyCompanyRoleInputEnvelope
    connect?: Enumerable<WorkerRoleWhereUniqueInput>
  }

  export type WorkerRoleUncheckedCreateNestedManyWithoutCompanyRoleInput = {
    create?: XOR<Enumerable<WorkerRoleCreateWithoutCompanyRoleInput>, Enumerable<WorkerRoleUncheckedCreateWithoutCompanyRoleInput>>
    connectOrCreate?: Enumerable<WorkerRoleCreateOrConnectWithoutCompanyRoleInput>
    createMany?: WorkerRoleCreateManyCompanyRoleInputEnvelope
    connect?: Enumerable<WorkerRoleWhereUniqueInput>
  }

  export type WorkerRoleUpdateManyWithoutCompanyRoleNestedInput = {
    create?: XOR<Enumerable<WorkerRoleCreateWithoutCompanyRoleInput>, Enumerable<WorkerRoleUncheckedCreateWithoutCompanyRoleInput>>
    connectOrCreate?: Enumerable<WorkerRoleCreateOrConnectWithoutCompanyRoleInput>
    upsert?: Enumerable<WorkerRoleUpsertWithWhereUniqueWithoutCompanyRoleInput>
    createMany?: WorkerRoleCreateManyCompanyRoleInputEnvelope
    set?: Enumerable<WorkerRoleWhereUniqueInput>
    disconnect?: Enumerable<WorkerRoleWhereUniqueInput>
    delete?: Enumerable<WorkerRoleWhereUniqueInput>
    connect?: Enumerable<WorkerRoleWhereUniqueInput>
    update?: Enumerable<WorkerRoleUpdateWithWhereUniqueWithoutCompanyRoleInput>
    updateMany?: Enumerable<WorkerRoleUpdateManyWithWhereWithoutCompanyRoleInput>
    deleteMany?: Enumerable<WorkerRoleScalarWhereInput>
  }

  export type WorkerRoleUncheckedUpdateManyWithoutCompanyRoleNestedInput = {
    create?: XOR<Enumerable<WorkerRoleCreateWithoutCompanyRoleInput>, Enumerable<WorkerRoleUncheckedCreateWithoutCompanyRoleInput>>
    connectOrCreate?: Enumerable<WorkerRoleCreateOrConnectWithoutCompanyRoleInput>
    upsert?: Enumerable<WorkerRoleUpsertWithWhereUniqueWithoutCompanyRoleInput>
    createMany?: WorkerRoleCreateManyCompanyRoleInputEnvelope
    set?: Enumerable<WorkerRoleWhereUniqueInput>
    disconnect?: Enumerable<WorkerRoleWhereUniqueInput>
    delete?: Enumerable<WorkerRoleWhereUniqueInput>
    connect?: Enumerable<WorkerRoleWhereUniqueInput>
    update?: Enumerable<WorkerRoleUpdateWithWhereUniqueWithoutCompanyRoleInput>
    updateMany?: Enumerable<WorkerRoleUpdateManyWithWhereWithoutCompanyRoleInput>
    deleteMany?: Enumerable<WorkerRoleScalarWhereInput>
  }

  export type CompanyRoleCreateNestedOneWithoutWorkerRolesInput = {
    create?: XOR<CompanyRoleCreateWithoutWorkerRolesInput, CompanyRoleUncheckedCreateWithoutWorkerRolesInput>
    connectOrCreate?: CompanyRoleCreateOrConnectWithoutWorkerRolesInput
    connect?: CompanyRoleWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumWorkerRolePaytypeFieldUpdateOperationsInput = {
    set?: WorkerRolePaytype
  }

  export type CompanyRoleUpdateOneRequiredWithoutWorkerRolesNestedInput = {
    create?: XOR<CompanyRoleCreateWithoutWorkerRolesInput, CompanyRoleUncheckedCreateWithoutWorkerRolesInput>
    connectOrCreate?: CompanyRoleCreateOrConnectWithoutWorkerRolesInput
    upsert?: CompanyRoleUpsertWithoutWorkerRolesInput
    connect?: CompanyRoleWhereUniqueInput
    update?: XOR<CompanyRoleUpdateWithoutWorkerRolesInput, CompanyRoleUncheckedUpdateWithoutWorkerRolesInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedEnumCoreUserGroupTypeFilter = {
    equals?: CoreUserGroupType
    in?: Enumerable<CoreUserGroupType>
    notIn?: Enumerable<CoreUserGroupType>
    not?: NestedEnumCoreUserGroupTypeFilter | CoreUserGroupType
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedEnumCoreUserGroupTypeWithAggregatesFilter = {
    equals?: CoreUserGroupType
    in?: Enumerable<CoreUserGroupType>
    notIn?: Enumerable<CoreUserGroupType>
    not?: NestedEnumCoreUserGroupTypeWithAggregatesFilter | CoreUserGroupType
    _count?: NestedIntFilter
    _min?: NestedEnumCoreUserGroupTypeFilter
    _max?: NestedEnumCoreUserGroupTypeFilter
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedBigIntNullableFilter = {
    equals?: bigint | number | null
    in?: Enumerable<bigint> | Enumerable<number> | null
    notIn?: Enumerable<bigint> | Enumerable<number> | null
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntNullableFilter | bigint | number | null
  }

  export type NestedEnumCoreUserFeedbackValueFilter = {
    equals?: CoreUserFeedbackValue
    in?: Enumerable<CoreUserFeedbackValue>
    notIn?: Enumerable<CoreUserFeedbackValue>
    not?: NestedEnumCoreUserFeedbackValueFilter | CoreUserFeedbackValue
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedBigIntNullableWithAggregatesFilter = {
    equals?: bigint | number | null
    in?: Enumerable<bigint> | Enumerable<number> | null
    notIn?: Enumerable<bigint> | Enumerable<number> | null
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntNullableWithAggregatesFilter | bigint | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedBigIntNullableFilter
    _min?: NestedBigIntNullableFilter
    _max?: NestedBigIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedEnumCoreUserFeedbackValueWithAggregatesFilter = {
    equals?: CoreUserFeedbackValue
    in?: Enumerable<CoreUserFeedbackValue>
    notIn?: Enumerable<CoreUserFeedbackValue>
    not?: NestedEnumCoreUserFeedbackValueWithAggregatesFilter | CoreUserFeedbackValue
    _count?: NestedIntFilter
    _min?: NestedEnumCoreUserFeedbackValueFilter
    _max?: NestedEnumCoreUserFeedbackValueFilter
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedEnumAuthMfaTypeFilter = {
    equals?: AuthMfaType
    in?: Enumerable<AuthMfaType>
    notIn?: Enumerable<AuthMfaType>
    not?: NestedEnumAuthMfaTypeFilter | AuthMfaType
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedEnumAuthMfaTypeWithAggregatesFilter = {
    equals?: AuthMfaType
    in?: Enumerable<AuthMfaType>
    notIn?: Enumerable<AuthMfaType>
    not?: NestedEnumAuthMfaTypeWithAggregatesFilter | AuthMfaType
    _count?: NestedIntFilter
    _min?: NestedEnumAuthMfaTypeFilter
    _max?: NestedEnumAuthMfaTypeFilter
  }
  export type NestedJsonFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase>, Exclude<keyof Required<NestedJsonFilterBase>, 'path'>>,
        Required<NestedJsonFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase>, 'path'>>

  export type NestedJsonFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedDecimalFilter = {
    equals?: Decimal | DecimalJsLike | number | string
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalFilter | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumWorkerRolePaytypeFilter = {
    equals?: WorkerRolePaytype
    in?: Enumerable<WorkerRolePaytype>
    notIn?: Enumerable<WorkerRolePaytype>
    not?: NestedEnumWorkerRolePaytypeFilter | WorkerRolePaytype
  }

  export type NestedDecimalWithAggregatesFilter = {
    equals?: Decimal | DecimalJsLike | number | string
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter
    _avg?: NestedDecimalFilter
    _sum?: NestedDecimalFilter
    _min?: NestedDecimalFilter
    _max?: NestedDecimalFilter
  }

  export type NestedEnumWorkerRolePaytypeWithAggregatesFilter = {
    equals?: WorkerRolePaytype
    in?: Enumerable<WorkerRolePaytype>
    notIn?: Enumerable<WorkerRolePaytype>
    not?: NestedEnumWorkerRolePaytypeWithAggregatesFilter | WorkerRolePaytype
    _count?: NestedIntFilter
    _min?: NestedEnumWorkerRolePaytypeFilter
    _max?: NestedEnumWorkerRolePaytypeFilter
  }

  export type CoreUserGroupMembershipCreateWithoutGroupInput = {
    id?: string
    userId: string
  }

  export type CoreUserGroupMembershipUncheckedCreateWithoutGroupInput = {
    id?: string
    userId: string
  }

  export type CoreUserGroupMembershipCreateOrConnectWithoutGroupInput = {
    where: CoreUserGroupMembershipWhereUniqueInput
    create: XOR<CoreUserGroupMembershipCreateWithoutGroupInput, CoreUserGroupMembershipUncheckedCreateWithoutGroupInput>
  }

  export type CoreUserGroupMembershipCreateManyGroupInputEnvelope = {
    data: Enumerable<CoreUserGroupMembershipCreateManyGroupInput>
    skipDuplicates?: boolean
  }

  export type CoreUserGroupMembershipUpsertWithWhereUniqueWithoutGroupInput = {
    where: CoreUserGroupMembershipWhereUniqueInput
    update: XOR<CoreUserGroupMembershipUpdateWithoutGroupInput, CoreUserGroupMembershipUncheckedUpdateWithoutGroupInput>
    create: XOR<CoreUserGroupMembershipCreateWithoutGroupInput, CoreUserGroupMembershipUncheckedCreateWithoutGroupInput>
  }

  export type CoreUserGroupMembershipUpdateWithWhereUniqueWithoutGroupInput = {
    where: CoreUserGroupMembershipWhereUniqueInput
    data: XOR<CoreUserGroupMembershipUpdateWithoutGroupInput, CoreUserGroupMembershipUncheckedUpdateWithoutGroupInput>
  }

  export type CoreUserGroupMembershipUpdateManyWithWhereWithoutGroupInput = {
    where: CoreUserGroupMembershipScalarWhereInput
    data: XOR<CoreUserGroupMembershipUpdateManyMutationInput, CoreUserGroupMembershipUncheckedUpdateManyWithoutMembersInput>
  }

  export type CoreUserGroupMembershipScalarWhereInput = {
    AND?: Enumerable<CoreUserGroupMembershipScalarWhereInput>
    OR?: Enumerable<CoreUserGroupMembershipScalarWhereInput>
    NOT?: Enumerable<CoreUserGroupMembershipScalarWhereInput>
    id?: StringFilter | string
    groupId?: StringFilter | string
    userId?: StringFilter | string
  }

  export type CoreUserGroupCreateWithoutMembersInput = {
    id?: string
    companyId: string
    type?: CoreUserGroupType
    name: string
    ownerId?: string | null
  }

  export type CoreUserGroupUncheckedCreateWithoutMembersInput = {
    id?: string
    companyId: string
    type?: CoreUserGroupType
    name: string
    ownerId?: string | null
  }

  export type CoreUserGroupCreateOrConnectWithoutMembersInput = {
    where: CoreUserGroupWhereUniqueInput
    create: XOR<CoreUserGroupCreateWithoutMembersInput, CoreUserGroupUncheckedCreateWithoutMembersInput>
  }

  export type CoreUserGroupUpsertWithoutMembersInput = {
    update: XOR<CoreUserGroupUpdateWithoutMembersInput, CoreUserGroupUncheckedUpdateWithoutMembersInput>
    create: XOR<CoreUserGroupCreateWithoutMembersInput, CoreUserGroupUncheckedCreateWithoutMembersInput>
  }

  export type CoreUserGroupUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    type?: EnumCoreUserGroupTypeFieldUpdateOperationsInput | CoreUserGroupType
    name?: StringFieldUpdateOperationsInput | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CoreUserGroupUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    type?: EnumCoreUserGroupTypeFieldUpdateOperationsInput | CoreUserGroupType
    name?: StringFieldUpdateOperationsInput | string
    ownerId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthMfaChallengeCreateWithoutAuthMfaConfigInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    succeededAt?: Date | string | null
    rememberUntil?: Date | string
    authDevice: AuthDeviceCreateNestedOneWithoutAuthMfaChallengeInput
    reason?: string | null
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptCreateNestedManyWithoutChallengeInput
  }

  export type AuthMfaChallengeUncheckedCreateWithoutAuthMfaConfigInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    succeededAt?: Date | string | null
    rememberUntil?: Date | string
    authDeviceId: string
    reason?: string | null
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptUncheckedCreateNestedManyWithoutChallengeInput
  }

  export type AuthMfaChallengeCreateOrConnectWithoutAuthMfaConfigInput = {
    where: AuthMfaChallengeWhereUniqueInput
    create: XOR<AuthMfaChallengeCreateWithoutAuthMfaConfigInput, AuthMfaChallengeUncheckedCreateWithoutAuthMfaConfigInput>
  }

  export type AuthMfaChallengeCreateManyAuthMfaConfigInputEnvelope = {
    data: Enumerable<AuthMfaChallengeCreateManyAuthMfaConfigInput>
    skipDuplicates?: boolean
  }

  export type AuthMfaChallengeAttemptCreateWithoutAuthMfaConfigInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    wasSuccessful?: boolean
    challenge: AuthMfaChallengeCreateNestedOneWithoutAuthMfaChallengeAttemptInput
  }

  export type AuthMfaChallengeAttemptUncheckedCreateWithoutAuthMfaConfigInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    wasSuccessful?: boolean
    authMfaChallengeId: string
  }

  export type AuthMfaChallengeAttemptCreateOrConnectWithoutAuthMfaConfigInput = {
    where: AuthMfaChallengeAttemptWhereUniqueInput
    create: XOR<AuthMfaChallengeAttemptCreateWithoutAuthMfaConfigInput, AuthMfaChallengeAttemptUncheckedCreateWithoutAuthMfaConfigInput>
  }

  export type AuthMfaChallengeAttemptCreateManyAuthMfaConfigInputEnvelope = {
    data: Enumerable<AuthMfaChallengeAttemptCreateManyAuthMfaConfigInput>
    skipDuplicates?: boolean
  }

  export type AuthMfaChallengeUpsertWithWhereUniqueWithoutAuthMfaConfigInput = {
    where: AuthMfaChallengeWhereUniqueInput
    update: XOR<AuthMfaChallengeUpdateWithoutAuthMfaConfigInput, AuthMfaChallengeUncheckedUpdateWithoutAuthMfaConfigInput>
    create: XOR<AuthMfaChallengeCreateWithoutAuthMfaConfigInput, AuthMfaChallengeUncheckedCreateWithoutAuthMfaConfigInput>
  }

  export type AuthMfaChallengeUpdateWithWhereUniqueWithoutAuthMfaConfigInput = {
    where: AuthMfaChallengeWhereUniqueInput
    data: XOR<AuthMfaChallengeUpdateWithoutAuthMfaConfigInput, AuthMfaChallengeUncheckedUpdateWithoutAuthMfaConfigInput>
  }

  export type AuthMfaChallengeUpdateManyWithWhereWithoutAuthMfaConfigInput = {
    where: AuthMfaChallengeScalarWhereInput
    data: XOR<AuthMfaChallengeUpdateManyMutationInput, AuthMfaChallengeUncheckedUpdateManyWithoutAuthMfaChallengeInput>
  }

  export type AuthMfaChallengeScalarWhereInput = {
    AND?: Enumerable<AuthMfaChallengeScalarWhereInput>
    OR?: Enumerable<AuthMfaChallengeScalarWhereInput>
    NOT?: Enumerable<AuthMfaChallengeScalarWhereInput>
    id?: StringFilter | string
    authId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    succeededAt?: DateTimeNullableFilter | Date | string | null
    rememberUntil?: DateTimeFilter | Date | string
    authDeviceId?: StringFilter | string
    reason?: StringNullableFilter | string | null
    authMfaConfigId?: StringNullableFilter | string | null
  }

  export type AuthMfaChallengeAttemptUpsertWithWhereUniqueWithoutAuthMfaConfigInput = {
    where: AuthMfaChallengeAttemptWhereUniqueInput
    update: XOR<AuthMfaChallengeAttemptUpdateWithoutAuthMfaConfigInput, AuthMfaChallengeAttemptUncheckedUpdateWithoutAuthMfaConfigInput>
    create: XOR<AuthMfaChallengeAttemptCreateWithoutAuthMfaConfigInput, AuthMfaChallengeAttemptUncheckedCreateWithoutAuthMfaConfigInput>
  }

  export type AuthMfaChallengeAttemptUpdateWithWhereUniqueWithoutAuthMfaConfigInput = {
    where: AuthMfaChallengeAttemptWhereUniqueInput
    data: XOR<AuthMfaChallengeAttemptUpdateWithoutAuthMfaConfigInput, AuthMfaChallengeAttemptUncheckedUpdateWithoutAuthMfaConfigInput>
  }

  export type AuthMfaChallengeAttemptUpdateManyWithWhereWithoutAuthMfaConfigInput = {
    where: AuthMfaChallengeAttemptScalarWhereInput
    data: XOR<AuthMfaChallengeAttemptUpdateManyMutationInput, AuthMfaChallengeAttemptUncheckedUpdateManyWithoutAuthMfaChallengeAttemptInput>
  }

  export type AuthMfaChallengeAttemptScalarWhereInput = {
    AND?: Enumerable<AuthMfaChallengeAttemptScalarWhereInput>
    OR?: Enumerable<AuthMfaChallengeAttemptScalarWhereInput>
    NOT?: Enumerable<AuthMfaChallengeAttemptScalarWhereInput>
    id?: StringFilter | string
    authId?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    wasSuccessful?: BoolFilter | boolean
    authMfaChallengeId?: StringFilter | string
    authMfaConfigId?: StringFilter | string
  }

  export type AuthMfaChallengeCreateWithoutAuthDeviceInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    succeededAt?: Date | string | null
    rememberUntil?: Date | string
    reason?: string | null
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptCreateNestedManyWithoutChallengeInput
    AuthMfaConfig?: AuthMfaConfigCreateNestedOneWithoutAuthMfaChallengeInput
  }

  export type AuthMfaChallengeUncheckedCreateWithoutAuthDeviceInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    succeededAt?: Date | string | null
    rememberUntil?: Date | string
    reason?: string | null
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptUncheckedCreateNestedManyWithoutChallengeInput
    authMfaConfigId?: string | null
  }

  export type AuthMfaChallengeCreateOrConnectWithoutAuthDeviceInput = {
    where: AuthMfaChallengeWhereUniqueInput
    create: XOR<AuthMfaChallengeCreateWithoutAuthDeviceInput, AuthMfaChallengeUncheckedCreateWithoutAuthDeviceInput>
  }

  export type AuthMfaChallengeCreateManyAuthDeviceInputEnvelope = {
    data: Enumerable<AuthMfaChallengeCreateManyAuthDeviceInput>
    skipDuplicates?: boolean
  }

  export type AuthMfaChallengeUpsertWithWhereUniqueWithoutAuthDeviceInput = {
    where: AuthMfaChallengeWhereUniqueInput
    update: XOR<AuthMfaChallengeUpdateWithoutAuthDeviceInput, AuthMfaChallengeUncheckedUpdateWithoutAuthDeviceInput>
    create: XOR<AuthMfaChallengeCreateWithoutAuthDeviceInput, AuthMfaChallengeUncheckedCreateWithoutAuthDeviceInput>
  }

  export type AuthMfaChallengeUpdateWithWhereUniqueWithoutAuthDeviceInput = {
    where: AuthMfaChallengeWhereUniqueInput
    data: XOR<AuthMfaChallengeUpdateWithoutAuthDeviceInput, AuthMfaChallengeUncheckedUpdateWithoutAuthDeviceInput>
  }

  export type AuthMfaChallengeUpdateManyWithWhereWithoutAuthDeviceInput = {
    where: AuthMfaChallengeScalarWhereInput
    data: XOR<AuthMfaChallengeUpdateManyMutationInput, AuthMfaChallengeUncheckedUpdateManyWithoutAuthMfaChallengeInput>
  }

  export type AuthDeviceCreateWithoutAuthMfaChallengeInput = {
    id?: string
    authId: string
    deviceId: string
    userAgent: string
  }

  export type AuthDeviceUncheckedCreateWithoutAuthMfaChallengeInput = {
    id?: string
    authId: string
    deviceId: string
    userAgent: string
  }

  export type AuthDeviceCreateOrConnectWithoutAuthMfaChallengeInput = {
    where: AuthDeviceWhereUniqueInput
    create: XOR<AuthDeviceCreateWithoutAuthMfaChallengeInput, AuthDeviceUncheckedCreateWithoutAuthMfaChallengeInput>
  }

  export type AuthMfaChallengeAttemptCreateWithoutChallengeInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    wasSuccessful?: boolean
    authMfaConfig: AuthMfaConfigCreateNestedOneWithoutAuthMfaChallengeAttemptInput
  }

  export type AuthMfaChallengeAttemptUncheckedCreateWithoutChallengeInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    wasSuccessful?: boolean
    authMfaConfigId: string
  }

  export type AuthMfaChallengeAttemptCreateOrConnectWithoutChallengeInput = {
    where: AuthMfaChallengeAttemptWhereUniqueInput
    create: XOR<AuthMfaChallengeAttemptCreateWithoutChallengeInput, AuthMfaChallengeAttemptUncheckedCreateWithoutChallengeInput>
  }

  export type AuthMfaChallengeAttemptCreateManyChallengeInputEnvelope = {
    data: Enumerable<AuthMfaChallengeAttemptCreateManyChallengeInput>
    skipDuplicates?: boolean
  }

  export type AuthMfaConfigCreateWithoutAuthMfaChallengeInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    confirmedAt?: Date | string | null
    deletedAt?: Date | string | null
    type: AuthMfaType
    configuration: JsonNullValueInput | InputJsonValue
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptCreateNestedManyWithoutAuthMfaConfigInput
  }

  export type AuthMfaConfigUncheckedCreateWithoutAuthMfaChallengeInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    confirmedAt?: Date | string | null
    deletedAt?: Date | string | null
    type: AuthMfaType
    configuration: JsonNullValueInput | InputJsonValue
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptUncheckedCreateNestedManyWithoutAuthMfaConfigInput
  }

  export type AuthMfaConfigCreateOrConnectWithoutAuthMfaChallengeInput = {
    where: AuthMfaConfigWhereUniqueInput
    create: XOR<AuthMfaConfigCreateWithoutAuthMfaChallengeInput, AuthMfaConfigUncheckedCreateWithoutAuthMfaChallengeInput>
  }

  export type AuthDeviceUpsertWithoutAuthMfaChallengeInput = {
    update: XOR<AuthDeviceUpdateWithoutAuthMfaChallengeInput, AuthDeviceUncheckedUpdateWithoutAuthMfaChallengeInput>
    create: XOR<AuthDeviceCreateWithoutAuthMfaChallengeInput, AuthDeviceUncheckedCreateWithoutAuthMfaChallengeInput>
  }

  export type AuthDeviceUpdateWithoutAuthMfaChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
  }

  export type AuthDeviceUncheckedUpdateWithoutAuthMfaChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
  }

  export type AuthMfaChallengeAttemptUpsertWithWhereUniqueWithoutChallengeInput = {
    where: AuthMfaChallengeAttemptWhereUniqueInput
    update: XOR<AuthMfaChallengeAttemptUpdateWithoutChallengeInput, AuthMfaChallengeAttemptUncheckedUpdateWithoutChallengeInput>
    create: XOR<AuthMfaChallengeAttemptCreateWithoutChallengeInput, AuthMfaChallengeAttemptUncheckedCreateWithoutChallengeInput>
  }

  export type AuthMfaChallengeAttemptUpdateWithWhereUniqueWithoutChallengeInput = {
    where: AuthMfaChallengeAttemptWhereUniqueInput
    data: XOR<AuthMfaChallengeAttemptUpdateWithoutChallengeInput, AuthMfaChallengeAttemptUncheckedUpdateWithoutChallengeInput>
  }

  export type AuthMfaChallengeAttemptUpdateManyWithWhereWithoutChallengeInput = {
    where: AuthMfaChallengeAttemptScalarWhereInput
    data: XOR<AuthMfaChallengeAttemptUpdateManyMutationInput, AuthMfaChallengeAttemptUncheckedUpdateManyWithoutAuthMfaChallengeAttemptInput>
  }

  export type AuthMfaConfigUpsertWithoutAuthMfaChallengeInput = {
    update: XOR<AuthMfaConfigUpdateWithoutAuthMfaChallengeInput, AuthMfaConfigUncheckedUpdateWithoutAuthMfaChallengeInput>
    create: XOR<AuthMfaConfigCreateWithoutAuthMfaChallengeInput, AuthMfaConfigUncheckedCreateWithoutAuthMfaChallengeInput>
  }

  export type AuthMfaConfigUpdateWithoutAuthMfaChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    type?: EnumAuthMfaTypeFieldUpdateOperationsInput | AuthMfaType
    configuration?: JsonNullValueInput | InputJsonValue
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptUpdateManyWithoutAuthMfaConfigNestedInput
  }

  export type AuthMfaConfigUncheckedUpdateWithoutAuthMfaChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    type?: EnumAuthMfaTypeFieldUpdateOperationsInput | AuthMfaType
    configuration?: JsonNullValueInput | InputJsonValue
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptUncheckedUpdateManyWithoutAuthMfaConfigNestedInput
  }

  export type AuthMfaChallengeCreateWithoutAuthMfaChallengeAttemptInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    succeededAt?: Date | string | null
    rememberUntil?: Date | string
    authDevice: AuthDeviceCreateNestedOneWithoutAuthMfaChallengeInput
    reason?: string | null
    AuthMfaConfig?: AuthMfaConfigCreateNestedOneWithoutAuthMfaChallengeInput
  }

  export type AuthMfaChallengeUncheckedCreateWithoutAuthMfaChallengeAttemptInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    succeededAt?: Date | string | null
    rememberUntil?: Date | string
    authDeviceId: string
    reason?: string | null
    authMfaConfigId?: string | null
  }

  export type AuthMfaChallengeCreateOrConnectWithoutAuthMfaChallengeAttemptInput = {
    where: AuthMfaChallengeWhereUniqueInput
    create: XOR<AuthMfaChallengeCreateWithoutAuthMfaChallengeAttemptInput, AuthMfaChallengeUncheckedCreateWithoutAuthMfaChallengeAttemptInput>
  }

  export type AuthMfaConfigCreateWithoutAuthMfaChallengeAttemptInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    confirmedAt?: Date | string | null
    deletedAt?: Date | string | null
    type: AuthMfaType
    configuration: JsonNullValueInput | InputJsonValue
    AuthMfaChallenge?: AuthMfaChallengeCreateNestedManyWithoutAuthMfaConfigInput
  }

  export type AuthMfaConfigUncheckedCreateWithoutAuthMfaChallengeAttemptInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    confirmedAt?: Date | string | null
    deletedAt?: Date | string | null
    type: AuthMfaType
    configuration: JsonNullValueInput | InputJsonValue
    AuthMfaChallenge?: AuthMfaChallengeUncheckedCreateNestedManyWithoutAuthMfaConfigInput
  }

  export type AuthMfaConfigCreateOrConnectWithoutAuthMfaChallengeAttemptInput = {
    where: AuthMfaConfigWhereUniqueInput
    create: XOR<AuthMfaConfigCreateWithoutAuthMfaChallengeAttemptInput, AuthMfaConfigUncheckedCreateWithoutAuthMfaChallengeAttemptInput>
  }

  export type AuthMfaChallengeUpsertWithoutAuthMfaChallengeAttemptInput = {
    update: XOR<AuthMfaChallengeUpdateWithoutAuthMfaChallengeAttemptInput, AuthMfaChallengeUncheckedUpdateWithoutAuthMfaChallengeAttemptInput>
    create: XOR<AuthMfaChallengeCreateWithoutAuthMfaChallengeAttemptInput, AuthMfaChallengeUncheckedCreateWithoutAuthMfaChallengeAttemptInput>
  }

  export type AuthMfaChallengeUpdateWithoutAuthMfaChallengeAttemptInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    succeededAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rememberUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    authDevice?: AuthDeviceUpdateOneRequiredWithoutAuthMfaChallengeNestedInput
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    AuthMfaConfig?: AuthMfaConfigUpdateOneWithoutAuthMfaChallengeNestedInput
  }

  export type AuthMfaChallengeUncheckedUpdateWithoutAuthMfaChallengeAttemptInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    succeededAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rememberUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    authDeviceId?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    authMfaConfigId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthMfaConfigUpsertWithoutAuthMfaChallengeAttemptInput = {
    update: XOR<AuthMfaConfigUpdateWithoutAuthMfaChallengeAttemptInput, AuthMfaConfigUncheckedUpdateWithoutAuthMfaChallengeAttemptInput>
    create: XOR<AuthMfaConfigCreateWithoutAuthMfaChallengeAttemptInput, AuthMfaConfigUncheckedCreateWithoutAuthMfaChallengeAttemptInput>
  }

  export type AuthMfaConfigUpdateWithoutAuthMfaChallengeAttemptInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    type?: EnumAuthMfaTypeFieldUpdateOperationsInput | AuthMfaType
    configuration?: JsonNullValueInput | InputJsonValue
    AuthMfaChallenge?: AuthMfaChallengeUpdateManyWithoutAuthMfaConfigNestedInput
  }

  export type AuthMfaConfigUncheckedUpdateWithoutAuthMfaChallengeAttemptInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    type?: EnumAuthMfaTypeFieldUpdateOperationsInput | AuthMfaType
    configuration?: JsonNullValueInput | InputJsonValue
    AuthMfaChallenge?: AuthMfaChallengeUncheckedUpdateManyWithoutAuthMfaConfigNestedInput
  }

  export type WorkerRoleCreateWithoutCompanyRoleInput = {
    id?: string
    isPrimary?: boolean
    payRate: Decimal | DecimalJsLike | number | string
    payType: WorkerRolePaytype
    userId: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type WorkerRoleUncheckedCreateWithoutCompanyRoleInput = {
    id?: string
    isPrimary?: boolean
    payRate: Decimal | DecimalJsLike | number | string
    payType: WorkerRolePaytype
    userId: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type WorkerRoleCreateOrConnectWithoutCompanyRoleInput = {
    where: WorkerRoleWhereUniqueInput
    create: XOR<WorkerRoleCreateWithoutCompanyRoleInput, WorkerRoleUncheckedCreateWithoutCompanyRoleInput>
  }

  export type WorkerRoleCreateManyCompanyRoleInputEnvelope = {
    data: Enumerable<WorkerRoleCreateManyCompanyRoleInput>
    skipDuplicates?: boolean
  }

  export type WorkerRoleUpsertWithWhereUniqueWithoutCompanyRoleInput = {
    where: WorkerRoleWhereUniqueInput
    update: XOR<WorkerRoleUpdateWithoutCompanyRoleInput, WorkerRoleUncheckedUpdateWithoutCompanyRoleInput>
    create: XOR<WorkerRoleCreateWithoutCompanyRoleInput, WorkerRoleUncheckedCreateWithoutCompanyRoleInput>
  }

  export type WorkerRoleUpdateWithWhereUniqueWithoutCompanyRoleInput = {
    where: WorkerRoleWhereUniqueInput
    data: XOR<WorkerRoleUpdateWithoutCompanyRoleInput, WorkerRoleUncheckedUpdateWithoutCompanyRoleInput>
  }

  export type WorkerRoleUpdateManyWithWhereWithoutCompanyRoleInput = {
    where: WorkerRoleScalarWhereInput
    data: XOR<WorkerRoleUpdateManyMutationInput, WorkerRoleUncheckedUpdateManyWithoutWorkerRolesInput>
  }

  export type WorkerRoleScalarWhereInput = {
    AND?: Enumerable<WorkerRoleScalarWhereInput>
    OR?: Enumerable<WorkerRoleScalarWhereInput>
    NOT?: Enumerable<WorkerRoleScalarWhereInput>
    id?: StringFilter | string
    isPrimary?: BoolFilter | boolean
    payRate?: DecimalFilter | Decimal | DecimalJsLike | number | string
    payType?: EnumWorkerRolePaytypeFilter | WorkerRolePaytype
    userId?: StringFilter | string
    deletedAt?: DateTimeNullableFilter | Date | string | null
    createdAt?: DateTimeFilter | Date | string
    companyRoleId?: StringFilter | string
  }

  export type CompanyRoleCreateWithoutWorkerRolesInput = {
    id?: string
    title: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    companyId: string
  }

  export type CompanyRoleUncheckedCreateWithoutWorkerRolesInput = {
    id?: string
    title: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
    companyId: string
  }

  export type CompanyRoleCreateOrConnectWithoutWorkerRolesInput = {
    where: CompanyRoleWhereUniqueInput
    create: XOR<CompanyRoleCreateWithoutWorkerRolesInput, CompanyRoleUncheckedCreateWithoutWorkerRolesInput>
  }

  export type CompanyRoleUpsertWithoutWorkerRolesInput = {
    update: XOR<CompanyRoleUpdateWithoutWorkerRolesInput, CompanyRoleUncheckedUpdateWithoutWorkerRolesInput>
    create: XOR<CompanyRoleCreateWithoutWorkerRolesInput, CompanyRoleUncheckedCreateWithoutWorkerRolesInput>
  }

  export type CompanyRoleUpdateWithoutWorkerRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyRoleUncheckedUpdateWithoutWorkerRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type CoreUserGroupMembershipCreateManyGroupInput = {
    id?: string
    userId: string
  }

  export type CoreUserGroupMembershipUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type CoreUserGroupMembershipUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type CoreUserGroupMembershipUncheckedUpdateManyWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AuthMfaChallengeCreateManyAuthMfaConfigInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    succeededAt?: Date | string | null
    rememberUntil?: Date | string
    authDeviceId: string
    reason?: string | null
  }

  export type AuthMfaChallengeAttemptCreateManyAuthMfaConfigInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    wasSuccessful?: boolean
    authMfaChallengeId: string
  }

  export type AuthMfaChallengeUpdateWithoutAuthMfaConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    succeededAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rememberUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    authDevice?: AuthDeviceUpdateOneRequiredWithoutAuthMfaChallengeNestedInput
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptUpdateManyWithoutChallengeNestedInput
  }

  export type AuthMfaChallengeUncheckedUpdateWithoutAuthMfaConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    succeededAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rememberUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    authDeviceId?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptUncheckedUpdateManyWithoutChallengeNestedInput
  }

  export type AuthMfaChallengeUncheckedUpdateManyWithoutAuthMfaChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    succeededAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rememberUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    authDeviceId?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthMfaChallengeAttemptUpdateWithoutAuthMfaConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wasSuccessful?: BoolFieldUpdateOperationsInput | boolean
    challenge?: AuthMfaChallengeUpdateOneRequiredWithoutAuthMfaChallengeAttemptNestedInput
  }

  export type AuthMfaChallengeAttemptUncheckedUpdateWithoutAuthMfaConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wasSuccessful?: BoolFieldUpdateOperationsInput | boolean
    authMfaChallengeId?: StringFieldUpdateOperationsInput | string
  }

  export type AuthMfaChallengeAttemptUncheckedUpdateManyWithoutAuthMfaChallengeAttemptInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wasSuccessful?: BoolFieldUpdateOperationsInput | boolean
    authMfaChallengeId?: StringFieldUpdateOperationsInput | string
  }

  export type AuthMfaChallengeCreateManyAuthDeviceInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    succeededAt?: Date | string | null
    rememberUntil?: Date | string
    reason?: string | null
    authMfaConfigId?: string | null
  }

  export type AuthMfaChallengeUpdateWithoutAuthDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    succeededAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rememberUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptUpdateManyWithoutChallengeNestedInput
    AuthMfaConfig?: AuthMfaConfigUpdateOneWithoutAuthMfaChallengeNestedInput
  }

  export type AuthMfaChallengeUncheckedUpdateWithoutAuthDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    succeededAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rememberUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    AuthMfaChallengeAttempt?: AuthMfaChallengeAttemptUncheckedUpdateManyWithoutChallengeNestedInput
    authMfaConfigId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthMfaChallengeAttemptCreateManyChallengeInput = {
    id?: string
    authId: string
    createdAt?: Date | string
    wasSuccessful?: boolean
    authMfaConfigId: string
  }

  export type AuthMfaChallengeAttemptUpdateWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wasSuccessful?: BoolFieldUpdateOperationsInput | boolean
    authMfaConfig?: AuthMfaConfigUpdateOneRequiredWithoutAuthMfaChallengeAttemptNestedInput
  }

  export type AuthMfaChallengeAttemptUncheckedUpdateWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    authId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wasSuccessful?: BoolFieldUpdateOperationsInput | boolean
    authMfaConfigId?: StringFieldUpdateOperationsInput | string
  }

  export type WorkerRoleCreateManyCompanyRoleInput = {
    id?: string
    isPrimary?: boolean
    payRate: Decimal | DecimalJsLike | number | string
    payType: WorkerRolePaytype
    userId: string
    deletedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type WorkerRoleUpdateWithoutCompanyRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    payRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payType?: EnumWorkerRolePaytypeFieldUpdateOperationsInput | WorkerRolePaytype
    userId?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkerRoleUncheckedUpdateWithoutCompanyRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    payRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payType?: EnumWorkerRolePaytypeFieldUpdateOperationsInput | WorkerRolePaytype
    userId?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkerRoleUncheckedUpdateManyWithoutWorkerRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    isPrimary?: BoolFieldUpdateOperationsInput | boolean
    payRate?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payType?: EnumWorkerRolePaytypeFieldUpdateOperationsInput | WorkerRolePaytype
    userId?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}