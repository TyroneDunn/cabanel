import {
  isRestServerApplicationSchema,
  RestServerApplicationSchema,
} from './rest-server-application';
import {
  isWebSocketServerApplicationSchema,
  WebSocketServerApplicationSchema,
} from './web-socket-server-application';
import { LocalAuthStrategy } from './local-auth-strategy';
import { JwtAuthStrategy } from './jwt-auth-strategy';
import { isFailure, Result } from '../common/result';
import { ValidationError } from '../common/validation';
import { buildExpressRestServerApplication } from '../express/express';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpRequest } from '../http/http';
import { httpRequestToStdOutLogger } from "../log/log";

export type Application = {
  run: () => void
};

export type ApplicationSchema =
  | RestServerApplicationSchema
  | WebSocketServerApplicationSchema;

export type InitialiseApplication = (schema : ApplicationSchema) => Application;

type ValidateApplicationSchema =
  (schema : ApplicationSchema) => Result<undefined, ValidationError>;

type BuildApplication = (schema : ApplicationSchema) => Application;

export type NodeEnvironmentOption =
  | "production"
  | "development";

export type AuthStrategy =
  | "None"
  | LocalAuthStrategy
  | JwtAuthStrategy;


export const cabanel : InitialiseApplication = (schema : ApplicationSchema) : Application => {
  const validationResult : Result<undefined, ValidationError> = validateApplicationSchema(schema);
  if (isFailure(validationResult))
    throw new Error(validationResult.error.message);

  else {
    httpRequestToStdOutLogger(httpRequestSubject.asObservable());
    return buildApplication(schema);
  }
};

export const validateApplicationSchema : ValidateApplicationSchema =
  (schema : ApplicationSchema): Result<undefined, ValidationError> => {
    // IMPLEMENT
    if (isRestServerApplicationSchema(schema)) {
      if (schema.host === '')
        return { error: { message: 'Host cannot be empty string', type: 'BadRequest' } };
    }
    return { data: undefined };
  };

const buildApplication: BuildApplication = (schema : ApplicationSchema) : Application => {
  if (isWebSocketServerApplicationSchema(schema))
    // IMPLEMENT
    throw new Error(
      'Web Socket Application not yet implemented. Please select a' +
      ' different option.' );

  if (isRestServerApplicationSchema(schema))
    return buildExpressRestServerApplication(schema);

  throw new Error("Invalid application schema definition.");
};

export const serverStartupMessage = (
  title: string,
  host: string,
  port: number,
): string => {
  const headline: string = `'${title}' server started.\n`;
  return headline + serverMetadata(host, port);
};

export type RenderJsonServerMetadata = (
  title : string,
  port : number,
) => object;

export const renderJsonServerMetadata : RenderJsonServerMetadata = (
  title : string,
  port : number,
)  => ({
  title      : title,
  port       : port,
});

// todo - update log format using @atelierdunn standardised log format
export const serverMetadata = (
  host: string,
  port: number )
: string =>
    `url: http://${host}:${port}\n`;

export type HttpRequest$ = Observable<HttpRequest | undefined>;

export const httpRequestSubject : BehaviorSubject<HttpRequest | undefined> =
  new BehaviorSubject<HttpRequest | undefined>(undefined);