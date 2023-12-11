import {AuthRepository} from "./auth-repository.type";
import {GetUserDTO, RegisterUserDTO} from "../users/users-dtos";
import {ValidationOutcome} from "../shared/validation-outcome.type";
import {Response} from "../app/response.type";
import {
    BAD_REQUEST,
    CREATED,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
    OK
} from "../shared/http-status-codes.constant";
import {usersDtosValidator} from "../users/users-dtos-validator.utility";
import {User} from "../users/user.type";

export type AuthService = {
    getUser: (dto: GetUserDTO) => Promise<Response>,
    registerUser: (dto: RegisterUserDTO) => Promise<Response>,
};

export const configureAuthService = (repository: AuthRepository): AuthService => ({
    getUser: async (dto: GetUserDTO): Promise<Response> => {
        try {
            const validationOutcome: ValidationOutcome =
                await usersDtosValidator(repository).validateGetUserDTO(dto);
            if (validationOutcome.errors.length) return mapToErrorResponse(validationOutcome);
            const user: User | null = await repository.getUser(dto)
            if (user) return {
                status: OK,
                collection: [await repository.getUser(dto)],
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
                error: 'Auth Service: "getUser" error.'
            }
        }
    },

    registerUser: async (dto: RegisterUserDTO): Promise<Response> => {
        try {
            const validationOutcome: ValidationOutcome =
                await usersDtosValidator(repository).validateRegisterUserDTO(dto);
            if (validationOutcome.errors.length) return mapToErrorResponse(validationOutcome);
            return {
                status: CREATED,
                collection: [await repository.registerUser(dto)],
                count: 1,
            };
        }
        catch (error) {
            return {
                status: INTERNAL_SERVER_ERROR,
                error: 'Auth Service: "registerUser" error.'
            }
        }
    },
});

export const mapToErrorResponse = (validationOutcome: ValidationOutcome): Response => ({
    status: BAD_REQUEST,
    error: validationOutcome.errors.reduce(
        (message, error) => message + error.message + '\n', ''),
});
