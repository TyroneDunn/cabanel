import {AppBuilder} from "../app/app-builder.type";
import {Config} from "../app/config.type";
import {Controller} from "../controller/controller.type";
import {AppWrapper} from "../app/app-wrapper.interface";
import {Application, Response} from "express";
import {configureAppAuthentication} from "./app-authentication-config.service";

const express = require("express");
const cors = require('cors');

export const expressAppBuilder: AppBuilder = {
    buildApp(config: Config, controllers: Controller[]): AppWrapper {
        const app: Application = express();
        app.get('/', home(config.title, config.port, config.version));
        app.use(express.json());
        app.use(cors(config.corsOptions));
        configureAppAuthentication(app, config);

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
