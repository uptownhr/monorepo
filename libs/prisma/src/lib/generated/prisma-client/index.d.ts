
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
 * Model HackerNewsFirst
 * 
 */
export type HackerNewsFirst = {
  id: number
  hnId: number
  title: string
  url: string
  upVotes: number
  createdAt: Date
  updatedAt: Date
}

/**
 * Model HackerNewsSelected
 * 
 */
export type HackerNewsSelected = {
  id: number
  hackerNewsFirstId: number
  status: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Model HackerNewsRedirectHit
 * 
 */
export type HackerNewsRedirectHit = {
  id: number
  hackerNewsFirstId: number
  createdAt: Date
}

/**
 * Model Contact
 * 
 */
export type Contact = {
  id: number
  name: string | null
  email: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Post
 * 
 */
export type Post = {
  id: number
  createdAt: Date
  updatedAt: Date
  title: string
  content: string | null
  published: boolean
  authorId: number
}

/**
 * Model Profile
 * 
 */
export type Profile = {
  id: number
  bio: string | null
  userId: number
}

/**
 * Model User
 * 
 */
export type User = {
  id: number
  email: string
  name: string | null
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more HackerNewsFirsts
 * const hackerNewsFirsts = await prisma.hackerNewsFirst.findMany()
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
   * // Fetch zero or more HackerNewsFirsts
   * const hackerNewsFirsts = await prisma.hackerNewsFirst.findMany()
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
   * `prisma.hackerNewsFirst`: Exposes CRUD operations for the **HackerNewsFirst** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HackerNewsFirsts
    * const hackerNewsFirsts = await prisma.hackerNewsFirst.findMany()
    * ```
    */
  get hackerNewsFirst(): Prisma.HackerNewsFirstDelegate<GlobalReject>;

  /**
   * `prisma.hackerNewsSelected`: Exposes CRUD operations for the **HackerNewsSelected** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HackerNewsSelecteds
    * const hackerNewsSelecteds = await prisma.hackerNewsSelected.findMany()
    * ```
    */
  get hackerNewsSelected(): Prisma.HackerNewsSelectedDelegate<GlobalReject>;

  /**
   * `prisma.hackerNewsRedirectHit`: Exposes CRUD operations for the **HackerNewsRedirectHit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HackerNewsRedirectHits
    * const hackerNewsRedirectHits = await prisma.hackerNewsRedirectHit.findMany()
    * ```
    */
  get hackerNewsRedirectHit(): Prisma.HackerNewsRedirectHitDelegate<GlobalReject>;

  /**
   * `prisma.contact`: Exposes CRUD operations for the **Contact** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contacts
    * const contacts = await prisma.contact.findMany()
    * ```
    */
  get contact(): Prisma.ContactDelegate<GlobalReject>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<GlobalReject>;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<GlobalReject>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;
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
    HackerNewsFirst: 'HackerNewsFirst',
    HackerNewsSelected: 'HackerNewsSelected',
    HackerNewsRedirectHit: 'HackerNewsRedirectHit',
    Contact: 'Contact',
    Post: 'Post',
    Profile: 'Profile',
    User: 'User'
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
   * Count Type HackerNewsFirstCountOutputType
   */


  export type HackerNewsFirstCountOutputType = {
    HackerNewsRedirectHit: number
  }

  export type HackerNewsFirstCountOutputTypeSelect = {
    HackerNewsRedirectHit?: boolean
  }

  export type HackerNewsFirstCountOutputTypeGetPayload<
    S extends boolean | null | undefined | HackerNewsFirstCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? HackerNewsFirstCountOutputType
    : S extends undefined
    ? never
    : S extends HackerNewsFirstCountOutputTypeArgs
    ?'include' extends U
    ? HackerNewsFirstCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof HackerNewsFirstCountOutputType ? HackerNewsFirstCountOutputType[P] : never
  } 
    : HackerNewsFirstCountOutputType
  : HackerNewsFirstCountOutputType




  // Custom InputTypes

  /**
   * HackerNewsFirstCountOutputType without action
   */
  export type HackerNewsFirstCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the HackerNewsFirstCountOutputType
     * 
    **/
    select?: HackerNewsFirstCountOutputTypeSelect | null
  }



  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    posts: number
  }

  export type UserCountOutputTypeSelect = {
    posts?: boolean
  }

  export type UserCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UserCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? UserCountOutputType
    : S extends undefined
    ? never
    : S extends UserCountOutputTypeArgs
    ?'include' extends U
    ? UserCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
    : UserCountOutputType
  : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model HackerNewsFirst
   */


  export type AggregateHackerNewsFirst = {
    _count: HackerNewsFirstCountAggregateOutputType | null
    _avg: HackerNewsFirstAvgAggregateOutputType | null
    _sum: HackerNewsFirstSumAggregateOutputType | null
    _min: HackerNewsFirstMinAggregateOutputType | null
    _max: HackerNewsFirstMaxAggregateOutputType | null
  }

  export type HackerNewsFirstAvgAggregateOutputType = {
    id: number | null
    hnId: number | null
    upVotes: number | null
  }

  export type HackerNewsFirstSumAggregateOutputType = {
    id: number | null
    hnId: number | null
    upVotes: number | null
  }

  export type HackerNewsFirstMinAggregateOutputType = {
    id: number | null
    hnId: number | null
    title: string | null
    url: string | null
    upVotes: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HackerNewsFirstMaxAggregateOutputType = {
    id: number | null
    hnId: number | null
    title: string | null
    url: string | null
    upVotes: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HackerNewsFirstCountAggregateOutputType = {
    id: number
    hnId: number
    title: number
    url: number
    upVotes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HackerNewsFirstAvgAggregateInputType = {
    id?: true
    hnId?: true
    upVotes?: true
  }

  export type HackerNewsFirstSumAggregateInputType = {
    id?: true
    hnId?: true
    upVotes?: true
  }

  export type HackerNewsFirstMinAggregateInputType = {
    id?: true
    hnId?: true
    title?: true
    url?: true
    upVotes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HackerNewsFirstMaxAggregateInputType = {
    id?: true
    hnId?: true
    title?: true
    url?: true
    upVotes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HackerNewsFirstCountAggregateInputType = {
    id?: true
    hnId?: true
    title?: true
    url?: true
    upVotes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HackerNewsFirstAggregateArgs = {
    /**
     * Filter which HackerNewsFirst to aggregate.
     * 
    **/
    where?: HackerNewsFirstWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HackerNewsFirsts to fetch.
     * 
    **/
    orderBy?: Enumerable<HackerNewsFirstOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: HackerNewsFirstWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HackerNewsFirsts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HackerNewsFirsts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HackerNewsFirsts
    **/
    _count?: true | HackerNewsFirstCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HackerNewsFirstAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HackerNewsFirstSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HackerNewsFirstMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HackerNewsFirstMaxAggregateInputType
  }

  export type GetHackerNewsFirstAggregateType<T extends HackerNewsFirstAggregateArgs> = {
        [P in keyof T & keyof AggregateHackerNewsFirst]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHackerNewsFirst[P]>
      : GetScalarType<T[P], AggregateHackerNewsFirst[P]>
  }




  export type HackerNewsFirstGroupByArgs = {
    where?: HackerNewsFirstWhereInput
    orderBy?: Enumerable<HackerNewsFirstOrderByWithAggregationInput>
    by: Array<HackerNewsFirstScalarFieldEnum>
    having?: HackerNewsFirstScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HackerNewsFirstCountAggregateInputType | true
    _avg?: HackerNewsFirstAvgAggregateInputType
    _sum?: HackerNewsFirstSumAggregateInputType
    _min?: HackerNewsFirstMinAggregateInputType
    _max?: HackerNewsFirstMaxAggregateInputType
  }


  export type HackerNewsFirstGroupByOutputType = {
    id: number
    hnId: number
    title: string
    url: string
    upVotes: number
    createdAt: Date
    updatedAt: Date
    _count: HackerNewsFirstCountAggregateOutputType | null
    _avg: HackerNewsFirstAvgAggregateOutputType | null
    _sum: HackerNewsFirstSumAggregateOutputType | null
    _min: HackerNewsFirstMinAggregateOutputType | null
    _max: HackerNewsFirstMaxAggregateOutputType | null
  }

  type GetHackerNewsFirstGroupByPayload<T extends HackerNewsFirstGroupByArgs> = PrismaPromise<
    Array<
      PickArray<HackerNewsFirstGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HackerNewsFirstGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HackerNewsFirstGroupByOutputType[P]>
            : GetScalarType<T[P], HackerNewsFirstGroupByOutputType[P]>
        }
      >
    >


  export type HackerNewsFirstSelect = {
    id?: boolean
    hnId?: boolean
    title?: boolean
    url?: boolean
    upVotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    HackerNewsSelected?: boolean | HackerNewsSelectedArgs
    HackerNewsRedirectHit?: boolean | HackerNewsRedirectHitFindManyArgs
    _count?: boolean | HackerNewsFirstCountOutputTypeArgs
  }

  export type HackerNewsFirstInclude = {
    HackerNewsSelected?: boolean | HackerNewsSelectedArgs
    HackerNewsRedirectHit?: boolean | HackerNewsRedirectHitFindManyArgs
    _count?: boolean | HackerNewsFirstCountOutputTypeArgs
  }

  export type HackerNewsFirstGetPayload<
    S extends boolean | null | undefined | HackerNewsFirstArgs,
    U = keyof S
      > = S extends true
        ? HackerNewsFirst
    : S extends undefined
    ? never
    : S extends HackerNewsFirstArgs | HackerNewsFirstFindManyArgs
    ?'include' extends U
    ? HackerNewsFirst  & {
    [P in TrueKeys<S['include']>]:
        P extends 'HackerNewsSelected' ? HackerNewsSelectedGetPayload<S['include'][P]> | null :
        P extends 'HackerNewsRedirectHit' ? Array < HackerNewsRedirectHitGetPayload<S['include'][P]>>  :
        P extends '_count' ? HackerNewsFirstCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'HackerNewsSelected' ? HackerNewsSelectedGetPayload<S['select'][P]> | null :
        P extends 'HackerNewsRedirectHit' ? Array < HackerNewsRedirectHitGetPayload<S['select'][P]>>  :
        P extends '_count' ? HackerNewsFirstCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof HackerNewsFirst ? HackerNewsFirst[P] : never
  } 
    : HackerNewsFirst
  : HackerNewsFirst


  type HackerNewsFirstCountArgs = Merge<
    Omit<HackerNewsFirstFindManyArgs, 'select' | 'include'> & {
      select?: HackerNewsFirstCountAggregateInputType | true
    }
  >

  export interface HackerNewsFirstDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one HackerNewsFirst that matches the filter.
     * @param {HackerNewsFirstFindUniqueArgs} args - Arguments to find a HackerNewsFirst
     * @example
     * // Get one HackerNewsFirst
     * const hackerNewsFirst = await prisma.hackerNewsFirst.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends HackerNewsFirstFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, HackerNewsFirstFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'HackerNewsFirst'> extends True ? CheckSelect<T, Prisma__HackerNewsFirstClient<HackerNewsFirst>, Prisma__HackerNewsFirstClient<HackerNewsFirstGetPayload<T>>> : CheckSelect<T, Prisma__HackerNewsFirstClient<HackerNewsFirst | null >, Prisma__HackerNewsFirstClient<HackerNewsFirstGetPayload<T> | null >>

    /**
     * Find the first HackerNewsFirst that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsFirstFindFirstArgs} args - Arguments to find a HackerNewsFirst
     * @example
     * // Get one HackerNewsFirst
     * const hackerNewsFirst = await prisma.hackerNewsFirst.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends HackerNewsFirstFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, HackerNewsFirstFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'HackerNewsFirst'> extends True ? CheckSelect<T, Prisma__HackerNewsFirstClient<HackerNewsFirst>, Prisma__HackerNewsFirstClient<HackerNewsFirstGetPayload<T>>> : CheckSelect<T, Prisma__HackerNewsFirstClient<HackerNewsFirst | null >, Prisma__HackerNewsFirstClient<HackerNewsFirstGetPayload<T> | null >>

    /**
     * Find zero or more HackerNewsFirsts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsFirstFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HackerNewsFirsts
     * const hackerNewsFirsts = await prisma.hackerNewsFirst.findMany()
     * 
     * // Get first 10 HackerNewsFirsts
     * const hackerNewsFirsts = await prisma.hackerNewsFirst.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hackerNewsFirstWithIdOnly = await prisma.hackerNewsFirst.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends HackerNewsFirstFindManyArgs>(
      args?: SelectSubset<T, HackerNewsFirstFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<HackerNewsFirst>>, PrismaPromise<Array<HackerNewsFirstGetPayload<T>>>>

    /**
     * Create a HackerNewsFirst.
     * @param {HackerNewsFirstCreateArgs} args - Arguments to create a HackerNewsFirst.
     * @example
     * // Create one HackerNewsFirst
     * const HackerNewsFirst = await prisma.hackerNewsFirst.create({
     *   data: {
     *     // ... data to create a HackerNewsFirst
     *   }
     * })
     * 
    **/
    create<T extends HackerNewsFirstCreateArgs>(
      args: SelectSubset<T, HackerNewsFirstCreateArgs>
    ): CheckSelect<T, Prisma__HackerNewsFirstClient<HackerNewsFirst>, Prisma__HackerNewsFirstClient<HackerNewsFirstGetPayload<T>>>

    /**
     * Delete a HackerNewsFirst.
     * @param {HackerNewsFirstDeleteArgs} args - Arguments to delete one HackerNewsFirst.
     * @example
     * // Delete one HackerNewsFirst
     * const HackerNewsFirst = await prisma.hackerNewsFirst.delete({
     *   where: {
     *     // ... filter to delete one HackerNewsFirst
     *   }
     * })
     * 
    **/
    delete<T extends HackerNewsFirstDeleteArgs>(
      args: SelectSubset<T, HackerNewsFirstDeleteArgs>
    ): CheckSelect<T, Prisma__HackerNewsFirstClient<HackerNewsFirst>, Prisma__HackerNewsFirstClient<HackerNewsFirstGetPayload<T>>>

    /**
     * Update one HackerNewsFirst.
     * @param {HackerNewsFirstUpdateArgs} args - Arguments to update one HackerNewsFirst.
     * @example
     * // Update one HackerNewsFirst
     * const hackerNewsFirst = await prisma.hackerNewsFirst.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends HackerNewsFirstUpdateArgs>(
      args: SelectSubset<T, HackerNewsFirstUpdateArgs>
    ): CheckSelect<T, Prisma__HackerNewsFirstClient<HackerNewsFirst>, Prisma__HackerNewsFirstClient<HackerNewsFirstGetPayload<T>>>

    /**
     * Delete zero or more HackerNewsFirsts.
     * @param {HackerNewsFirstDeleteManyArgs} args - Arguments to filter HackerNewsFirsts to delete.
     * @example
     * // Delete a few HackerNewsFirsts
     * const { count } = await prisma.hackerNewsFirst.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends HackerNewsFirstDeleteManyArgs>(
      args?: SelectSubset<T, HackerNewsFirstDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more HackerNewsFirsts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsFirstUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HackerNewsFirsts
     * const hackerNewsFirst = await prisma.hackerNewsFirst.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends HackerNewsFirstUpdateManyArgs>(
      args: SelectSubset<T, HackerNewsFirstUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one HackerNewsFirst.
     * @param {HackerNewsFirstUpsertArgs} args - Arguments to update or create a HackerNewsFirst.
     * @example
     * // Update or create a HackerNewsFirst
     * const hackerNewsFirst = await prisma.hackerNewsFirst.upsert({
     *   create: {
     *     // ... data to create a HackerNewsFirst
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HackerNewsFirst we want to update
     *   }
     * })
    **/
    upsert<T extends HackerNewsFirstUpsertArgs>(
      args: SelectSubset<T, HackerNewsFirstUpsertArgs>
    ): CheckSelect<T, Prisma__HackerNewsFirstClient<HackerNewsFirst>, Prisma__HackerNewsFirstClient<HackerNewsFirstGetPayload<T>>>

    /**
     * Find one HackerNewsFirst that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {HackerNewsFirstFindUniqueOrThrowArgs} args - Arguments to find a HackerNewsFirst
     * @example
     * // Get one HackerNewsFirst
     * const hackerNewsFirst = await prisma.hackerNewsFirst.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends HackerNewsFirstFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, HackerNewsFirstFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__HackerNewsFirstClient<HackerNewsFirst>, Prisma__HackerNewsFirstClient<HackerNewsFirstGetPayload<T>>>

    /**
     * Find the first HackerNewsFirst that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsFirstFindFirstOrThrowArgs} args - Arguments to find a HackerNewsFirst
     * @example
     * // Get one HackerNewsFirst
     * const hackerNewsFirst = await prisma.hackerNewsFirst.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends HackerNewsFirstFindFirstOrThrowArgs>(
      args?: SelectSubset<T, HackerNewsFirstFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__HackerNewsFirstClient<HackerNewsFirst>, Prisma__HackerNewsFirstClient<HackerNewsFirstGetPayload<T>>>

    /**
     * Count the number of HackerNewsFirsts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsFirstCountArgs} args - Arguments to filter HackerNewsFirsts to count.
     * @example
     * // Count the number of HackerNewsFirsts
     * const count = await prisma.hackerNewsFirst.count({
     *   where: {
     *     // ... the filter for the HackerNewsFirsts we want to count
     *   }
     * })
    **/
    count<T extends HackerNewsFirstCountArgs>(
      args?: Subset<T, HackerNewsFirstCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HackerNewsFirstCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HackerNewsFirst.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsFirstAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HackerNewsFirstAggregateArgs>(args: Subset<T, HackerNewsFirstAggregateArgs>): PrismaPromise<GetHackerNewsFirstAggregateType<T>>

    /**
     * Group by HackerNewsFirst.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsFirstGroupByArgs} args - Group by arguments.
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
      T extends HackerNewsFirstGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HackerNewsFirstGroupByArgs['orderBy'] }
        : { orderBy?: HackerNewsFirstGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, HackerNewsFirstGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHackerNewsFirstGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for HackerNewsFirst.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__HackerNewsFirstClient<T> implements PrismaPromise<T> {
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

    HackerNewsSelected<T extends HackerNewsSelectedArgs = {}>(args?: Subset<T, HackerNewsSelectedArgs>): CheckSelect<T, Prisma__HackerNewsSelectedClient<HackerNewsSelected | null >, Prisma__HackerNewsSelectedClient<HackerNewsSelectedGetPayload<T> | null >>;

    HackerNewsRedirectHit<T extends HackerNewsRedirectHitFindManyArgs = {}>(args?: Subset<T, HackerNewsRedirectHitFindManyArgs>): CheckSelect<T, PrismaPromise<Array<HackerNewsRedirectHit>>, PrismaPromise<Array<HackerNewsRedirectHitGetPayload<T>>>>;

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
   * HackerNewsFirst base type for findUnique actions
   */
  export type HackerNewsFirstFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the HackerNewsFirst
     * 
    **/
    select?: HackerNewsFirstSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsFirstInclude | null
    /**
     * Filter, which HackerNewsFirst to fetch.
     * 
    **/
    where: HackerNewsFirstWhereUniqueInput
  }

  /**
   * HackerNewsFirst: findUnique
   */
  export interface HackerNewsFirstFindUniqueArgs extends HackerNewsFirstFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * HackerNewsFirst base type for findFirst actions
   */
  export type HackerNewsFirstFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the HackerNewsFirst
     * 
    **/
    select?: HackerNewsFirstSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsFirstInclude | null
    /**
     * Filter, which HackerNewsFirst to fetch.
     * 
    **/
    where?: HackerNewsFirstWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HackerNewsFirsts to fetch.
     * 
    **/
    orderBy?: Enumerable<HackerNewsFirstOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HackerNewsFirsts.
     * 
    **/
    cursor?: HackerNewsFirstWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HackerNewsFirsts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HackerNewsFirsts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HackerNewsFirsts.
     * 
    **/
    distinct?: Enumerable<HackerNewsFirstScalarFieldEnum>
  }

  /**
   * HackerNewsFirst: findFirst
   */
  export interface HackerNewsFirstFindFirstArgs extends HackerNewsFirstFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * HackerNewsFirst findMany
   */
  export type HackerNewsFirstFindManyArgs = {
    /**
     * Select specific fields to fetch from the HackerNewsFirst
     * 
    **/
    select?: HackerNewsFirstSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsFirstInclude | null
    /**
     * Filter, which HackerNewsFirsts to fetch.
     * 
    **/
    where?: HackerNewsFirstWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HackerNewsFirsts to fetch.
     * 
    **/
    orderBy?: Enumerable<HackerNewsFirstOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HackerNewsFirsts.
     * 
    **/
    cursor?: HackerNewsFirstWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HackerNewsFirsts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HackerNewsFirsts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<HackerNewsFirstScalarFieldEnum>
  }


  /**
   * HackerNewsFirst create
   */
  export type HackerNewsFirstCreateArgs = {
    /**
     * Select specific fields to fetch from the HackerNewsFirst
     * 
    **/
    select?: HackerNewsFirstSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsFirstInclude | null
    /**
     * The data needed to create a HackerNewsFirst.
     * 
    **/
    data: XOR<HackerNewsFirstCreateInput, HackerNewsFirstUncheckedCreateInput>
  }


  /**
   * HackerNewsFirst update
   */
  export type HackerNewsFirstUpdateArgs = {
    /**
     * Select specific fields to fetch from the HackerNewsFirst
     * 
    **/
    select?: HackerNewsFirstSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsFirstInclude | null
    /**
     * The data needed to update a HackerNewsFirst.
     * 
    **/
    data: XOR<HackerNewsFirstUpdateInput, HackerNewsFirstUncheckedUpdateInput>
    /**
     * Choose, which HackerNewsFirst to update.
     * 
    **/
    where: HackerNewsFirstWhereUniqueInput
  }


  /**
   * HackerNewsFirst updateMany
   */
  export type HackerNewsFirstUpdateManyArgs = {
    /**
     * The data used to update HackerNewsFirsts.
     * 
    **/
    data: XOR<HackerNewsFirstUpdateManyMutationInput, HackerNewsFirstUncheckedUpdateManyInput>
    /**
     * Filter which HackerNewsFirsts to update
     * 
    **/
    where?: HackerNewsFirstWhereInput
  }


  /**
   * HackerNewsFirst upsert
   */
  export type HackerNewsFirstUpsertArgs = {
    /**
     * Select specific fields to fetch from the HackerNewsFirst
     * 
    **/
    select?: HackerNewsFirstSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsFirstInclude | null
    /**
     * The filter to search for the HackerNewsFirst to update in case it exists.
     * 
    **/
    where: HackerNewsFirstWhereUniqueInput
    /**
     * In case the HackerNewsFirst found by the `where` argument doesn't exist, create a new HackerNewsFirst with this data.
     * 
    **/
    create: XOR<HackerNewsFirstCreateInput, HackerNewsFirstUncheckedCreateInput>
    /**
     * In case the HackerNewsFirst was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<HackerNewsFirstUpdateInput, HackerNewsFirstUncheckedUpdateInput>
  }


  /**
   * HackerNewsFirst delete
   */
  export type HackerNewsFirstDeleteArgs = {
    /**
     * Select specific fields to fetch from the HackerNewsFirst
     * 
    **/
    select?: HackerNewsFirstSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsFirstInclude | null
    /**
     * Filter which HackerNewsFirst to delete.
     * 
    **/
    where: HackerNewsFirstWhereUniqueInput
  }


  /**
   * HackerNewsFirst deleteMany
   */
  export type HackerNewsFirstDeleteManyArgs = {
    /**
     * Filter which HackerNewsFirsts to delete
     * 
    **/
    where?: HackerNewsFirstWhereInput
  }


  /**
   * HackerNewsFirst: findUniqueOrThrow
   */
  export type HackerNewsFirstFindUniqueOrThrowArgs = HackerNewsFirstFindUniqueArgsBase
      

  /**
   * HackerNewsFirst: findFirstOrThrow
   */
  export type HackerNewsFirstFindFirstOrThrowArgs = HackerNewsFirstFindFirstArgsBase
      

  /**
   * HackerNewsFirst without action
   */
  export type HackerNewsFirstArgs = {
    /**
     * Select specific fields to fetch from the HackerNewsFirst
     * 
    **/
    select?: HackerNewsFirstSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsFirstInclude | null
  }



  /**
   * Model HackerNewsSelected
   */


  export type AggregateHackerNewsSelected = {
    _count: HackerNewsSelectedCountAggregateOutputType | null
    _avg: HackerNewsSelectedAvgAggregateOutputType | null
    _sum: HackerNewsSelectedSumAggregateOutputType | null
    _min: HackerNewsSelectedMinAggregateOutputType | null
    _max: HackerNewsSelectedMaxAggregateOutputType | null
  }

  export type HackerNewsSelectedAvgAggregateOutputType = {
    id: number | null
    hackerNewsFirstId: number | null
  }

  export type HackerNewsSelectedSumAggregateOutputType = {
    id: number | null
    hackerNewsFirstId: number | null
  }

  export type HackerNewsSelectedMinAggregateOutputType = {
    id: number | null
    hackerNewsFirstId: number | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HackerNewsSelectedMaxAggregateOutputType = {
    id: number | null
    hackerNewsFirstId: number | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HackerNewsSelectedCountAggregateOutputType = {
    id: number
    hackerNewsFirstId: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HackerNewsSelectedAvgAggregateInputType = {
    id?: true
    hackerNewsFirstId?: true
  }

  export type HackerNewsSelectedSumAggregateInputType = {
    id?: true
    hackerNewsFirstId?: true
  }

  export type HackerNewsSelectedMinAggregateInputType = {
    id?: true
    hackerNewsFirstId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HackerNewsSelectedMaxAggregateInputType = {
    id?: true
    hackerNewsFirstId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HackerNewsSelectedCountAggregateInputType = {
    id?: true
    hackerNewsFirstId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HackerNewsSelectedAggregateArgs = {
    /**
     * Filter which HackerNewsSelected to aggregate.
     * 
    **/
    where?: HackerNewsSelectedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HackerNewsSelecteds to fetch.
     * 
    **/
    orderBy?: Enumerable<HackerNewsSelectedOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: HackerNewsSelectedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HackerNewsSelecteds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HackerNewsSelecteds.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HackerNewsSelecteds
    **/
    _count?: true | HackerNewsSelectedCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HackerNewsSelectedAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HackerNewsSelectedSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HackerNewsSelectedMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HackerNewsSelectedMaxAggregateInputType
  }

  export type GetHackerNewsSelectedAggregateType<T extends HackerNewsSelectedAggregateArgs> = {
        [P in keyof T & keyof AggregateHackerNewsSelected]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHackerNewsSelected[P]>
      : GetScalarType<T[P], AggregateHackerNewsSelected[P]>
  }




  export type HackerNewsSelectedGroupByArgs = {
    where?: HackerNewsSelectedWhereInput
    orderBy?: Enumerable<HackerNewsSelectedOrderByWithAggregationInput>
    by: Array<HackerNewsSelectedScalarFieldEnum>
    having?: HackerNewsSelectedScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HackerNewsSelectedCountAggregateInputType | true
    _avg?: HackerNewsSelectedAvgAggregateInputType
    _sum?: HackerNewsSelectedSumAggregateInputType
    _min?: HackerNewsSelectedMinAggregateInputType
    _max?: HackerNewsSelectedMaxAggregateInputType
  }


  export type HackerNewsSelectedGroupByOutputType = {
    id: number
    hackerNewsFirstId: number
    status: string
    createdAt: Date
    updatedAt: Date
    _count: HackerNewsSelectedCountAggregateOutputType | null
    _avg: HackerNewsSelectedAvgAggregateOutputType | null
    _sum: HackerNewsSelectedSumAggregateOutputType | null
    _min: HackerNewsSelectedMinAggregateOutputType | null
    _max: HackerNewsSelectedMaxAggregateOutputType | null
  }

  type GetHackerNewsSelectedGroupByPayload<T extends HackerNewsSelectedGroupByArgs> = PrismaPromise<
    Array<
      PickArray<HackerNewsSelectedGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HackerNewsSelectedGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HackerNewsSelectedGroupByOutputType[P]>
            : GetScalarType<T[P], HackerNewsSelectedGroupByOutputType[P]>
        }
      >
    >


  export type HackerNewsSelectedSelect = {
    id?: boolean
    hackerNewsFirstId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    hackerNewsFirst?: boolean | HackerNewsFirstArgs
  }

  export type HackerNewsSelectedInclude = {
    hackerNewsFirst?: boolean | HackerNewsFirstArgs
  }

  export type HackerNewsSelectedGetPayload<
    S extends boolean | null | undefined | HackerNewsSelectedArgs,
    U = keyof S
      > = S extends true
        ? HackerNewsSelected
    : S extends undefined
    ? never
    : S extends HackerNewsSelectedArgs | HackerNewsSelectedFindManyArgs
    ?'include' extends U
    ? HackerNewsSelected  & {
    [P in TrueKeys<S['include']>]:
        P extends 'hackerNewsFirst' ? HackerNewsFirstGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'hackerNewsFirst' ? HackerNewsFirstGetPayload<S['select'][P]> :  P extends keyof HackerNewsSelected ? HackerNewsSelected[P] : never
  } 
    : HackerNewsSelected
  : HackerNewsSelected


  type HackerNewsSelectedCountArgs = Merge<
    Omit<HackerNewsSelectedFindManyArgs, 'select' | 'include'> & {
      select?: HackerNewsSelectedCountAggregateInputType | true
    }
  >

  export interface HackerNewsSelectedDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one HackerNewsSelected that matches the filter.
     * @param {HackerNewsSelectedFindUniqueArgs} args - Arguments to find a HackerNewsSelected
     * @example
     * // Get one HackerNewsSelected
     * const hackerNewsSelected = await prisma.hackerNewsSelected.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends HackerNewsSelectedFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, HackerNewsSelectedFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'HackerNewsSelected'> extends True ? CheckSelect<T, Prisma__HackerNewsSelectedClient<HackerNewsSelected>, Prisma__HackerNewsSelectedClient<HackerNewsSelectedGetPayload<T>>> : CheckSelect<T, Prisma__HackerNewsSelectedClient<HackerNewsSelected | null >, Prisma__HackerNewsSelectedClient<HackerNewsSelectedGetPayload<T> | null >>

    /**
     * Find the first HackerNewsSelected that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsSelectedFindFirstArgs} args - Arguments to find a HackerNewsSelected
     * @example
     * // Get one HackerNewsSelected
     * const hackerNewsSelected = await prisma.hackerNewsSelected.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends HackerNewsSelectedFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, HackerNewsSelectedFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'HackerNewsSelected'> extends True ? CheckSelect<T, Prisma__HackerNewsSelectedClient<HackerNewsSelected>, Prisma__HackerNewsSelectedClient<HackerNewsSelectedGetPayload<T>>> : CheckSelect<T, Prisma__HackerNewsSelectedClient<HackerNewsSelected | null >, Prisma__HackerNewsSelectedClient<HackerNewsSelectedGetPayload<T> | null >>

    /**
     * Find zero or more HackerNewsSelecteds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsSelectedFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HackerNewsSelecteds
     * const hackerNewsSelecteds = await prisma.hackerNewsSelected.findMany()
     * 
     * // Get first 10 HackerNewsSelecteds
     * const hackerNewsSelecteds = await prisma.hackerNewsSelected.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hackerNewsSelectedWithIdOnly = await prisma.hackerNewsSelected.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends HackerNewsSelectedFindManyArgs>(
      args?: SelectSubset<T, HackerNewsSelectedFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<HackerNewsSelected>>, PrismaPromise<Array<HackerNewsSelectedGetPayload<T>>>>

    /**
     * Create a HackerNewsSelected.
     * @param {HackerNewsSelectedCreateArgs} args - Arguments to create a HackerNewsSelected.
     * @example
     * // Create one HackerNewsSelected
     * const HackerNewsSelected = await prisma.hackerNewsSelected.create({
     *   data: {
     *     // ... data to create a HackerNewsSelected
     *   }
     * })
     * 
    **/
    create<T extends HackerNewsSelectedCreateArgs>(
      args: SelectSubset<T, HackerNewsSelectedCreateArgs>
    ): CheckSelect<T, Prisma__HackerNewsSelectedClient<HackerNewsSelected>, Prisma__HackerNewsSelectedClient<HackerNewsSelectedGetPayload<T>>>

    /**
     * Delete a HackerNewsSelected.
     * @param {HackerNewsSelectedDeleteArgs} args - Arguments to delete one HackerNewsSelected.
     * @example
     * // Delete one HackerNewsSelected
     * const HackerNewsSelected = await prisma.hackerNewsSelected.delete({
     *   where: {
     *     // ... filter to delete one HackerNewsSelected
     *   }
     * })
     * 
    **/
    delete<T extends HackerNewsSelectedDeleteArgs>(
      args: SelectSubset<T, HackerNewsSelectedDeleteArgs>
    ): CheckSelect<T, Prisma__HackerNewsSelectedClient<HackerNewsSelected>, Prisma__HackerNewsSelectedClient<HackerNewsSelectedGetPayload<T>>>

    /**
     * Update one HackerNewsSelected.
     * @param {HackerNewsSelectedUpdateArgs} args - Arguments to update one HackerNewsSelected.
     * @example
     * // Update one HackerNewsSelected
     * const hackerNewsSelected = await prisma.hackerNewsSelected.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends HackerNewsSelectedUpdateArgs>(
      args: SelectSubset<T, HackerNewsSelectedUpdateArgs>
    ): CheckSelect<T, Prisma__HackerNewsSelectedClient<HackerNewsSelected>, Prisma__HackerNewsSelectedClient<HackerNewsSelectedGetPayload<T>>>

    /**
     * Delete zero or more HackerNewsSelecteds.
     * @param {HackerNewsSelectedDeleteManyArgs} args - Arguments to filter HackerNewsSelecteds to delete.
     * @example
     * // Delete a few HackerNewsSelecteds
     * const { count } = await prisma.hackerNewsSelected.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends HackerNewsSelectedDeleteManyArgs>(
      args?: SelectSubset<T, HackerNewsSelectedDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more HackerNewsSelecteds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsSelectedUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HackerNewsSelecteds
     * const hackerNewsSelected = await prisma.hackerNewsSelected.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends HackerNewsSelectedUpdateManyArgs>(
      args: SelectSubset<T, HackerNewsSelectedUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one HackerNewsSelected.
     * @param {HackerNewsSelectedUpsertArgs} args - Arguments to update or create a HackerNewsSelected.
     * @example
     * // Update or create a HackerNewsSelected
     * const hackerNewsSelected = await prisma.hackerNewsSelected.upsert({
     *   create: {
     *     // ... data to create a HackerNewsSelected
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HackerNewsSelected we want to update
     *   }
     * })
    **/
    upsert<T extends HackerNewsSelectedUpsertArgs>(
      args: SelectSubset<T, HackerNewsSelectedUpsertArgs>
    ): CheckSelect<T, Prisma__HackerNewsSelectedClient<HackerNewsSelected>, Prisma__HackerNewsSelectedClient<HackerNewsSelectedGetPayload<T>>>

    /**
     * Find one HackerNewsSelected that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {HackerNewsSelectedFindUniqueOrThrowArgs} args - Arguments to find a HackerNewsSelected
     * @example
     * // Get one HackerNewsSelected
     * const hackerNewsSelected = await prisma.hackerNewsSelected.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends HackerNewsSelectedFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, HackerNewsSelectedFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__HackerNewsSelectedClient<HackerNewsSelected>, Prisma__HackerNewsSelectedClient<HackerNewsSelectedGetPayload<T>>>

    /**
     * Find the first HackerNewsSelected that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsSelectedFindFirstOrThrowArgs} args - Arguments to find a HackerNewsSelected
     * @example
     * // Get one HackerNewsSelected
     * const hackerNewsSelected = await prisma.hackerNewsSelected.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends HackerNewsSelectedFindFirstOrThrowArgs>(
      args?: SelectSubset<T, HackerNewsSelectedFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__HackerNewsSelectedClient<HackerNewsSelected>, Prisma__HackerNewsSelectedClient<HackerNewsSelectedGetPayload<T>>>

    /**
     * Count the number of HackerNewsSelecteds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsSelectedCountArgs} args - Arguments to filter HackerNewsSelecteds to count.
     * @example
     * // Count the number of HackerNewsSelecteds
     * const count = await prisma.hackerNewsSelected.count({
     *   where: {
     *     // ... the filter for the HackerNewsSelecteds we want to count
     *   }
     * })
    **/
    count<T extends HackerNewsSelectedCountArgs>(
      args?: Subset<T, HackerNewsSelectedCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HackerNewsSelectedCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HackerNewsSelected.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsSelectedAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HackerNewsSelectedAggregateArgs>(args: Subset<T, HackerNewsSelectedAggregateArgs>): PrismaPromise<GetHackerNewsSelectedAggregateType<T>>

    /**
     * Group by HackerNewsSelected.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsSelectedGroupByArgs} args - Group by arguments.
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
      T extends HackerNewsSelectedGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HackerNewsSelectedGroupByArgs['orderBy'] }
        : { orderBy?: HackerNewsSelectedGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, HackerNewsSelectedGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHackerNewsSelectedGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for HackerNewsSelected.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__HackerNewsSelectedClient<T> implements PrismaPromise<T> {
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

    hackerNewsFirst<T extends HackerNewsFirstArgs = {}>(args?: Subset<T, HackerNewsFirstArgs>): CheckSelect<T, Prisma__HackerNewsFirstClient<HackerNewsFirst | null >, Prisma__HackerNewsFirstClient<HackerNewsFirstGetPayload<T> | null >>;

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
   * HackerNewsSelected base type for findUnique actions
   */
  export type HackerNewsSelectedFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the HackerNewsSelected
     * 
    **/
    select?: HackerNewsSelectedSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsSelectedInclude | null
    /**
     * Filter, which HackerNewsSelected to fetch.
     * 
    **/
    where: HackerNewsSelectedWhereUniqueInput
  }

  /**
   * HackerNewsSelected: findUnique
   */
  export interface HackerNewsSelectedFindUniqueArgs extends HackerNewsSelectedFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * HackerNewsSelected base type for findFirst actions
   */
  export type HackerNewsSelectedFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the HackerNewsSelected
     * 
    **/
    select?: HackerNewsSelectedSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsSelectedInclude | null
    /**
     * Filter, which HackerNewsSelected to fetch.
     * 
    **/
    where?: HackerNewsSelectedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HackerNewsSelecteds to fetch.
     * 
    **/
    orderBy?: Enumerable<HackerNewsSelectedOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HackerNewsSelecteds.
     * 
    **/
    cursor?: HackerNewsSelectedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HackerNewsSelecteds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HackerNewsSelecteds.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HackerNewsSelecteds.
     * 
    **/
    distinct?: Enumerable<HackerNewsSelectedScalarFieldEnum>
  }

  /**
   * HackerNewsSelected: findFirst
   */
  export interface HackerNewsSelectedFindFirstArgs extends HackerNewsSelectedFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * HackerNewsSelected findMany
   */
  export type HackerNewsSelectedFindManyArgs = {
    /**
     * Select specific fields to fetch from the HackerNewsSelected
     * 
    **/
    select?: HackerNewsSelectedSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsSelectedInclude | null
    /**
     * Filter, which HackerNewsSelecteds to fetch.
     * 
    **/
    where?: HackerNewsSelectedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HackerNewsSelecteds to fetch.
     * 
    **/
    orderBy?: Enumerable<HackerNewsSelectedOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HackerNewsSelecteds.
     * 
    **/
    cursor?: HackerNewsSelectedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HackerNewsSelecteds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HackerNewsSelecteds.
     * 
    **/
    skip?: number
    distinct?: Enumerable<HackerNewsSelectedScalarFieldEnum>
  }


  /**
   * HackerNewsSelected create
   */
  export type HackerNewsSelectedCreateArgs = {
    /**
     * Select specific fields to fetch from the HackerNewsSelected
     * 
    **/
    select?: HackerNewsSelectedSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsSelectedInclude | null
    /**
     * The data needed to create a HackerNewsSelected.
     * 
    **/
    data: XOR<HackerNewsSelectedCreateInput, HackerNewsSelectedUncheckedCreateInput>
  }


  /**
   * HackerNewsSelected update
   */
  export type HackerNewsSelectedUpdateArgs = {
    /**
     * Select specific fields to fetch from the HackerNewsSelected
     * 
    **/
    select?: HackerNewsSelectedSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsSelectedInclude | null
    /**
     * The data needed to update a HackerNewsSelected.
     * 
    **/
    data: XOR<HackerNewsSelectedUpdateInput, HackerNewsSelectedUncheckedUpdateInput>
    /**
     * Choose, which HackerNewsSelected to update.
     * 
    **/
    where: HackerNewsSelectedWhereUniqueInput
  }


  /**
   * HackerNewsSelected updateMany
   */
  export type HackerNewsSelectedUpdateManyArgs = {
    /**
     * The data used to update HackerNewsSelecteds.
     * 
    **/
    data: XOR<HackerNewsSelectedUpdateManyMutationInput, HackerNewsSelectedUncheckedUpdateManyInput>
    /**
     * Filter which HackerNewsSelecteds to update
     * 
    **/
    where?: HackerNewsSelectedWhereInput
  }


  /**
   * HackerNewsSelected upsert
   */
  export type HackerNewsSelectedUpsertArgs = {
    /**
     * Select specific fields to fetch from the HackerNewsSelected
     * 
    **/
    select?: HackerNewsSelectedSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsSelectedInclude | null
    /**
     * The filter to search for the HackerNewsSelected to update in case it exists.
     * 
    **/
    where: HackerNewsSelectedWhereUniqueInput
    /**
     * In case the HackerNewsSelected found by the `where` argument doesn't exist, create a new HackerNewsSelected with this data.
     * 
    **/
    create: XOR<HackerNewsSelectedCreateInput, HackerNewsSelectedUncheckedCreateInput>
    /**
     * In case the HackerNewsSelected was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<HackerNewsSelectedUpdateInput, HackerNewsSelectedUncheckedUpdateInput>
  }


  /**
   * HackerNewsSelected delete
   */
  export type HackerNewsSelectedDeleteArgs = {
    /**
     * Select specific fields to fetch from the HackerNewsSelected
     * 
    **/
    select?: HackerNewsSelectedSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsSelectedInclude | null
    /**
     * Filter which HackerNewsSelected to delete.
     * 
    **/
    where: HackerNewsSelectedWhereUniqueInput
  }


  /**
   * HackerNewsSelected deleteMany
   */
  export type HackerNewsSelectedDeleteManyArgs = {
    /**
     * Filter which HackerNewsSelecteds to delete
     * 
    **/
    where?: HackerNewsSelectedWhereInput
  }


  /**
   * HackerNewsSelected: findUniqueOrThrow
   */
  export type HackerNewsSelectedFindUniqueOrThrowArgs = HackerNewsSelectedFindUniqueArgsBase
      

  /**
   * HackerNewsSelected: findFirstOrThrow
   */
  export type HackerNewsSelectedFindFirstOrThrowArgs = HackerNewsSelectedFindFirstArgsBase
      

  /**
   * HackerNewsSelected without action
   */
  export type HackerNewsSelectedArgs = {
    /**
     * Select specific fields to fetch from the HackerNewsSelected
     * 
    **/
    select?: HackerNewsSelectedSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsSelectedInclude | null
  }



  /**
   * Model HackerNewsRedirectHit
   */


  export type AggregateHackerNewsRedirectHit = {
    _count: HackerNewsRedirectHitCountAggregateOutputType | null
    _avg: HackerNewsRedirectHitAvgAggregateOutputType | null
    _sum: HackerNewsRedirectHitSumAggregateOutputType | null
    _min: HackerNewsRedirectHitMinAggregateOutputType | null
    _max: HackerNewsRedirectHitMaxAggregateOutputType | null
  }

  export type HackerNewsRedirectHitAvgAggregateOutputType = {
    id: number | null
    hackerNewsFirstId: number | null
  }

  export type HackerNewsRedirectHitSumAggregateOutputType = {
    id: number | null
    hackerNewsFirstId: number | null
  }

  export type HackerNewsRedirectHitMinAggregateOutputType = {
    id: number | null
    hackerNewsFirstId: number | null
    createdAt: Date | null
  }

  export type HackerNewsRedirectHitMaxAggregateOutputType = {
    id: number | null
    hackerNewsFirstId: number | null
    createdAt: Date | null
  }

  export type HackerNewsRedirectHitCountAggregateOutputType = {
    id: number
    hackerNewsFirstId: number
    createdAt: number
    _all: number
  }


  export type HackerNewsRedirectHitAvgAggregateInputType = {
    id?: true
    hackerNewsFirstId?: true
  }

  export type HackerNewsRedirectHitSumAggregateInputType = {
    id?: true
    hackerNewsFirstId?: true
  }

  export type HackerNewsRedirectHitMinAggregateInputType = {
    id?: true
    hackerNewsFirstId?: true
    createdAt?: true
  }

  export type HackerNewsRedirectHitMaxAggregateInputType = {
    id?: true
    hackerNewsFirstId?: true
    createdAt?: true
  }

  export type HackerNewsRedirectHitCountAggregateInputType = {
    id?: true
    hackerNewsFirstId?: true
    createdAt?: true
    _all?: true
  }

  export type HackerNewsRedirectHitAggregateArgs = {
    /**
     * Filter which HackerNewsRedirectHit to aggregate.
     * 
    **/
    where?: HackerNewsRedirectHitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HackerNewsRedirectHits to fetch.
     * 
    **/
    orderBy?: Enumerable<HackerNewsRedirectHitOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: HackerNewsRedirectHitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HackerNewsRedirectHits from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HackerNewsRedirectHits.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HackerNewsRedirectHits
    **/
    _count?: true | HackerNewsRedirectHitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HackerNewsRedirectHitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HackerNewsRedirectHitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HackerNewsRedirectHitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HackerNewsRedirectHitMaxAggregateInputType
  }

  export type GetHackerNewsRedirectHitAggregateType<T extends HackerNewsRedirectHitAggregateArgs> = {
        [P in keyof T & keyof AggregateHackerNewsRedirectHit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHackerNewsRedirectHit[P]>
      : GetScalarType<T[P], AggregateHackerNewsRedirectHit[P]>
  }




  export type HackerNewsRedirectHitGroupByArgs = {
    where?: HackerNewsRedirectHitWhereInput
    orderBy?: Enumerable<HackerNewsRedirectHitOrderByWithAggregationInput>
    by: Array<HackerNewsRedirectHitScalarFieldEnum>
    having?: HackerNewsRedirectHitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HackerNewsRedirectHitCountAggregateInputType | true
    _avg?: HackerNewsRedirectHitAvgAggregateInputType
    _sum?: HackerNewsRedirectHitSumAggregateInputType
    _min?: HackerNewsRedirectHitMinAggregateInputType
    _max?: HackerNewsRedirectHitMaxAggregateInputType
  }


  export type HackerNewsRedirectHitGroupByOutputType = {
    id: number
    hackerNewsFirstId: number
    createdAt: Date
    _count: HackerNewsRedirectHitCountAggregateOutputType | null
    _avg: HackerNewsRedirectHitAvgAggregateOutputType | null
    _sum: HackerNewsRedirectHitSumAggregateOutputType | null
    _min: HackerNewsRedirectHitMinAggregateOutputType | null
    _max: HackerNewsRedirectHitMaxAggregateOutputType | null
  }

  type GetHackerNewsRedirectHitGroupByPayload<T extends HackerNewsRedirectHitGroupByArgs> = PrismaPromise<
    Array<
      PickArray<HackerNewsRedirectHitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HackerNewsRedirectHitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HackerNewsRedirectHitGroupByOutputType[P]>
            : GetScalarType<T[P], HackerNewsRedirectHitGroupByOutputType[P]>
        }
      >
    >


  export type HackerNewsRedirectHitSelect = {
    id?: boolean
    hackerNewsFirstId?: boolean
    createdAt?: boolean
    hackerNewsFirst?: boolean | HackerNewsFirstArgs
  }

  export type HackerNewsRedirectHitInclude = {
    hackerNewsFirst?: boolean | HackerNewsFirstArgs
  }

  export type HackerNewsRedirectHitGetPayload<
    S extends boolean | null | undefined | HackerNewsRedirectHitArgs,
    U = keyof S
      > = S extends true
        ? HackerNewsRedirectHit
    : S extends undefined
    ? never
    : S extends HackerNewsRedirectHitArgs | HackerNewsRedirectHitFindManyArgs
    ?'include' extends U
    ? HackerNewsRedirectHit  & {
    [P in TrueKeys<S['include']>]:
        P extends 'hackerNewsFirst' ? HackerNewsFirstGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'hackerNewsFirst' ? HackerNewsFirstGetPayload<S['select'][P]> :  P extends keyof HackerNewsRedirectHit ? HackerNewsRedirectHit[P] : never
  } 
    : HackerNewsRedirectHit
  : HackerNewsRedirectHit


  type HackerNewsRedirectHitCountArgs = Merge<
    Omit<HackerNewsRedirectHitFindManyArgs, 'select' | 'include'> & {
      select?: HackerNewsRedirectHitCountAggregateInputType | true
    }
  >

  export interface HackerNewsRedirectHitDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one HackerNewsRedirectHit that matches the filter.
     * @param {HackerNewsRedirectHitFindUniqueArgs} args - Arguments to find a HackerNewsRedirectHit
     * @example
     * // Get one HackerNewsRedirectHit
     * const hackerNewsRedirectHit = await prisma.hackerNewsRedirectHit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends HackerNewsRedirectHitFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, HackerNewsRedirectHitFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'HackerNewsRedirectHit'> extends True ? CheckSelect<T, Prisma__HackerNewsRedirectHitClient<HackerNewsRedirectHit>, Prisma__HackerNewsRedirectHitClient<HackerNewsRedirectHitGetPayload<T>>> : CheckSelect<T, Prisma__HackerNewsRedirectHitClient<HackerNewsRedirectHit | null >, Prisma__HackerNewsRedirectHitClient<HackerNewsRedirectHitGetPayload<T> | null >>

    /**
     * Find the first HackerNewsRedirectHit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsRedirectHitFindFirstArgs} args - Arguments to find a HackerNewsRedirectHit
     * @example
     * // Get one HackerNewsRedirectHit
     * const hackerNewsRedirectHit = await prisma.hackerNewsRedirectHit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends HackerNewsRedirectHitFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, HackerNewsRedirectHitFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'HackerNewsRedirectHit'> extends True ? CheckSelect<T, Prisma__HackerNewsRedirectHitClient<HackerNewsRedirectHit>, Prisma__HackerNewsRedirectHitClient<HackerNewsRedirectHitGetPayload<T>>> : CheckSelect<T, Prisma__HackerNewsRedirectHitClient<HackerNewsRedirectHit | null >, Prisma__HackerNewsRedirectHitClient<HackerNewsRedirectHitGetPayload<T> | null >>

    /**
     * Find zero or more HackerNewsRedirectHits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsRedirectHitFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HackerNewsRedirectHits
     * const hackerNewsRedirectHits = await prisma.hackerNewsRedirectHit.findMany()
     * 
     * // Get first 10 HackerNewsRedirectHits
     * const hackerNewsRedirectHits = await prisma.hackerNewsRedirectHit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hackerNewsRedirectHitWithIdOnly = await prisma.hackerNewsRedirectHit.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends HackerNewsRedirectHitFindManyArgs>(
      args?: SelectSubset<T, HackerNewsRedirectHitFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<HackerNewsRedirectHit>>, PrismaPromise<Array<HackerNewsRedirectHitGetPayload<T>>>>

    /**
     * Create a HackerNewsRedirectHit.
     * @param {HackerNewsRedirectHitCreateArgs} args - Arguments to create a HackerNewsRedirectHit.
     * @example
     * // Create one HackerNewsRedirectHit
     * const HackerNewsRedirectHit = await prisma.hackerNewsRedirectHit.create({
     *   data: {
     *     // ... data to create a HackerNewsRedirectHit
     *   }
     * })
     * 
    **/
    create<T extends HackerNewsRedirectHitCreateArgs>(
      args: SelectSubset<T, HackerNewsRedirectHitCreateArgs>
    ): CheckSelect<T, Prisma__HackerNewsRedirectHitClient<HackerNewsRedirectHit>, Prisma__HackerNewsRedirectHitClient<HackerNewsRedirectHitGetPayload<T>>>

    /**
     * Delete a HackerNewsRedirectHit.
     * @param {HackerNewsRedirectHitDeleteArgs} args - Arguments to delete one HackerNewsRedirectHit.
     * @example
     * // Delete one HackerNewsRedirectHit
     * const HackerNewsRedirectHit = await prisma.hackerNewsRedirectHit.delete({
     *   where: {
     *     // ... filter to delete one HackerNewsRedirectHit
     *   }
     * })
     * 
    **/
    delete<T extends HackerNewsRedirectHitDeleteArgs>(
      args: SelectSubset<T, HackerNewsRedirectHitDeleteArgs>
    ): CheckSelect<T, Prisma__HackerNewsRedirectHitClient<HackerNewsRedirectHit>, Prisma__HackerNewsRedirectHitClient<HackerNewsRedirectHitGetPayload<T>>>

    /**
     * Update one HackerNewsRedirectHit.
     * @param {HackerNewsRedirectHitUpdateArgs} args - Arguments to update one HackerNewsRedirectHit.
     * @example
     * // Update one HackerNewsRedirectHit
     * const hackerNewsRedirectHit = await prisma.hackerNewsRedirectHit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends HackerNewsRedirectHitUpdateArgs>(
      args: SelectSubset<T, HackerNewsRedirectHitUpdateArgs>
    ): CheckSelect<T, Prisma__HackerNewsRedirectHitClient<HackerNewsRedirectHit>, Prisma__HackerNewsRedirectHitClient<HackerNewsRedirectHitGetPayload<T>>>

    /**
     * Delete zero or more HackerNewsRedirectHits.
     * @param {HackerNewsRedirectHitDeleteManyArgs} args - Arguments to filter HackerNewsRedirectHits to delete.
     * @example
     * // Delete a few HackerNewsRedirectHits
     * const { count } = await prisma.hackerNewsRedirectHit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends HackerNewsRedirectHitDeleteManyArgs>(
      args?: SelectSubset<T, HackerNewsRedirectHitDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more HackerNewsRedirectHits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsRedirectHitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HackerNewsRedirectHits
     * const hackerNewsRedirectHit = await prisma.hackerNewsRedirectHit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends HackerNewsRedirectHitUpdateManyArgs>(
      args: SelectSubset<T, HackerNewsRedirectHitUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one HackerNewsRedirectHit.
     * @param {HackerNewsRedirectHitUpsertArgs} args - Arguments to update or create a HackerNewsRedirectHit.
     * @example
     * // Update or create a HackerNewsRedirectHit
     * const hackerNewsRedirectHit = await prisma.hackerNewsRedirectHit.upsert({
     *   create: {
     *     // ... data to create a HackerNewsRedirectHit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HackerNewsRedirectHit we want to update
     *   }
     * })
    **/
    upsert<T extends HackerNewsRedirectHitUpsertArgs>(
      args: SelectSubset<T, HackerNewsRedirectHitUpsertArgs>
    ): CheckSelect<T, Prisma__HackerNewsRedirectHitClient<HackerNewsRedirectHit>, Prisma__HackerNewsRedirectHitClient<HackerNewsRedirectHitGetPayload<T>>>

    /**
     * Find one HackerNewsRedirectHit that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {HackerNewsRedirectHitFindUniqueOrThrowArgs} args - Arguments to find a HackerNewsRedirectHit
     * @example
     * // Get one HackerNewsRedirectHit
     * const hackerNewsRedirectHit = await prisma.hackerNewsRedirectHit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends HackerNewsRedirectHitFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, HackerNewsRedirectHitFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__HackerNewsRedirectHitClient<HackerNewsRedirectHit>, Prisma__HackerNewsRedirectHitClient<HackerNewsRedirectHitGetPayload<T>>>

    /**
     * Find the first HackerNewsRedirectHit that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsRedirectHitFindFirstOrThrowArgs} args - Arguments to find a HackerNewsRedirectHit
     * @example
     * // Get one HackerNewsRedirectHit
     * const hackerNewsRedirectHit = await prisma.hackerNewsRedirectHit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends HackerNewsRedirectHitFindFirstOrThrowArgs>(
      args?: SelectSubset<T, HackerNewsRedirectHitFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__HackerNewsRedirectHitClient<HackerNewsRedirectHit>, Prisma__HackerNewsRedirectHitClient<HackerNewsRedirectHitGetPayload<T>>>

    /**
     * Count the number of HackerNewsRedirectHits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsRedirectHitCountArgs} args - Arguments to filter HackerNewsRedirectHits to count.
     * @example
     * // Count the number of HackerNewsRedirectHits
     * const count = await prisma.hackerNewsRedirectHit.count({
     *   where: {
     *     // ... the filter for the HackerNewsRedirectHits we want to count
     *   }
     * })
    **/
    count<T extends HackerNewsRedirectHitCountArgs>(
      args?: Subset<T, HackerNewsRedirectHitCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HackerNewsRedirectHitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HackerNewsRedirectHit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsRedirectHitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HackerNewsRedirectHitAggregateArgs>(args: Subset<T, HackerNewsRedirectHitAggregateArgs>): PrismaPromise<GetHackerNewsRedirectHitAggregateType<T>>

    /**
     * Group by HackerNewsRedirectHit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HackerNewsRedirectHitGroupByArgs} args - Group by arguments.
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
      T extends HackerNewsRedirectHitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HackerNewsRedirectHitGroupByArgs['orderBy'] }
        : { orderBy?: HackerNewsRedirectHitGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, HackerNewsRedirectHitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHackerNewsRedirectHitGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for HackerNewsRedirectHit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__HackerNewsRedirectHitClient<T> implements PrismaPromise<T> {
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

    hackerNewsFirst<T extends HackerNewsFirstArgs = {}>(args?: Subset<T, HackerNewsFirstArgs>): CheckSelect<T, Prisma__HackerNewsFirstClient<HackerNewsFirst | null >, Prisma__HackerNewsFirstClient<HackerNewsFirstGetPayload<T> | null >>;

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
   * HackerNewsRedirectHit base type for findUnique actions
   */
  export type HackerNewsRedirectHitFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the HackerNewsRedirectHit
     * 
    **/
    select?: HackerNewsRedirectHitSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsRedirectHitInclude | null
    /**
     * Filter, which HackerNewsRedirectHit to fetch.
     * 
    **/
    where: HackerNewsRedirectHitWhereUniqueInput
  }

  /**
   * HackerNewsRedirectHit: findUnique
   */
  export interface HackerNewsRedirectHitFindUniqueArgs extends HackerNewsRedirectHitFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * HackerNewsRedirectHit base type for findFirst actions
   */
  export type HackerNewsRedirectHitFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the HackerNewsRedirectHit
     * 
    **/
    select?: HackerNewsRedirectHitSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsRedirectHitInclude | null
    /**
     * Filter, which HackerNewsRedirectHit to fetch.
     * 
    **/
    where?: HackerNewsRedirectHitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HackerNewsRedirectHits to fetch.
     * 
    **/
    orderBy?: Enumerable<HackerNewsRedirectHitOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HackerNewsRedirectHits.
     * 
    **/
    cursor?: HackerNewsRedirectHitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HackerNewsRedirectHits from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HackerNewsRedirectHits.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HackerNewsRedirectHits.
     * 
    **/
    distinct?: Enumerable<HackerNewsRedirectHitScalarFieldEnum>
  }

  /**
   * HackerNewsRedirectHit: findFirst
   */
  export interface HackerNewsRedirectHitFindFirstArgs extends HackerNewsRedirectHitFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * HackerNewsRedirectHit findMany
   */
  export type HackerNewsRedirectHitFindManyArgs = {
    /**
     * Select specific fields to fetch from the HackerNewsRedirectHit
     * 
    **/
    select?: HackerNewsRedirectHitSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsRedirectHitInclude | null
    /**
     * Filter, which HackerNewsRedirectHits to fetch.
     * 
    **/
    where?: HackerNewsRedirectHitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HackerNewsRedirectHits to fetch.
     * 
    **/
    orderBy?: Enumerable<HackerNewsRedirectHitOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HackerNewsRedirectHits.
     * 
    **/
    cursor?: HackerNewsRedirectHitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HackerNewsRedirectHits from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HackerNewsRedirectHits.
     * 
    **/
    skip?: number
    distinct?: Enumerable<HackerNewsRedirectHitScalarFieldEnum>
  }


  /**
   * HackerNewsRedirectHit create
   */
  export type HackerNewsRedirectHitCreateArgs = {
    /**
     * Select specific fields to fetch from the HackerNewsRedirectHit
     * 
    **/
    select?: HackerNewsRedirectHitSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsRedirectHitInclude | null
    /**
     * The data needed to create a HackerNewsRedirectHit.
     * 
    **/
    data: XOR<HackerNewsRedirectHitCreateInput, HackerNewsRedirectHitUncheckedCreateInput>
  }


  /**
   * HackerNewsRedirectHit update
   */
  export type HackerNewsRedirectHitUpdateArgs = {
    /**
     * Select specific fields to fetch from the HackerNewsRedirectHit
     * 
    **/
    select?: HackerNewsRedirectHitSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsRedirectHitInclude | null
    /**
     * The data needed to update a HackerNewsRedirectHit.
     * 
    **/
    data: XOR<HackerNewsRedirectHitUpdateInput, HackerNewsRedirectHitUncheckedUpdateInput>
    /**
     * Choose, which HackerNewsRedirectHit to update.
     * 
    **/
    where: HackerNewsRedirectHitWhereUniqueInput
  }


  /**
   * HackerNewsRedirectHit updateMany
   */
  export type HackerNewsRedirectHitUpdateManyArgs = {
    /**
     * The data used to update HackerNewsRedirectHits.
     * 
    **/
    data: XOR<HackerNewsRedirectHitUpdateManyMutationInput, HackerNewsRedirectHitUncheckedUpdateManyInput>
    /**
     * Filter which HackerNewsRedirectHits to update
     * 
    **/
    where?: HackerNewsRedirectHitWhereInput
  }


  /**
   * HackerNewsRedirectHit upsert
   */
  export type HackerNewsRedirectHitUpsertArgs = {
    /**
     * Select specific fields to fetch from the HackerNewsRedirectHit
     * 
    **/
    select?: HackerNewsRedirectHitSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsRedirectHitInclude | null
    /**
     * The filter to search for the HackerNewsRedirectHit to update in case it exists.
     * 
    **/
    where: HackerNewsRedirectHitWhereUniqueInput
    /**
     * In case the HackerNewsRedirectHit found by the `where` argument doesn't exist, create a new HackerNewsRedirectHit with this data.
     * 
    **/
    create: XOR<HackerNewsRedirectHitCreateInput, HackerNewsRedirectHitUncheckedCreateInput>
    /**
     * In case the HackerNewsRedirectHit was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<HackerNewsRedirectHitUpdateInput, HackerNewsRedirectHitUncheckedUpdateInput>
  }


  /**
   * HackerNewsRedirectHit delete
   */
  export type HackerNewsRedirectHitDeleteArgs = {
    /**
     * Select specific fields to fetch from the HackerNewsRedirectHit
     * 
    **/
    select?: HackerNewsRedirectHitSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsRedirectHitInclude | null
    /**
     * Filter which HackerNewsRedirectHit to delete.
     * 
    **/
    where: HackerNewsRedirectHitWhereUniqueInput
  }


  /**
   * HackerNewsRedirectHit deleteMany
   */
  export type HackerNewsRedirectHitDeleteManyArgs = {
    /**
     * Filter which HackerNewsRedirectHits to delete
     * 
    **/
    where?: HackerNewsRedirectHitWhereInput
  }


  /**
   * HackerNewsRedirectHit: findUniqueOrThrow
   */
  export type HackerNewsRedirectHitFindUniqueOrThrowArgs = HackerNewsRedirectHitFindUniqueArgsBase
      

  /**
   * HackerNewsRedirectHit: findFirstOrThrow
   */
  export type HackerNewsRedirectHitFindFirstOrThrowArgs = HackerNewsRedirectHitFindFirstArgsBase
      

  /**
   * HackerNewsRedirectHit without action
   */
  export type HackerNewsRedirectHitArgs = {
    /**
     * Select specific fields to fetch from the HackerNewsRedirectHit
     * 
    **/
    select?: HackerNewsRedirectHitSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: HackerNewsRedirectHitInclude | null
  }



  /**
   * Model Contact
   */


  export type AggregateContact = {
    _count: ContactCountAggregateOutputType | null
    _avg: ContactAvgAggregateOutputType | null
    _sum: ContactSumAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  export type ContactAvgAggregateOutputType = {
    id: number | null
  }

  export type ContactSumAggregateOutputType = {
    id: number | null
  }

  export type ContactMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContactMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContactCountAggregateOutputType = {
    id: number
    name: number
    email: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ContactAvgAggregateInputType = {
    id?: true
  }

  export type ContactSumAggregateInputType = {
    id?: true
  }

  export type ContactMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContactMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContactCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ContactAggregateArgs = {
    /**
     * Filter which Contact to aggregate.
     * 
    **/
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     * 
    **/
    orderBy?: Enumerable<ContactOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contacts
    **/
    _count?: true | ContactCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContactAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContactSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactMaxAggregateInputType
  }

  export type GetContactAggregateType<T extends ContactAggregateArgs> = {
        [P in keyof T & keyof AggregateContact]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContact[P]>
      : GetScalarType<T[P], AggregateContact[P]>
  }




  export type ContactGroupByArgs = {
    where?: ContactWhereInput
    orderBy?: Enumerable<ContactOrderByWithAggregationInput>
    by: Array<ContactScalarFieldEnum>
    having?: ContactScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactCountAggregateInputType | true
    _avg?: ContactAvgAggregateInputType
    _sum?: ContactSumAggregateInputType
    _min?: ContactMinAggregateInputType
    _max?: ContactMaxAggregateInputType
  }


  export type ContactGroupByOutputType = {
    id: number
    name: string | null
    email: string
    createdAt: Date
    updatedAt: Date
    _count: ContactCountAggregateOutputType | null
    _avg: ContactAvgAggregateOutputType | null
    _sum: ContactSumAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  type GetContactGroupByPayload<T extends ContactGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ContactGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactGroupByOutputType[P]>
            : GetScalarType<T[P], ContactGroupByOutputType[P]>
        }
      >
    >


  export type ContactSelect = {
    id?: boolean
    name?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ContactGetPayload<
    S extends boolean | null | undefined | ContactArgs,
    U = keyof S
      > = S extends true
        ? Contact
    : S extends undefined
    ? never
    : S extends ContactArgs | ContactFindManyArgs
    ?'include' extends U
    ? Contact 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof Contact ? Contact[P] : never
  } 
    : Contact
  : Contact


  type ContactCountArgs = Merge<
    Omit<ContactFindManyArgs, 'select' | 'include'> & {
      select?: ContactCountAggregateInputType | true
    }
  >

  export interface ContactDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Contact that matches the filter.
     * @param {ContactFindUniqueArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ContactFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ContactFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Contact'> extends True ? CheckSelect<T, Prisma__ContactClient<Contact>, Prisma__ContactClient<ContactGetPayload<T>>> : CheckSelect<T, Prisma__ContactClient<Contact | null >, Prisma__ContactClient<ContactGetPayload<T> | null >>

    /**
     * Find the first Contact that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ContactFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ContactFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Contact'> extends True ? CheckSelect<T, Prisma__ContactClient<Contact>, Prisma__ContactClient<ContactGetPayload<T>>> : CheckSelect<T, Prisma__ContactClient<Contact | null >, Prisma__ContactClient<ContactGetPayload<T> | null >>

    /**
     * Find zero or more Contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contacts
     * const contacts = await prisma.contact.findMany()
     * 
     * // Get first 10 Contacts
     * const contacts = await prisma.contact.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactWithIdOnly = await prisma.contact.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ContactFindManyArgs>(
      args?: SelectSubset<T, ContactFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Contact>>, PrismaPromise<Array<ContactGetPayload<T>>>>

    /**
     * Create a Contact.
     * @param {ContactCreateArgs} args - Arguments to create a Contact.
     * @example
     * // Create one Contact
     * const Contact = await prisma.contact.create({
     *   data: {
     *     // ... data to create a Contact
     *   }
     * })
     * 
    **/
    create<T extends ContactCreateArgs>(
      args: SelectSubset<T, ContactCreateArgs>
    ): CheckSelect<T, Prisma__ContactClient<Contact>, Prisma__ContactClient<ContactGetPayload<T>>>

    /**
     * Delete a Contact.
     * @param {ContactDeleteArgs} args - Arguments to delete one Contact.
     * @example
     * // Delete one Contact
     * const Contact = await prisma.contact.delete({
     *   where: {
     *     // ... filter to delete one Contact
     *   }
     * })
     * 
    **/
    delete<T extends ContactDeleteArgs>(
      args: SelectSubset<T, ContactDeleteArgs>
    ): CheckSelect<T, Prisma__ContactClient<Contact>, Prisma__ContactClient<ContactGetPayload<T>>>

    /**
     * Update one Contact.
     * @param {ContactUpdateArgs} args - Arguments to update one Contact.
     * @example
     * // Update one Contact
     * const contact = await prisma.contact.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ContactUpdateArgs>(
      args: SelectSubset<T, ContactUpdateArgs>
    ): CheckSelect<T, Prisma__ContactClient<Contact>, Prisma__ContactClient<ContactGetPayload<T>>>

    /**
     * Delete zero or more Contacts.
     * @param {ContactDeleteManyArgs} args - Arguments to filter Contacts to delete.
     * @example
     * // Delete a few Contacts
     * const { count } = await prisma.contact.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ContactDeleteManyArgs>(
      args?: SelectSubset<T, ContactDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ContactUpdateManyArgs>(
      args: SelectSubset<T, ContactUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Contact.
     * @param {ContactUpsertArgs} args - Arguments to update or create a Contact.
     * @example
     * // Update or create a Contact
     * const contact = await prisma.contact.upsert({
     *   create: {
     *     // ... data to create a Contact
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contact we want to update
     *   }
     * })
    **/
    upsert<T extends ContactUpsertArgs>(
      args: SelectSubset<T, ContactUpsertArgs>
    ): CheckSelect<T, Prisma__ContactClient<Contact>, Prisma__ContactClient<ContactGetPayload<T>>>

    /**
     * Find one Contact that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ContactFindUniqueOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ContactFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ContactFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ContactClient<Contact>, Prisma__ContactClient<ContactGetPayload<T>>>

    /**
     * Find the first Contact that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ContactFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ContactFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ContactClient<Contact>, Prisma__ContactClient<ContactGetPayload<T>>>

    /**
     * Count the number of Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactCountArgs} args - Arguments to filter Contacts to count.
     * @example
     * // Count the number of Contacts
     * const count = await prisma.contact.count({
     *   where: {
     *     // ... the filter for the Contacts we want to count
     *   }
     * })
    **/
    count<T extends ContactCountArgs>(
      args?: Subset<T, ContactCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContactAggregateArgs>(args: Subset<T, ContactAggregateArgs>): PrismaPromise<GetContactAggregateType<T>>

    /**
     * Group by Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactGroupByArgs} args - Group by arguments.
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
      T extends ContactGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactGroupByArgs['orderBy'] }
        : { orderBy?: ContactGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ContactGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contact.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ContactClient<T> implements PrismaPromise<T> {
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
   * Contact base type for findUnique actions
   */
  export type ContactFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Contact
     * 
    **/
    select?: ContactSelect | null
    /**
     * Filter, which Contact to fetch.
     * 
    **/
    where: ContactWhereUniqueInput
  }

  /**
   * Contact: findUnique
   */
  export interface ContactFindUniqueArgs extends ContactFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Contact base type for findFirst actions
   */
  export type ContactFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Contact
     * 
    **/
    select?: ContactSelect | null
    /**
     * Filter, which Contact to fetch.
     * 
    **/
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     * 
    **/
    orderBy?: Enumerable<ContactOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     * 
    **/
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     * 
    **/
    distinct?: Enumerable<ContactScalarFieldEnum>
  }

  /**
   * Contact: findFirst
   */
  export interface ContactFindFirstArgs extends ContactFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Contact findMany
   */
  export type ContactFindManyArgs = {
    /**
     * Select specific fields to fetch from the Contact
     * 
    **/
    select?: ContactSelect | null
    /**
     * Filter, which Contacts to fetch.
     * 
    **/
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     * 
    **/
    orderBy?: Enumerable<ContactOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contacts.
     * 
    **/
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ContactScalarFieldEnum>
  }


  /**
   * Contact create
   */
  export type ContactCreateArgs = {
    /**
     * Select specific fields to fetch from the Contact
     * 
    **/
    select?: ContactSelect | null
    /**
     * The data needed to create a Contact.
     * 
    **/
    data: XOR<ContactCreateInput, ContactUncheckedCreateInput>
  }


  /**
   * Contact update
   */
  export type ContactUpdateArgs = {
    /**
     * Select specific fields to fetch from the Contact
     * 
    **/
    select?: ContactSelect | null
    /**
     * The data needed to update a Contact.
     * 
    **/
    data: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
    /**
     * Choose, which Contact to update.
     * 
    **/
    where: ContactWhereUniqueInput
  }


  /**
   * Contact updateMany
   */
  export type ContactUpdateManyArgs = {
    /**
     * The data used to update Contacts.
     * 
    **/
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     * 
    **/
    where?: ContactWhereInput
  }


  /**
   * Contact upsert
   */
  export type ContactUpsertArgs = {
    /**
     * Select specific fields to fetch from the Contact
     * 
    **/
    select?: ContactSelect | null
    /**
     * The filter to search for the Contact to update in case it exists.
     * 
    **/
    where: ContactWhereUniqueInput
    /**
     * In case the Contact found by the `where` argument doesn't exist, create a new Contact with this data.
     * 
    **/
    create: XOR<ContactCreateInput, ContactUncheckedCreateInput>
    /**
     * In case the Contact was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
  }


  /**
   * Contact delete
   */
  export type ContactDeleteArgs = {
    /**
     * Select specific fields to fetch from the Contact
     * 
    **/
    select?: ContactSelect | null
    /**
     * Filter which Contact to delete.
     * 
    **/
    where: ContactWhereUniqueInput
  }


  /**
   * Contact deleteMany
   */
  export type ContactDeleteManyArgs = {
    /**
     * Filter which Contacts to delete
     * 
    **/
    where?: ContactWhereInput
  }


  /**
   * Contact: findUniqueOrThrow
   */
  export type ContactFindUniqueOrThrowArgs = ContactFindUniqueArgsBase
      

  /**
   * Contact: findFirstOrThrow
   */
  export type ContactFindFirstOrThrowArgs = ContactFindFirstArgsBase
      

  /**
   * Contact without action
   */
  export type ContactArgs = {
    /**
     * Select specific fields to fetch from the Contact
     * 
    **/
    select?: ContactSelect | null
  }



  /**
   * Model Post
   */


  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostAvgAggregateOutputType = {
    id: number | null
    authorId: number | null
  }

  export type PostSumAggregateOutputType = {
    id: number | null
    authorId: number | null
  }

  export type PostMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    content: string | null
    published: boolean | null
    authorId: number | null
  }

  export type PostMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    content: string | null
    published: boolean | null
    authorId: number | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    title: number
    content: number
    published: number
    authorId: number
    _all: number
  }


  export type PostAvgAggregateInputType = {
    id?: true
    authorId?: true
  }

  export type PostSumAggregateInputType = {
    id?: true
    authorId?: true
  }

  export type PostMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    content?: true
    published?: true
    authorId?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    content?: true
    published?: true
    authorId?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    content?: true
    published?: true
    authorId?: true
    _all?: true
  }

  export type PostAggregateArgs = {
    /**
     * Filter which Post to aggregate.
     * 
    **/
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     * 
    **/
    orderBy?: Enumerable<PostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs = {
    where?: PostWhereInput
    orderBy?: Enumerable<PostOrderByWithAggregationInput>
    by: Array<PostScalarFieldEnum>
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }


  export type PostGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    title: string
    content: string | null
    published: boolean
    authorId: number
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    content?: boolean
    published?: boolean
    author?: boolean | UserArgs
    authorId?: boolean
  }

  export type PostInclude = {
    author?: boolean | UserArgs
  }

  export type PostGetPayload<
    S extends boolean | null | undefined | PostArgs,
    U = keyof S
      > = S extends true
        ? Post
    : S extends undefined
    ? never
    : S extends PostArgs | PostFindManyArgs
    ?'include' extends U
    ? Post  & {
    [P in TrueKeys<S['include']>]:
        P extends 'author' ? UserGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'author' ? UserGetPayload<S['select'][P]> :  P extends keyof Post ? Post[P] : never
  } 
    : Post
  : Post


  type PostCountArgs = Merge<
    Omit<PostFindManyArgs, 'select' | 'include'> & {
      select?: PostCountAggregateInputType | true
    }
  >

  export interface PostDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PostFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PostFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Post'> extends True ? CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>> : CheckSelect<T, Prisma__PostClient<Post | null >, Prisma__PostClient<PostGetPayload<T> | null >>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PostFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PostFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Post'> extends True ? CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>> : CheckSelect<T, Prisma__PostClient<Post | null >, Prisma__PostClient<PostGetPayload<T> | null >>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PostFindManyArgs>(
      args?: SelectSubset<T, PostFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Post>>, PrismaPromise<Array<PostGetPayload<T>>>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
    **/
    create<T extends PostCreateArgs>(
      args: SelectSubset<T, PostCreateArgs>
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
    **/
    delete<T extends PostDeleteArgs>(
      args: SelectSubset<T, PostDeleteArgs>
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PostUpdateArgs>(
      args: SelectSubset<T, PostUpdateArgs>
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PostDeleteManyArgs>(
      args?: SelectSubset<T, PostDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PostUpdateManyArgs>(
      args: SelectSubset<T, PostUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
    **/
    upsert<T extends PostUpsertArgs>(
      args: SelectSubset<T, PostUpsertArgs>
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>

    /**
     * Find one Post that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PostFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>

    /**
     * Find the first Post that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PostFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__PostClient<Post>, Prisma__PostClient<PostGetPayload<T>>>

    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
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
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PostClient<T> implements PrismaPromise<T> {
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

    author<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

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
   * Post base type for findUnique actions
   */
  export type PostFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * Filter, which Post to fetch.
     * 
    **/
    where: PostWhereUniqueInput
  }

  /**
   * Post: findUnique
   */
  export interface PostFindUniqueArgs extends PostFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Post base type for findFirst actions
   */
  export type PostFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * Filter, which Post to fetch.
     * 
    **/
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     * 
    **/
    orderBy?: Enumerable<PostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     * 
    **/
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     * 
    **/
    distinct?: Enumerable<PostScalarFieldEnum>
  }

  /**
   * Post: findFirst
   */
  export interface PostFindFirstArgs extends PostFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Post findMany
   */
  export type PostFindManyArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * Filter, which Posts to fetch.
     * 
    **/
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     * 
    **/
    orderBy?: Enumerable<PostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     * 
    **/
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PostScalarFieldEnum>
  }


  /**
   * Post create
   */
  export type PostCreateArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * The data needed to create a Post.
     * 
    **/
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }


  /**
   * Post update
   */
  export type PostUpdateArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * The data needed to update a Post.
     * 
    **/
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     * 
    **/
    where: PostWhereUniqueInput
  }


  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs = {
    /**
     * The data used to update Posts.
     * 
    **/
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     * 
    **/
    where?: PostWhereInput
  }


  /**
   * Post upsert
   */
  export type PostUpsertArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * The filter to search for the Post to update in case it exists.
     * 
    **/
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     * 
    **/
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }


  /**
   * Post delete
   */
  export type PostDeleteArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * Filter which Post to delete.
     * 
    **/
    where: PostWhereUniqueInput
  }


  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs = {
    /**
     * Filter which Posts to delete
     * 
    **/
    where?: PostWhereInput
  }


  /**
   * Post: findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs = PostFindUniqueArgsBase
      

  /**
   * Post: findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs = PostFindFirstArgsBase
      

  /**
   * Post without action
   */
  export type PostArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
  }



  /**
   * Model Profile
   */


  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ProfileSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ProfileMinAggregateOutputType = {
    id: number | null
    bio: string | null
    userId: number | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: number | null
    bio: string | null
    userId: number | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    bio: number
    userId: number
    _all: number
  }


  export type ProfileAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ProfileSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ProfileMinAggregateInputType = {
    id?: true
    bio?: true
    userId?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    bio?: true
    userId?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    bio?: true
    userId?: true
    _all?: true
  }

  export type ProfileAggregateArgs = {
    /**
     * Filter which Profile to aggregate.
     * 
    **/
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     * 
    **/
    orderBy?: Enumerable<ProfileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs = {
    where?: ProfileWhereInput
    orderBy?: Enumerable<ProfileOrderByWithAggregationInput>
    by: Array<ProfileScalarFieldEnum>
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _avg?: ProfileAvgAggregateInputType
    _sum?: ProfileSumAggregateInputType
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }


  export type ProfileGroupByOutputType = {
    id: number
    bio: string | null
    userId: number
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect = {
    id?: boolean
    bio?: boolean
    user?: boolean | UserArgs
    userId?: boolean
  }

  export type ProfileInclude = {
    user?: boolean | UserArgs
  }

  export type ProfileGetPayload<
    S extends boolean | null | undefined | ProfileArgs,
    U = keyof S
      > = S extends true
        ? Profile
    : S extends undefined
    ? never
    : S extends ProfileArgs | ProfileFindManyArgs
    ?'include' extends U
    ? Profile  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :  P extends keyof Profile ? Profile[P] : never
  } 
    : Profile
  : Profile


  type ProfileCountArgs = Merge<
    Omit<ProfileFindManyArgs, 'select' | 'include'> & {
      select?: ProfileCountAggregateInputType | true
    }
  >

  export interface ProfileDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProfileFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProfileFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Profile'> extends True ? CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>> : CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProfileFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProfileFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Profile'> extends True ? CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>> : CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProfileFindManyArgs>(
      args?: SelectSubset<T, ProfileFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Profile>>, PrismaPromise<Array<ProfileGetPayload<T>>>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
    **/
    create<T extends ProfileCreateArgs>(
      args: SelectSubset<T, ProfileCreateArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
    **/
    delete<T extends ProfileDeleteArgs>(
      args: SelectSubset<T, ProfileDeleteArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProfileUpdateArgs>(
      args: SelectSubset<T, ProfileUpdateArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProfileDeleteManyArgs>(
      args?: SelectSubset<T, ProfileDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProfileUpdateManyArgs>(
      args: SelectSubset<T, ProfileUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
    **/
    upsert<T extends ProfileUpsertArgs>(
      args: SelectSubset<T, ProfileUpsertArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Find one Profile that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ProfileFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Find the first Profile that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProfileFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ProfileClient<Profile>, Prisma__ProfileClient<ProfileGetPayload<T>>>

    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
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
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProfileClient<T> implements PrismaPromise<T> {
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

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

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
   * Profile base type for findUnique actions
   */
  export type ProfileFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * Filter, which Profile to fetch.
     * 
    **/
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile: findUnique
   */
  export interface ProfileFindUniqueArgs extends ProfileFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Profile base type for findFirst actions
   */
  export type ProfileFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * Filter, which Profile to fetch.
     * 
    **/
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     * 
    **/
    orderBy?: Enumerable<ProfileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     * 
    **/
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     * 
    **/
    distinct?: Enumerable<ProfileScalarFieldEnum>
  }

  /**
   * Profile: findFirst
   */
  export interface ProfileFindFirstArgs extends ProfileFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * Filter, which Profiles to fetch.
     * 
    **/
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     * 
    **/
    orderBy?: Enumerable<ProfileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     * 
    **/
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ProfileScalarFieldEnum>
  }


  /**
   * Profile create
   */
  export type ProfileCreateArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * The data needed to create a Profile.
     * 
    **/
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }


  /**
   * Profile update
   */
  export type ProfileUpdateArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * The data needed to update a Profile.
     * 
    **/
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     * 
    **/
    where: ProfileWhereUniqueInput
  }


  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs = {
    /**
     * The data used to update Profiles.
     * 
    **/
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     * 
    **/
    where?: ProfileWhereInput
  }


  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * The filter to search for the Profile to update in case it exists.
     * 
    **/
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     * 
    **/
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }


  /**
   * Profile delete
   */
  export type ProfileDeleteArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * Filter which Profile to delete.
     * 
    **/
    where: ProfileWhereUniqueInput
  }


  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs = {
    /**
     * Filter which Profiles to delete
     * 
    **/
    where?: ProfileWhereInput
  }


  /**
   * Profile: findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs = ProfileFindUniqueArgsBase
      

  /**
   * Profile: findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs = ProfileFindFirstArgsBase
      

  /**
   * Profile without action
   */
  export type ProfileArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
  }



  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: number
    email: string
    name: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    email?: boolean
    name?: boolean
    posts?: boolean | PostFindManyArgs
    profile?: boolean | ProfileArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserInclude = {
    posts?: boolean | PostFindManyArgs
    profile?: boolean | ProfileArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
      > = S extends true
        ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ?'include' extends U
    ? User  & {
    [P in TrueKeys<S['include']>]:
        P extends 'posts' ? Array < PostGetPayload<S['include'][P]>>  :
        P extends 'profile' ? ProfileGetPayload<S['include'][P]> | null :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'posts' ? Array < PostGetPayload<S['select'][P]>>  :
        P extends 'profile' ? ProfileGetPayload<S['select'][P]> | null :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof User ? User[P] : never
  } 
    : User
  : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find one User that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T> implements PrismaPromise<T> {
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

    posts<T extends PostFindManyArgs = {}>(args?: Subset<T, PostFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Post>>, PrismaPromise<Array<PostGetPayload<T>>>>;

    profile<T extends ProfileArgs = {}>(args?: Subset<T, ProfileArgs>): CheckSelect<T, Prisma__ProfileClient<Profile | null >, Prisma__ProfileClient<ProfileGetPayload<T> | null >>;

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
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }

  /**
   * User: findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User: findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User: findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = UserFindUniqueArgsBase
      

  /**
   * User: findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = UserFindFirstArgsBase
      

  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const ContactScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ContactScalarFieldEnum = (typeof ContactScalarFieldEnum)[keyof typeof ContactScalarFieldEnum]


  export const HackerNewsFirstScalarFieldEnum: {
    id: 'id',
    hnId: 'hnId',
    title: 'title',
    url: 'url',
    upVotes: 'upVotes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HackerNewsFirstScalarFieldEnum = (typeof HackerNewsFirstScalarFieldEnum)[keyof typeof HackerNewsFirstScalarFieldEnum]


  export const HackerNewsRedirectHitScalarFieldEnum: {
    id: 'id',
    hackerNewsFirstId: 'hackerNewsFirstId',
    createdAt: 'createdAt'
  };

  export type HackerNewsRedirectHitScalarFieldEnum = (typeof HackerNewsRedirectHitScalarFieldEnum)[keyof typeof HackerNewsRedirectHitScalarFieldEnum]


  export const HackerNewsSelectedScalarFieldEnum: {
    id: 'id',
    hackerNewsFirstId: 'hackerNewsFirstId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HackerNewsSelectedScalarFieldEnum = (typeof HackerNewsSelectedScalarFieldEnum)[keyof typeof HackerNewsSelectedScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    title: 'title',
    content: 'content',
    published: 'published',
    authorId: 'authorId'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    bio: 'bio',
    userId: 'userId'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type HackerNewsFirstWhereInput = {
    AND?: Enumerable<HackerNewsFirstWhereInput>
    OR?: Enumerable<HackerNewsFirstWhereInput>
    NOT?: Enumerable<HackerNewsFirstWhereInput>
    id?: IntFilter | number
    hnId?: IntFilter | number
    title?: StringFilter | string
    url?: StringFilter | string
    upVotes?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    HackerNewsSelected?: XOR<HackerNewsSelectedRelationFilter, HackerNewsSelectedWhereInput> | null
    HackerNewsRedirectHit?: HackerNewsRedirectHitListRelationFilter
  }

  export type HackerNewsFirstOrderByWithRelationInput = {
    id?: SortOrder
    hnId?: SortOrder
    title?: SortOrder
    url?: SortOrder
    upVotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    HackerNewsSelected?: HackerNewsSelectedOrderByWithRelationInput
    HackerNewsRedirectHit?: HackerNewsRedirectHitOrderByRelationAggregateInput
  }

  export type HackerNewsFirstWhereUniqueInput = {
    id?: number
    hnId?: number
  }

  export type HackerNewsFirstOrderByWithAggregationInput = {
    id?: SortOrder
    hnId?: SortOrder
    title?: SortOrder
    url?: SortOrder
    upVotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HackerNewsFirstCountOrderByAggregateInput
    _avg?: HackerNewsFirstAvgOrderByAggregateInput
    _max?: HackerNewsFirstMaxOrderByAggregateInput
    _min?: HackerNewsFirstMinOrderByAggregateInput
    _sum?: HackerNewsFirstSumOrderByAggregateInput
  }

  export type HackerNewsFirstScalarWhereWithAggregatesInput = {
    AND?: Enumerable<HackerNewsFirstScalarWhereWithAggregatesInput>
    OR?: Enumerable<HackerNewsFirstScalarWhereWithAggregatesInput>
    NOT?: Enumerable<HackerNewsFirstScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    hnId?: IntWithAggregatesFilter | number
    title?: StringWithAggregatesFilter | string
    url?: StringWithAggregatesFilter | string
    upVotes?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type HackerNewsSelectedWhereInput = {
    AND?: Enumerable<HackerNewsSelectedWhereInput>
    OR?: Enumerable<HackerNewsSelectedWhereInput>
    NOT?: Enumerable<HackerNewsSelectedWhereInput>
    id?: IntFilter | number
    hackerNewsFirstId?: IntFilter | number
    status?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    hackerNewsFirst?: XOR<HackerNewsFirstRelationFilter, HackerNewsFirstWhereInput>
  }

  export type HackerNewsSelectedOrderByWithRelationInput = {
    id?: SortOrder
    hackerNewsFirstId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    hackerNewsFirst?: HackerNewsFirstOrderByWithRelationInput
  }

  export type HackerNewsSelectedWhereUniqueInput = {
    id?: number
    hackerNewsFirstId?: number
  }

  export type HackerNewsSelectedOrderByWithAggregationInput = {
    id?: SortOrder
    hackerNewsFirstId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HackerNewsSelectedCountOrderByAggregateInput
    _avg?: HackerNewsSelectedAvgOrderByAggregateInput
    _max?: HackerNewsSelectedMaxOrderByAggregateInput
    _min?: HackerNewsSelectedMinOrderByAggregateInput
    _sum?: HackerNewsSelectedSumOrderByAggregateInput
  }

  export type HackerNewsSelectedScalarWhereWithAggregatesInput = {
    AND?: Enumerable<HackerNewsSelectedScalarWhereWithAggregatesInput>
    OR?: Enumerable<HackerNewsSelectedScalarWhereWithAggregatesInput>
    NOT?: Enumerable<HackerNewsSelectedScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    hackerNewsFirstId?: IntWithAggregatesFilter | number
    status?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type HackerNewsRedirectHitWhereInput = {
    AND?: Enumerable<HackerNewsRedirectHitWhereInput>
    OR?: Enumerable<HackerNewsRedirectHitWhereInput>
    NOT?: Enumerable<HackerNewsRedirectHitWhereInput>
    id?: IntFilter | number
    hackerNewsFirstId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    hackerNewsFirst?: XOR<HackerNewsFirstRelationFilter, HackerNewsFirstWhereInput>
  }

  export type HackerNewsRedirectHitOrderByWithRelationInput = {
    id?: SortOrder
    hackerNewsFirstId?: SortOrder
    createdAt?: SortOrder
    hackerNewsFirst?: HackerNewsFirstOrderByWithRelationInput
  }

  export type HackerNewsRedirectHitWhereUniqueInput = {
    id?: number
  }

  export type HackerNewsRedirectHitOrderByWithAggregationInput = {
    id?: SortOrder
    hackerNewsFirstId?: SortOrder
    createdAt?: SortOrder
    _count?: HackerNewsRedirectHitCountOrderByAggregateInput
    _avg?: HackerNewsRedirectHitAvgOrderByAggregateInput
    _max?: HackerNewsRedirectHitMaxOrderByAggregateInput
    _min?: HackerNewsRedirectHitMinOrderByAggregateInput
    _sum?: HackerNewsRedirectHitSumOrderByAggregateInput
  }

  export type HackerNewsRedirectHitScalarWhereWithAggregatesInput = {
    AND?: Enumerable<HackerNewsRedirectHitScalarWhereWithAggregatesInput>
    OR?: Enumerable<HackerNewsRedirectHitScalarWhereWithAggregatesInput>
    NOT?: Enumerable<HackerNewsRedirectHitScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    hackerNewsFirstId?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ContactWhereInput = {
    AND?: Enumerable<ContactWhereInput>
    OR?: Enumerable<ContactWhereInput>
    NOT?: Enumerable<ContactWhereInput>
    id?: IntFilter | number
    name?: StringNullableFilter | string | null
    email?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type ContactOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactWhereUniqueInput = {
    id?: number
    email?: string
  }

  export type ContactOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ContactCountOrderByAggregateInput
    _avg?: ContactAvgOrderByAggregateInput
    _max?: ContactMaxOrderByAggregateInput
    _min?: ContactMinOrderByAggregateInput
    _sum?: ContactSumOrderByAggregateInput
  }

  export type ContactScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ContactScalarWhereWithAggregatesInput>
    OR?: Enumerable<ContactScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ContactScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringNullableWithAggregatesFilter | string | null
    email?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type PostWhereInput = {
    AND?: Enumerable<PostWhereInput>
    OR?: Enumerable<PostWhereInput>
    NOT?: Enumerable<PostWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    title?: StringFilter | string
    content?: StringNullableFilter | string | null
    published?: BoolFilter | boolean
    author?: XOR<UserRelationFilter, UserWhereInput>
    authorId?: IntFilter | number
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    content?: SortOrder
    published?: SortOrder
    author?: UserOrderByWithRelationInput
    authorId?: SortOrder
  }

  export type PostWhereUniqueInput = {
    id?: number
  }

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    content?: SortOrder
    published?: SortOrder
    authorId?: SortOrder
    _count?: PostCountOrderByAggregateInput
    _avg?: PostAvgOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
    _sum?: PostSumOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PostScalarWhereWithAggregatesInput>
    OR?: Enumerable<PostScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PostScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    title?: StringWithAggregatesFilter | string
    content?: StringNullableWithAggregatesFilter | string | null
    published?: BoolWithAggregatesFilter | boolean
    authorId?: IntWithAggregatesFilter | number
  }

  export type ProfileWhereInput = {
    AND?: Enumerable<ProfileWhereInput>
    OR?: Enumerable<ProfileWhereInput>
    NOT?: Enumerable<ProfileWhereInput>
    id?: IntFilter | number
    bio?: StringNullableFilter | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
    userId?: IntFilter | number
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    bio?: SortOrder
    user?: UserOrderByWithRelationInput
    userId?: SortOrder
  }

  export type ProfileWhereUniqueInput = {
    id?: number
    userId?: number
  }

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    bio?: SortOrder
    userId?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _avg?: ProfileAvgOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
    _sum?: ProfileSumOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProfileScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProfileScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProfileScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    bio?: StringNullableWithAggregatesFilter | string | null
    userId?: IntWithAggregatesFilter | number
  }

  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: IntFilter | number
    email?: StringFilter | string
    name?: StringNullableFilter | string | null
    posts?: PostListRelationFilter
    profile?: XOR<ProfileRelationFilter, ProfileWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    posts?: PostOrderByRelationAggregateInput
    profile?: ProfileOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = {
    id?: number
    email?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    email?: StringWithAggregatesFilter | string
    name?: StringNullableWithAggregatesFilter | string | null
  }

  export type HackerNewsFirstCreateInput = {
    hnId: number
    title: string
    url: string
    upVotes: number
    createdAt?: Date | string
    updatedAt?: Date | string
    HackerNewsSelected?: HackerNewsSelectedCreateNestedOneWithoutHackerNewsFirstInput
    HackerNewsRedirectHit?: HackerNewsRedirectHitCreateNestedManyWithoutHackerNewsFirstInput
  }

  export type HackerNewsFirstUncheckedCreateInput = {
    id?: number
    hnId: number
    title: string
    url: string
    upVotes: number
    createdAt?: Date | string
    updatedAt?: Date | string
    HackerNewsSelected?: HackerNewsSelectedUncheckedCreateNestedOneWithoutHackerNewsFirstInput
    HackerNewsRedirectHit?: HackerNewsRedirectHitUncheckedCreateNestedManyWithoutHackerNewsFirstInput
  }

  export type HackerNewsFirstUpdateInput = {
    hnId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    upVotes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    HackerNewsSelected?: HackerNewsSelectedUpdateOneWithoutHackerNewsFirstNestedInput
    HackerNewsRedirectHit?: HackerNewsRedirectHitUpdateManyWithoutHackerNewsFirstNestedInput
  }

  export type HackerNewsFirstUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    hnId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    upVotes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    HackerNewsSelected?: HackerNewsSelectedUncheckedUpdateOneWithoutHackerNewsFirstNestedInput
    HackerNewsRedirectHit?: HackerNewsRedirectHitUncheckedUpdateManyWithoutHackerNewsFirstNestedInput
  }

  export type HackerNewsFirstUpdateManyMutationInput = {
    hnId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    upVotes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HackerNewsFirstUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    hnId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    upVotes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HackerNewsSelectedCreateInput = {
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hackerNewsFirst: HackerNewsFirstCreateNestedOneWithoutHackerNewsSelectedInput
  }

  export type HackerNewsSelectedUncheckedCreateInput = {
    id?: number
    hackerNewsFirstId: number
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HackerNewsSelectedUpdateInput = {
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hackerNewsFirst?: HackerNewsFirstUpdateOneRequiredWithoutHackerNewsSelectedNestedInput
  }

  export type HackerNewsSelectedUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    hackerNewsFirstId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HackerNewsSelectedUpdateManyMutationInput = {
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HackerNewsSelectedUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    hackerNewsFirstId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HackerNewsRedirectHitCreateInput = {
    createdAt?: Date | string
    hackerNewsFirst: HackerNewsFirstCreateNestedOneWithoutHackerNewsRedirectHitInput
  }

  export type HackerNewsRedirectHitUncheckedCreateInput = {
    id?: number
    hackerNewsFirstId: number
    createdAt?: Date | string
  }

  export type HackerNewsRedirectHitUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hackerNewsFirst?: HackerNewsFirstUpdateOneRequiredWithoutHackerNewsRedirectHitNestedInput
  }

  export type HackerNewsRedirectHitUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    hackerNewsFirstId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HackerNewsRedirectHitUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HackerNewsRedirectHitUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    hackerNewsFirstId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactCreateInput = {
    name?: string | null
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactUncheckedCreateInput = {
    id?: number
    name?: string | null
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    content?: string | null
    published?: boolean
    author: UserCreateNestedOneWithoutPostsInput
  }

  export type PostUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    content?: string | null
    published?: boolean
    authorId: number
  }

  export type PostUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    authorId?: IntFieldUpdateOperationsInput | number
  }

  export type PostUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    authorId?: IntFieldUpdateOperationsInput | number
  }

  export type ProfileCreateInput = {
    bio?: string | null
    user: UserCreateNestedOneWithoutProfileInput
  }

  export type ProfileUncheckedCreateInput = {
    id?: number
    bio?: string | null
    userId: number
  }

  export type ProfileUpdateInput = {
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
  }

  export type ProfileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ProfileUpdateManyMutationInput = {
    bio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type UserCreateInput = {
    email: string
    name?: string | null
    posts?: PostCreateNestedManyWithoutAuthorInput
    profile?: ProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    name?: string | null
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    posts?: PostUpdateManyWithoutAuthorNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
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
    not?: NestedStringFilter | string
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

  export type HackerNewsSelectedRelationFilter = {
    is?: HackerNewsSelectedWhereInput | null
    isNot?: HackerNewsSelectedWhereInput | null
  }

  export type HackerNewsRedirectHitListRelationFilter = {
    every?: HackerNewsRedirectHitWhereInput
    some?: HackerNewsRedirectHitWhereInput
    none?: HackerNewsRedirectHitWhereInput
  }

  export type HackerNewsRedirectHitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HackerNewsFirstCountOrderByAggregateInput = {
    id?: SortOrder
    hnId?: SortOrder
    title?: SortOrder
    url?: SortOrder
    upVotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HackerNewsFirstAvgOrderByAggregateInput = {
    id?: SortOrder
    hnId?: SortOrder
    upVotes?: SortOrder
  }

  export type HackerNewsFirstMaxOrderByAggregateInput = {
    id?: SortOrder
    hnId?: SortOrder
    title?: SortOrder
    url?: SortOrder
    upVotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HackerNewsFirstMinOrderByAggregateInput = {
    id?: SortOrder
    hnId?: SortOrder
    title?: SortOrder
    url?: SortOrder
    upVotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HackerNewsFirstSumOrderByAggregateInput = {
    id?: SortOrder
    hnId?: SortOrder
    upVotes?: SortOrder
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
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
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

  export type HackerNewsFirstRelationFilter = {
    is?: HackerNewsFirstWhereInput
    isNot?: HackerNewsFirstWhereInput
  }

  export type HackerNewsSelectedCountOrderByAggregateInput = {
    id?: SortOrder
    hackerNewsFirstId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HackerNewsSelectedAvgOrderByAggregateInput = {
    id?: SortOrder
    hackerNewsFirstId?: SortOrder
  }

  export type HackerNewsSelectedMaxOrderByAggregateInput = {
    id?: SortOrder
    hackerNewsFirstId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HackerNewsSelectedMinOrderByAggregateInput = {
    id?: SortOrder
    hackerNewsFirstId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HackerNewsSelectedSumOrderByAggregateInput = {
    id?: SortOrder
    hackerNewsFirstId?: SortOrder
  }

  export type HackerNewsRedirectHitCountOrderByAggregateInput = {
    id?: SortOrder
    hackerNewsFirstId?: SortOrder
    createdAt?: SortOrder
  }

  export type HackerNewsRedirectHitAvgOrderByAggregateInput = {
    id?: SortOrder
    hackerNewsFirstId?: SortOrder
  }

  export type HackerNewsRedirectHitMaxOrderByAggregateInput = {
    id?: SortOrder
    hackerNewsFirstId?: SortOrder
    createdAt?: SortOrder
  }

  export type HackerNewsRedirectHitMinOrderByAggregateInput = {
    id?: SortOrder
    hackerNewsFirstId?: SortOrder
    createdAt?: SortOrder
  }

  export type HackerNewsRedirectHitSumOrderByAggregateInput = {
    id?: SortOrder
    hackerNewsFirstId?: SortOrder
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
    not?: NestedStringNullableFilter | string | null
  }

  export type ContactCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ContactMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactSumOrderByAggregateInput = {
    id?: SortOrder
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
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    content?: SortOrder
    published?: SortOrder
    authorId?: SortOrder
  }

  export type PostAvgOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    content?: SortOrder
    published?: SortOrder
    authorId?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    content?: SortOrder
    published?: SortOrder
    authorId?: SortOrder
  }

  export type PostSumOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    bio?: SortOrder
    userId?: SortOrder
  }

  export type ProfileAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    bio?: SortOrder
    userId?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    bio?: SortOrder
    userId?: SortOrder
  }

  export type ProfileSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type ProfileRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type PostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type HackerNewsSelectedCreateNestedOneWithoutHackerNewsFirstInput = {
    create?: XOR<HackerNewsSelectedCreateWithoutHackerNewsFirstInput, HackerNewsSelectedUncheckedCreateWithoutHackerNewsFirstInput>
    connectOrCreate?: HackerNewsSelectedCreateOrConnectWithoutHackerNewsFirstInput
    connect?: HackerNewsSelectedWhereUniqueInput
  }

  export type HackerNewsRedirectHitCreateNestedManyWithoutHackerNewsFirstInput = {
    create?: XOR<Enumerable<HackerNewsRedirectHitCreateWithoutHackerNewsFirstInput>, Enumerable<HackerNewsRedirectHitUncheckedCreateWithoutHackerNewsFirstInput>>
    connectOrCreate?: Enumerable<HackerNewsRedirectHitCreateOrConnectWithoutHackerNewsFirstInput>
    connect?: Enumerable<HackerNewsRedirectHitWhereUniqueInput>
  }

  export type HackerNewsSelectedUncheckedCreateNestedOneWithoutHackerNewsFirstInput = {
    create?: XOR<HackerNewsSelectedCreateWithoutHackerNewsFirstInput, HackerNewsSelectedUncheckedCreateWithoutHackerNewsFirstInput>
    connectOrCreate?: HackerNewsSelectedCreateOrConnectWithoutHackerNewsFirstInput
    connect?: HackerNewsSelectedWhereUniqueInput
  }

  export type HackerNewsRedirectHitUncheckedCreateNestedManyWithoutHackerNewsFirstInput = {
    create?: XOR<Enumerable<HackerNewsRedirectHitCreateWithoutHackerNewsFirstInput>, Enumerable<HackerNewsRedirectHitUncheckedCreateWithoutHackerNewsFirstInput>>
    connectOrCreate?: Enumerable<HackerNewsRedirectHitCreateOrConnectWithoutHackerNewsFirstInput>
    connect?: Enumerable<HackerNewsRedirectHitWhereUniqueInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type HackerNewsSelectedUpdateOneWithoutHackerNewsFirstNestedInput = {
    create?: XOR<HackerNewsSelectedCreateWithoutHackerNewsFirstInput, HackerNewsSelectedUncheckedCreateWithoutHackerNewsFirstInput>
    connectOrCreate?: HackerNewsSelectedCreateOrConnectWithoutHackerNewsFirstInput
    upsert?: HackerNewsSelectedUpsertWithoutHackerNewsFirstInput
    disconnect?: boolean
    delete?: boolean
    connect?: HackerNewsSelectedWhereUniqueInput
    update?: XOR<HackerNewsSelectedUpdateWithoutHackerNewsFirstInput, HackerNewsSelectedUncheckedUpdateWithoutHackerNewsFirstInput>
  }

  export type HackerNewsRedirectHitUpdateManyWithoutHackerNewsFirstNestedInput = {
    create?: XOR<Enumerable<HackerNewsRedirectHitCreateWithoutHackerNewsFirstInput>, Enumerable<HackerNewsRedirectHitUncheckedCreateWithoutHackerNewsFirstInput>>
    connectOrCreate?: Enumerable<HackerNewsRedirectHitCreateOrConnectWithoutHackerNewsFirstInput>
    upsert?: Enumerable<HackerNewsRedirectHitUpsertWithWhereUniqueWithoutHackerNewsFirstInput>
    set?: Enumerable<HackerNewsRedirectHitWhereUniqueInput>
    disconnect?: Enumerable<HackerNewsRedirectHitWhereUniqueInput>
    delete?: Enumerable<HackerNewsRedirectHitWhereUniqueInput>
    connect?: Enumerable<HackerNewsRedirectHitWhereUniqueInput>
    update?: Enumerable<HackerNewsRedirectHitUpdateWithWhereUniqueWithoutHackerNewsFirstInput>
    updateMany?: Enumerable<HackerNewsRedirectHitUpdateManyWithWhereWithoutHackerNewsFirstInput>
    deleteMany?: Enumerable<HackerNewsRedirectHitScalarWhereInput>
  }

  export type HackerNewsSelectedUncheckedUpdateOneWithoutHackerNewsFirstNestedInput = {
    create?: XOR<HackerNewsSelectedCreateWithoutHackerNewsFirstInput, HackerNewsSelectedUncheckedCreateWithoutHackerNewsFirstInput>
    connectOrCreate?: HackerNewsSelectedCreateOrConnectWithoutHackerNewsFirstInput
    upsert?: HackerNewsSelectedUpsertWithoutHackerNewsFirstInput
    disconnect?: boolean
    delete?: boolean
    connect?: HackerNewsSelectedWhereUniqueInput
    update?: XOR<HackerNewsSelectedUpdateWithoutHackerNewsFirstInput, HackerNewsSelectedUncheckedUpdateWithoutHackerNewsFirstInput>
  }

  export type HackerNewsRedirectHitUncheckedUpdateManyWithoutHackerNewsFirstNestedInput = {
    create?: XOR<Enumerable<HackerNewsRedirectHitCreateWithoutHackerNewsFirstInput>, Enumerable<HackerNewsRedirectHitUncheckedCreateWithoutHackerNewsFirstInput>>
    connectOrCreate?: Enumerable<HackerNewsRedirectHitCreateOrConnectWithoutHackerNewsFirstInput>
    upsert?: Enumerable<HackerNewsRedirectHitUpsertWithWhereUniqueWithoutHackerNewsFirstInput>
    set?: Enumerable<HackerNewsRedirectHitWhereUniqueInput>
    disconnect?: Enumerable<HackerNewsRedirectHitWhereUniqueInput>
    delete?: Enumerable<HackerNewsRedirectHitWhereUniqueInput>
    connect?: Enumerable<HackerNewsRedirectHitWhereUniqueInput>
    update?: Enumerable<HackerNewsRedirectHitUpdateWithWhereUniqueWithoutHackerNewsFirstInput>
    updateMany?: Enumerable<HackerNewsRedirectHitUpdateManyWithWhereWithoutHackerNewsFirstInput>
    deleteMany?: Enumerable<HackerNewsRedirectHitScalarWhereInput>
  }

  export type HackerNewsFirstCreateNestedOneWithoutHackerNewsSelectedInput = {
    create?: XOR<HackerNewsFirstCreateWithoutHackerNewsSelectedInput, HackerNewsFirstUncheckedCreateWithoutHackerNewsSelectedInput>
    connectOrCreate?: HackerNewsFirstCreateOrConnectWithoutHackerNewsSelectedInput
    connect?: HackerNewsFirstWhereUniqueInput
  }

  export type HackerNewsFirstUpdateOneRequiredWithoutHackerNewsSelectedNestedInput = {
    create?: XOR<HackerNewsFirstCreateWithoutHackerNewsSelectedInput, HackerNewsFirstUncheckedCreateWithoutHackerNewsSelectedInput>
    connectOrCreate?: HackerNewsFirstCreateOrConnectWithoutHackerNewsSelectedInput
    upsert?: HackerNewsFirstUpsertWithoutHackerNewsSelectedInput
    connect?: HackerNewsFirstWhereUniqueInput
    update?: XOR<HackerNewsFirstUpdateWithoutHackerNewsSelectedInput, HackerNewsFirstUncheckedUpdateWithoutHackerNewsSelectedInput>
  }

  export type HackerNewsFirstCreateNestedOneWithoutHackerNewsRedirectHitInput = {
    create?: XOR<HackerNewsFirstCreateWithoutHackerNewsRedirectHitInput, HackerNewsFirstUncheckedCreateWithoutHackerNewsRedirectHitInput>
    connectOrCreate?: HackerNewsFirstCreateOrConnectWithoutHackerNewsRedirectHitInput
    connect?: HackerNewsFirstWhereUniqueInput
  }

  export type HackerNewsFirstUpdateOneRequiredWithoutHackerNewsRedirectHitNestedInput = {
    create?: XOR<HackerNewsFirstCreateWithoutHackerNewsRedirectHitInput, HackerNewsFirstUncheckedCreateWithoutHackerNewsRedirectHitInput>
    connectOrCreate?: HackerNewsFirstCreateOrConnectWithoutHackerNewsRedirectHitInput
    upsert?: HackerNewsFirstUpsertWithoutHackerNewsRedirectHitInput
    connect?: HackerNewsFirstWhereUniqueInput
    update?: XOR<HackerNewsFirstUpdateWithoutHackerNewsRedirectHitInput, HackerNewsFirstUncheckedUpdateWithoutHackerNewsRedirectHitInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserCreateNestedOneWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    upsert?: UserUpsertWithoutPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
  }

  export type UserCreateNestedOneWithoutProfileInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutProfileNestedInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    upsert?: UserUpsertWithoutProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
  }

  export type PostCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<PostCreateWithoutAuthorInput>, Enumerable<PostUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutAuthorInput>
    connect?: Enumerable<PostWhereUniqueInput>
  }

  export type ProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type PostUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<PostCreateWithoutAuthorInput>, Enumerable<PostUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutAuthorInput>
    connect?: Enumerable<PostWhereUniqueInput>
  }

  export type ProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type PostUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<Enumerable<PostCreateWithoutAuthorInput>, Enumerable<PostUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutAuthorInput>
    upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput>
    set?: Enumerable<PostWhereUniqueInput>
    disconnect?: Enumerable<PostWhereUniqueInput>
    delete?: Enumerable<PostWhereUniqueInput>
    connect?: Enumerable<PostWhereUniqueInput>
    update?: Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<PostUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<PostScalarWhereInput>
  }

  export type ProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type PostUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<Enumerable<PostCreateWithoutAuthorInput>, Enumerable<PostUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutAuthorInput>
    upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput>
    set?: Enumerable<PostWhereUniqueInput>
    disconnect?: Enumerable<PostWhereUniqueInput>
    delete?: Enumerable<PostWhereUniqueInput>
    connect?: Enumerable<PostWhereUniqueInput>
    update?: Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<PostUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<PostScalarWhereInput>
  }

  export type ProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
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

  export type HackerNewsSelectedCreateWithoutHackerNewsFirstInput = {
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HackerNewsSelectedUncheckedCreateWithoutHackerNewsFirstInput = {
    id?: number
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HackerNewsSelectedCreateOrConnectWithoutHackerNewsFirstInput = {
    where: HackerNewsSelectedWhereUniqueInput
    create: XOR<HackerNewsSelectedCreateWithoutHackerNewsFirstInput, HackerNewsSelectedUncheckedCreateWithoutHackerNewsFirstInput>
  }

  export type HackerNewsRedirectHitCreateWithoutHackerNewsFirstInput = {
    createdAt?: Date | string
  }

  export type HackerNewsRedirectHitUncheckedCreateWithoutHackerNewsFirstInput = {
    id?: number
    createdAt?: Date | string
  }

  export type HackerNewsRedirectHitCreateOrConnectWithoutHackerNewsFirstInput = {
    where: HackerNewsRedirectHitWhereUniqueInput
    create: XOR<HackerNewsRedirectHitCreateWithoutHackerNewsFirstInput, HackerNewsRedirectHitUncheckedCreateWithoutHackerNewsFirstInput>
  }

  export type HackerNewsSelectedUpsertWithoutHackerNewsFirstInput = {
    update: XOR<HackerNewsSelectedUpdateWithoutHackerNewsFirstInput, HackerNewsSelectedUncheckedUpdateWithoutHackerNewsFirstInput>
    create: XOR<HackerNewsSelectedCreateWithoutHackerNewsFirstInput, HackerNewsSelectedUncheckedCreateWithoutHackerNewsFirstInput>
  }

  export type HackerNewsSelectedUpdateWithoutHackerNewsFirstInput = {
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HackerNewsSelectedUncheckedUpdateWithoutHackerNewsFirstInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HackerNewsRedirectHitUpsertWithWhereUniqueWithoutHackerNewsFirstInput = {
    where: HackerNewsRedirectHitWhereUniqueInput
    update: XOR<HackerNewsRedirectHitUpdateWithoutHackerNewsFirstInput, HackerNewsRedirectHitUncheckedUpdateWithoutHackerNewsFirstInput>
    create: XOR<HackerNewsRedirectHitCreateWithoutHackerNewsFirstInput, HackerNewsRedirectHitUncheckedCreateWithoutHackerNewsFirstInput>
  }

  export type HackerNewsRedirectHitUpdateWithWhereUniqueWithoutHackerNewsFirstInput = {
    where: HackerNewsRedirectHitWhereUniqueInput
    data: XOR<HackerNewsRedirectHitUpdateWithoutHackerNewsFirstInput, HackerNewsRedirectHitUncheckedUpdateWithoutHackerNewsFirstInput>
  }

  export type HackerNewsRedirectHitUpdateManyWithWhereWithoutHackerNewsFirstInput = {
    where: HackerNewsRedirectHitScalarWhereInput
    data: XOR<HackerNewsRedirectHitUpdateManyMutationInput, HackerNewsRedirectHitUncheckedUpdateManyWithoutHackerNewsRedirectHitInput>
  }

  export type HackerNewsRedirectHitScalarWhereInput = {
    AND?: Enumerable<HackerNewsRedirectHitScalarWhereInput>
    OR?: Enumerable<HackerNewsRedirectHitScalarWhereInput>
    NOT?: Enumerable<HackerNewsRedirectHitScalarWhereInput>
    id?: IntFilter | number
    hackerNewsFirstId?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
  }

  export type HackerNewsFirstCreateWithoutHackerNewsSelectedInput = {
    hnId: number
    title: string
    url: string
    upVotes: number
    createdAt?: Date | string
    updatedAt?: Date | string
    HackerNewsRedirectHit?: HackerNewsRedirectHitCreateNestedManyWithoutHackerNewsFirstInput
  }

  export type HackerNewsFirstUncheckedCreateWithoutHackerNewsSelectedInput = {
    id?: number
    hnId: number
    title: string
    url: string
    upVotes: number
    createdAt?: Date | string
    updatedAt?: Date | string
    HackerNewsRedirectHit?: HackerNewsRedirectHitUncheckedCreateNestedManyWithoutHackerNewsFirstInput
  }

  export type HackerNewsFirstCreateOrConnectWithoutHackerNewsSelectedInput = {
    where: HackerNewsFirstWhereUniqueInput
    create: XOR<HackerNewsFirstCreateWithoutHackerNewsSelectedInput, HackerNewsFirstUncheckedCreateWithoutHackerNewsSelectedInput>
  }

  export type HackerNewsFirstUpsertWithoutHackerNewsSelectedInput = {
    update: XOR<HackerNewsFirstUpdateWithoutHackerNewsSelectedInput, HackerNewsFirstUncheckedUpdateWithoutHackerNewsSelectedInput>
    create: XOR<HackerNewsFirstCreateWithoutHackerNewsSelectedInput, HackerNewsFirstUncheckedCreateWithoutHackerNewsSelectedInput>
  }

  export type HackerNewsFirstUpdateWithoutHackerNewsSelectedInput = {
    hnId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    upVotes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    HackerNewsRedirectHit?: HackerNewsRedirectHitUpdateManyWithoutHackerNewsFirstNestedInput
  }

  export type HackerNewsFirstUncheckedUpdateWithoutHackerNewsSelectedInput = {
    id?: IntFieldUpdateOperationsInput | number
    hnId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    upVotes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    HackerNewsRedirectHit?: HackerNewsRedirectHitUncheckedUpdateManyWithoutHackerNewsFirstNestedInput
  }

  export type HackerNewsFirstCreateWithoutHackerNewsRedirectHitInput = {
    hnId: number
    title: string
    url: string
    upVotes: number
    createdAt?: Date | string
    updatedAt?: Date | string
    HackerNewsSelected?: HackerNewsSelectedCreateNestedOneWithoutHackerNewsFirstInput
  }

  export type HackerNewsFirstUncheckedCreateWithoutHackerNewsRedirectHitInput = {
    id?: number
    hnId: number
    title: string
    url: string
    upVotes: number
    createdAt?: Date | string
    updatedAt?: Date | string
    HackerNewsSelected?: HackerNewsSelectedUncheckedCreateNestedOneWithoutHackerNewsFirstInput
  }

  export type HackerNewsFirstCreateOrConnectWithoutHackerNewsRedirectHitInput = {
    where: HackerNewsFirstWhereUniqueInput
    create: XOR<HackerNewsFirstCreateWithoutHackerNewsRedirectHitInput, HackerNewsFirstUncheckedCreateWithoutHackerNewsRedirectHitInput>
  }

  export type HackerNewsFirstUpsertWithoutHackerNewsRedirectHitInput = {
    update: XOR<HackerNewsFirstUpdateWithoutHackerNewsRedirectHitInput, HackerNewsFirstUncheckedUpdateWithoutHackerNewsRedirectHitInput>
    create: XOR<HackerNewsFirstCreateWithoutHackerNewsRedirectHitInput, HackerNewsFirstUncheckedCreateWithoutHackerNewsRedirectHitInput>
  }

  export type HackerNewsFirstUpdateWithoutHackerNewsRedirectHitInput = {
    hnId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    upVotes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    HackerNewsSelected?: HackerNewsSelectedUpdateOneWithoutHackerNewsFirstNestedInput
  }

  export type HackerNewsFirstUncheckedUpdateWithoutHackerNewsRedirectHitInput = {
    id?: IntFieldUpdateOperationsInput | number
    hnId?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    upVotes?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    HackerNewsSelected?: HackerNewsSelectedUncheckedUpdateOneWithoutHackerNewsFirstNestedInput
  }

  export type UserCreateWithoutPostsInput = {
    email: string
    name?: string | null
    profile?: ProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPostsInput = {
    id?: number
    email: string
    name?: string | null
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type UserUpsertWithoutPostsInput = {
    update: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type UserUpdateWithoutPostsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profile?: ProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutProfileInput = {
    email: string
    name?: string | null
    posts?: PostCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutProfileInput = {
    id?: number
    email: string
    name?: string | null
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type UserUpsertWithoutProfileInput = {
    update: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type UserUpdateWithoutProfileInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    posts?: PostUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type PostCreateWithoutAuthorInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    content?: string | null
    published?: boolean
  }

  export type PostUncheckedCreateWithoutAuthorInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    content?: string | null
    published?: boolean
  }

  export type PostCreateOrConnectWithoutAuthorInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>
  }

  export type ProfileCreateWithoutUserInput = {
    bio?: string | null
  }

  export type ProfileUncheckedCreateWithoutUserInput = {
    id?: number
    bio?: string | null
  }

  export type ProfileCreateOrConnectWithoutUserInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
  }

  export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>
  }

  export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>
  }

  export type PostUpdateManyWithWhereWithoutAuthorInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutPostsInput>
  }

  export type PostScalarWhereInput = {
    AND?: Enumerable<PostScalarWhereInput>
    OR?: Enumerable<PostScalarWhereInput>
    NOT?: Enumerable<PostScalarWhereInput>
    id?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    title?: StringFilter | string
    content?: StringNullableFilter | string | null
    published?: BoolFilter | boolean
    authorId?: IntFilter | number
  }

  export type ProfileUpsertWithoutUserInput = {
    update: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
  }

  export type ProfileUpdateWithoutUserInput = {
    bio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfileUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    bio?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type HackerNewsRedirectHitUpdateWithoutHackerNewsFirstInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HackerNewsRedirectHitUncheckedUpdateWithoutHackerNewsFirstInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HackerNewsRedirectHitUncheckedUpdateManyWithoutHackerNewsRedirectHitInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUpdateWithoutAuthorInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PostUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PostUncheckedUpdateManyWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
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