import {Config} from "../app/config.type";
import {UsersRepository} from "../user/users-repository";
import {generateHash} from "../utils/password.utility";
import {configureMongoUsersRepository} from "../user/mongo-users-repository-config.service";
import {generateUserModel} from "../user/mongo-user-model-config.service";

export const configureUserRepository = (config: Config): UsersRepository => {
    const generateHashWrapper = (key: string) => generateHash(
        key,
        config.authOptions.passwordSalt,
        config.authOptions.hashingIterations,
        config.authOptions.passwordLength,
        config.authOptions.hashingAlgorithm
    );
    let usersRepository: UsersRepository;
    switch (config.authOptions.db) {
        case "MongoDB": {
            return usersRepository = configureMongoUsersRepository(
                generateUserModel(config.authOptions.dbUrl),
                generateHashWrapper,
            );
        }
        default: {
            throw new Error(`"${config.authOptions.db}" DB option not implemented. Please select another option.`);
        }
    }
};
