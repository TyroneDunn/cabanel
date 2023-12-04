import {AppBuilder} from "../app/app-builder.type";
import {Config} from "../app/config.type";
import {Controller} from "../controller/controller.type";
import {AppWrapper} from "../app/app-wrapper.interface";
import {Application, Request, RequestHandler, Response, Router} from "express";
import {configureAppAuthentication} from "./app-authentication-config.service";
import {Method} from "../controller/method.type";
import {ParamMap} from "../shared/param-map.type";
import {Request as HalsRequest} from "../shared/request-dto.type";
import {SideEffect} from "../controller/side-effect.type";
import {authGuard} from "./auth-guard";

const express = require("express");
const cors = require('cors');

const mapToParamMap = (paramKeys: string[], req: Request): ParamMap => {
    let paramMap: ParamMap = {};
    for (const paramKey of paramKeys) {
        paramMap = {
            ...paramMap,
            [paramKey]: req.params[paramKey]
        }
    }
    return paramMap;
};

const mapToQueryParamMap = (queryParamKeys: string[], req: Request): ParamMap => {
    let queryParamMap: ParamMap = {};
    for (const queryParamKey of queryParamKeys) {
        queryParamMap = {
            ...queryParamMap,
            [queryParamKey]: req.query[queryParamKey] as string
        }
    }
    return queryParamMap;
};

const mapToHalsRequestDTO = (method: Method, req: Request): HalsRequest => {
    const paramMap: ParamMap = mapToParamMap(method.paramKeys, req);
    const queryParamMap: ParamMap = mapToQueryParamMap(method.queryParamKeys, req);
    return {
        paramMap: paramMap,
        queryParamMap: queryParamMap,
        payload: req.body
    };
};


const mapToPath = (method: Method) => {
    // todo: implement w recursion and pure function
    let endpoint: string = method.path? '/' + method.path + '/': '';

    for (let i = 0; i < method.paramKeys.length; i++) {
        endpoint = endpoint.concat(':', method.paramKeys[i]);
        if (i !== method.paramKeys.length - 1) endpoint = endpoint.concat('/');
    }

    return endpoint;
};

const executeSideEffects = (dto: HalsRequest, sideEffects: SideEffect[]): void => {
    for (const sideEffect of sideEffects) {
        sideEffect(dto);
    }
};

const mapToRequestHandler = (method: Method): RequestHandler => {
    return (req: Request, res: Response) => {
        const dto: HalsRequest = mapToHalsRequestDTO(method, req);
        executeSideEffects(dto, method.sideEffects);
        const response = method.callback(dto);
        res.status(response.status).json(response);
    };
};

const configureAppControllers =
    (app: Application, controllers: Controller[]): void => {
        for (const controller of controllers) {
            // configure router and its request handlers
            const router: Router = Router();
            for (const method of controller.methods) {
                const path = mapToPath(method);
                switch (method.type) {
                    case "GET": {
                        router.get(path, mapToRequestHandler(method));
                        break;
                    }
                    case "POST": {
                        router.post(path, mapToRequestHandler(method));
                        break;
                        // implement rest
                    //      ...
                    }
                }
            }

            if (controller.guard)
                app.use('/' + controller.path, authGuard, router);
            else
                app.use('/' + controller.path, router);
        }
    };

export const expressAppBuilder: AppBuilder = {
    buildApp(config: Config, controllers: Controller[]): AppWrapper {
        const app: Application = express();
        app.get('/', home(config.title, config.port, config.version));
        app.use(express.json());
        app.use(cors(config.corsOptions));
        configureAppAuthentication(app, config);
        configureAppControllers(app, controllers);

        return {
            run(): void {
                app.listen(config.port,() => {
                    console.log(`${config.title} @ port: ${config.port}`);
                });
            }
        };
    }
};

const home = (title: string = 'Untitled', port: number = 2400, version?: string) => (req: Request, response: Response): void => {
    response.send({
        "message": `${title} @ port: ${port}`,
        ...version && {"version": `${version}`},
    });
};
