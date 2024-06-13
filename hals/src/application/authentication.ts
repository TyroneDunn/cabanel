import { Result } from '../common/result';
import { User } from '../users/user';
import { LocalAuthDatabaseProvider } from './local-auth-strategy';
import { PasswordOptions } from '../password/password';

export type AuthenticationRepository = {
   getUser      : (request : GetUserRequest) => Promise<Result<User, GetUserRequestError>>,
   registerUser : (request : RegisterUserRequest) => Promise<Result<User, RegisterUserRequestError>>,
   userExists   : (username : string) => Promise<Result<boolean, UserExistsRequestError>>,
};

export type InitialiseAuthenticationRepository = (
   databaseOptions: AuthenticationDatabaseOptions,
   passwordOptions: PasswordOptions
) => AuthenticationRepository;

export type AuthenticationDatabaseOptions = {
   databaseProvider : LocalAuthDatabaseProvider
   usersDatabaseName : string,
   usersDatabaseUrl : string,
};

export type GetUserRequest = { username : string };

export type GetUserRequestError = undefined;

export type RegisterUserRequest = {
   username : string,
   password : string,
};

export type RegisterUserRequestError = undefined;

export type UserExists = (username : string) => Promise<boolean | Error>;

export type UserExistsRequestError = undefined;
