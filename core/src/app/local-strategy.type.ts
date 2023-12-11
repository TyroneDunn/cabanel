import {HashingAlgorithm} from "./hashing-algorithm.type";

export type LocalStrategy = {
    usersDbName: string,
    usersDbOption: DatabaseOption
    usersDbUrl: string,
    sessionSecret: string,
    hashingAlgorithm: HashingAlgorithm,
    hashingIterations: number,
    passwordLength: number
    passwordSalt: string
};

export type DatabaseOption = "MongoDB" | "MySQL" | "GraphQL";
