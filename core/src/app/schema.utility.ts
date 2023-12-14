import {CorsOptions} from "cors";
import {OK} from "../shared/http-status-codes.constant";
import {
    AuthStrategy,
    Schema,
    NodeEnvironmentOption,
    WebFrameworkOption
} from "./schema.type";
export type BuildSchema = (
    nodeEnv: NodeEnvironmentOption,
    api: WebFrameworkOption,
    title: string,
    version: string,
    port: number,
    corsOptions: CorsOptions,
    authStrategy: AuthStrategy,
) => Schema;

export const buildSchema: BuildSchema = (
    nodeEnv: NodeEnvironmentOption,
    api: WebFrameworkOption,
    title: string,
    version: string,
    port: number,
    corsOptions: CorsOptions,
    authStrategy: AuthStrategy = "None",
): Schema =>
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