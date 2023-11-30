import {CorsOptions} from "cors";

type WebFrameworkOption = "Express" | "Nest" | "Fastify";
type AuthStrategyOption = "Local" | "JWT";
type DatabaseOption = "MongoDB" | "MySQL" | "GraphQL";
type HashingAlgorithmOption = "sha512" | "lorem";

export type Config = {
    api?: WebFrameworkOption,
    title?: string,
    port?: number,
    corsOptions?: CorsOptions,
    authOptions?: {
        strategy: AuthStrategyOption,
        sessionSecret?: string,
        db?: DatabaseOption
        dbUrl?: string,
        hashingAlgorithm?: HashingAlgorithmOption,
        hashingIterations?: number,
        passwordLength?: number
        passwordSalt?: string
    }
}

const DEFAULT_CONFIG: Config = {
};