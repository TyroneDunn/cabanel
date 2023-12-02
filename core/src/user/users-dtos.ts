import {UserSortOption} from "./user";
import {OrderOption} from "../shared/order-option.type";

export type GetUserDTO = {username: string};

export type GetUsersDTO = {
    username?: string,
    usernameRegex?: string,
    sort?: UserSortOption,
    order?: OrderOption,
    startDate?: string,
    endDate?: string,
    page?: number,
    limit?: number,
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
