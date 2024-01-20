import { CorsOptions } from "../cors/cors-options.type";
import { AuthStrategy } from "../auth/auth-strategy.type";

export type ApplicationSchema = {
   nodeEnv      : NodeEnvironmentOption;
   serverOption : ServerFrameworkOption,
   title        : string,
   version      : string;
   port         : number,
   corsOptions? : CorsOptions,
   authStrategy : AuthStrategy,
};

export type NodeEnvironmentOption =
   | "production"
   | "development";

export type ServerFrameworkOption =
   | "Express"
   | "Nest"
   | "Fastify";
