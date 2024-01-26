import { buildExpressRestApp } from "../express/express-app-builder.utility";
import { Application, ApplicationSchema } from "@hals/common";
import { isRestApplicationSchema, isWebSocketApplicationSchema } from '@hals/common/lib';

export type BuildApp = (schema : ApplicationSchema) => Application;

export const buildApp: BuildApp = (schema : ApplicationSchema) : Application => {
   if (isWebSocketApplicationSchema(schema)) throw new Error(
      'Web Socket Application not implemented. Please select a different option.',
   );
   if (isRestApplicationSchema(schema)) {
      switch (schema.serverOption) {
         case "Express": return buildExpressRestApp(schema);
         default: throw new Error(
            `REST "${schema.serverOption}" API not implemented. Please select a different option.`
         );
      }
   }
   throw new Error("Invalid application schema definition.");
};
