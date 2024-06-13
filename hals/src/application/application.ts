import {
   RestServerApplication,
   RestServerApplicationSchema,
   isRestServerApplicationSchema
} from './rest-server-application';
import {
   WebSocketServerApplicationSchema,
   WebSocketServerApplication,
   isWebSocketServerApplicationSchema,
} from './web-socket-server-application';
import { LocalAuthStrategy } from './local-auth-strategy';
import { JwtAuthStrategy } from './jwt-auth-strategy';
import { Result, Success, isFailure } from '../common/result';
import { ValidationError } from '../common/validation';

export type Application =
   | RestServerApplication
   | WebSocketServerApplication;

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

export type ServerFrameworkOption =
   | "Express"

export type AuthStrategy =
   | "None"
   | LocalAuthStrategy
   | JwtAuthStrategy;


export const hals : InitialiseApplication = (schema : ApplicationSchema) : Application => {
   const validationResult : Result<undefined, ValidationError> = validateApplicationSchema(schema);
   if (isFailure(validationResult))
      throw new Error(validationResult.error.message);

   else
      return buildApplication(schema);
};

const validateApplicationSchema : ValidateApplicationSchema =
   (schema : ApplicationSchema): Result<undefined, ValidationError> => {
      // IMPLEMENT
      const stubResult : Success<undefined> = { data: undefined };
      return stubResult;
   };

export const buildApplication: BuildApplication = (schema : ApplicationSchema) : Application => {
   if (isWebSocketServerApplicationSchema(schema))
      // IMPLEMENT
      throw new Error(
         'Web Socket Application not implemented. Please select a different option.',
      );
   if (isRestServerApplicationSchema(schema)) {
      switch (schema.serverOption) {
         case "Express": return buildExpressRestServerApplication(schema);
         default: throw new Error(
            `"${schema.serverOption}" REST server application not supported. Please select a different option.`
         );
      }
   }
   throw new Error("Invalid application schema definition.");
};
