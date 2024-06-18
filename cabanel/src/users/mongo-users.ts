import mongoose, { Document, Model, Schema } from 'mongoose';
import {
   GetUser,
   GetUserError,
   GetUserRequest,
   RegisterUser,
   RegisterUserError,
   RegisterUserRequest,
   User,
   UserExists,
   UserExistsError,
} from './users';
import { Failure, Result, Success } from '../common/result';


export type GetUserFromMongodb = (
   userModel: Model<UserDocument>,
) => GetUser;

export type RegisterUserInMongodb = (
   userModel: Model<UserDocument>,
   generateHash : GenerateHash
) => RegisterUser;

export type UserExistsInMongodb = (
   userModel: Model<UserDocument>,
) => UserExists;

export type InitialiseMongoUsersModel =
   (databaseUrl : string, databaseName  : string) => Model<UserDocument>;

interface UserDocument extends Document, User {
   _id      : string,
   username : string,
   hash     : string,
}

const userSchema: Schema<UserDocument> = new Schema<UserDocument>(
   {
      username: {
         type     : String,
         unique   : true,
         required : true,
      },
      hash: {
         type     : String,
         required : true,
      },
   },
   { timestamps : true },
);

export type GenerateHash = (password: string) => string;


export const getUserFromMongodb: GetUserFromMongodb =
   (userModel: Model<UserDocument>): GetUser =>
      async (request: GetUserRequest): Promise<Result<User, GetUserError>> => {
         try {
            const user : User | null = await userModel.findOne({ username: request.username });
            if (!user) {
               const result: Failure<GetUserError> = { error: {
                     type   : 'Not found',
                     message: 'User not found.'
               } };
               return result;
            }
            else {
               const result: Success<User> = { data: user };
               return result;
            }
         }
         catch (error) {
            const result: Failure<GetUserError> = { error: {
                  type   : 'Internal',
                  message: (error as Error).message
               } };
            return result;
         }
      };

export const registerUserInMongodb: RegisterUserInMongodb = (
   userModel: Model<UserDocument>,
   generateHash : GenerateHash
): RegisterUser =>
   async (request : RegisterUserRequest): Promise<Result<User, RegisterUserError>> => {
      try {
         const user : User | null = await userModel.findOne({ username: request.username });
         if (user !== null) {
            const result: Failure<RegisterUserError> = { error: {
               type   : 'Conflict',
               message: 'Username already taken.'
            }};
            return result;
         }

         else {
            const newUser: User = await new userModel({
               username : request.username,
               hash     : generateHash(request.password),
            }).save();
            const result : Success<User> = { data : newUser};
            return result;
         }
      }
      catch (error) {
         const result: Failure<RegisterUserError> = { error: {
            type   : 'Internal',
            message: (error as Error).message
         }};
         return result;
      }
   };

export const userExistsInMongodb: UserExistsInMongodb = (
   userModel: Model<UserDocument>,
): UserExists =>
   async (username : string): Promise<Result<boolean, UserExistsError>> => {
      try {
         const user: User | null = await userModel.findOne({ username: username });
         const result: Success<boolean> = { data: !!user};
         return result;
      } catch (error) {
         const result: Failure<UserExistsError> = { error: {
            type: 'Internal',
            message: (error as Error).message
         }};
         return result;
      }
   };

export const initialiseMongoUsersModel: InitialiseMongoUsersModel = (
   databaseUrl : string,
   databaseName  : string
) : Model<UserDocument> =>
   mongoose
   .createConnection(databaseUrl)
   .model<UserDocument>(databaseName, userSchema);
