import {CorsOptions} from "cors";
import {OK} from "../shared/http-status-codes.constant";
import {
    Config,
    NodeEnvironmentOption,
    WebFrameworkOption,
    AuthStrategy,
} from "./config.type";
import {DatabaseOption, LocalStrategy} from "./local-strategy.type";
import {HashingAlgorithm} from "./hashing-algorithm.type";

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
    corsOptions: CorsOptions,
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