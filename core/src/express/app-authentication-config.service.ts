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
