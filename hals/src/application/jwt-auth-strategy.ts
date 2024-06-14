import { GetUser, RegisterUser } from '../users/users';

export type JwtAuthStrategy = {
   getUser : GetUser,
   registerUser : RegisterUser
};