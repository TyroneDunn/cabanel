import {AuthStrategy} from "../app/schema.type";
import {DatabaseOption, LocalStrategy} from "./local-strategy.type";
import {HashingAlgorithm} from "./hashing-algorithm.type";

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

export type BuildLocalAuthStrategy = (
    usersDbName: string,
    usersDbOption: DatabaseOption,
    usersDbUrl: string,
    sessionSecret: string,
    hashingAlgorithm: HashingAlgorithm,
    hashingIterations: number,
    passwordLength: number,
    passwordSalt: string
) => LocalStrategy;

export const buildLocalAuthStrategy: BuildLocalAuthStrategy = (
    usersDbName: string,
    usersDbOption: DatabaseOption,
    usersDbUrl: string,
    sessionSecret: string,
    hashingAlgorithm: HashingAlgorithm,
    hashingIterations: number,
    passwordLength: number,
    passwordSalt: string
): LocalStrategy => ({
        usersDbName: usersDbName,
        usersDbOption: usersDbOption,
        usersDbUrl: usersDbUrl,
        sessionSecret: sessionSecret,
        hashingAlgorithm: hashingAlgorithm,
        hashingIterations: hashingIterations,
        passwordLength: passwordLength,
        passwordSalt: passwordSalt
});
