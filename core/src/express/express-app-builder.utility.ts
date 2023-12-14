import {Config as HalsConfig} from "../app/config.type";
import {Controller as HalsController} from "../app/controller.type";
import {Application as HalsApplication} from "../app/application.type";
const express = require("express");
import {
    Application as ExpressApplication,
    Request as ExpressRequest,
    RequestHandler as ExpressRequestHandler,
    Response as ExpressResponse
} from "express";
const cors = require('cors');
import {AppBuilder as HalsAppBuilder} from "../app/app-builder.utility";
import {configureAuthentication} from "./authentication.utility";
import {configureRouters} from "./hals-express.utility";

export const expressAppBuilder: HalsAppBuilder = {
    buildApp(config: HalsConfig, controllers: HalsController[]): HalsApplication {
        const expressApp: ExpressApplication = express();
        expressApp.use(express.json());
        expressApp.use(cors(config.corsOptions));
        configureAuthentication(expressApp, config);
        configureRouters(expressApp, controllers);
        expressApp.get('/', metadata(config.title, config.port, config.version));
        return {
            run: (): void => {
                expressApp.listen(config.port,() =>
                    console.log(`${config.title} @ port: ${config.port}`));
            }
        };
    }
};

const metadata =
    (title: string = 'Untitled', port: number = 2400, version?: string): ExpressRequestHandler =>
        (request: ExpressRequest, response: ExpressResponse): void => {
            response.send({
                "message": `${title} @ port: ${port}`,
                ...version && {"version": `${version}`},
            });
        };
