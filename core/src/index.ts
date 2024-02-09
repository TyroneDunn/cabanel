import EventEmitter from "events";
import {
   HalsEventEmitter,
   UserLoggedInEvent as UserLoggedInEventConst,
   UserLoggedOutEvent as UserLoggedOutEventConst,
   UserRegisteredEvent as UserRegisteredEventConst,
} from "./app/event-emitter.service";
import {
   BuildLocalAuthStrategy,
   buildLocalAuthStrategy as buildLocalAuthStrategyImpl,
} from "./auth/local-strategy.utility";
import { hals as halsImpl, InitialiseApplication } from "./app/application.utility";

export const buildLocalAuthStrategy : BuildLocalAuthStrategy = buildLocalAuthStrategyImpl;
export const halsEventEmitter : EventEmitter = HalsEventEmitter;
export const hals : InitialiseApplication = halsImpl;

export const UserRegisteredEvent : string = UserRegisteredEventConst;
export const UserLoggedInEvent : string = UserLoggedInEventConst;
export const UserLoggedOutEvent : string = UserLoggedOutEventConst;
