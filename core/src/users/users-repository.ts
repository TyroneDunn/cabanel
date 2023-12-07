import {User} from "./user.type";
import {
    DeleteUserDTO,
    GetUserDTO,
    UsersDTO,
    RegisterUserDTO,
    UpdateUserDTO,
} from "./users-dtos";

export type UsersRepository = {
    getUser: (dto: GetUserDTO) => Promise<User>,
    getUsers: (dto: UsersDTO) => Promise<User[]>,
    registerUser: (dto: RegisterUserDTO) => Promise<User>,
    deleteUser: (dto: DeleteUserDTO) => Promise<User>,
    deleteUsers: (dto: UsersDTO) => Promise<string>,
    updateUser: (dto: UpdateUserDTO) => Promise<User>,
    exists: (username: string) => Promise<boolean>,
};
