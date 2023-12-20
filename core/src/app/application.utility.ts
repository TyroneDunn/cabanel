import { Application } from "./application.type";
import { ApplicationSchema } from "./schema.type";
import { Controller } from "./controller.type";
import { validateAppSchema } from "./app-validator.service";
import { ValidationOutcome } from "@hals/common";
import { appBuilder } from "./app-builder.utility";

export type InitialiseApplication = (
   config: ApplicationSchema,
   controllers: Controller[],
) => Application;

export const newApplication: InitialiseApplication = (
   config: ApplicationSchema,
   controllers: Controller[] = [],
): Application => {
   const validationOutcome: ValidationOutcome = validateAppSchema(config);
   if (validationOutcome.error) throw new Error(validationOutcome.error.message);
   return appBuilder.buildApp(config, controllers);
};
