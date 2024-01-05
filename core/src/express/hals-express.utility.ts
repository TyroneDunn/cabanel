import {
   Application as ExpressApplication,
   NextFunction,
   Request as ExpressRequest,
   RequestHandler as ExpressRequestHandler,
   Response as ExpressResponse,
   Router as ExpressRouter,
} from "express";
import {
   Controller as HalsController,
   Method as HalsMethod,
   ParamMap as HalsParamMap,
   Request as HalsRequest,
   RequestHandler as HalsRequestHandler,
   Response as HalsResponse,
} from "@hals/common";
import { executeSideEffects } from "../app/side-effect.utility";
import { authGuard } from "./authentication.utility";

export const mapRequestHandler = (halsMethod: HalsMethod): ExpressRequestHandler =>
   async (expressRequest: ExpressRequest, expressResponse: ExpressResponse) => {
      const halsRequest: HalsRequest = mapToHalsRequest(expressRequest, halsMethod);
      const halsResponse: HalsResponse = await halsMethod.requestHandler(halsRequest);
      expressResponse.status(halsResponse.status).json(halsResponse);
   };

export const mapMethodToExpressMiddleware = (halsMethod: HalsMethod): ExpressRequestHandler[] =>
   halsMethod.middleware === undefined
      ? []
      : halsMethod.middleware.map((middleware : HalsRequestHandler) : ExpressRequestHandler =>
         async (
            expressRequest : ExpressRequest,
            expressResponse : ExpressResponse,
            next : NextFunction
         )  => {
            const halsRequest : HalsRequest = mapToHalsRequest(
               expressRequest,
               halsMethod.paramKeys,
               halsMethod.queryParamKeys
            );
            const halsResponse : HalsResponse = await middleware(halsRequest);
            if (halsResponse.error)
               return expressResponse.status(halsResponse.status).json(halsResponse);
            else next();
         });

const mapSideEffectsToExpressMiddleware = (halsMethod: HalsMethod): ExpressRequestHandler => {
   return (expressRequest : ExpressRequest, expressResponse : ExpressResponse, next : NextFunction) : void => {
      if (halsMethod.sideEffects === undefined || halsMethod.sideEffects.length === 0)
         next();
      else {
         const halsRequest : HalsRequest = mapToHalsRequest(
            expressRequest,
            halsMethod.paramKeys,
            halsMethod.queryParamKeys,
         );
         executeSideEffects(halsRequest, halsMethod.sideEffects);
         next();
      }
   };
};

export const constructEndpoint = (halsMethod: HalsMethod): string => {
   const path: string = halsMethod.path ? '/' + halsMethod.path + '/' : '/';
   return appendParamKeys(halsMethod.paramKeys, path);
};

const appendParamKeys = (paramKeys : string[] | undefined, path : string) : string => {
   if (paramKeys === undefined || paramKeys.length === 0) return path;
   else return appendParamKeys(paramKeys.slice(1), path.concat(':', paramKeys[0], '/'));
};

export const mapToHalsRequest = (
   expressRequest: ExpressRequest,
   paramKeys: string[] | undefined,
   queryParamKeys: string[] | undefined
): HalsRequest => ({
   paramMap: paramKeys !== undefined ? mapToHalsParamMap(paramKeys, expressRequest) : {},
   queryParamMap: queryParamKeys !== undefined ? mapToHalsQueryParamMap(queryParamKeys, expressRequest) : {},
   payload: expressRequest.body,
});

export const mapToHalsParamMap = (paramKeys: string[], expressRequest: ExpressRequest): HalsParamMap => {
   let paramMap: HalsParamMap = {};
   for (const paramKey of paramKeys) {
      paramMap = {
         ...paramMap,
         [paramKey]: expressRequest.params[paramKey],
      };
   }
   return paramMap;
};

export const mapToHalsQueryParamMap = (queryParamKeys: string[], expressRequest: ExpressRequest): HalsParamMap => {
   let queryParamMap: HalsParamMap = {};
   for (const queryParamKey of queryParamKeys) {
      queryParamMap = {
         ...queryParamMap,
         [queryParamKey]: expressRequest.query[queryParamKey] as string,
      };
   }
   return queryParamMap;
};

export const configureRouters =
   (app: ExpressApplication, halsControllers: HalsController[]): void => {
      for (const controller of halsControllers) {
         const expressRouter: ExpressRouter = ExpressRouter();
         for (const method of controller.methods) {
            const endpoint = constructEndpoint(method);
            const sideEffectMiddleware: ExpressRequestHandler = mapSideEffectsToExpressMiddleware(method);
            const middlewares: ExpressRequestHandler[] = mapMethodToExpressMiddleware(method);
            const requestHandler: ExpressRequestHandler = mapRequestHandler(method);
            switch (method.type) {
               case "GET": {
                  expressRouter.get(endpoint, sideEffectMiddleware, ...middlewares, requestHandler);
                  break;
               }
               case "POST": {
                  expressRouter.post(endpoint, sideEffectMiddleware, ...middlewares, requestHandler);
                  break;
               }
               case "PATCH": {
                  expressRouter.patch(endpoint, sideEffectMiddleware, ...middlewares, requestHandler);
                  break;
               }
               case "PUT": {
                  expressRouter.put(endpoint, sideEffectMiddleware, ...middlewares, requestHandler);
                  break;
               }
               case "DELETE": {
                  expressRouter.delete(endpoint, sideEffectMiddleware, ...middlewares, requestHandler);
                  break;
               }
            }
         }

         if (controller.guard)
            app.use('/' + controller.path, authGuard, expressRouter);
         else
            app.use('/' + controller.path, expressRouter);
      }
   };
