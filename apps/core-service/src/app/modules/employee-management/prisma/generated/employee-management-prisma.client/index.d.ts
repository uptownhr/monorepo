
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
 * Model CompanyPerson
 * 
 */
export type CompanyPerson = {
  id: string
  companyId: string
}

/**
 * Model EmployeeVoicesFeedback
 * 
 */
export type EmployeeVoicesFeedback = {
  id: number
  feedback: string
  anonymous: boolean
  createdAt: Date
  updatedAt: Date
  companyPersonId: string
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more CompanyPeople
 * const companyPeople = await prisma.companyPerson.findMany()
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
   * // Fetch zero or more CompanyPeople
   * const companyPeople = await prisma.companyPerson.findMany()
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
   * `prisma.companyPerson`: Exposes CRUD operations for the **CompanyPerson** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompanyPeople
    * const companyPeople = await prisma.companyPerson.findMany()
    * ```
    */
  get companyPerson(): Prisma.CompanyPersonDelegate<GlobalReject>;

  /**
   * `prisma.employeeVoicesFeedback`: Exposes CRUD operations for the **EmployeeVoicesFeedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmployeeVoicesFeedbacks
    * const employeeVoicesFeedbacks = await prisma.employeeVoicesFeedback.findMany()
    * ```
    */
  get employeeVoicesFeedback(): Prisma.EmployeeVoicesFeedbackDelegate<GlobalReject>;
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
    CompanyPerson: 'CompanyPerson',
    EmployeeVoicesFeedback: 'EmployeeVoicesFeedback'
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
   * Count Type CompanyPersonCountOutputType
   */


  export type CompanyPersonCountOutputType = {
    EmployeeVoicesFeedback: number
  }

  export type CompanyPersonCountOutputTypeSelect = {
    EmployeeVoicesFeedback?: boolean
  }

  export type CompanyPersonCountOutputTypeGetPayload<
    S extends boolean | null | undefined | CompanyPersonCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? CompanyPersonCountOutputType
    : S extends undefined
    ? never
    : S extends CompanyPersonCountOutputTypeArgs
    ?'include' extends U
    ? CompanyPersonCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof CompanyPersonCountOutputType ? CompanyPersonCountOutputType[P] : never
  } 
    : CompanyPersonCountOutputType
  : CompanyPersonCountOutputType




  // Custom InputTypes

  /**
   * CompanyPersonCountOutputType without action
   */
  export type CompanyPersonCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the CompanyPersonCountOutputType
     * 
    **/
    select?: CompanyPersonCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model CompanyPerson
   */


  export type AggregateCompanyPerson = {
    _count: CompanyPersonCountAggregateOutputType | null
    _min: CompanyPersonMinAggregateOutputType | null
    _max: CompanyPersonMaxAggregateOutputType | null
  }

  export type CompanyPersonMinAggregateOutputType = {
    id: string | null
    companyId: string | null
  }

  export type CompanyPersonMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
  }

  export type CompanyPersonCountAggregateOutputType = {
    id: number
    companyId: number
    _all: number
  }


  export type CompanyPersonMinAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type CompanyPersonMaxAggregateInputType = {
    id?: true
    companyId?: true
  }

  export type CompanyPersonCountAggregateInputType = {
    id?: true
    companyId?: true
    _all?: true
  }

  export type CompanyPersonAggregateArgs = {
    /**
     * Filter which CompanyPerson to aggregate.
     * 
    **/
    where?: CompanyPersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyPeople to fetch.
     * 
    **/
    orderBy?: Enumerable<CompanyPersonOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CompanyPersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyPeople from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyPeople.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompanyPeople
    **/
    _count?: true | CompanyPersonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyPersonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyPersonMaxAggregateInputType
  }

  export type GetCompanyPersonAggregateType<T extends CompanyPersonAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanyPerson]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanyPerson[P]>
      : GetScalarType<T[P], AggregateCompanyPerson[P]>
  }




  export type CompanyPersonGroupByArgs = {
    where?: CompanyPersonWhereInput
    orderBy?: Enumerable<CompanyPersonOrderByWithAggregationInput>
    by: Array<CompanyPersonScalarFieldEnum>
    having?: CompanyPersonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyPersonCountAggregateInputType | true
    _min?: CompanyPersonMinAggregateInputType
    _max?: CompanyPersonMaxAggregateInputType
  }


  export type CompanyPersonGroupByOutputType = {
    id: string
    companyId: string
    _count: CompanyPersonCountAggregateOutputType | null
    _min: CompanyPersonMinAggregateOutputType | null
    _max: CompanyPersonMaxAggregateOutputType | null
  }

  type GetCompanyPersonGroupByPayload<T extends CompanyPersonGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CompanyPersonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyPersonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyPersonGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyPersonGroupByOutputType[P]>
        }
      >
    >


  export type CompanyPersonSelect = {
    id?: boolean
    companyId?: boolean
    EmployeeVoicesFeedback?: boolean | EmployeeVoicesFeedbackFindManyArgs
    _count?: boolean | CompanyPersonCountOutputTypeArgs
  }

  export type CompanyPersonInclude = {
    EmployeeVoicesFeedback?: boolean | EmployeeVoicesFeedbackFindManyArgs
    _count?: boolean | CompanyPersonCountOutputTypeArgs
  }

  export type CompanyPersonGetPayload<
    S extends boolean | null | undefined | CompanyPersonArgs,
    U = keyof S
      > = S extends true
        ? CompanyPerson
    : S extends undefined
    ? never
    : S extends CompanyPersonArgs | CompanyPersonFindManyArgs
    ?'include' extends U
    ? CompanyPerson  & {
    [P in TrueKeys<S['include']>]:
        P extends 'EmployeeVoicesFeedback' ? Array < EmployeeVoicesFeedbackGetPayload<S['include'][P]>>  :
        P extends '_count' ? CompanyPersonCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'EmployeeVoicesFeedback' ? Array < EmployeeVoicesFeedbackGetPayload<S['select'][P]>>  :
        P extends '_count' ? CompanyPersonCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof CompanyPerson ? CompanyPerson[P] : never
  } 
    : CompanyPerson
  : CompanyPerson


  type CompanyPersonCountArgs = Merge<
    Omit<CompanyPersonFindManyArgs, 'select' | 'include'> & {
      select?: CompanyPersonCountAggregateInputType | true
    }
  >

  export interface CompanyPersonDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one CompanyPerson that matches the filter.
     * @param {CompanyPersonFindUniqueArgs} args - Arguments to find a CompanyPerson
     * @example
     * // Get one CompanyPerson
     * const companyPerson = await prisma.companyPerson.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CompanyPersonFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CompanyPersonFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'CompanyPerson'> extends True ? CheckSelect<T, Prisma__CompanyPersonClient<CompanyPerson>, Prisma__CompanyPersonClient<CompanyPersonGetPayload<T>>> : CheckSelect<T, Prisma__CompanyPersonClient<CompanyPerson | null >, Prisma__CompanyPersonClient<CompanyPersonGetPayload<T> | null >>

    /**
     * Find the first CompanyPerson that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyPersonFindFirstArgs} args - Arguments to find a CompanyPerson
     * @example
     * // Get one CompanyPerson
     * const companyPerson = await prisma.companyPerson.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CompanyPersonFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CompanyPersonFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'CompanyPerson'> extends True ? CheckSelect<T, Prisma__CompanyPersonClient<CompanyPerson>, Prisma__CompanyPersonClient<CompanyPersonGetPayload<T>>> : CheckSelect<T, Prisma__CompanyPersonClient<CompanyPerson | null >, Prisma__CompanyPersonClient<CompanyPersonGetPayload<T> | null >>

    /**
     * Find zero or more CompanyPeople that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyPersonFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompanyPeople
     * const companyPeople = await prisma.companyPerson.findMany()
     * 
     * // Get first 10 CompanyPeople
     * const companyPeople = await prisma.companyPerson.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyPersonWithIdOnly = await prisma.companyPerson.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CompanyPersonFindManyArgs>(
      args?: SelectSubset<T, CompanyPersonFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<CompanyPerson>>, PrismaPromise<Array<CompanyPersonGetPayload<T>>>>

    /**
     * Create a CompanyPerson.
     * @param {CompanyPersonCreateArgs} args - Arguments to create a CompanyPerson.
     * @example
     * // Create one CompanyPerson
     * const CompanyPerson = await prisma.companyPerson.create({
     *   data: {
     *     // ... data to create a CompanyPerson
     *   }
     * })
     * 
    **/
    create<T extends CompanyPersonCreateArgs>(
      args: SelectSubset<T, CompanyPersonCreateArgs>
    ): CheckSelect<T, Prisma__CompanyPersonClient<CompanyPerson>, Prisma__CompanyPersonClient<CompanyPersonGetPayload<T>>>

    /**
     * Create many CompanyPeople.
     *     @param {CompanyPersonCreateManyArgs} args - Arguments to create many CompanyPeople.
     *     @example
     *     // Create many CompanyPeople
     *     const companyPerson = await prisma.companyPerson.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CompanyPersonCreateManyArgs>(
      args?: SelectSubset<T, CompanyPersonCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a CompanyPerson.
     * @param {CompanyPersonDeleteArgs} args - Arguments to delete one CompanyPerson.
     * @example
     * // Delete one CompanyPerson
     * const CompanyPerson = await prisma.companyPerson.delete({
     *   where: {
     *     // ... filter to delete one CompanyPerson
     *   }
     * })
     * 
    **/
    delete<T extends CompanyPersonDeleteArgs>(
      args: SelectSubset<T, CompanyPersonDeleteArgs>
    ): CheckSelect<T, Prisma__CompanyPersonClient<CompanyPerson>, Prisma__CompanyPersonClient<CompanyPersonGetPayload<T>>>

    /**
     * Update one CompanyPerson.
     * @param {CompanyPersonUpdateArgs} args - Arguments to update one CompanyPerson.
     * @example
     * // Update one CompanyPerson
     * const companyPerson = await prisma.companyPerson.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CompanyPersonUpdateArgs>(
      args: SelectSubset<T, CompanyPersonUpdateArgs>
    ): CheckSelect<T, Prisma__CompanyPersonClient<CompanyPerson>, Prisma__CompanyPersonClient<CompanyPersonGetPayload<T>>>

    /**
     * Delete zero or more CompanyPeople.
     * @param {CompanyPersonDeleteManyArgs} args - Arguments to filter CompanyPeople to delete.
     * @example
     * // Delete a few CompanyPeople
     * const { count } = await prisma.companyPerson.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CompanyPersonDeleteManyArgs>(
      args?: SelectSubset<T, CompanyPersonDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyPeople.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyPersonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompanyPeople
     * const companyPerson = await prisma.companyPerson.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CompanyPersonUpdateManyArgs>(
      args: SelectSubset<T, CompanyPersonUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one CompanyPerson.
     * @param {CompanyPersonUpsertArgs} args - Arguments to update or create a CompanyPerson.
     * @example
     * // Update or create a CompanyPerson
     * const companyPerson = await prisma.companyPerson.upsert({
     *   create: {
     *     // ... data to create a CompanyPerson
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompanyPerson we want to update
     *   }
     * })
    **/
    upsert<T extends CompanyPersonUpsertArgs>(
      args: SelectSubset<T, CompanyPersonUpsertArgs>
    ): CheckSelect<T, Prisma__CompanyPersonClient<CompanyPerson>, Prisma__CompanyPersonClient<CompanyPersonGetPayload<T>>>

    /**
     * Find one CompanyPerson that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {CompanyPersonFindUniqueOrThrowArgs} args - Arguments to find a CompanyPerson
     * @example
     * // Get one CompanyPerson
     * const companyPerson = await prisma.companyPerson.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CompanyPersonFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CompanyPersonFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__CompanyPersonClient<CompanyPerson>, Prisma__CompanyPersonClient<CompanyPersonGetPayload<T>>>

    /**
     * Find the first CompanyPerson that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyPersonFindFirstOrThrowArgs} args - Arguments to find a CompanyPerson
     * @example
     * // Get one CompanyPerson
     * const companyPerson = await prisma.companyPerson.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CompanyPersonFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CompanyPersonFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__CompanyPersonClient<CompanyPerson>, Prisma__CompanyPersonClient<CompanyPersonGetPayload<T>>>

    /**
     * Count the number of CompanyPeople.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyPersonCountArgs} args - Arguments to filter CompanyPeople to count.
     * @example
     * // Count the number of CompanyPeople
     * const count = await prisma.companyPerson.count({
     *   where: {
     *     // ... the filter for the CompanyPeople we want to count
     *   }
     * })
    **/
    count<T extends CompanyPersonCountArgs>(
      args?: Subset<T, CompanyPersonCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyPersonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompanyPerson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyPersonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CompanyPersonAggregateArgs>(args: Subset<T, CompanyPersonAggregateArgs>): PrismaPromise<GetCompanyPersonAggregateType<T>>

    /**
     * Group by CompanyPerson.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyPersonGroupByArgs} args - Group by arguments.
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
      T extends CompanyPersonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyPersonGroupByArgs['orderBy'] }
        : { orderBy?: CompanyPersonGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CompanyPersonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyPersonGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompanyPerson.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CompanyPersonClient<T> implements PrismaPromise<T> {
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

    EmployeeVoicesFeedback<T extends EmployeeVoicesFeedbackFindManyArgs = {}>(args?: Subset<T, EmployeeVoicesFeedbackFindManyArgs>): CheckSelect<T, PrismaPromise<Array<EmployeeVoicesFeedback>>, PrismaPromise<Array<EmployeeVoicesFeedbackGetPayload<T>>>>;

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
   * CompanyPerson base type for findUnique actions
   */
  export type CompanyPersonFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the CompanyPerson
     * 
    **/
    select?: CompanyPersonSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompanyPersonInclude | null
    /**
     * Filter, which CompanyPerson to fetch.
     * 
    **/
    where: CompanyPersonWhereUniqueInput
  }

  /**
   * CompanyPerson: findUnique
   */
  export interface CompanyPersonFindUniqueArgs extends CompanyPersonFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CompanyPerson base type for findFirst actions
   */
  export type CompanyPersonFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the CompanyPerson
     * 
    **/
    select?: CompanyPersonSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompanyPersonInclude | null
    /**
     * Filter, which CompanyPerson to fetch.
     * 
    **/
    where?: CompanyPersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyPeople to fetch.
     * 
    **/
    orderBy?: Enumerable<CompanyPersonOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyPeople.
     * 
    **/
    cursor?: CompanyPersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyPeople from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyPeople.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyPeople.
     * 
    **/
    distinct?: Enumerable<CompanyPersonScalarFieldEnum>
  }

  /**
   * CompanyPerson: findFirst
   */
  export interface CompanyPersonFindFirstArgs extends CompanyPersonFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * CompanyPerson findMany
   */
  export type CompanyPersonFindManyArgs = {
    /**
     * Select specific fields to fetch from the CompanyPerson
     * 
    **/
    select?: CompanyPersonSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompanyPersonInclude | null
    /**
     * Filter, which CompanyPeople to fetch.
     * 
    **/
    where?: CompanyPersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyPeople to fetch.
     * 
    **/
    orderBy?: Enumerable<CompanyPersonOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompanyPeople.
     * 
    **/
    cursor?: CompanyPersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyPeople from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyPeople.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CompanyPersonScalarFieldEnum>
  }


  /**
   * CompanyPerson create
   */
  export type CompanyPersonCreateArgs = {
    /**
     * Select specific fields to fetch from the CompanyPerson
     * 
    **/
    select?: CompanyPersonSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompanyPersonInclude | null
    /**
     * The data needed to create a CompanyPerson.
     * 
    **/
    data: XOR<CompanyPersonCreateInput, CompanyPersonUncheckedCreateInput>
  }


  /**
   * CompanyPerson createMany
   */
  export type CompanyPersonCreateManyArgs = {
    /**
     * The data used to create many CompanyPeople.
     * 
    **/
    data: Enumerable<CompanyPersonCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * CompanyPerson update
   */
  export type CompanyPersonUpdateArgs = {
    /**
     * Select specific fields to fetch from the CompanyPerson
     * 
    **/
    select?: CompanyPersonSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompanyPersonInclude | null
    /**
     * The data needed to update a CompanyPerson.
     * 
    **/
    data: XOR<CompanyPersonUpdateInput, CompanyPersonUncheckedUpdateInput>
    /**
     * Choose, which CompanyPerson to update.
     * 
    **/
    where: CompanyPersonWhereUniqueInput
  }


  /**
   * CompanyPerson updateMany
   */
  export type CompanyPersonUpdateManyArgs = {
    /**
     * The data used to update CompanyPeople.
     * 
    **/
    data: XOR<CompanyPersonUpdateManyMutationInput, CompanyPersonUncheckedUpdateManyInput>
    /**
     * Filter which CompanyPeople to update
     * 
    **/
    where?: CompanyPersonWhereInput
  }


  /**
   * CompanyPerson upsert
   */
  export type CompanyPersonUpsertArgs = {
    /**
     * Select specific fields to fetch from the CompanyPerson
     * 
    **/
    select?: CompanyPersonSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompanyPersonInclude | null
    /**
     * The filter to search for the CompanyPerson to update in case it exists.
     * 
    **/
    where: CompanyPersonWhereUniqueInput
    /**
     * In case the CompanyPerson found by the `where` argument doesn't exist, create a new CompanyPerson with this data.
     * 
    **/
    create: XOR<CompanyPersonCreateInput, CompanyPersonUncheckedCreateInput>
    /**
     * In case the CompanyPerson was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CompanyPersonUpdateInput, CompanyPersonUncheckedUpdateInput>
  }


  /**
   * CompanyPerson delete
   */
  export type CompanyPersonDeleteArgs = {
    /**
     * Select specific fields to fetch from the CompanyPerson
     * 
    **/
    select?: CompanyPersonSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompanyPersonInclude | null
    /**
     * Filter which CompanyPerson to delete.
     * 
    **/
    where: CompanyPersonWhereUniqueInput
  }


  /**
   * CompanyPerson deleteMany
   */
  export type CompanyPersonDeleteManyArgs = {
    /**
     * Filter which CompanyPeople to delete
     * 
    **/
    where?: CompanyPersonWhereInput
  }


  /**
   * CompanyPerson: findUniqueOrThrow
   */
  export type CompanyPersonFindUniqueOrThrowArgs = CompanyPersonFindUniqueArgsBase
      

  /**
   * CompanyPerson: findFirstOrThrow
   */
  export type CompanyPersonFindFirstOrThrowArgs = CompanyPersonFindFirstArgsBase
      

  /**
   * CompanyPerson without action
   */
  export type CompanyPersonArgs = {
    /**
     * Select specific fields to fetch from the CompanyPerson
     * 
    **/
    select?: CompanyPersonSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CompanyPersonInclude | null
  }



  /**
   * Model EmployeeVoicesFeedback
   */


  export type AggregateEmployeeVoicesFeedback = {
    _count: EmployeeVoicesFeedbackCountAggregateOutputType | null
    _avg: EmployeeVoicesFeedbackAvgAggregateOutputType | null
    _sum: EmployeeVoicesFeedbackSumAggregateOutputType | null
    _min: EmployeeVoicesFeedbackMinAggregateOutputType | null
    _max: EmployeeVoicesFeedbackMaxAggregateOutputType | null
  }

  export type EmployeeVoicesFeedbackAvgAggregateOutputType = {
    id: number | null
  }

  export type EmployeeVoicesFeedbackSumAggregateOutputType = {
    id: number | null
  }

  export type EmployeeVoicesFeedbackMinAggregateOutputType = {
    id: number | null
    feedback: string | null
    anonymous: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    companyPersonId: string | null
  }

  export type EmployeeVoicesFeedbackMaxAggregateOutputType = {
    id: number | null
    feedback: string | null
    anonymous: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    companyPersonId: string | null
  }

  export type EmployeeVoicesFeedbackCountAggregateOutputType = {
    id: number
    feedback: number
    anonymous: number
    createdAt: number
    updatedAt: number
    companyPersonId: number
    _all: number
  }


  export type EmployeeVoicesFeedbackAvgAggregateInputType = {
    id?: true
  }

  export type EmployeeVoicesFeedbackSumAggregateInputType = {
    id?: true
  }

  export type EmployeeVoicesFeedbackMinAggregateInputType = {
    id?: true
    feedback?: true
    anonymous?: true
    createdAt?: true
    updatedAt?: true
    companyPersonId?: true
  }

  export type EmployeeVoicesFeedbackMaxAggregateInputType = {
    id?: true
    feedback?: true
    anonymous?: true
    createdAt?: true
    updatedAt?: true
    companyPersonId?: true
  }

  export type EmployeeVoicesFeedbackCountAggregateInputType = {
    id?: true
    feedback?: true
    anonymous?: true
    createdAt?: true
    updatedAt?: true
    companyPersonId?: true
    _all?: true
  }

  export type EmployeeVoicesFeedbackAggregateArgs = {
    /**
     * Filter which EmployeeVoicesFeedback to aggregate.
     * 
    **/
    where?: EmployeeVoicesFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeVoicesFeedbacks to fetch.
     * 
    **/
    orderBy?: Enumerable<EmployeeVoicesFeedbackOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: EmployeeVoicesFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeVoicesFeedbacks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeVoicesFeedbacks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmployeeVoicesFeedbacks
    **/
    _count?: true | EmployeeVoicesFeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmployeeVoicesFeedbackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmployeeVoicesFeedbackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeVoicesFeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeVoicesFeedbackMaxAggregateInputType
  }

  export type GetEmployeeVoicesFeedbackAggregateType<T extends EmployeeVoicesFeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployeeVoicesFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployeeVoicesFeedback[P]>
      : GetScalarType<T[P], AggregateEmployeeVoicesFeedback[P]>
  }




  export type EmployeeVoicesFeedbackGroupByArgs = {
    where?: EmployeeVoicesFeedbackWhereInput
    orderBy?: Enumerable<EmployeeVoicesFeedbackOrderByWithAggregationInput>
    by: Array<EmployeeVoicesFeedbackScalarFieldEnum>
    having?: EmployeeVoicesFeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeVoicesFeedbackCountAggregateInputType | true
    _avg?: EmployeeVoicesFeedbackAvgAggregateInputType
    _sum?: EmployeeVoicesFeedbackSumAggregateInputType
    _min?: EmployeeVoicesFeedbackMinAggregateInputType
    _max?: EmployeeVoicesFeedbackMaxAggregateInputType
  }


  export type EmployeeVoicesFeedbackGroupByOutputType = {
    id: number
    feedback: string
    anonymous: boolean
    createdAt: Date
    updatedAt: Date
    companyPersonId: string
    _count: EmployeeVoicesFeedbackCountAggregateOutputType | null
    _avg: EmployeeVoicesFeedbackAvgAggregateOutputType | null
    _sum: EmployeeVoicesFeedbackSumAggregateOutputType | null
    _min: EmployeeVoicesFeedbackMinAggregateOutputType | null
    _max: EmployeeVoicesFeedbackMaxAggregateOutputType | null
  }

  type GetEmployeeVoicesFeedbackGroupByPayload<T extends EmployeeVoicesFeedbackGroupByArgs> = PrismaPromise<
    Array<
      PickArray<EmployeeVoicesFeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeVoicesFeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeVoicesFeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeVoicesFeedbackGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeVoicesFeedbackSelect = {
    id?: boolean
    feedback?: boolean
    anonymous?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    companyPersonId?: boolean
    companyPerson?: boolean | CompanyPersonArgs
  }

  export type EmployeeVoicesFeedbackInclude = {
    companyPerson?: boolean | CompanyPersonArgs
  }

  export type EmployeeVoicesFeedbackGetPayload<
    S extends boolean | null | undefined | EmployeeVoicesFeedbackArgs,
    U = keyof S
      > = S extends true
        ? EmployeeVoicesFeedback
    : S extends undefined
    ? never
    : S extends EmployeeVoicesFeedbackArgs | EmployeeVoicesFeedbackFindManyArgs
    ?'include' extends U
    ? EmployeeVoicesFeedback  & {
    [P in TrueKeys<S['include']>]:
        P extends 'companyPerson' ? CompanyPersonGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'companyPerson' ? CompanyPersonGetPayload<S['select'][P]> :  P extends keyof EmployeeVoicesFeedback ? EmployeeVoicesFeedback[P] : never
  } 
    : EmployeeVoicesFeedback
  : EmployeeVoicesFeedback


  type EmployeeVoicesFeedbackCountArgs = Merge<
    Omit<EmployeeVoicesFeedbackFindManyArgs, 'select' | 'include'> & {
      select?: EmployeeVoicesFeedbackCountAggregateInputType | true
    }
  >

  export interface EmployeeVoicesFeedbackDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one EmployeeVoicesFeedback that matches the filter.
     * @param {EmployeeVoicesFeedbackFindUniqueArgs} args - Arguments to find a EmployeeVoicesFeedback
     * @example
     * // Get one EmployeeVoicesFeedback
     * const employeeVoicesFeedback = await prisma.employeeVoicesFeedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EmployeeVoicesFeedbackFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, EmployeeVoicesFeedbackFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'EmployeeVoicesFeedback'> extends True ? CheckSelect<T, Prisma__EmployeeVoicesFeedbackClient<EmployeeVoicesFeedback>, Prisma__EmployeeVoicesFeedbackClient<EmployeeVoicesFeedbackGetPayload<T>>> : CheckSelect<T, Prisma__EmployeeVoicesFeedbackClient<EmployeeVoicesFeedback | null >, Prisma__EmployeeVoicesFeedbackClient<EmployeeVoicesFeedbackGetPayload<T> | null >>

    /**
     * Find the first EmployeeVoicesFeedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeVoicesFeedbackFindFirstArgs} args - Arguments to find a EmployeeVoicesFeedback
     * @example
     * // Get one EmployeeVoicesFeedback
     * const employeeVoicesFeedback = await prisma.employeeVoicesFeedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EmployeeVoicesFeedbackFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, EmployeeVoicesFeedbackFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'EmployeeVoicesFeedback'> extends True ? CheckSelect<T, Prisma__EmployeeVoicesFeedbackClient<EmployeeVoicesFeedback>, Prisma__EmployeeVoicesFeedbackClient<EmployeeVoicesFeedbackGetPayload<T>>> : CheckSelect<T, Prisma__EmployeeVoicesFeedbackClient<EmployeeVoicesFeedback | null >, Prisma__EmployeeVoicesFeedbackClient<EmployeeVoicesFeedbackGetPayload<T> | null >>

    /**
     * Find zero or more EmployeeVoicesFeedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeVoicesFeedbackFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmployeeVoicesFeedbacks
     * const employeeVoicesFeedbacks = await prisma.employeeVoicesFeedback.findMany()
     * 
     * // Get first 10 EmployeeVoicesFeedbacks
     * const employeeVoicesFeedbacks = await prisma.employeeVoicesFeedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeVoicesFeedbackWithIdOnly = await prisma.employeeVoicesFeedback.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends EmployeeVoicesFeedbackFindManyArgs>(
      args?: SelectSubset<T, EmployeeVoicesFeedbackFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<EmployeeVoicesFeedback>>, PrismaPromise<Array<EmployeeVoicesFeedbackGetPayload<T>>>>

    /**
     * Create a EmployeeVoicesFeedback.
     * @param {EmployeeVoicesFeedbackCreateArgs} args - Arguments to create a EmployeeVoicesFeedback.
     * @example
     * // Create one EmployeeVoicesFeedback
     * const EmployeeVoicesFeedback = await prisma.employeeVoicesFeedback.create({
     *   data: {
     *     // ... data to create a EmployeeVoicesFeedback
     *   }
     * })
     * 
    **/
    create<T extends EmployeeVoicesFeedbackCreateArgs>(
      args: SelectSubset<T, EmployeeVoicesFeedbackCreateArgs>
    ): CheckSelect<T, Prisma__EmployeeVoicesFeedbackClient<EmployeeVoicesFeedback>, Prisma__EmployeeVoicesFeedbackClient<EmployeeVoicesFeedbackGetPayload<T>>>

    /**
     * Create many EmployeeVoicesFeedbacks.
     *     @param {EmployeeVoicesFeedbackCreateManyArgs} args - Arguments to create many EmployeeVoicesFeedbacks.
     *     @example
     *     // Create many EmployeeVoicesFeedbacks
     *     const employeeVoicesFeedback = await prisma.employeeVoicesFeedback.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EmployeeVoicesFeedbackCreateManyArgs>(
      args?: SelectSubset<T, EmployeeVoicesFeedbackCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a EmployeeVoicesFeedback.
     * @param {EmployeeVoicesFeedbackDeleteArgs} args - Arguments to delete one EmployeeVoicesFeedback.
     * @example
     * // Delete one EmployeeVoicesFeedback
     * const EmployeeVoicesFeedback = await prisma.employeeVoicesFeedback.delete({
     *   where: {
     *     // ... filter to delete one EmployeeVoicesFeedback
     *   }
     * })
     * 
    **/
    delete<T extends EmployeeVoicesFeedbackDeleteArgs>(
      args: SelectSubset<T, EmployeeVoicesFeedbackDeleteArgs>
    ): CheckSelect<T, Prisma__EmployeeVoicesFeedbackClient<EmployeeVoicesFeedback>, Prisma__EmployeeVoicesFeedbackClient<EmployeeVoicesFeedbackGetPayload<T>>>

    /**
     * Update one EmployeeVoicesFeedback.
     * @param {EmployeeVoicesFeedbackUpdateArgs} args - Arguments to update one EmployeeVoicesFeedback.
     * @example
     * // Update one EmployeeVoicesFeedback
     * const employeeVoicesFeedback = await prisma.employeeVoicesFeedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EmployeeVoicesFeedbackUpdateArgs>(
      args: SelectSubset<T, EmployeeVoicesFeedbackUpdateArgs>
    ): CheckSelect<T, Prisma__EmployeeVoicesFeedbackClient<EmployeeVoicesFeedback>, Prisma__EmployeeVoicesFeedbackClient<EmployeeVoicesFeedbackGetPayload<T>>>

    /**
     * Delete zero or more EmployeeVoicesFeedbacks.
     * @param {EmployeeVoicesFeedbackDeleteManyArgs} args - Arguments to filter EmployeeVoicesFeedbacks to delete.
     * @example
     * // Delete a few EmployeeVoicesFeedbacks
     * const { count } = await prisma.employeeVoicesFeedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EmployeeVoicesFeedbackDeleteManyArgs>(
      args?: SelectSubset<T, EmployeeVoicesFeedbackDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployeeVoicesFeedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeVoicesFeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmployeeVoicesFeedbacks
     * const employeeVoicesFeedback = await prisma.employeeVoicesFeedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EmployeeVoicesFeedbackUpdateManyArgs>(
      args: SelectSubset<T, EmployeeVoicesFeedbackUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one EmployeeVoicesFeedback.
     * @param {EmployeeVoicesFeedbackUpsertArgs} args - Arguments to update or create a EmployeeVoicesFeedback.
     * @example
     * // Update or create a EmployeeVoicesFeedback
     * const employeeVoicesFeedback = await prisma.employeeVoicesFeedback.upsert({
     *   create: {
     *     // ... data to create a EmployeeVoicesFeedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmployeeVoicesFeedback we want to update
     *   }
     * })
    **/
    upsert<T extends EmployeeVoicesFeedbackUpsertArgs>(
      args: SelectSubset<T, EmployeeVoicesFeedbackUpsertArgs>
    ): CheckSelect<T, Prisma__EmployeeVoicesFeedbackClient<EmployeeVoicesFeedback>, Prisma__EmployeeVoicesFeedbackClient<EmployeeVoicesFeedbackGetPayload<T>>>

    /**
     * Find one EmployeeVoicesFeedback that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {EmployeeVoicesFeedbackFindUniqueOrThrowArgs} args - Arguments to find a EmployeeVoicesFeedback
     * @example
     * // Get one EmployeeVoicesFeedback
     * const employeeVoicesFeedback = await prisma.employeeVoicesFeedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends EmployeeVoicesFeedbackFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, EmployeeVoicesFeedbackFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__EmployeeVoicesFeedbackClient<EmployeeVoicesFeedback>, Prisma__EmployeeVoicesFeedbackClient<EmployeeVoicesFeedbackGetPayload<T>>>

    /**
     * Find the first EmployeeVoicesFeedback that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeVoicesFeedbackFindFirstOrThrowArgs} args - Arguments to find a EmployeeVoicesFeedback
     * @example
     * // Get one EmployeeVoicesFeedback
     * const employeeVoicesFeedback = await prisma.employeeVoicesFeedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends EmployeeVoicesFeedbackFindFirstOrThrowArgs>(
      args?: SelectSubset<T, EmployeeVoicesFeedbackFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__EmployeeVoicesFeedbackClient<EmployeeVoicesFeedback>, Prisma__EmployeeVoicesFeedbackClient<EmployeeVoicesFeedbackGetPayload<T>>>

    /**
     * Count the number of EmployeeVoicesFeedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeVoicesFeedbackCountArgs} args - Arguments to filter EmployeeVoicesFeedbacks to count.
     * @example
     * // Count the number of EmployeeVoicesFeedbacks
     * const count = await prisma.employeeVoicesFeedback.count({
     *   where: {
     *     // ... the filter for the EmployeeVoicesFeedbacks we want to count
     *   }
     * })
    **/
    count<T extends EmployeeVoicesFeedbackCountArgs>(
      args?: Subset<T, EmployeeVoicesFeedbackCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeVoicesFeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmployeeVoicesFeedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeVoicesFeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmployeeVoicesFeedbackAggregateArgs>(args: Subset<T, EmployeeVoicesFeedbackAggregateArgs>): PrismaPromise<GetEmployeeVoicesFeedbackAggregateType<T>>

    /**
     * Group by EmployeeVoicesFeedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeVoicesFeedbackGroupByArgs} args - Group by arguments.
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
      T extends EmployeeVoicesFeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeVoicesFeedbackGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeVoicesFeedbackGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmployeeVoicesFeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeVoicesFeedbackGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmployeeVoicesFeedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EmployeeVoicesFeedbackClient<T> implements PrismaPromise<T> {
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

    companyPerson<T extends CompanyPersonArgs = {}>(args?: Subset<T, CompanyPersonArgs>): CheckSelect<T, Prisma__CompanyPersonClient<CompanyPerson | null >, Prisma__CompanyPersonClient<CompanyPersonGetPayload<T> | null >>;

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
   * EmployeeVoicesFeedback base type for findUnique actions
   */
  export type EmployeeVoicesFeedbackFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the EmployeeVoicesFeedback
     * 
    **/
    select?: EmployeeVoicesFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmployeeVoicesFeedbackInclude | null
    /**
     * Filter, which EmployeeVoicesFeedback to fetch.
     * 
    **/
    where: EmployeeVoicesFeedbackWhereUniqueInput
  }

  /**
   * EmployeeVoicesFeedback: findUnique
   */
  export interface EmployeeVoicesFeedbackFindUniqueArgs extends EmployeeVoicesFeedbackFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * EmployeeVoicesFeedback base type for findFirst actions
   */
  export type EmployeeVoicesFeedbackFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the EmployeeVoicesFeedback
     * 
    **/
    select?: EmployeeVoicesFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmployeeVoicesFeedbackInclude | null
    /**
     * Filter, which EmployeeVoicesFeedback to fetch.
     * 
    **/
    where?: EmployeeVoicesFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeVoicesFeedbacks to fetch.
     * 
    **/
    orderBy?: Enumerable<EmployeeVoicesFeedbackOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployeeVoicesFeedbacks.
     * 
    **/
    cursor?: EmployeeVoicesFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeVoicesFeedbacks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeVoicesFeedbacks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployeeVoicesFeedbacks.
     * 
    **/
    distinct?: Enumerable<EmployeeVoicesFeedbackScalarFieldEnum>
  }

  /**
   * EmployeeVoicesFeedback: findFirst
   */
  export interface EmployeeVoicesFeedbackFindFirstArgs extends EmployeeVoicesFeedbackFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * EmployeeVoicesFeedback findMany
   */
  export type EmployeeVoicesFeedbackFindManyArgs = {
    /**
     * Select specific fields to fetch from the EmployeeVoicesFeedback
     * 
    **/
    select?: EmployeeVoicesFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmployeeVoicesFeedbackInclude | null
    /**
     * Filter, which EmployeeVoicesFeedbacks to fetch.
     * 
    **/
    where?: EmployeeVoicesFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployeeVoicesFeedbacks to fetch.
     * 
    **/
    orderBy?: Enumerable<EmployeeVoicesFeedbackOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmployeeVoicesFeedbacks.
     * 
    **/
    cursor?: EmployeeVoicesFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployeeVoicesFeedbacks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployeeVoicesFeedbacks.
     * 
    **/
    skip?: number
    distinct?: Enumerable<EmployeeVoicesFeedbackScalarFieldEnum>
  }


  /**
   * EmployeeVoicesFeedback create
   */
  export type EmployeeVoicesFeedbackCreateArgs = {
    /**
     * Select specific fields to fetch from the EmployeeVoicesFeedback
     * 
    **/
    select?: EmployeeVoicesFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmployeeVoicesFeedbackInclude | null
    /**
     * The data needed to create a EmployeeVoicesFeedback.
     * 
    **/
    data: XOR<EmployeeVoicesFeedbackCreateInput, EmployeeVoicesFeedbackUncheckedCreateInput>
  }


  /**
   * EmployeeVoicesFeedback createMany
   */
  export type EmployeeVoicesFeedbackCreateManyArgs = {
    /**
     * The data used to create many EmployeeVoicesFeedbacks.
     * 
    **/
    data: Enumerable<EmployeeVoicesFeedbackCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * EmployeeVoicesFeedback update
   */
  export type EmployeeVoicesFeedbackUpdateArgs = {
    /**
     * Select specific fields to fetch from the EmployeeVoicesFeedback
     * 
    **/
    select?: EmployeeVoicesFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmployeeVoicesFeedbackInclude | null
    /**
     * The data needed to update a EmployeeVoicesFeedback.
     * 
    **/
    data: XOR<EmployeeVoicesFeedbackUpdateInput, EmployeeVoicesFeedbackUncheckedUpdateInput>
    /**
     * Choose, which EmployeeVoicesFeedback to update.
     * 
    **/
    where: EmployeeVoicesFeedbackWhereUniqueInput
  }


  /**
   * EmployeeVoicesFeedback updateMany
   */
  export type EmployeeVoicesFeedbackUpdateManyArgs = {
    /**
     * The data used to update EmployeeVoicesFeedbacks.
     * 
    **/
    data: XOR<EmployeeVoicesFeedbackUpdateManyMutationInput, EmployeeVoicesFeedbackUncheckedUpdateManyInput>
    /**
     * Filter which EmployeeVoicesFeedbacks to update
     * 
    **/
    where?: EmployeeVoicesFeedbackWhereInput
  }


  /**
   * EmployeeVoicesFeedback upsert
   */
  export type EmployeeVoicesFeedbackUpsertArgs = {
    /**
     * Select specific fields to fetch from the EmployeeVoicesFeedback
     * 
    **/
    select?: EmployeeVoicesFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmployeeVoicesFeedbackInclude | null
    /**
     * The filter to search for the EmployeeVoicesFeedback to update in case it exists.
     * 
    **/
    where: EmployeeVoicesFeedbackWhereUniqueInput
    /**
     * In case the EmployeeVoicesFeedback found by the `where` argument doesn't exist, create a new EmployeeVoicesFeedback with this data.
     * 
    **/
    create: XOR<EmployeeVoicesFeedbackCreateInput, EmployeeVoicesFeedbackUncheckedCreateInput>
    /**
     * In case the EmployeeVoicesFeedback was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<EmployeeVoicesFeedbackUpdateInput, EmployeeVoicesFeedbackUncheckedUpdateInput>
  }


  /**
   * EmployeeVoicesFeedback delete
   */
  export type EmployeeVoicesFeedbackDeleteArgs = {
    /**
     * Select specific fields to fetch from the EmployeeVoicesFeedback
     * 
    **/
    select?: EmployeeVoicesFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmployeeVoicesFeedbackInclude | null
    /**
     * Filter which EmployeeVoicesFeedback to delete.
     * 
    **/
    where: EmployeeVoicesFeedbackWhereUniqueInput
  }


  /**
   * EmployeeVoicesFeedback deleteMany
   */
  export type EmployeeVoicesFeedbackDeleteManyArgs = {
    /**
     * Filter which EmployeeVoicesFeedbacks to delete
     * 
    **/
    where?: EmployeeVoicesFeedbackWhereInput
  }


  /**
   * EmployeeVoicesFeedback: findUniqueOrThrow
   */
  export type EmployeeVoicesFeedbackFindUniqueOrThrowArgs = EmployeeVoicesFeedbackFindUniqueArgsBase
      

  /**
   * EmployeeVoicesFeedback: findFirstOrThrow
   */
  export type EmployeeVoicesFeedbackFindFirstOrThrowArgs = EmployeeVoicesFeedbackFindFirstArgsBase
      

  /**
   * EmployeeVoicesFeedback without action
   */
  export type EmployeeVoicesFeedbackArgs = {
    /**
     * Select specific fields to fetch from the EmployeeVoicesFeedback
     * 
    **/
    select?: EmployeeVoicesFeedbackSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EmployeeVoicesFeedbackInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const CompanyPersonScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId'
  };

  export type CompanyPersonScalarFieldEnum = (typeof CompanyPersonScalarFieldEnum)[keyof typeof CompanyPersonScalarFieldEnum]


  export const EmployeeVoicesFeedbackScalarFieldEnum: {
    id: 'id',
    feedback: 'feedback',
    anonymous: 'anonymous',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    companyPersonId: 'companyPersonId'
  };

  export type EmployeeVoicesFeedbackScalarFieldEnum = (typeof EmployeeVoicesFeedbackScalarFieldEnum)[keyof typeof EmployeeVoicesFeedbackScalarFieldEnum]


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


  /**
   * Deep Input Types
   */


  export type CompanyPersonWhereInput = {
    AND?: Enumerable<CompanyPersonWhereInput>
    OR?: Enumerable<CompanyPersonWhereInput>
    NOT?: Enumerable<CompanyPersonWhereInput>
    id?: StringFilter | string
    companyId?: StringFilter | string
    EmployeeVoicesFeedback?: EmployeeVoicesFeedbackListRelationFilter
  }

  export type CompanyPersonOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    EmployeeVoicesFeedback?: EmployeeVoicesFeedbackOrderByRelationAggregateInput
  }

  export type CompanyPersonWhereUniqueInput = {
    id?: string
  }

  export type CompanyPersonOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    _count?: CompanyPersonCountOrderByAggregateInput
    _max?: CompanyPersonMaxOrderByAggregateInput
    _min?: CompanyPersonMinOrderByAggregateInput
  }

  export type CompanyPersonScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CompanyPersonScalarWhereWithAggregatesInput>
    OR?: Enumerable<CompanyPersonScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CompanyPersonScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    companyId?: StringWithAggregatesFilter | string
  }

  export type EmployeeVoicesFeedbackWhereInput = {
    AND?: Enumerable<EmployeeVoicesFeedbackWhereInput>
    OR?: Enumerable<EmployeeVoicesFeedbackWhereInput>
    NOT?: Enumerable<EmployeeVoicesFeedbackWhereInput>
    id?: IntFilter | number
    feedback?: StringFilter | string
    anonymous?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    companyPersonId?: StringFilter | string
    companyPerson?: XOR<CompanyPersonRelationFilter, CompanyPersonWhereInput>
  }

  export type EmployeeVoicesFeedbackOrderByWithRelationInput = {
    id?: SortOrder
    feedback?: SortOrder
    anonymous?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyPersonId?: SortOrder
    companyPerson?: CompanyPersonOrderByWithRelationInput
  }

  export type EmployeeVoicesFeedbackWhereUniqueInput = {
    id?: number
  }

  export type EmployeeVoicesFeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    feedback?: SortOrder
    anonymous?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyPersonId?: SortOrder
    _count?: EmployeeVoicesFeedbackCountOrderByAggregateInput
    _avg?: EmployeeVoicesFeedbackAvgOrderByAggregateInput
    _max?: EmployeeVoicesFeedbackMaxOrderByAggregateInput
    _min?: EmployeeVoicesFeedbackMinOrderByAggregateInput
    _sum?: EmployeeVoicesFeedbackSumOrderByAggregateInput
  }

  export type EmployeeVoicesFeedbackScalarWhereWithAggregatesInput = {
    AND?: Enumerable<EmployeeVoicesFeedbackScalarWhereWithAggregatesInput>
    OR?: Enumerable<EmployeeVoicesFeedbackScalarWhereWithAggregatesInput>
    NOT?: Enumerable<EmployeeVoicesFeedbackScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    feedback?: StringWithAggregatesFilter | string
    anonymous?: BoolWithAggregatesFilter | boolean
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    companyPersonId?: StringWithAggregatesFilter | string
  }

  export type CompanyPersonCreateInput = {
    id: string
    companyId: string
    EmployeeVoicesFeedback?: EmployeeVoicesFeedbackCreateNestedManyWithoutCompanyPersonInput
  }

  export type CompanyPersonUncheckedCreateInput = {
    id: string
    companyId: string
    EmployeeVoicesFeedback?: EmployeeVoicesFeedbackUncheckedCreateNestedManyWithoutCompanyPersonInput
  }

  export type CompanyPersonUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    EmployeeVoicesFeedback?: EmployeeVoicesFeedbackUpdateManyWithoutCompanyPersonNestedInput
  }

  export type CompanyPersonUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    EmployeeVoicesFeedback?: EmployeeVoicesFeedbackUncheckedUpdateManyWithoutCompanyPersonNestedInput
  }

  export type CompanyPersonCreateManyInput = {
    id: string
    companyId: string
  }

  export type CompanyPersonUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyPersonUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type EmployeeVoicesFeedbackCreateInput = {
    feedback: string
    anonymous?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    companyPerson: CompanyPersonCreateNestedOneWithoutEmployeeVoicesFeedbackInput
  }

  export type EmployeeVoicesFeedbackUncheckedCreateInput = {
    id?: number
    feedback: string
    anonymous?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    companyPersonId: string
  }

  export type EmployeeVoicesFeedbackUpdateInput = {
    feedback?: StringFieldUpdateOperationsInput | string
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyPerson?: CompanyPersonUpdateOneRequiredWithoutEmployeeVoicesFeedbackNestedInput
  }

  export type EmployeeVoicesFeedbackUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    feedback?: StringFieldUpdateOperationsInput | string
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyPersonId?: StringFieldUpdateOperationsInput | string
  }

  export type EmployeeVoicesFeedbackCreateManyInput = {
    id?: number
    feedback: string
    anonymous?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    companyPersonId: string
  }

  export type EmployeeVoicesFeedbackUpdateManyMutationInput = {
    feedback?: StringFieldUpdateOperationsInput | string
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeVoicesFeedbackUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    feedback?: StringFieldUpdateOperationsInput | string
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyPersonId?: StringFieldUpdateOperationsInput | string
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

  export type EmployeeVoicesFeedbackListRelationFilter = {
    every?: EmployeeVoicesFeedbackWhereInput
    some?: EmployeeVoicesFeedbackWhereInput
    none?: EmployeeVoicesFeedbackWhereInput
  }

  export type EmployeeVoicesFeedbackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyPersonCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type CompanyPersonMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
  }

  export type CompanyPersonMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
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

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
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

  export type CompanyPersonRelationFilter = {
    is?: CompanyPersonWhereInput
    isNot?: CompanyPersonWhereInput
  }

  export type EmployeeVoicesFeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    feedback?: SortOrder
    anonymous?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyPersonId?: SortOrder
  }

  export type EmployeeVoicesFeedbackAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EmployeeVoicesFeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    feedback?: SortOrder
    anonymous?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyPersonId?: SortOrder
  }

  export type EmployeeVoicesFeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    feedback?: SortOrder
    anonymous?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyPersonId?: SortOrder
  }

  export type EmployeeVoicesFeedbackSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
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

  export type EmployeeVoicesFeedbackCreateNestedManyWithoutCompanyPersonInput = {
    create?: XOR<Enumerable<EmployeeVoicesFeedbackCreateWithoutCompanyPersonInput>, Enumerable<EmployeeVoicesFeedbackUncheckedCreateWithoutCompanyPersonInput>>
    connectOrCreate?: Enumerable<EmployeeVoicesFeedbackCreateOrConnectWithoutCompanyPersonInput>
    createMany?: EmployeeVoicesFeedbackCreateManyCompanyPersonInputEnvelope
    connect?: Enumerable<EmployeeVoicesFeedbackWhereUniqueInput>
  }

  export type EmployeeVoicesFeedbackUncheckedCreateNestedManyWithoutCompanyPersonInput = {
    create?: XOR<Enumerable<EmployeeVoicesFeedbackCreateWithoutCompanyPersonInput>, Enumerable<EmployeeVoicesFeedbackUncheckedCreateWithoutCompanyPersonInput>>
    connectOrCreate?: Enumerable<EmployeeVoicesFeedbackCreateOrConnectWithoutCompanyPersonInput>
    createMany?: EmployeeVoicesFeedbackCreateManyCompanyPersonInputEnvelope
    connect?: Enumerable<EmployeeVoicesFeedbackWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EmployeeVoicesFeedbackUpdateManyWithoutCompanyPersonNestedInput = {
    create?: XOR<Enumerable<EmployeeVoicesFeedbackCreateWithoutCompanyPersonInput>, Enumerable<EmployeeVoicesFeedbackUncheckedCreateWithoutCompanyPersonInput>>
    connectOrCreate?: Enumerable<EmployeeVoicesFeedbackCreateOrConnectWithoutCompanyPersonInput>
    upsert?: Enumerable<EmployeeVoicesFeedbackUpsertWithWhereUniqueWithoutCompanyPersonInput>
    createMany?: EmployeeVoicesFeedbackCreateManyCompanyPersonInputEnvelope
    set?: Enumerable<EmployeeVoicesFeedbackWhereUniqueInput>
    disconnect?: Enumerable<EmployeeVoicesFeedbackWhereUniqueInput>
    delete?: Enumerable<EmployeeVoicesFeedbackWhereUniqueInput>
    connect?: Enumerable<EmployeeVoicesFeedbackWhereUniqueInput>
    update?: Enumerable<EmployeeVoicesFeedbackUpdateWithWhereUniqueWithoutCompanyPersonInput>
    updateMany?: Enumerable<EmployeeVoicesFeedbackUpdateManyWithWhereWithoutCompanyPersonInput>
    deleteMany?: Enumerable<EmployeeVoicesFeedbackScalarWhereInput>
  }

  export type EmployeeVoicesFeedbackUncheckedUpdateManyWithoutCompanyPersonNestedInput = {
    create?: XOR<Enumerable<EmployeeVoicesFeedbackCreateWithoutCompanyPersonInput>, Enumerable<EmployeeVoicesFeedbackUncheckedCreateWithoutCompanyPersonInput>>
    connectOrCreate?: Enumerable<EmployeeVoicesFeedbackCreateOrConnectWithoutCompanyPersonInput>
    upsert?: Enumerable<EmployeeVoicesFeedbackUpsertWithWhereUniqueWithoutCompanyPersonInput>
    createMany?: EmployeeVoicesFeedbackCreateManyCompanyPersonInputEnvelope
    set?: Enumerable<EmployeeVoicesFeedbackWhereUniqueInput>
    disconnect?: Enumerable<EmployeeVoicesFeedbackWhereUniqueInput>
    delete?: Enumerable<EmployeeVoicesFeedbackWhereUniqueInput>
    connect?: Enumerable<EmployeeVoicesFeedbackWhereUniqueInput>
    update?: Enumerable<EmployeeVoicesFeedbackUpdateWithWhereUniqueWithoutCompanyPersonInput>
    updateMany?: Enumerable<EmployeeVoicesFeedbackUpdateManyWithWhereWithoutCompanyPersonInput>
    deleteMany?: Enumerable<EmployeeVoicesFeedbackScalarWhereInput>
  }

  export type CompanyPersonCreateNestedOneWithoutEmployeeVoicesFeedbackInput = {
    create?: XOR<CompanyPersonCreateWithoutEmployeeVoicesFeedbackInput, CompanyPersonUncheckedCreateWithoutEmployeeVoicesFeedbackInput>
    connectOrCreate?: CompanyPersonCreateOrConnectWithoutEmployeeVoicesFeedbackInput
    connect?: CompanyPersonWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CompanyPersonUpdateOneRequiredWithoutEmployeeVoicesFeedbackNestedInput = {
    create?: XOR<CompanyPersonCreateWithoutEmployeeVoicesFeedbackInput, CompanyPersonUncheckedCreateWithoutEmployeeVoicesFeedbackInput>
    connectOrCreate?: CompanyPersonCreateOrConnectWithoutEmployeeVoicesFeedbackInput
    upsert?: CompanyPersonUpsertWithoutEmployeeVoicesFeedbackInput
    connect?: CompanyPersonWhereUniqueInput
    update?: XOR<CompanyPersonUpdateWithoutEmployeeVoicesFeedbackInput, CompanyPersonUncheckedUpdateWithoutEmployeeVoicesFeedbackInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
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

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
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

  export type EmployeeVoicesFeedbackCreateWithoutCompanyPersonInput = {
    feedback: string
    anonymous?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeVoicesFeedbackUncheckedCreateWithoutCompanyPersonInput = {
    id?: number
    feedback: string
    anonymous?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeVoicesFeedbackCreateOrConnectWithoutCompanyPersonInput = {
    where: EmployeeVoicesFeedbackWhereUniqueInput
    create: XOR<EmployeeVoicesFeedbackCreateWithoutCompanyPersonInput, EmployeeVoicesFeedbackUncheckedCreateWithoutCompanyPersonInput>
  }

  export type EmployeeVoicesFeedbackCreateManyCompanyPersonInputEnvelope = {
    data: Enumerable<EmployeeVoicesFeedbackCreateManyCompanyPersonInput>
    skipDuplicates?: boolean
  }

  export type EmployeeVoicesFeedbackUpsertWithWhereUniqueWithoutCompanyPersonInput = {
    where: EmployeeVoicesFeedbackWhereUniqueInput
    update: XOR<EmployeeVoicesFeedbackUpdateWithoutCompanyPersonInput, EmployeeVoicesFeedbackUncheckedUpdateWithoutCompanyPersonInput>
    create: XOR<EmployeeVoicesFeedbackCreateWithoutCompanyPersonInput, EmployeeVoicesFeedbackUncheckedCreateWithoutCompanyPersonInput>
  }

  export type EmployeeVoicesFeedbackUpdateWithWhereUniqueWithoutCompanyPersonInput = {
    where: EmployeeVoicesFeedbackWhereUniqueInput
    data: XOR<EmployeeVoicesFeedbackUpdateWithoutCompanyPersonInput, EmployeeVoicesFeedbackUncheckedUpdateWithoutCompanyPersonInput>
  }

  export type EmployeeVoicesFeedbackUpdateManyWithWhereWithoutCompanyPersonInput = {
    where: EmployeeVoicesFeedbackScalarWhereInput
    data: XOR<EmployeeVoicesFeedbackUpdateManyMutationInput, EmployeeVoicesFeedbackUncheckedUpdateManyWithoutEmployeeVoicesFeedbackInput>
  }

  export type EmployeeVoicesFeedbackScalarWhereInput = {
    AND?: Enumerable<EmployeeVoicesFeedbackScalarWhereInput>
    OR?: Enumerable<EmployeeVoicesFeedbackScalarWhereInput>
    NOT?: Enumerable<EmployeeVoicesFeedbackScalarWhereInput>
    id?: IntFilter | number
    feedback?: StringFilter | string
    anonymous?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    companyPersonId?: StringFilter | string
  }

  export type CompanyPersonCreateWithoutEmployeeVoicesFeedbackInput = {
    id: string
    companyId: string
  }

  export type CompanyPersonUncheckedCreateWithoutEmployeeVoicesFeedbackInput = {
    id: string
    companyId: string
  }

  export type CompanyPersonCreateOrConnectWithoutEmployeeVoicesFeedbackInput = {
    where: CompanyPersonWhereUniqueInput
    create: XOR<CompanyPersonCreateWithoutEmployeeVoicesFeedbackInput, CompanyPersonUncheckedCreateWithoutEmployeeVoicesFeedbackInput>
  }

  export type CompanyPersonUpsertWithoutEmployeeVoicesFeedbackInput = {
    update: XOR<CompanyPersonUpdateWithoutEmployeeVoicesFeedbackInput, CompanyPersonUncheckedUpdateWithoutEmployeeVoicesFeedbackInput>
    create: XOR<CompanyPersonCreateWithoutEmployeeVoicesFeedbackInput, CompanyPersonUncheckedCreateWithoutEmployeeVoicesFeedbackInput>
  }

  export type CompanyPersonUpdateWithoutEmployeeVoicesFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type CompanyPersonUncheckedUpdateWithoutEmployeeVoicesFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type EmployeeVoicesFeedbackCreateManyCompanyPersonInput = {
    id?: number
    feedback: string
    anonymous?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmployeeVoicesFeedbackUpdateWithoutCompanyPersonInput = {
    feedback?: StringFieldUpdateOperationsInput | string
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeVoicesFeedbackUncheckedUpdateWithoutCompanyPersonInput = {
    id?: IntFieldUpdateOperationsInput | number
    feedback?: StringFieldUpdateOperationsInput | string
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployeeVoicesFeedbackUncheckedUpdateManyWithoutEmployeeVoicesFeedbackInput = {
    id?: IntFieldUpdateOperationsInput | number
    feedback?: StringFieldUpdateOperationsInput | string
    anonymous?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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