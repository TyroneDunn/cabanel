import {User} from "../users/user.type";
import {
    GetUserDTO,
    RegisterUserDTO,
} from "../users/users-dtos";

export type AuthRepository = {
    getUser: (dto: GetUserDTO) => Promise<User | null>,
    registerUser: (dto: RegisterUserDTO) => Promise<User>,
};
