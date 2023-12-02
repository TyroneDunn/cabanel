import {User} from "./user";
import {
    DeleteUserDTO,
    DeleteUsersDTO,
    GetUserDTO,
    GetUsersDTO,
    RegisterUserDTO,
    UpdateUserDTO,
} from "./users-dtos";

export type UsersRepository = {
    getUser: (dto: GetUserDTO) => Promise<User>,
    getUsers: (dto: GetUsersDTO) => Promise<User[]>,
    registerUser: (dto: RegisterUserDTO) => Promise<User>,
    deleteUser: (dto: DeleteUserDTO) => Promise<User>,
    deleteUsers: (dto: DeleteUsersDTO) => Promise<string>,
    updateUser: (dto: UpdateUserDTO) => Promise<User>,
    exists: (username: string) => Promise<boolean>,
};
