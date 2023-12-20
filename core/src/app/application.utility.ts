import { validateAppSchema } from "./app-validator.service";
import { Application, ApplicationSchema, Controller, ValidationOutcome } from "@hals/common";
import { appBuilder } from "./app-builder.utility";
import { NodeEnvironmentOption } from "@hals/common/lib/app/application-schema.type";

export type InitialiseApplication = (
   config: ApplicationSchema,
   controllers: Controller[],
) => Application;

export const hals: InitialiseApplication = (
   config: ApplicationSchema,
   controllers: Controller[] = [],
): Application => {
   const validationOutcome: ValidationOutcome = validateAppSchema(config);
   if (validationOutcome.error) throw new Error(validationOutcome.error.message);
   return appBuilder.buildApp(config, controllers);
};

export const serverStartMessage = (title: string, port: number, version: string, environment: NodeEnvironmentOption): string => {
   const messageTitle: string = `'${title}' Hals Server Started\n `;
   const messageDivider: string = '----------------------------------------';
   return messageTitle + messageDivider + serverMetadata(title, port, version, environment) + messageDivider;
};

export const serverMetadata = (title: string, port: number, version: string, environment: NodeEnvironmentOption): string => {
   return `Server: ${title}\nPort: ${port}\nEnvironment: ${environment}\nVersion: ${version}\n\nApp running at http://localhost:${port}\nPress Ctrl+C to stop the server.`;
}