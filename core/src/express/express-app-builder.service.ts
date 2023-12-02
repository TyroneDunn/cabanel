import {AppBuilder} from "../app/app-builder.type";
import {Config} from "../app/config.type";
import {Controller} from "../controller/controller.type";
import {AppWrapper} from "../app/app-wrapper.interface";
import {Application, Response} from "express";
import {session} from "./session-config";
import {configurePassportLocalStrategy} from "./passport-local-config";
import {UsersRepository} from "../user/users-repository";
import {configureUserRepository} from "./user-repository-config.service";

const express = require("express");
const cors = require('cors');
import passport = require("passport");

export const expressAppBuilder: AppBuilder = {
    buildApp(config: Config, controllers: Controller[]): AppWrapper {
        const app: Application = express();
        app.get('/', home(config.title, config.port, config.version));
        app.use(express.json());
        app.use(cors(config.corsOptions));

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

        return {
            run(): void {
                app.listen();
            }
        };
    }
};

const home = (title: string = 'Untitled', port: number = 2400, version?: string) => (response: Response): void => {
    response.send({
        "message": `${title} @ port: ${port}`,
        ...version && {"version": `${version}`},
    });
};
