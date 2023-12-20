import { GetUserDTO, RegisterUserDTO } from "./users-dtos";
import { ValidationOutcome } from "@hals/common";

export const validateGetUserDTO = async (dto: GetUserDTO): Promise<ValidationOutcome> => {
   if (!dto.username) return { error: { type: "BadRequest", message: 'Username required.' } };
   return {};
};

export const validateRegisterUserDTO = async (dto: RegisterUserDTO): Promise<ValidationOutcome> => {
   if (!dto.username) return { error: { type: "BadRequest", message: 'Username required.' } };
   if (!dto.password) return { error: { type: "BadRequest", message: 'Password required.' } };
   return {};
};
