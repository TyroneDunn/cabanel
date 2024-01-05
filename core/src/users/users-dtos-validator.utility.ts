import { GetUserDTO, RegisterUserDTO } from "./users-dtos";
import { ValidationError } from "@hals/common";

export const validateGetUserDTO = async (dto : GetUserDTO) : Promise<ValidationError | null> => {
   if (!dto.username) return ValidationError("BadRequest", 'Username required.');
   return null;
};

export const validateRegisterUserDTO = async (dto : RegisterUserDTO) : Promise<ValidationError | null> => {
   if (!dto.username) return ValidationError("BadRequest", 'Username required.');
   if (!dto.password) return ValidationError("BadRequest", 'Password required.');
   return null;
};
