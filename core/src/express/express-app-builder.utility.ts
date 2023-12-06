import {Config as HalsConfig} from "../app/config.type";
import {Controller as HalsController} from "../controller/controller.type";
import {AppWrapper as HalsAppWrapper} from "../app/app-wrapper.type";
const express = require("express");
import {
    Application as ExpressApplication,
    Request as ExpressRequest,
    RequestHandler as ExpressRequestHandler,
    Response as ExpressResponse
} from "express";
const cors = require('cors');
import {AppBuilder as HalsAppBuilder} from "../app/app-builder.utility";
import {configureExpressAppAuthentication} from "./express-authentication.utility";
import {configureExpressAppRouters} from "./hals-express.utility";

export const expressAppBuilder: HalsAppBuilder = {
    buildApp(config: HalsConfig, controllers: HalsController[]): HalsAppWrapper {
        const expressApp: ExpressApplication = express();
        expressApp.use(express.json());
        expressApp.use(cors(config.corsOptions));
        configureExpressAppAuthentication(expressApp, config);
        configureExpressAppRouters(expressApp, controllers);
        expressApp.get('/', home(config.title, config.port, config.version));

        return {
            run: (): void => {
                expressApp.listen(config.port,() => {
                    console.log(`${config.title} @ port: ${config.port}`);
                });
            }
        };
    }
};

const home =
    (title: string = 'Untitled', port: number = 2400, version?: string): ExpressRequestHandler =>
        (request: ExpressRequest, response: ExpressResponse): void => {
            response.send({
                "message": `${title} @ port: ${port}`,
                ...version && {"version": `${version}`},
            });
        };
