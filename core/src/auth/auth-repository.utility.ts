import { AuthRepository } from "./auth-repository.type";
import { configureHashUtility, HashAlgorithm } from "@hals/common";
import { configureMongoAuthRepository } from "./mongo-auth-repository-config.service";
import { generateUserModel } from "../users/mongo-user-model-config.service";
import { DatabaseOption } from "@hals/common/lib/auth/local-strategy.type";

export const configureAuthRepository = (
   usersDbName: string,
   usersDbOption: DatabaseOption,
   usersDbUrl: string,
   passwordSalt: string,
   passwordLength: number,
   hashingAlgorithm: HashAlgorithm,
   hashingIterations: number,
): AuthRepository => {
   const generateHashWrapper = (key: string) =>
      configureHashUtility(passwordSalt, hashingIterations, passwordLength, hashingAlgorithm)
      .generateHash(key);
   switch (usersDbOption) {
      case "MongoDB": {
         return configureMongoAuthRepository(
            generateUserModel(usersDbUrl, usersDbName),
            generateHashWrapper,
         );
      }
      default: {
         throw new Error(`"${usersDbOption}" DB option not implemented. Please select another option.`);
      }
   }
};
