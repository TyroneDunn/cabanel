import {Application} from "express";
import passport = require("passport");
import {Config} from "../app/config.type";
import {UsersRepository} from "../user/users-repository";
import {configureUserRepository} from "./user-repository-config.service";
import {configurePassportLocalStrategy} from "./passport-local-config";
import {session} from "./session-config";

export const configureAppAuthentication = (app: Application, config: Config) => {
    switch (config.authOptions.strategy) {
        case "None": {
            break;
        }
        case "Local": {
            const usersRepository: UsersRepository = configureUserRepository(config);

            // todo: simplify argument list
            configurePassportLocalStrategy(
                config.authOptions.passwordSalt,
                config.authOptions.hashingIterations,
                config.authOptions.passwordLength,
                config.authOptions.hashingAlgorithm,
                usersRepository
            );
            app.use(session(config));
            app.use(passport.initialize());
            app.use(passport.session());
            break;
        }
        case "JWT": {
            // implement JWT strategy
            break;
        }
    }
};
