import {
    Application as ExpressApplication,
    Request as ExpressRequest,
    RequestHandler as ExpressRequestHandler,
    Response as ExpressResponse,
    Router as ExpressRouter
} from "express";
import {ParamMap as HalsParamMap} from "../app/param-map.type";
import {Method as HalsMethod} from "../controller/method.type";
import {Request as HalsRequest} from "../app/request.type";
import {executeSideEffects} from "../controller/side-effect.utility";
import {Response as HalsResponse} from "../app/response.type";
import {Controller as HalsController} from "../controller/controller.type";
import {authGuard} from "./express-authentication.utility";

export const mapToRequestHandler = (halsMethod: HalsMethod): ExpressRequestHandler =>
    async (expressRequest: ExpressRequest, expressResponse: ExpressResponse) => {
        const halsRequest: HalsRequest = mapToHalsRequest(halsMethod, expressRequest);
        executeSideEffects(halsRequest, halsMethod.sideEffects);
        const halsResponse: HalsResponse = await halsMethod.done(halsRequest);
        expressResponse.status(halsResponse.status).json(halsResponse);
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

export const mapToHalsRequest = (halsMethod: HalsMethod, expressRequest: ExpressRequest): HalsRequest => ({
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

export const configureExpressAppRouters =
    (app: ExpressApplication, halsControllers: HalsController[]): void => {
        for (const controller of halsControllers) {
            // configure router and its request handlers
            const expressRouter: ExpressRouter = ExpressRouter();
            for (const method of controller.methods) {
                const path = mapToPath(method);
                switch (method.type) {
                    case "GET": {
                        expressRouter.get(path, mapToRequestHandler(method));
                        break;
                    }
                    case "POST": {
                        expressRouter.post(path, mapToRequestHandler(method));
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

