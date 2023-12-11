import {AuthStrategy} from "../app/config.type";

export const isLocalStrategy = (authStrategy: AuthStrategy) =>
    (
        typeof authStrategy === 'object'
        && authStrategy !== null
        && 'usersDbName' in authStrategy
        && 'usersDbOption' in authStrategy
        && 'usersDbUrl' in authStrategy
        && 'sessionSecret' in authStrategy
        && 'hashingAlgorithm' in authStrategy
        && 'hashingIterations' in authStrategy
        && 'passwordLength' in authStrategy
        && 'passwordSalt' in authStrategy
    );
