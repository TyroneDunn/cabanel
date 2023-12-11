import {Application as ExpressApplication, RequestHandler} from "express";
import passport from "passport";
import {LocalStrategy as HalsLocalStrategy} from "../auth/local-strategy.type";
import {AuthRepository} from "../auth/auth-repository.type";
import {GetUserDTO} from "../users/users-dtos";
import {User} from "../users/user.type";
import {validateHash} from "../shared/password.utility";
import {Config} from "../app/config.type";
import session, {SessionOptions} from "express-session";
import MongoStore from "connect-mongo";
import {configureUsersRepository} from "../users/users-repository.utility";
import {AuthService, configureAuthService} from "../auth/auth.service";
import {configureLocalAuthRouter} from "./local-auth-router.utility";
import LocalStrategy = require('passport-local');
import {Response} from "../app/response.type";
import {OK} from "../shared/http-status-codes.constant";

export const configureLocalAuthentication = (config: Config, app: ExpressApplication): void => {
    const localStrategyConfig: HalsLocalStrategy = config.authStrategy as HalsLocalStrategy;
    const usersRepository: AuthRepository = configureUsersRepository(
        localStrategyConfig.usersDbName,
        localStrategyConfig.usersDbOption,
        localStrategyConfig.usersDbUrl,
        localStrategyConfig.passwordSalt,
        localStrategyConfig.passwordLength,
        localStrategyConfig.hashingAlgorithm,
        localStrategyConfig.hashingIterations
    );
    const authService = configureAuthService(usersRepository);
    configurePassportLocalStrategy(
        localStrategyConfig,
        authService
    );
    app.use(sessionMiddleware(config));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/auth/', configureLocalAuthRouter(authService));
};

const configurePassportLocalStrategy = (
    config: HalsLocalStrategy,
    authService: AuthService
): void => {
    const userField = {
        usernameField: 'username',
        passwordField: 'password',
    };

    const verifyCallback = async (username: string, password: string, done: any): Promise<void> => {
        const dto: GetUserDTO = {username: username};
        const response: Response = await authService.getUser(dto);
        if (response.status !== OK) {
            done(null, false);
            return;
        }

        const user: User = response.collection?.pop() as User;
        if (!validateHash(
            password,
            user.hash,
            config.passwordSalt,
            config.hashingIterations,
            config.passwordLength,
            config.hashingAlgorithm
        )) {
            done(null, false);
            return;
        }

        done(null, user);
    };

    passport.use(new LocalStrategy.Strategy(userField, verifyCallback));

    passport.serializeUser((user: any, done: any) => {
        done(null, user.username);
    });

    passport.deserializeUser(async (username: any, done: any) => {
        try {
            const dto: GetUserDTO = {username: username};
            const user = await authService.getUser(dto);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};

const sessionMiddleware =
    (config: Config): RequestHandler => session(configureSessionOptions(config));

const configureSessionOptions = (config: Config): SessionOptions =>
    ({
        secret: (config.authStrategy as HalsLocalStrategy).sessionSecret,
        resave: false,
        saveUninitialized: true,
        store: configureSessionStore(config.authStrategy as HalsLocalStrategy),
        cookie: {
            // Session Lifespan: 21 Days.
            maxAge: 21 * (24 * (60 * (1000 * 60))),
            httpOnly: (config.nodeEnv === "production"),
        },
    });

const configureSessionStore = (authStrategy: HalsLocalStrategy) => {
    let sessionStore;
    switch (authStrategy.usersDbOption) {
        case "MongoDB": {
            sessionStore = configureMongoSessionStore(authStrategy.usersDbUrl);
            break;
        }
        default: {
            throw new Error(`"${authStrategy.usersDbOption} session store not implemented. Please choose another session store option.`);
        }
    }
    return sessionStore;
};

const configureMongoSessionStore = (url: string): MongoStore =>
    MongoStore.create({
        mongoUrl: url,
        collectionName: 'sessions',
    });
