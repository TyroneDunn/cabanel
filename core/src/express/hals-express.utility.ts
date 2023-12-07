import {
    Application as ExpressApplication,
    NextFunction,
    Request as ExpressRequest,
    RequestHandler as ExpressRequestHandler,
    Response as ExpressResponse,
    Router as ExpressRouter
} from "express";
import {ParamMap as HalsParamMap} from "../app/param-map.type";
import {Method as HalsMethod, RequestHandler as HalsRequestHandler} from "../app/method.type";
import {Request as HalsRequest} from "../app/request.type";
import {executeSideEffects} from "../app/side-effect.utility";
import {Response as HalsResponse} from "../app/response.type";
import {Controller as HalsController} from "../app/controller.type";
import {authGuard} from "./authentication.utility";

export const mapRequestHandler = (halsMethod: HalsMethod): ExpressRequestHandler =>
    async (expressRequest: ExpressRequest, expressResponse: ExpressResponse) => {
        const halsRequest: HalsRequest = mapToHalsRequest(expressRequest, halsMethod);
        const halsResponse: HalsResponse = await halsMethod.requestHandler(halsRequest);
        expressResponse.status(halsResponse.status).json(halsResponse);
    };

export const mapToMiddlewareRequestHandlers = (halsMethod: HalsMethod): ExpressRequestHandler[] =>
    halsMethod.middleware.map((middleware: HalsRequestHandler) =>
        async (expressRequest: ExpressRequest, expressResponse: ExpressResponse, next: NextFunction) => {
            const halsRequest: HalsRequest = mapToHalsRequest(expressRequest, halsMethod);
            const halsResponse: HalsResponse = await middleware(halsRequest);
            if (halsResponse.error)
                return expressResponse.status(halsResponse.status).json(halsResponse);
            return next();
        });

const mapSideEffectsToRequestHandler = (halsMethod: HalsMethod): ExpressRequestHandler =>
    (expressRequest: ExpressRequest, expressResponse: ExpressResponse) => {
        const halsRequest: HalsRequest = mapToHalsRequest(expressRequest, halsMethod);
        executeSideEffects(halsRequest, halsMethod.sideEffects);
    };

export const mapToPath = (halsMethod: HalsMethod): string => {
    // todo: implement w recursion and pure function
    let endpoint: string = halsMethod.path ? '/' + halsMethod.path + '/' : '';

    for (let i = 0; i < halsMethod.paramKeys.length; i++) {
        endpoint = endpoint.concat(':', halsMethod.paramKeys[i]);
        if (i !== halsMethod.paramKeys.length - 1) endpoint = endpoint.concat('/');
    }

    return endpoint;
};

export const mapToHalsRequest = (expressRequest: ExpressRequest, halsMethod: HalsMethod): HalsRequest => ({
    paramMap: mapToHalsParamMap(halsMethod.paramKeys, expressRequest),
    queryParamMap: mapToHalsQueryParamMap(halsMethod.queryParamKeys, expressRequest),
    payload: expressRequest.body
});

export const mapToHalsParamMap = (paramKeys: string[], expressRequest: ExpressRequest): HalsParamMap => {
    let paramMap: HalsParamMap = {};
    for (const paramKey of paramKeys) {
        paramMap = {
            ...paramMap,
            [paramKey]: expressRequest.params[paramKey]
        }
    }
    return paramMap;
};

export const mapToHalsQueryParamMap = (queryParamKeys: string[], expressRequest: ExpressRequest): HalsParamMap => {
    let queryParamMap: HalsParamMap = {};
    for (const queryParamKey of queryParamKeys) {
        queryParamMap = {
            ...queryParamMap,
            [queryParamKey]: expressRequest.query[queryParamKey] as string
        }
    }
    return queryParamMap;
};
export const configureRouters =
    (app: ExpressApplication, halsControllers: HalsController[]): void => {
        for (const controller of halsControllers) {
            // configure router and its request handlers
            const expressRouter: ExpressRouter = ExpressRouter();
            for (const method of controller.methods) {
                const path = mapToPath(method);
                const sideEffects: ExpressRequestHandler = mapSideEffectsToRequestHandler(method);
                const middlewares: ExpressRequestHandler[] = mapToMiddlewareRequestHandlers(method);
                const requestHandler: ExpressRequestHandler = mapRequestHandler(method);

                switch (method.type) {
                    case "GET": {
                        expressRouter.get(path, sideEffects, ...middlewares, requestHandler);
                        break;
                    }
                    case "POST": {
                        expressRouter.post(path, sideEffects, ...middlewares, requestHandler);
                        break;
                        // implement rest
                        //      ...
                    }
                }
            }

            if (controller.guard)
                app.use('/' + controller.path, authGuard, expressRouter);
            else
                app.use('/' + controller.path, expressRouter);
        }
    };

