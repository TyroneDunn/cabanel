import { validateAppSchema } from "./app-validator.service";
import { Application, ApplicationSchema, isValidationError, ValidationError } from "@hals/common";
import { buildApp } from "./build-app.utility";

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
   else return buildApp(schema);
};
