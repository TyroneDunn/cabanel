import { AuthStrategy } from './application';
import { PasswordOptions } from '../password/password';

export type LocalAuthStrategy = {
   usersDatabase: LocalAuthUsersDatabase,
   sessionSecret : string,
   passwordOptions: PasswordOptions,
};

export type IsLocalAuthStrategy = (authStrategy : AuthStrategy) => authStrategy is LocalAuthStrategy;

export const isLocalAuthStrategy: IsLocalAuthStrategy =
   (authStrategy : AuthStrategy) : authStrategy is LocalAuthStrategy => (
      typeof authStrategy === 'object'
      && 'usersDatabase' in authStrategy
      && 'sessionSecret' in authStrategy
      && 'passwordOptions' in authStrategy
   );


export type LocalAuthUsersDatabase = {
   databaseProvider : LocalAuthDatabaseProvider
   usersDatabaseName : string,
   usersDatabaseUrl : string,
};

export type LocalAuthDatabaseProvider =
   | "MongoDB"
   | "MySQL"
   | "GraphQL";
