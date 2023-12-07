import {User} from "../users/user.type";
import {UsersRepository} from "../users/users-repository";
import {GetUserDTO, RegisterUserDTO} from "../users/users-dtos";
import {validateGetUserDTO, validateRegisterUserDTO} from "../users/users-dtos-validator";
import {ValidationOutcome} from "../shared/validation-outcome.type";

export type AuthService = {
    getUser: (dto: GetUserDTO) => Promise<User>,
    registerUser: (dto: RegisterUserDTO) => Promise<User>,
};

export const configureAuthService = (repository: UsersRepository): AuthService => ({
    getUser: async (dto: GetUserDTO): Promise<User> => {
        const validationResult: ValidationOutcome = await validateGetUserDTO(dto);
        if (validationResult.errors) throw validationResult.errors;
        return repository.getUser(dto);
    },

    registerUser: async (dto: RegisterUserDTO): Promise<User> => {
        const validationResult: ValidationOutcome = await validateRegisterUserDTO(dto);
        if (validationResult.errors) throw validationResult.errors;
        return repository.registerUser(dto);
    },
});
