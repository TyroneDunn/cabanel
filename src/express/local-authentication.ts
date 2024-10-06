import { NodeEnvironmentOption } from '../application/application';
import { LocalAuthDatabaseProvider } from '../application/local-auth-strategy';
import {
   Application as ExpressApplication,
   NextFunction as ExpressNext,
   Request as ExpressRequest,
   RequestHandler as ExpressRequestHandler,
   Response as ExpressResponse,
   Router as ExpressRouter,
} from 'express';
import session, { SessionOptions, Store } from "express-session";
import MongoStore from "connect-mongo";
import passport from 'passport';
import { conflict, internalServerError, ok } from '../http/http';
import {
   GetUser,
   GetUserError,
   RegisterUser,
   RegisterUserError,
   RegisterUserRequest,
   User,
} from '../users/users';
import { authGuard } from './authentication';
import {
   cabanelEventsSubject,
   userLoggedInEvent,
   userLoggedOutEvent,
   userRegisteredEvent,
} from '../application/events';
import { isFailure, isSuccess, Result } from '../common/result';
import { buildHttpRequest } from "./express";
import { consoleLogHttpRequest } from "../log/log";
import LocalStrategy = require('passport-local');


export type ConfigureLocalAuthentication = (
   app : ExpressApplication,
   registerUser : RegisterUser,
   getUser : GetUser,
   validateHash : ValidateHash,
   sessionSecret: string,
   environment: NodeEnvironmentOption,
   databaseProvider: LocalAuthDatabaseProvider,
   databaseUrl: string,
) => void;

export const configureLocalAuthentication : ConfigureLocalAuthentication = (
   app : ExpressApplication,
   registerUser : RegisterUser,
   getUser : GetUser,
   validateHash : ValidateHash,
   sessionSecret: string,
   environment: NodeEnvironmentOption,
   databaseProvider: LocalAuthDatabaseProvider,
   databaseUrl: string,
) : void => {
   configurePassportLocalStrategy(getUser, validateHash);
   app.use(localSessionMiddleware(sessionSecret, databaseProvider, databaseUrl, environment));
   app.use(passport.initialize());
   app.use(passport.session());
   app.use('/auth', configureAuthenticationRouter(registerUser));
};


// Session
export type ValidateHash = (password : string, hash : string) => boolean;

const configurePassportLocalStrategy = (
   getUser : GetUser,
   validateHash : ValidateHash,
) : void => {
   const userField = {
      usernameField: 'username',
      passwordField: 'password',
   };

   const verifyCallback = async (
      username : string,
      password : string,
      done     : any
   ) : Promise<void> => {
      const getUserResult: Result<User, GetUserError> =
         await getUser({ username: username });

      if (isFailure(getUserResult)) {
         done(null, false);
         return;
      }

      if (validateHash(password, getUserResult.data.hash)) {
         done(null, getUserResult.data);
         return;
      }

      else {
         done(null, false);
         return;
      }
   };

   passport.use(new LocalStrategy.Strategy(userField, verifyCallback));

   passport.serializeUser((user : any, done : any) => {
      done(null, user.username);
   });

   passport.deserializeUser(async (username : any, done : any) => {
      const getUserResult: Result<User, GetUserError> =
         await getUser({ username: username });

      // if (isFailure(getUserResult)) return done(null, false);
      if (isFailure(getUserResult)) return done(getUserResult.error);

      done(null, getUserResult.data);
   });
};

const localSessionMiddleware = (
   sessionSecret : string,
   databaseProvider : LocalAuthDatabaseProvider,
   databaseUrl : string,
   environment : NodeEnvironmentOption,
) : ExpressRequestHandler =>
   session(sessionOptions(sessionSecret, databaseProvider, databaseUrl, environment));

const sessionOptions = (
   sessionSecret : string,
   databaseProvider : LocalAuthDatabaseProvider,
   databaseUrl : string,
   environment : NodeEnvironmentOption,
) : SessionOptions => ({
   secret            : sessionSecret,
   resave            : false,
   saveUninitialized : true,
   store             : configureSessionStore(databaseProvider, databaseUrl),
   cookie            : {
      // Session Lifespan: 21 Days.
      maxAge         : 21 * (24 * (60 * (1000 * 60))),
      httpOnly       : (environment === "production"),
   },
});

const configureSessionStore = (
   databaseProvider: LocalAuthDatabaseProvider,
   databaseUrl: string) : Store => {
      switch (databaseProvider) {
         case "MongoDB":
            return configureMongoSessionStore(databaseUrl);
         default:
            throw new Error(`"${databaseProvider} session store not supported. Please choose another option.`);
      }
   };

const configureMongoSessionStore = (url : string) : MongoStore =>
   MongoStore.create({
      mongoUrl       : url,
      collectionName : 'sessions',
   });


// Router
export const configureAuthenticationRouter = (registerUser : RegisterUser) : ExpressRouter => {
   const authRouter : ExpressRouter = ExpressRouter();
   authRouter.post('/register', logRequest("register"), registerRequestHandler(registerUser), authenticateRequestHandler, loggedInRequestHandler);
   authRouter.post('/login', logRequest("login"), authenticateRequestHandler, loggedInRequestHandler);
   authRouter.post('/logout', logRequest("logout"), authGuard, logoutRequestHandler);
   authRouter.get('/protected', logRequest("protected"), authGuard, authenticatedRequestHandler);
   return authRouter;
};

export const logRequest = (option: 'root' | 'register' | 'login' | 'logout' | 'protected'): ExpressRequestHandler => (
   request  : ExpressRequest,
   response : ExpressResponse,
   next     : ExpressNext
): void => {
   switch (option) {
      case "root":
         consoleLogHttpRequest(buildHttpRequest(
            '',
            { requestType: "GET" },
            request,
            (status: number, response: any): void => {},
         ));
         break;
      case "register":
         consoleLogHttpRequest(buildHttpRequest(
            'auth/register',
            { requestType: "POST" },
            request,
            (status: number, response: any): void => {},
         ));
         break;
      case "login":
         consoleLogHttpRequest(buildHttpRequest(
            'auth/login',
            { requestType: "POST" },
            request,
            (status: number, response: any): void => {},
         ));
         break;
      case "logout":
         consoleLogHttpRequest(buildHttpRequest(
            'auth/logout',
            { requestType: "POST" },
            request,
            (status: number, response: any): void => {},
         ));
         break;
      case "protected":
         consoleLogHttpRequest(buildHttpRequest(
            'auth/protected',
            { requestType: "GET" },
            request,
            (status: number, response: any): void => {},
         ));
         break;
   }

   next();
   return;
}

const registerRequestHandler = (registerUser: RegisterUser) : ExpressRequestHandler =>
   async (
      request  : ExpressRequest,
      response : ExpressResponse,
      next     : ExpressNext
   ) : Promise<void> => {
      const registerUserRequest : RegisterUserRequest =
         mapExpressRequestToRegisterUserRequest(request);

      const registerUserResult: Result<User, RegisterUserError> =
         await registerUser(registerUserRequest);

      if (isSuccess(registerUserResult)) {
         cabanelEventsSubject.next({
            name: userRegisteredEvent,
            payload: registerUserResult.data
         });
         next();
         return;
      }

      else if (isFailure(registerUserResult)) {
         switch (registerUserResult.error.type) {
            case "Conflict": {
               response.status(conflict)
               .json({ status: conflict, error: registerUserResult.error.message });
               return;
            }
            case "Internal": {
               response.status(internalServerError)
               .json({ status: internalServerError, error: registerUserResult.error.message });
               return;
            }
         }
      }
   };

type MapExpressRequestToRegisterUserRequest = (req : ExpressRequest) => RegisterUserRequest;

const mapExpressRequestToRegisterUserRequest: MapExpressRequestToRegisterUserRequest =
   (req : ExpressRequest) : RegisterUserRequest => ({
      username : req.body.username,
      password : req.body.password,
   });


const authenticateRequestHandler : ExpressRequestHandler = passport.authenticate('local');

const loggedInRequestHandler : ExpressRequestHandler = (
   request  : ExpressRequest,
   response : ExpressResponse
) : void => {
   response.json({
      status: ok,
      message: 'Logged in successfully.',
      username: (request.user as User).username
   });
   cabanelEventsSubject.next({
      name: userLoggedInEvent,
      payload: request.user as User
   });
};

const logoutRequestHandler : ExpressRequestHandler =
   (request  : ExpressRequest, response : ExpressResponse) : void => {
      request.logout((error) => {
         if (error) {
            response.status(internalServerError).json({
               status  : internalServerError,
               message : 'Log out failed.',
            });
            return;
         }

         response.json({
            status  : ok,
            message : 'Logged out successfully.',
         });
         cabanelEventsSubject.next({
            name: userLoggedOutEvent,
            payload: request.user as User
         });
      });
   };

const authenticatedRequestHandler : ExpressRequestHandler = (
   request  : ExpressRequest,
   response : ExpressResponse
) : void => {
   response.json({
      status   : ok,
      username : (request.user as User).username,
   });
};
