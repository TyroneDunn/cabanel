import {Application} from "express";
import {Config, LocalStrategy} from "../app/config.type";
import {configureUserRepository} from "./user-repository-config.service";
import {configurePassportLocalStrategy} from "./passport-local-config";
import {session} from "./session-config";
import {UsersRepository} from "../user/users-repository";
import passport = require("passport");
import {isLocalStrategy} from "../utils/is-local-strategy.utility";

export const configureAppAuthentication = (app: Application, config: Config) => {
    if (config.authStrategy === "None") return;

    if (isLocalStrategy(config.authStrategy)) {
        const localStrategyConfig: LocalStrategy = config.authStrategy as LocalStrategy;
        const usersRepository: UsersRepository = configureUserRepository(
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
        app.use(session(config));
        app.use(passport.initialize());
        app.use(passport.session());
        return;
    }
    // todo: implement JWT strategy
};
