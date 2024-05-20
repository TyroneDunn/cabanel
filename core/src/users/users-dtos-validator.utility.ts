import { GetUserDTO, RegisterUserDTO } from "./users-dtos";
import { ValidationError, Error, isError } from "@hals/common";
import { UserExists } from '../auth/auth-repository.type';

export const validateGetUserDTO = async (dto : GetUserDTO) : Promise<ValidationError | null> => {
   if (!dto.username) return ValidationError("BadRequest", 'Username required.');
   return null;
};

export const validateRegisterUserDTO = async (dto : RegisterUserDTO, userExists: UserExists) : Promise<ValidationError | null> => {
   if (!dto.username) return ValidationError("BadRequest", 'Username required.');
   if (!dto.password) return ValidationError("BadRequest", 'Password required.');
   const existsResult: boolean | Error = await userExists(dto.username);
   if (isError(existsResult)) return ValidationError("Internal", 'Error validating register user' +
      ' request.');
   if (existsResult) return ValidationError("Conflict", 'Username taken.');
   return null;
};
