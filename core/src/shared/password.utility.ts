const crypto = require('crypto');
import {HashingAlgorithm} from "../auth/hashing-algorithm.type";

export const generateHash = (
    password: string,
    salt: string,
    iterations: number,
    length: number,
    hashingAlgorithm: HashingAlgorithm
): string =>
    crypto.pbkdf2Sync(
        password,
        salt,
        iterations,
        length,
        hashingAlgorithm
    ).toString('hex');

export const validateHash = (
    password: string,
    hash: string,
    salt: string,
    iterations: number,
    length: number,
    hashingAlgorithm: HashingAlgorithm
): boolean =>
    hash === generateHash(
        password,
        salt,
        iterations,
        length,
        hashingAlgorithm
    );
