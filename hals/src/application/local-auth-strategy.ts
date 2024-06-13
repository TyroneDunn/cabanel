import { AuthStrategy } from './application';
import { PasswordOptions } from '../password/password';

export type LocalAuthStrategy = {
   usersDatabase: LocalAuthUsersDatabase,
   sessionSecret : string,
   passwordOptions: PasswordOptions,
};

export type LocalAuthUsersDatabase = {
   databaseProvider : LocalAuthDatabaseProvider
   usersDatabaseName : string,
   usersDatabaseUrl : string,
};

export type LocalAuthDatabaseProvider =
   | "MongoDB"
   | "MySQL"
   | "GraphQL";

export const isLocalAuthStrategy = (authStrategy : AuthStrategy) : authStrategy is LocalAuthStrategy => (
   typeof authStrategy === 'object'
   && 'usersDbName' in authStrategy
   && 'usersDbOption' in authStrategy
   && 'usersDbUrl' in authStrategy
   && 'sessionSecret' in authStrategy
   && 'hashingAlgorithm' in authStrategy
   && 'hashingIterations' in authStrategy
   && 'passwordLength' in authStrategy
   && 'passwordSalt' in authStrategy
);

