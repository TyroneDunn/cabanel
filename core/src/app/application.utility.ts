import { validateAppSchema } from "./app-validator.service";
import {
   Application,
   ApplicationSchema,
   Controller,
   isValidationError,
   ValidationError,
} from "@hals/common";
import { appBuilder } from "./app-builder.utility";
import { NodeEnvironmentOption } from "@hals/common/lib/app/application-schema.type";

export type InitialiseApplication = (
   config      : ApplicationSchema,
   controllers : Controller[],
) => Application;

export const hals : InitialiseApplication = (
   config      : ApplicationSchema,
   controllers : Controller[],
) : Application => {
   const validationOutcome : ValidationError | null = validateAppSchema(config);
   if (isValidationError(validationOutcome)) throw new Error(validationOutcome.error.message);
   else return appBuilder.buildApp(config, controllers);
};

export const serverStartMessage = (
   title       : string,
   port        : number,
   version     : string,
   environment : NodeEnvironmentOption
) : string => {
   const messageTitle   : string = `'${title}' Hals Server Started\n `;
   const messageDivider : string = '----------------------------------------\n';
   const messageActions : string = `App running at http://localhost:${port}\n` +
                                   `Press Ctrl+C to stop the server.\n`;
   return messageTitle + messageDivider + serverMetadata(title, port, version, environment) + '\n' +
          messageActions + messageDivider;
};

export const serverMetadata = (
   title       : string,
   port        : number,
   version     : string,
   environment : NodeEnvironmentOption
) : string =>
   `Server: ${title}\nPort: ${port}\nEnvironment: ${environment}\nVersion: ${version}\n`;