import { AuthStrategy } from './application';
import { PasswordOptions } from '../password/password';
import { GetUser, RegisterUser } from '../users/users';

export type LocalAuthStrategy = {
   databaseOptions: LocalAuthDatabaseOptions,
   sessionSecret : string,
   passwordOptions: PasswordOptions,
   registerUser: RegisterUser,
   getUser: GetUser
};

export type IsLocalAuthStrategy = (authStrategy : AuthStrategy) => authStrategy is LocalAuthStrategy;

export const isLocalAuthStrategy: IsLocalAuthStrategy =
   (authStrategy : AuthStrategy) : authStrategy is LocalAuthStrategy => (
      typeof authStrategy === 'object'
      && 'usersDatabase' in authStrategy
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
