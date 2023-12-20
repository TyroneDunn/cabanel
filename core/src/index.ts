import EventEmitter from "events";
import { HalsEventEmitter } from "./app/event-emitter.service";
import {
   BuildLocalAuthStrategy,
   buildLocalAuthStrategy as buildLocalAuthStrategyImpl,
} from "./auth/local-strategy.utility";
import {
   InitialiseApplication,
   hals as halsImpl,
} from "./app/application.utility";

export const buildLocalAuthStrategy: BuildLocalAuthStrategy = buildLocalAuthStrategyImpl;
export const halsEventEmitter: EventEmitter = HalsEventEmitter;
export const hals: InitialiseApplication = halsImpl;
