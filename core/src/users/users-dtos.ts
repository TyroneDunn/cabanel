import {UserSortOption} from "./user.type";
import {OrderOption} from "../shared/order-option.type";

export type GetUserDTO = {username: string};

export type UsersDTO = {
    username?: string,
    usernameRegex?: string,
    sort: UserSortOption,
    order: OrderOption,
    index: number,
    limit: number,
};

export type RegisterUserDTO = {
    username: string,
    password: string,
};

export type UpdateUserDTO = {
    username: string,
    newUsername?: string,
    newPassword?: string,
    newIsAdmin?: string,
    newStatus: string,
};

export type DeleteUserDTO = {username: string};

export type DeleteUsersDTO = {
    usernameRegex?: string,
    startDate?: string,
    endDate?: string,
};
