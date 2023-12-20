import {
   HashAlgorithm,
   LocalStrategy,
} from "@hals/common";
import { DatabaseOption } from "@hals/common/lib/auth/local-strategy.type";

import {
   buildLocalAuthStrategy as buildLocalAuthStrategyImpl,
} from "./src/auth/local-strategy.utility";
import EventEmitter from "events";
import { HalsEventEmitter } from "./src/app/event-emitter.service";
import {
   InitialiseApplication,
   hals as halsImpl,
} from "./src/app/application.utility";

export const hals: InitialiseApplication = halsImpl;

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
