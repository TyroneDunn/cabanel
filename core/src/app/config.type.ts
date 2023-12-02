import {CorsOptions} from "cors";
import {HashingAlgorithm} from "../shared/hashing-algorithm.type";

type WebFrameworkOption = "Express" | "Nest" | "Fastify";
type DatabaseOption = "MongoDB" | "MySQL" | "GraphQL";
type AuthStrategyOption = "None" | "Local" | "JWT";

export type Config = {
    nodeEnv: "production" | "development";
    api: WebFrameworkOption,
    title?: string,
    version?: string;
    port?: number,
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
