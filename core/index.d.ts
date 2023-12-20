import {
   ApplicationSchema,
   AuthStrategy,
   CorsOptions,
   HashAlgorithm,
   LocalStrategy,
} from "@hals/common";
import { DatabaseOption } from "@hals/common/lib/auth/local-strategy.type";
import {
   NodeEnvironmentOption,
   WebFrameworkOption,
} from "@hals/common/lib/app/application-schema.type";

import {
   buildLocalAuthStrategy as buildLocalAuthStrategyImpl,
} from "./src/auth/local-strategy.utility";
import { buildSchema as buildSchemaImpl } from "./src/app/schema.utility";
import EventEmitter from "events";
import { HalsEventEmitter } from "./src/app/event-emitter.service";
import {
   InitialiseApplication,
   newApplication as newApplicationImpl,
} from "./src/app/application.utility";

export const newApplication: InitialiseApplication = newApplicationImpl;

export type BuildSchema = (
   nodeEnv: NodeEnvironmentOption,
   api: WebFrameworkOption,
   title: string,
   version: string,
   port: number,
   corsOptions: CorsOptions,
   authStrategy: AuthStrategy,
) => ApplicationSchema;

export const buildSchema: BuildSchema = buildSchemaImpl;

export type BuildLocalAuthStrategy = (
   usersDbName: string,
   usersDbOption: DatabaseOption,
   usersDbUrl: string,
   sessionSecret: string,
   hashingAlgorithm: HashAlgorithm,
   hashingIterations: number,
   passwordLength: number,
   passwordSalt: string,
) => LocalStrategy;

export const buildLocalAuthStrategy: BuildLocalAuthStrategy = buildLocalAuthStrategyImpl;
export const halsEventEmitter: EventEmitter = HalsEventEmitter;

export const UserRegisteredEvent: string = 'userRegistered';
export const UserLoggedInEvent: string = 'userLoggedIn';
export const UserLoggedOutEvent: string = 'userLoggedOut';
