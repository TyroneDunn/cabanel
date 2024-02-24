import { AuthRepository } from "./auth-repository.type";
import { GetUserDTO, RegisterUserDTO } from "../users/users-dtos";
import {
   BAD_REQUEST,
   CONFLICT,
   CREATED,
   Error,
   ErrorType,
   FORBIDDEN,
   INTERNAL_SERVER_ERROR,
   isError,
   isValidationError,
   mapValidationErrorToErrorResponse,
   NOT_FOUND,
   OK,
   Response,
   UNAUTHORIZED,
   User,
   ValidationError,
} from "@hals/common";
import { validateGetUserDTO, validateRegisterUserDTO } from "../users/users-dtos-validator.utility";

export type AuthService = {
   getUser      : (dto : GetUserDTO) => Promise<User | Error>,
   registerUser : (dto : RegisterUserDTO) => Promise<Response>,
};

export const configureAuthService = (repository : AuthRepository) : AuthService => ({
   getUser: async (dto : GetUserDTO) : Promise<User | Error> => {
      const validationOutcome : ValidationError | null = await validateGetUserDTO(dto);
      if (isValidationError(validationOutcome))
         return Error(validationOutcome.error.type, validationOutcome.error.message);
      const user : User | Error = await repository.getUser(dto);
      return user
   },

   registerUser: async (dto : RegisterUserDTO) : Promise<Response> => {
      const validationOutcome : ValidationError | null = await validateRegisterUserDTO(dto, repository.exists);
      if (isValidationError(validationOutcome))
         return mapValidationErrorToErrorResponse(validationOutcome);
      const user: User | Error = await repository.registerUser(dto);
      if (isError(user)) return mapErrorToErrorResponse(user);
      else return {
         status     : CREATED,
         collection : [ user ],
         count      : 1
      };
   },
});

const mapErrorToErrorResponse = (error : Error) : Response => ({
   status: mapErrorTypeToStatusCode(error.type),
   error : error.message,
});

const mapErrorTypeToStatusCode = (errorType : ErrorType) : number => {
   switch (errorType) {
      case "Unauthorized": return UNAUTHORIZED;
      case "NotFound": return NOT_FOUND;
      case "Forbidden": return FORBIDDEN;
      case "BadRequest": return BAD_REQUEST;
      case "Conflict": return CONFLICT;
      case "Internal": return INTERNAL_SERVER_ERROR;
   }
};
