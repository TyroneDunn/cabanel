import {
    Application as ExpressApplication,
    NextFunction,
    Request,
    RequestHandler,
    Response
} from "express";
import passport from "passport";
import LocalStrategy = require('passport-local');
import session, {SessionOptions} from "express-session";
import MongoStore from "connect-mongo";
import {Config} from "../app/config.type";
import {LocalStrategy as HalsLocalStrategy} from "../app/local-strategy.type";
import {isLocalStrategy} from "../app/local-strategy.utility";
import {UsersRepository} from "../users/users-repository";
import {configureUsersRepository} from "../users/users-repository.utility";
import {GetUserDTO} from "../users/users-dtos";
import {User} from "../users/user";
import {validateHash} from "../utils/password.utility";
import {UNAUTHORIZED} from "../shared/http-status-codes.constant";
// const passport = require('passport');

// todo: replace repository with service in order to enable validation
export const configureExpressAppAuthentication = (app: ExpressApplication, config: Config) => {
    if (config.authStrategy === "None") return;

    if (isLocalStrategy(config.authStrategy)) {
        const localStrategyConfig: HalsLocalStrategy = config.authStrategy as HalsLocalStrategy;
        const usersRepository: UsersRepository = configureUsersRepository(
            localStrategyConfig.db,
            localStrategyConfig.dbUrl,
            localStrategyConfig.passwordSalt,
            localStrategyConfig.passwordLength,
            localStrategyConfig.hashingAlgorithm,
            localStrategyConfig.hashingIterations
        );
        configurePassportLocalStrategy(
            localStrategyConfig,
            usersRepository
        );
        app.use(sessionMiddleware(config));
        app.use(passport.initialize());
        app.use(passport.session());
        return;
    }
    // todo: implement JWT strategy
};


// todo: confirm configuration with 'any' data types functions correctly. This was a hack as I
//  could not find the function definitions with clear types for the relevant passport
//  callback functions.
const configurePassportLocalStrategy = (
    config: HalsLocalStrategy,
    usersRepository: UsersRepository
): void => {
    const userField = {
        usernameField: 'username',
        passwordField: 'password',
    };

    const verifyCallback = async (username: string, password: string, done: any): Promise<void> => {
        const dto: GetUserDTO = {username: username};
        const user: User | null = await usersRepository.getUser(dto);
        if (!user) {
            done(null, false);
            return;
        }

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
            const user = await usersRepository.getUser(dto);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};

export const authGuard: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
    if (!request.isAuthenticated())
        return response.status(UNAUTHORIZED).json('Unauthorized.');
    return next();
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
    switch (authStrategy.db) {
        case "MongoDB": {
            sessionStore = configureMongoSessionStore(authStrategy.dbUrl);
            break;
        }
        default: {
            throw new Error(`"${authStrategy.db} session store not implemented. Please choose another session store option.`);
        }
    }
    return sessionStore;
};

const configureMongoSessionStore = (url: string): MongoStore =>
    MongoStore.create({
        mongoUrl: url,
        collectionName: 'sessions',
    });
