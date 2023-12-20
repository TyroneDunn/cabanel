
import {CorsOptions} from "cors";
import {
    InitialiseApplication,
    newApplication as newApplicationImpl,
} from "./src/app/application.utility";
import {buildSchema as buildSchemaImpl,} from "./src/app/schema.utility";
import EventEmitter from "events";
import {HalsEventEmitter} from "./src/app/event-emitter.service";
import {
    buildLocalAuthStrategy as buildLocalAuthStrategyImpl
} from "./src/auth/local-strategy.utility";

export type Application = {
    run: () => void,
};

export const newApplication: InitialiseApplication = newApplicationImpl;

export type Schema = {
    nodeEnv: NodeEnvironmentOption;
    api: WebFrameworkOption,
    title: string,
    version: string;
    port: number,
    corsOptions?: CorsOptions,
    authStrategy: AuthStrategy,
}

export type WebFrameworkOption = "Express" | "Nest" | "Fastify";

export type NodeEnvironmentOption = "production" | "development";
export type AuthStrategy = "None" | LocalStrategy | JWTStrategy;
export type DatabaseOption = "MongoDB" | "MySQL" | "GraphQL";

export type BuildSchema = (
    nodeEnv: NodeEnvironmentOption,
    api: WebFrameworkOption,
    title: string,
    version: string,
    port: number,
    corsOptions: CorsOptions,
    authStrategy: AuthStrategy,
) => Schema;

export const buildSchema: BuildSchema = buildSchemaImpl;

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

export const buildLocalAuthStrategy: BuildLocalAuthStrategy = buildLocalAuthStrategyImpl;
export const halsEventEmitter: EventEmitter = HalsEventEmitter;

export type Controller = {
    path: string,
    guard: boolean,
    methods: Method[],
};

export type Method = {
    type: MethodType,
    path?: string,
    paramKeys: string[],
    queryParamKeys: string[]
    sideEffects: SideEffect[],
    middleware: RequestHandler[],
    requestHandler: RequestHandler,
};

export type MethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type RequestHandler = (dto: Request) => Promise<Response>;
export type SideEffect = (request: Request) => Promise<void>;

export type ParamMap = Record<string, string>;

export const HttpStatusCodes = {
    OK: number,
    CREATED: number,
    BAD_REQUEST: number,
    NO_CONTENT: number,
    UNAUTHORIZED: number,
    FORBIDDEN: number,
    NOT_FOUND: number,
    CONFLICT: number,
    INTERNAL_SERVER_ERROR: number,
};

export const UserRegisteredEvent: string = 'userRegistered';
export const UserLoggedInEvent: string = 'userLoggedIn';
export const UserLoggedOutEvent: string = 'userLoggedOut';

export type HashingAlgorithm =
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
