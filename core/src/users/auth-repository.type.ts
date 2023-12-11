import {User} from "./user.type";
import {
    GetUserDTO,
    RegisterUserDTO,
} from "./users-dtos";

export type AuthRepository = {
    getUser: (dto: GetUserDTO) => Promise<User | null>,
    registerUser: (dto: RegisterUserDTO) => Promise<User>,
};
