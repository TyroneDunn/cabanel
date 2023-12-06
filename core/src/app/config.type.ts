import {CorsOptions} from "cors";
import {HashingAlgorithm} from "../shared/hashing-algorithm.type";
import {OK} from "../shared/http-status-codes.constant";

export type Config = {
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

export type JWTStrategy = {};

export type BuildConfig = (
    nodeEnv: NodeEnvironmentOption,
    api: WebFrameworkOption,
    title: string,
    version: string,
    port: number,
    corsOptions: CorsOptions,
    authStrategy: AuthStrategy,
) => Config;

export const buildConfig: BuildConfig = (
    nodeEnv: NodeEnvironmentOption,
    api: WebFrameworkOption,
    title: string,
    version: string,
    port: number,
    corsOptions: CorsOptions = DEFAULT_CORS_OPTIONS,
    authStrategy: AuthStrategy = "None",
): Config =>
    ({
        nodeEnv: nodeEnv,
        api: api,
        title: title,
        version: version,
        port: port,
        corsOptions: corsOptions,
        authStrategy: authStrategy
    });

export const DEFAULT_CORS_OPTIONS: CorsOptions = {
    origin: [
        '*',
    ],
    optionsSuccessStatus: OK,
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
};
