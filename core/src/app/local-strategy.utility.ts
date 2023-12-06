import {AuthStrategy} from "./config.type";

export const isLocalStrategy = (authStrategy: AuthStrategy) =>
    (
        typeof authStrategy === 'object'
        && authStrategy !== null
        && 'db' in authStrategy
        && 'dbUrl' in authStrategy
        && 'sessionSecret' in authStrategy
        && 'hashingAlgorithm' in authStrategy
        && 'hashingIterations' in authStrategy
        && 'passwordLength' in authStrategy
        && 'passwordSalt' in authStrategy
    );
