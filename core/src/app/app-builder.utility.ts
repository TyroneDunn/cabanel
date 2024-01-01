import { expressAppBuilder } from "../express/express-app-builder.utility";
import { Application, ApplicationSchema, Controller } from "@hals/common";

export type AppBuilder = {
   buildApp : (
      schema      : ApplicationSchema,
      controllers : Controller[]
   ) => Application,
};

export const appBuilder : AppBuilder = {
   buildApp(
      schema      : ApplicationSchema,
      controllers : Controller[]
   ) : Application {
      switch (schema.api) {
         case "Express":
            return expressAppBuilder.buildApp(schema, controllers);
         default:
            throw new Error(`"${schema.api}" API not implemented. Please select a different option.`);
      }
   },
};
