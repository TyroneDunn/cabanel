import {
   RestServerApplication,
   RestServerApplicationSchema,
} from './rest-server-application';
import {
   WebSocketServerApplicationSchema,
   WebSocketServerApplication,
} from './web-socket-server-application';
import { LocalAuthStrategy } from './local-auth-strategy';
import { JwtAuthStrategy } from './jwt-auth-strategy';
import { Result } from '../common/result';
import { ValidationError } from '../common/validation';

export type Application =
   | RestServerApplication
   | WebSocketServerApplication;

export type ApplicationSchema =
   | RestServerApplicationSchema
   | WebSocketServerApplicationSchema;

export type NodeEnvironmentOption =
   | "production"
   | "development";

export type ServerFrameworkOption =
   | "Express"

export type AuthStrategy =
   | "None"
   | LocalAuthStrategy
   | JwtAuthStrategy;

export type ValidateApplicationSchema =
   (schema : ApplicationSchema) => Result<undefined, ValidationError>;