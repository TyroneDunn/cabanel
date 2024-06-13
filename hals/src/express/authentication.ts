import {
   Application as ExpressApplication,
   NextFunction,
   Request as ExpressRequest,
   RequestHandler as ExpressRequestHandler,
   Response as ExpressResponse,
} from "express";
import { HttpResponse, unauthorized } from '../http/http';
import { isLocalAuthStrategy } from '../application/local-auth-strategy';
import { configureLocalAuthentication } from './local-authentication';
import { GetUser, RegisterUser } from '../users/users';
import { AuthStrategy, NodeEnvironmentOption } from '../application/application';
import { validateHash } from '../password/password';


export type ConfigureExpressRestServerApplicationAuthentication = (
   app : ExpressApplication,
   authStrategy : AuthStrategy,
   environment : NodeEnvironmentOption,
   registerUser : RegisterUser,
   getUser : GetUser,
) => void;
export const configureExpressRestServerApplicationAuthentication: ConfigureExpressRestServerApplicationAuthentication = (
   app : ExpressApplication,
   authStrategy : AuthStrategy,
   environment : NodeEnvironmentOption,
   registerUser : RegisterUser,
   getUser : GetUser,
): void => {
   if (authStrategy === "None") return;

   if (isLocalAuthStrategy(authStrategy)) {
      configureLocalAuthentication(
         app,
         registerUser,
         getUser,
         validateHash(authStrategy.passwordOptions),
         authStrategy.sessionSecret,
         environment,
         authStrategy.databaseOptions.databaseProvider,
         authStrategy.databaseOptions.databaseUrl
      );
      return;
   }

   // IMPLEMENT JWT strategy etc.
};


export type AuthGuard = ExpressRequestHandler;
export const authGuard: AuthGuard =
   (request: ExpressRequest, response: ExpressResponse, next: NextFunction) => {
      if (!request.isAuthenticated())
         return response.status(unauthorized)
         .json({
            status: unauthorized,
            error : "Unauthorized user."
         } as HttpResponse<undefined>);
      return next();
   };
