import { validateAppSchema } from "./app-validator.service";
import { Application, ApplicationSchema, isValidationError, ValidationError } from "@hals/common";
import { buildApp } from "./build-app.utility";

export type InitialiseApplication = (schema : ApplicationSchema) => Application;

export const hals : InitialiseApplication = (schema : ApplicationSchema) : Application => {
   const validationOutcome : ValidationError | null = validateAppSchema(schema);
   if (isValidationError(validationOutcome)) throw new Error(validationOutcome.error.message);
   else return buildApp(schema);
};
