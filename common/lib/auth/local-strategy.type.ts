import {HashAlgorithm} from "./hash-algorithm.type";

export type LocalStrategy = {
    usersDbName: string,
    usersDbOption: DatabaseOption
    usersDbUrl: string,
    sessionSecret: string,
    hashingAlgorithm: HashAlgorithm,
    hashingIterations: number,
    passwordLength: number
    passwordSalt: string
};

export type DatabaseOption = "MongoDB" | "MySQL" | "GraphQL";
