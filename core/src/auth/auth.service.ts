import { AuthRepository } from "./auth-repository.type";
import { GetUserDTO, RegisterUserDTO } from "../users/users-dtos";
import {
   BAD_REQUEST,
   CREATED,
   INTERNAL_SERVER_ERROR,
   NOT_FOUND,
   OK,
   ValidationOutcome,
} from "@hals/common";
import { Response } from "../app/response.type";
import { User } from "../users/user.type";
import { validateGetUserDTO, validateRegisterUserDTO } from "../users/users-dtos-validator.utility";

export type AuthService = {
   getUser: (dto: GetUserDTO) => Promise<Response>,
   registerUser: (dto: RegisterUserDTO) => Promise<Response>,
};

export const configureAuthService = (repository: AuthRepository): AuthService => ({
   getUser: async (dto: GetUserDTO): Promise<Response> => {
      try {
         const validationOutcome: ValidationOutcome =
            await validateGetUserDTO(dto);
         if (validationOutcome.error) return mapToErrorResponse(validationOutcome);
         const user: User | null = await repository.getUser(dto);
         if (user) return {
            status: OK,
            collection: [ await repository.getUser(dto) ],
            count: 1,
         };
         else return {
            status: NOT_FOUND,
            collection: [],
            count: 0,
         };
      }
      catch (error) {
         return {
            status: INTERNAL_SERVER_ERROR,
            error: 'Auth Service: "getUser" error.',
         };
      }
   },

   registerUser: async (dto: RegisterUserDTO): Promise<Response> => {
      try {
         const validationOutcome: ValidationOutcome =
            await validateRegisterUserDTO(dto);
         if (validationOutcome.error) return mapToErrorResponse(validationOutcome);
         return {
            status: CREATED,
            collection: [ await repository.registerUser(dto) ],
            count: 1,
         };
      }
      catch (error) {
         return {
            status: INTERNAL_SERVER_ERROR,
            error: 'Auth Service: "registerUser" error.',
         };
      }
   },
});

export const mapToErrorResponse = (validationOutcome: ValidationOutcome): Response => ({
   status: BAD_REQUEST,
   error: validationOutcome.error?.message,
});
