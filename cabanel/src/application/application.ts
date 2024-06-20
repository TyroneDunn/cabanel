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

export type Application = {
   run: () => void
};

export type ApplicationSchema =
   | RestServerApplicationSchema
   | WebSocketServerApplicationSchema;

export type InitialiseApplication = (schema : ApplicationSchema, environment: NodeEnvironmentOption) => Application;

type ValidateApplicationSchema =
   (schema : ApplicationSchema) => Result<undefined, ValidationError>;

type BuildApplication = (schema : ApplicationSchema, environment: NodeEnvironmentOption) => Application;

export type NodeEnvironmentOption =
   | "production"
   | "development";

export type ServerFrameworkOption =
   | "Express"

export type AuthStrategy =
   | "None"
   | LocalAuthStrategy
   | JwtAuthStrategy;


export const cabanel : InitialiseApplication = (schema : ApplicationSchema, environment: NodeEnvironmentOption) : Application => {
   const validationResult : Result<undefined, ValidationError> = validateApplicationSchema(schema);
   if (isFailure(validationResult))
      throw new Error(validationResult.error.message);

   else
      return buildApplication(schema, environment);
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

const buildApplication: BuildApplication = (schema : ApplicationSchema, environment: NodeEnvironmentOption) : Application => {
   if (isWebSocketServerApplicationSchema(schema))
      // IMPLEMENT
      throw new Error(
         'Web Socket Application not implemented. Please select a different option.',
      );
   if (isRestServerApplicationSchema(schema)) {
      switch (schema.serverOption) {
         case "Express": return buildExpressRestServerApplication(schema, environment);
         default: throw new Error(
            `"${schema.serverOption}" REST server application not supported. Please select a different option.`
         );
      }
   }
   throw new Error("Invalid application schema definition.");
};


type ServerStartupMessage = (
   title : string,
   host : string,
   port : number,
   version : string,
   environment : NodeEnvironmentOption,
) => string;

export const serverStartupMessage : ServerStartupMessage = (
   title : string,
   host : string,
   port : number,
   version : string,
   environment : NodeEnvironmentOption,
) : string => {
   const titleMessage : string = `'${title}' Server Started\n `;
   const divider : string = '--------------------------------\n';
   const serverAddressLine : string = `Server application running at http://${host}:${port}\n`;
   return titleMessage + divider + renderStringServerMetadata(title, port, version, environment) + '\n' +
      serverAddressLine;
};

export type RenderJsonServerMetadata = (
   title : string,
   port : number,
   version : string,
   environment : NodeEnvironmentOption,
) => object;

export const renderJsonServerMetadata : RenderJsonServerMetadata = (
   title : string,
   port : number,
   version : string,
   environment : NodeEnvironmentOption,
)  => ({
   title      : title,
   port       : port,
   environment: environment,
   version    : version,
});

export type RenderStringServerMetadata = (
   title : string,
   port : number,
   version : string,
   environment : NodeEnvironmentOption,
) => string;

export const renderStringServerMetadata : RenderStringServerMetadata = (
   title : string,
   port : number,
   version : string,
   environment : NodeEnvironmentOption,
)  =>
   `Title: ${title}\n` +
   `Port: ${port}\n` +
   `Version: ${version}\n` +
   `Environment: ${environment}\n`;

export type HttpRequest$ = Observable<HttpRequest | undefined>;

export const httpRequestSubject : BehaviorSubject<HttpRequest | undefined> =
   new BehaviorSubject<HttpRequest | undefined>(undefined);