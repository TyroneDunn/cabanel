import {User} from "./user";
import {
    DeleteUserDTO,
    GetUserDTO,
    UsersDTO,
    RegisterUserDTO,
    UpdateUserDTO,
} from "./users-dtos";

export type UsersRepository = {
    getUser: (dto: GetUserDTO) => Promise<User | null>,
    getUsers: (dto: UsersDTO) => Promise<User[] | null>,
    registerUser: (dto: RegisterUserDTO) => Promise<User>,
    deleteUser: (dto: DeleteUserDTO) => Promise<User | null>,
    deleteUsers: (dto: UsersDTO) => Promise<string>,
    updateUser: (dto: UpdateUserDTO) => Promise<User | null>,
    exists: (username: string) => Promise<boolean>,
};
