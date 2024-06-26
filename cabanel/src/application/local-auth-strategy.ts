import { AuthStrategy } from './application';
import { PasswordOptions } from '../password/password';

export type LocalAuthStrategy = {
   databaseOptions: LocalAuthDatabaseOptions,
   sessionSecret : string,
   passwordOptions: PasswordOptions,
};

export type IsLocalAuthStrategy = (authStrategy : AuthStrategy) => authStrategy is LocalAuthStrategy;

export const isLocalAuthStrategy: IsLocalAuthStrategy =
   (authStrategy : AuthStrategy) : authStrategy is LocalAuthStrategy => (
      typeof authStrategy === 'object'
      && 'databaseOptions' in authStrategy
      && 'sessionSecret' in authStrategy
      && 'passwordOptions' in authStrategy
   );


export type LocalAuthDatabaseOptions = {
   databaseProvider : LocalAuthDatabaseProvider
   databaseUrl : string,
   usersDatabaseName : string,
};

export type LocalAuthDatabaseProvider =
   | "MongoDB"
   | "MySQL"
   | "GraphQL";
