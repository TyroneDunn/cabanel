import {
   RestServerApplication,
   RestServerApplicationSchema,
} from './rest-server-application.types';
import {
   WebSocketApplicationSchema,
   WebSocketServerApplication,
} from './web-socket-server-application';
import { LocalAuthStrategy } from './local-auth-strategy.types';
import { JwtAuthStrategy } from './jwt-auth-strategy.types';

export type Application =
   | RestServerApplication
   | WebSocketServerApplication;

export type ApplicationSchema =
   | RestServerApplicationSchema
   | WebSocketApplicationSchema;

export type HostAddress = string;

export type NodeEnvironmentOption =
   | "production"
   | "development";

export type ServerFrameworkOption =
   | "Express"

export type AuthStrategy =
   | "None"
   | LocalAuthStrategy
   | JwtAuthStrategy;
