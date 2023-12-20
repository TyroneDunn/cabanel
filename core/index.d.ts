import {
   buildLocalAuthStrategy as buildLocalAuthStrategyImpl,
   BuildLocalAuthStrategy as BuildLocalAuthStrategyType,
} from "./src/auth/local-strategy.utility";

import EventEmitter from "events";
import { HalsEventEmitter } from "./src/app/event-emitter.service";
import { hals as halsImpl, InitialiseApplication } from "./src/app/application.utility";

export type BuildLocalAuthStrategy = BuildLocalAuthStrategyType;

export const buildLocalAuthStrategy: BuildLocalAuthStrategy = buildLocalAuthStrategyImpl;
export const hals: InitialiseApplication = halsImpl;
export const halsEventEmitter: EventEmitter = HalsEventEmitter;
export const UserRegisteredEvent: string = 'userRegistered';
export const UserLoggedInEvent: string = 'userLoggedIn';
export const UserLoggedOutEvent: string = 'userLoggedOut';
