import {BuildSchema, buildSchema as buildSchemaImpl} from "./app/schema.utility";
import EventEmitter from "events";
import {HalsEventEmitter} from "./app/event-emitter.service";
import {
    BuildLocalAuthStrategy,
    buildLocalAuthStrategy as buildLocalAuthStrategyImpl
} from "./auth/local-strategy.utility";
import {
    InitialiseApplication,
    newApplication as newApplicationImpl
} from "./app/application.utility";

export const newApplication: InitialiseApplication = newApplicationImpl;
export const buildLocalAuthStrategy: BuildLocalAuthStrategy = buildLocalAuthStrategyImpl;

// todo: consider removing build schema, it is a simple process and defining it is the same as
//  using the function
export const buildSchema: BuildSchema = buildSchemaImpl;
export const halsEventEmitter: EventEmitter = HalsEventEmitter;
