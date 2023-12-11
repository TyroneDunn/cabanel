import {AuthRepository} from "./auth-repository.type";
import {generateHash} from "../shared/password.utility";
import {configureMongoAuthRepository} from "./mongo-auth-repository-config.service";
import {generateUserModel} from "../users/mongo-user-model-config.service";
import {HashingAlgorithm} from "./hashing-algorithm.type";
import {DatabaseOption} from "./local-strategy.type";

export const configureAuthRepository = (
    usersDbName: string,
    usersDbOption: DatabaseOption,
    usersDbUrl: string,
    passwordSalt: string,
    passwordLength: number,
    hashingAlgorithm: HashingAlgorithm,
    hashingIterations: number
): AuthRepository => {
    const generateHashWrapper = (key: string) => generateHash(
        key,
        passwordSalt,
        hashingIterations,
        passwordLength,
        hashingAlgorithm
    );
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
