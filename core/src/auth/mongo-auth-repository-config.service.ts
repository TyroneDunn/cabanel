import { AuthRepository } from "./auth-repository.type";
import { User, Error } from "@hals/common";
import { Model } from "mongoose";
import { GetUserDTO, RegisterUserDTO } from "../users/users-dtos";
import { UserDocument } from "../users/mongo-user-model-config.service";

export const configureMongoAuthRepository =
   (userModel : Model<UserDocument>, generateHash : (key : string) => string) : AuthRepository => ({
      getUser: async (dto : GetUserDTO) : Promise<User | Error> => {
         try {
            const user : User | null = await userModel.findOne({ username: dto.username });
            if (!user) return Error('NotFound', `User ${dto.username} not found.`);
            else return user;
         }
         catch (error) {
            return Error("Internal", (error as Error).message);
         }
      },

      registerUser: async (dto : RegisterUserDTO) : Promise<User | Error> => {
         try {
            return await new userModel({
               username: dto.username,
               hash    : generateHash(dto.password),
            }).save();
         }
         catch (error) {
            return Error("Internal", (error as Error).message);
         }
      },

      exists: async (username : string) : Promise<boolean | Error> => {
         try {
            const user: User | null = await userModel.findOne({username: username});
            return !!user;
         } catch (error) {
            return Error("Internal", (error as Error).message);
         }
      }
   });
