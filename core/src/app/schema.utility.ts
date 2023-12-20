import {CorsOptions} from "cors";
import { ApplicationSchema, AuthStrategy } from "@hals/common";
import {
   NodeEnvironmentOption,
   WebFrameworkOption,
} from "@hals/common/lib/app/application-schema.type";

export type BuildSchema = (
    nodeEnv: NodeEnvironmentOption,
    api: WebFrameworkOption,
    title: string,
    version: string,
    port: number,
    corsOptions: CorsOptions,
    authStrategy: AuthStrategy,
) => ApplicationSchema;

export const buildSchema: BuildSchema = (
    nodeEnv: NodeEnvironmentOption,
    api: WebFrameworkOption,
    title: string,
    version: string,
    port: number,
    corsOptions: CorsOptions,
    authStrategy: AuthStrategy = "None",
): ApplicationSchema =>
    ({
        nodeEnv: nodeEnv,
        api: api,
        title: title,
        version: version,
        port: port,
        corsOptions: corsOptions,
        authStrategy: authStrategy
    });