import { AuthRepository } from "./auth-repository.type";
import { GetUserDTO, RegisterUserDTO } from "../users/users-dtos";
import {
   CREATED,
   INTERNAL_SERVER_ERROR, isValidationError, mapValidationErrorToErrorResponse,
   NOT_FOUND,
   OK,
   Response,
   User,
   ValidationError,
} from "@hals/common";
import { validateGetUserDTO, validateRegisterUserDTO } from "../users/users-dtos-validator.utility";

export type AuthService = {
   getUser      : (dto : GetUserDTO) => Promise<Response>,
   registerUser : (dto : RegisterUserDTO) => Promise<Response>,
};

export const configureAuthService = (repository : AuthRepository) : AuthService => ({
   getUser: async (dto : GetUserDTO) : Promise<Response> => {
      try {
         const validationOutcome : ValidationError | null = await validateGetUserDTO(dto);
         if (isValidationError(validationOutcome))
            return mapValidationErrorToErrorResponse(validationOutcome);
         const user : User | null = await repository.getUser(dto);
         if (user) return {
            status     : OK,
            collection : [ user ],
            count      : 1,
         };
         else return {
            status     : NOT_FOUND,
            collection : [],
            count      : 0,
         };
      }
      catch (error) {
         return {
            status : INTERNAL_SERVER_ERROR,
            error  : 'Auth Service: "getUser" error.',
         };
      }
   },

   registerUser: async (dto : RegisterUserDTO) : Promise<Response> => {
      try {
         const validationOutcome : ValidationError | null = await validateRegisterUserDTO(dto);
         if (isValidationError(validationOutcome))
            return mapValidationErrorToErrorResponse(validationOutcome);
         else return {
            status     : CREATED,
            // todo : improve repository error handling by returning either error or result
            collection : [ await repository.registerUser(dto) ],
            count      : 1,
         };
      }
      catch (error) {
         return {
            status : INTERNAL_SERVER_ERROR,
            error  : 'Auth Service: "registerUser" error.',
         };
      }
   },
});
