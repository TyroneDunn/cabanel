import {
    GetUserDTO,
    RegisterUserDTO,
} from "./users-dtos";
import {ValidationOutcome} from "../shared/validation-outcome.type";
import {Error} from "../shared/error.type";

export type UsersDtosValidator = {
    validateGetUserDTO: (dto: GetUserDTO) => Promise<ValidationOutcome>,
    validateRegisterUserDTO: (dto: RegisterUserDTO) => Promise<ValidationOutcome>,
};

export const usersDtosValidator = (): UsersDtosValidator => ({
    validateGetUserDTO: async (dto: GetUserDTO): Promise<ValidationOutcome> => {
        const errors: Error[] = [];
        if (!dto.username) errors.push({type: "BadRequest", message: 'Username required.'});
        return {errors: errors};
    },

    validateRegisterUserDTO: async (dto: RegisterUserDTO): Promise<ValidationOutcome> => {
        const errors: Error[] = [];
        if (!dto.username) errors.push({type: "BadRequest", message: 'Username required.'});
        if (!dto.password) errors.push({type: "BadRequest", message: 'Password required.'});
        return {...errors && {errors: errors}};
    },
});

