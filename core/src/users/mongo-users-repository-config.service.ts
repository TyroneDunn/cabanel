import {UsersRepository} from "./users-repository";
import {User} from "./user";
import {Model, now} from "mongoose";
import {
    DeleteUserDTO,
    GetUserDTO,
    UsersDTO,
    RegisterUserDTO,
    UpdateUserDTO,
} from "./users-dtos";
import {UserDocument} from "./mongo-user-model-config.service";

export const configureMongoUsersRepository =
    (userModel: Model<UserDocument>, generateHash: (key: string) => string): UsersRepository => ({
    getUser: async (dto: GetUserDTO): Promise<User | null> =>
        userModel.findOne({username: dto.username}),

    getUsers: async (dto: UsersDTO): Promise<User[] | null> => {
        const filter = mapToUsersFilter(dto);
        const skip = dto.index * dto.limit;
        return userModel.find(filter)
            .sort({[dto.sort]: dto.order === "asc"? 1 : -1})
            .skip(skip)
            .limit(dto.limit);
    },

    registerUser: async (dto: RegisterUserDTO): Promise<User> =>
        new userModel({
            username: dto.username,
            hash: generateHash(dto.password),
            dateCreated: now(),
            lastUpdated: now(),
            isAdmin: false,
            status: 'active',
        }).save(),

    updateUser: async (dto: UpdateUserDTO): Promise<User | null> => {
        const query = mapToUpdateUserQuery(dto, generateHash);
        return userModel.findOneAndUpdate(
            {username: dto.username},
            query,
            {new: true}
        );
    },

    deleteUsers: async (dto: UsersDTO): Promise<string> => {
        const filter = mapToUsersFilter(dto);
        const result = await userModel.deleteMany(filter);
        return `${result.deletedCount} users deleted.`;
    },

    deleteUser: async (dto: DeleteUserDTO): Promise<User | null> => {
        return (await userModel.findOneAndDelete({username: dto.username})).value;
    },

    exists: async (username: string): Promise<boolean> => {
        try {
            const user: User | null = await userModel.findOne({username: username});
            return !!user;
        } catch (error) {
            return false;
        }
    },
});

const mapToUsersFilter = (dto: UsersDTO) => ({
    ...dto.username && {username: dto.username},
    ...dto.usernameRegex && {username: {$regex: dto.usernameRegex, $options: 'i'}},
});

const mapToUpdateUserQuery = (dto: UpdateUserDTO, generateHash: (key: string) => string) => ({
    lastUpdated: now(),
    ...dto.newUsername && {username: dto.newUsername},
    ...dto.newPassword && {hash: generateHash(dto.newPassword)},
    ...dto.newIsAdmin && {isAdmin: (dto.newIsAdmin.toLowerCase() === 'true')},
    ...dto.newStatus && {status: dto.newStatus}
});
