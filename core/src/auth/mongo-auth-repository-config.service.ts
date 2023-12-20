import { AuthRepository } from "./auth-repository.type";
import { User } from "@hals/common";
import { Model, now } from "mongoose";
import { GetUserDTO, RegisterUserDTO } from "../users/users-dtos";
import { UserDocument } from "../users/mongo-user-model-config.service";

export const configureMongoAuthRepository =
   (userModel: Model<UserDocument>, generateHash: (key: string) => string): AuthRepository => ({
      getUser: async (dto: GetUserDTO): Promise<User | null> =>
         userModel.findOne({ username: dto.username }),

      registerUser: async (dto: RegisterUserDTO): Promise<User> =>
         new userModel({
            username: dto.username,
            hash: generateHash(dto.password),
            dateCreated: now(),
            lastUpdated: now(),
            isAdmin: false,
            status: 'active',
         }).save(),
   });
