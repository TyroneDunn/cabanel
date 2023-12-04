import {CorsOptions} from "cors";
import {HashingAlgorithm} from "../shared/hashing-algorithm.type";
import {OK} from "../shared/http-status-codes.constant";

type WebFrameworkOption = "Express" | "Nest" | "Fastify";
type DatabaseOption = "MongoDB" | "MySQL" | "GraphQL";
type AuthStrategyOption = "None" | "Local" | "JWT";

type NodeEnvironmentOption = "production" | "development";

const DEFAULT_CORS_OPTIONS: CorsOptions = {
    origin: [
        '*',
    ],
    optionsSuccessStatus: OK,
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
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
}

export type BuildConfig = (
    nodeEnv: NodeEnvironmentOption,
    api: WebFrameworkOption,
    title: string,
    version: string,
    port: number,
    corsOptions: CorsOptions,
    authStrategy: AuthStrategyOption,
    authDb: DatabaseOption,
    dbUrl: string,
    sessionSecret: string,
    hashingAlgorithm: HashingAlgorithm,
    hashingIterations: number,
    passwordLength: number,
    passwordSalt: string,
) => Config;

export const buildConfig: BuildConfig = (
    nodeEnv: NodeEnvironmentOption,
    api: WebFrameworkOption,
    title: string,
    version: string,
    port: number,
    corsOptions: CorsOptions = DEFAULT_CORS_OPTIONS,
    authStrategy: AuthStrategyOption = "None",
    authDb: DatabaseOption = "MongoDB",
    dbUrl: string = "",
    sessionSecret: string = "",
    hashingAlgorithm: HashingAlgorithm = "sha512",
    hashingIterations: number = 32,
    passwordLength: number = 16,
    passwordSalt: string = '',
): Config =>
    ({
        nodeEnv: nodeEnv,
        api: api,
        title: title,
        version: version,
        port: port,
        corsOptions: corsOptions,
        authOptions: {
            strategy: authStrategy,
            db: authDb,
            dbUrl: dbUrl,
            sessionSecret: sessionSecret,
            hashingAlgorithm: hashingAlgorithm,
            hashingIterations: hashingIterations,
            passwordLength: passwordLength,
            passwordSalt: passwordSalt,
        },
    });
