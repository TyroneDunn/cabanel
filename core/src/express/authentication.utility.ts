import {
    Application as ExpressApplication,
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from "express";
import { isLocalStrategy } from "../auth/local-strategy.utility";
import { configureLocalAuthentication } from "./local-auth.utility";
import { ApplicationSchema, UNAUTHORIZED } from "@hals/common";

export const configureAuthentication = (app: ExpressApplication, schema: ApplicationSchema) => {
   if (schema.authStrategy === "None") return;

   if (isLocalStrategy(schema.authStrategy)) {
      configureLocalAuthentication(schema, app);
      return;
   }

   // implement JWT strategy et al...
};

export const authGuard: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
   if (!request.isAuthenticated())
      return response.status(UNAUTHORIZED).json('Unauthorized.');
   return next();
};
