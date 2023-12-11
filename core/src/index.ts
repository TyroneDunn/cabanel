import {init, run} from "./app/app";
import {
    BuildConfig,
    buildConfig as buildAppImpl,
    buildLocalAuthStrategy as buildLocalAuthStrategyImpl
} from "./app/config.utility";
import {appBuilder as appBuilderImpl, AppBuilder} from "./app/app-builder.utility";
import EventEmitter from "events";
import {HalsEventEmitter} from "./app/event-emitter.service";

export const App = {
    init: init,
    run: run
};

export const buildConfig: BuildConfig = buildAppImpl;

export const buildLocalAuthStrategy = buildLocalAuthStrategyImpl;

export const appBuilder: AppBuilder = appBuilderImpl;

export const halsEventEmitter: EventEmitter = HalsEventEmitter;

export const HttpStatusCodes = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};
