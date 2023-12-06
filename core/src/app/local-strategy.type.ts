import {HashingAlgorithm} from "../shared/hashing-algorithm.type";

export type LocalStrategy = {
    db: DatabaseOption
    dbUrl: string,
    sessionSecret: string,
    hashingAlgorithm: HashingAlgorithm,
    hashingIterations: number,
    passwordLength: number
    passwordSalt: string
};

export type DatabaseOption = "MongoDB" | "MySQL" | "GraphQL";