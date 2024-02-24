import { User, Error, CommandResult } from "@hals/common";
import { GetUserDTO, RegisterUserDTO } from "../users/users-dtos";

export type AuthRepository = {
   getUser      : (dto : GetUserDTO) => Promise<User | Error>,
   registerUser : (dto : RegisterUserDTO) => Promise<User | Error>,
   exists       : UserExists,
};

export type UserExists = (username : string) => Promise<boolean | Error>;