import {UsersRepository} from "./users-repository";
import {generateHash} from "../utils/password.utility";
import {configureMongoUsersRepository} from "./mongo-users-repository-config.service";
import {generateUserModel} from "./mongo-user-model-config.service";
import {HashingAlgorithm} from "../shared/hashing-algorithm.type";
import {DatabaseOption} from "../app/local-strategy.type";

// JWT may need to configure users repo too, doesn't make sense to pass a local strategy parameter

export const configureUsersRepository = (
    usersDbName: string,
    usersDbOption: DatabaseOption,
    usersDbUrl: string,
    passwordSalt: string,
    passwordLength: number,
    hashingAlgorithm: HashingAlgorithm,
    hashingIterations: number
): UsersRepository => {
    const generateHashWrapper = (key: string) => generateHash(
        key,
        passwordSalt,
        hashingIterations,
        passwordLength,
        hashingAlgorithm
    );
    let usersRepository: UsersRepository;
    switch (usersDbOption) {
        case "MongoDB": {
            return usersRepository = configureMongoUsersRepository(
                generateUserModel(usersDbUrl, usersDbName),
                generateHashWrapper,
            );
        }
        default: {
            throw new Error(`"${usersDbOption}" DB option not implemented. Please select another option.`);
        }
    }
};
