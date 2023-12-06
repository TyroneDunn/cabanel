import {Config} from "../app/config.type";
import session, {SessionOptions} from "express-session";
import MongoStore from "connect-mongo";
import {RequestHandler} from "express";
import {LocalStrategy} from "../app/local-strategy.type";

export {sessionMiddleware as session};

const sessionMiddleware =
    (config: Config): RequestHandler => session(configureSessionOptions(config));

const configureSessionOptions = (config: Config): SessionOptions =>
    ({
        secret: (config.authStrategy as LocalStrategy).sessionSecret,
        resave: false,
        saveUninitialized: true,
        store: configureSessionStore(config.authStrategy as LocalStrategy),
        cookie: {
            // Session Lifespan: 21 Days.
            maxAge: 21 * (24 * (60 * (1000 * 60))),
            httpOnly: (config.nodeEnv === "production"),
        },
    });

const configureSessionStore = (authStrategy: LocalStrategy) => {
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
