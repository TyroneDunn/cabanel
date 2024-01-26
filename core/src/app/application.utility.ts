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
