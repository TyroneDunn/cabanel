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
import { AuthStrategy, NodeEnvironmentOption } from '../application/application';
import { generateHash, validateHash } from '../password/password';
import {
   getUserFromMongodb,
   initialiseMongoUsersModel,
   registerUserInMongodb,
} from '../users/mongo-users';


export type ConfigureExpressRestServerApplicationAuthentication = (
   app : ExpressApplication,
   authStrategy : AuthStrategy,
   environment : NodeEnvironmentOption,
) => void;

export const configureExpressRestServerApplicationAuthentication: ConfigureExpressRestServerApplicationAuthentication = (
   app : ExpressApplication,
   authStrategy : AuthStrategy,
   environment : NodeEnvironmentOption,
): void => {
   if (authStrategy === "None") return;

   if (isLocalAuthStrategy(authStrategy)) {
      switch (authStrategy.databaseOptions.databaseProvider) {
         case "MongoDB": {
            const usersModel = initialiseMongoUsersModel(
               authStrategy.databaseOptions.databaseUrl,
               authStrategy.databaseOptions.usersDatabaseName);
            configureLocalAuthentication(
               app,
               registerUserInMongodb(
                  usersModel,
                  generateHash(authStrategy.passwordOptions)),
               getUserFromMongodb(usersModel),
               validateHash(authStrategy.passwordOptions),
               authStrategy.sessionSecret,
               environment,
               authStrategy.databaseOptions.databaseProvider,
               authStrategy.databaseOptions.databaseUrl
            );
            break;
         }
         case "MySQL": {
            throw new Error('MySQL database provider not supported. Please select another' +
               ' option');
         }
         case "GraphQL": {
            throw new Error('GraphQL database provider not supported. Please select another' +
               ' option');
         }
      }
   }

   // IMPLEMENT JWT strategy etc.
};


export const authGuard: ExpressRequestHandler =
   (request: ExpressRequest, response: ExpressResponse, next: NextFunction) => {
      if (!request.user) return response
         .status(unauthorized)
         .json({
            status: unauthorized,
            error : "Unauthorized user."
         } as HttpResponse<undefined>);
      return next();
   };
