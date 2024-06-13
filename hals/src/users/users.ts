import { Result } from '../common/result';

export type User = {
   _id : string,
   username : string,
   hash : string,
};

export type GetUser = (request : GetUserRequest) => Promise<Result<User, GetUserError>>;

export type RegisterUser = (request : RegisterUserRequest) => Promise<Result<User, RegisterUserError>>;

export type UserExists = (username : string) => Promise<Result<boolean, UserExistsError>>;

export type GetUserRequest = { username : string };

export type GetUserError = {
   type: GetUserErrorType
   message: string
};

export type GetUserErrorType =
   | 'Not found'
   | 'Internal'

export type RegisterUserRequest = {
   username : string,
   password : string,
};

export type RegisterUserError = {
   type: RegisterUserErrorType
   message: string
};

export type RegisterUserErrorType =
   | 'Conflict'
   | 'Internal'

export type UserExistsError = {
   type: UserExistsErrorType
   message: string
};

export type UserExistsErrorType =
   | 'Internal'
