import { Application as ExpressApplication, RequestHandler } from "express";
import passport from "passport";
import {
   ApplicationSchema,
   Error as HalsError,
   HashUtility,
   isError,
   LocalStrategy as HalsLocalStrategy,
   User,
} from "@hals/common";
import { AuthRepository } from "../auth/auth-repository.type";
import { GetUserDTO } from "../users/users-dtos";
import session, { SessionOptions } from "express-session";
import MongoStore from "connect-mongo";
import { configureAuthRepository } from "../auth/auth-repository.utility";
import { AuthService, configureAuthService } from "../auth/auth.service";
import { configureLocalAuthRouter } from "./local-auth-router.utility";
import LocalStrategy = require('passport-local');

export const configureLocalAuthentication = (
   schema : ApplicationSchema,
   app    : ExpressApplication
) : void => {
   const localStrategyConfig : HalsLocalStrategy = schema.authStrategy as HalsLocalStrategy;
   const authRepository : AuthRepository = configureAuthRepository(
      localStrategyConfig.usersDbName,
      localStrategyConfig.usersDbOption,
      localStrategyConfig.usersDbUrl,
      localStrategyConfig.passwordSalt,
      localStrategyConfig.passwordLength,
      localStrategyConfig.hashingAlgorithm,
      localStrategyConfig.hashingIterations,
   );
   const authService : AuthService = configureAuthService(authRepository);
   configurePassportLocalStrategy(
      localStrategyConfig,
      authService,
   );
   app.use(sessionMiddleware(schema));
   app.use(passport.initialize());
   app.use(passport.session());
   app.use('/auth/', configureLocalAuthRouter(authService));
};

const configurePassportLocalStrategy = (
   config      : HalsLocalStrategy,
   authService : AuthService,
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
      const user : User | HalsError = await authService.getUser({ username: username });
      if (isError(user)) {
         done(null, false);
         return;
      }

      const validateHash  = HashUtility(
         config.passwordSalt,
         config.hashingIterations,
         config.passwordLength,
         config.hashingAlgorithm,
      ).validateHash;

      if (validateHash(
         password,
         user.hash,
      )) {
         done(null, user);
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
      try {
         const dto : GetUserDTO = { username: username };
         const user: User | HalsError = await authService.getUser(dto);
         if (isError(user))
            return done(null, false);
         done(null, user);
      }
      catch (error) {
         done(error);
      }
   });
};

const sessionMiddleware = (config : ApplicationSchema) : RequestHandler =>
   session(configureSessionOptions(config));

const configureSessionOptions = (schema : ApplicationSchema) : SessionOptions => ({
   secret            : (schema.authStrategy as HalsLocalStrategy).sessionSecret,
   resave            : false,
   saveUninitialized : true,
   store             : configureSessionStore(schema.authStrategy as HalsLocalStrategy),
   cookie            : {
      // Session Lifespan: 21 Days.
      maxAge         : 21 * (24 * (60 * (1000 * 60))),
      httpOnly       : (schema.nodeEnv === "production"),
   },
});

const configureSessionStore = (authStrategy : HalsLocalStrategy) => {
   switch (authStrategy.usersDbOption) {
      case "MongoDB":
         return configureMongoSessionStore(authStrategy.usersDbUrl);
      default:
         throw new Error(`"${authStrategy.usersDbOption} session store not implemented. Please choose another session store option.`);
   }
};

const configureMongoSessionStore = (url : string) : MongoStore =>
   MongoStore.create({
      mongoUrl       : url,
      collectionName : 'sessions',
   });
