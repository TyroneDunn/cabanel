import {CorsOptions} from "cors";
import {buildConfig} from "./src/app/config.type";
import {Init, init as initApp, Run, run as runApp} from "./src/app/app";

type HashingAlgorithm =
    'RSA-MD5' |
    'RSA-RIPEMD160' |
    'RSA-SHA1' |
    'RSA-SHA1-2' |
    'RSA-SHA224' |
    'RSA-SHA256' |
    'RSA-SHA3-224' |
    'RSA-SHA3-256' |
    'RSA-SHA3-384' |
    'RSA-SHA3-512' |
    'RSA-SHA384' |
    'RSA-SHA512' |
    'RSA-SHA512/224' |
    'RSA-SHA512/256' |
    'RSA-SM3' |
    'blake2b512' |
    'blake2s256' |
    'id-rsassa-pkcs1-v1_5-with-sha3-224' |
    'id-rsassa-pkcs1-v1_5-with-sha3-256' |
    'id-rsassa-pkcs1-v1_5-with-sha3-384' |
    'id-rsassa-pkcs1-v1_5-with-sha3-512' |
    'md5' |
    'md5-sha1' |
    'md5WithRSAEncryption' |
    'ripemd' |
    'ripemd160' |
    'ripemd160WithRSA' |
    'rmd160' |
    'sha1' |
    'sha1WithRSAEncryption' |
    'sha224' |
    'sha224WithRSAEncryption' |
    'sha256' |
    'sha256WithRSAEncryption' |
    'sha3-224' |
    'sha3-256' |
    'sha3-384' |
    'sha3-512' |
    'sha384' |
    'sha384WithRSAEncryption' |
    'sha512' |
    'sha512-224' |
    'sha512-224WithRSAEncryption' |
    'sha512-256' |
    'sha512-256WithRSAEncryption' |
    'sha512WithRSAEncryption' |
    'shake128' |
    'shake256' |
    'sm3' |
    'sm3WithRSAEncryption' |
    'ssl3-md5' |
    'ssl3-sha1';

type WebFrameworkOption = "Express" | "Nest" | "Fastify";
type DatabaseOption = "MongoDB" | "MySQL" | "GraphQL";
type AuthStrategyOption = "None" | "Local" | "JWT";
type NodeEnvironmentOption = "production" | "development";

const init: Init = initApp;
const run: Run = runApp;
export const App = {
    init: init,
    run: run
};

export type Config = {
    nodeEnv: NodeEnvironmentOption;
    api: WebFrameworkOption,
    title: string,
    version: string;
    port: number,
    corsOptions?: CorsOptions,
    authOptions: {
        strategy: AuthStrategyOption,
        db?: DatabaseOption
        dbUrl: string,
        sessionSecret: string,
        hashingAlgorithm: HashingAlgorithm,
        hashingIterations: number,
        passwordLength: number
        passwordSalt: string
    }
};

export type BuildConfig = (
    nodeEnv: NodeEnvironmentOption,
    api: WebFrameworkOption,
    title: string,
    version: string,
    port: number,
    corsOptions: CorsOptions,
    authStrategy: AuthStrategyOption = "None",
    authDb: DatabaseOption = "MongoDB",
    dbUrl: string = "",
    sessionSecret: string = "",
    hashingAlgorithm: HashingAlgorithm = "sha512",
    hashingIterations: number = 32,
    passwordLength: number = 16,
    passwordSalt: string = '',
) => Config;

export const buildAppConfig: BuildConfig = buildConfig;

export type MethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ParamMap = Record<string, string>;

export type Request = {
    paramMap?: ParamMap,
    queryParamMap?: ParamMap,
    payload?: Object,
};

export type Response = {
    status: number
    error?: Error,
    collection?: [],
    count?: number,
    index?: number,
    limit?: number,
};

export const HttpStatusCodes = {
    OK: number = 200,
    CREATED: number = 201,
    BAD_REQUEST: number = 400,
    UNAUTHORIZED: number = 401,
    FORBIDDEN: number = 403,
    NOT_FOUND: number = 404,
    CONFLICT: number = 409,
    INTERNAL_SERVER_ERROR: number = 500,
};
