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
export const buildSchema: BuildSchema = buildSchemaImpl;
export const halsEventEmitter: EventEmitter = HalsEventEmitter;

export const HttpStatusCodes = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};
