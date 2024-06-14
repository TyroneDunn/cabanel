import {
   BuildRestServerApplication,
   isGuardedRestServerApplicationController,
   isUnguardedRestServerApplicationController,
   RestServerApplication,
   RestServerApplicationController,
   RestServerApplicationSchema,
} from '../application/rest-server-application';
import express, {
   Application as ExpressApplication,
   Request as ExpressRequest,
   RequestHandler as ExpressRequestHandler,
   Response as ExpressResponse,
   NextFunction as ExpressNext,
   Router as ExpressRouter,
} from 'express';
import cors from 'cors';
import {
   NodeEnvironmentOption,
   serverMetadata,
   serverStartupMessage,
} from '../application/application';
import {
   authGuard,
   configureExpressRestServerApplicationAuthentication
} from './authentication';
import { ParamMap } from '../common/param-map';
import {
   executeHttpRequestSideEffects,
   HttpRequest,
   HttpRequestHandler,
   HttpRequestMiddleware, HttpResponse,
} from '../http/http';
import { User } from '../users/users';


export const buildExpressRestServerApplication: BuildRestServerApplication = (
   applicationSchema: RestServerApplicationSchema,
   environment: NodeEnvironmentOption,
) : RestServerApplication => {
   const expressApp : ExpressApplication = express();
   expressApp.use(express.json());
   expressApp.use(cors(applicationSchema.corsOptions));
   if (applicationSchema.authStrategy !== 'None')
      configureExpressRestServerApplicationAuthentication(
         expressApp,
         applicationSchema.authStrategy,
         environment,
      );
   configureExpressAppRouters(expressApp, applicationSchema.controllers);

   expressApp.get('/', metadataRequestHandler(
      applicationSchema.title,
      applicationSchema.port,
      applicationSchema.version,
      applicationSchema.nodeEnv));

   const application : RestServerApplication = {
      run() : void {
         expressApp.listen(applicationSchema.port, () =>
            console.log(serverStartupMessage(
               applicationSchema.title,
               applicationSchema.host,
               applicationSchema.port,
               applicationSchema.version,
               applicationSchema.nodeEnv
            )));
      }
   };
   return application;
};

const configureExpressAppRouters = (
   app: ExpressApplication,
   controllers: RestServerApplicationController[]
): void => {
      for (const controller of controllers) {
         const expressRouter: ExpressRouter = ExpressRouter();
         for (const httpRequestHandler of controller.requestHandlers) {
            const endpoint: string =
               mapHttpRequestHandlerToExpressEndpoint(httpRequestHandler);
            const sideEffectMiddleware: ExpressRequestHandler =
               mapHttpRequestHandlerSideEffectsToExpressMiddleware(httpRequestHandler);
            const middlewares: ExpressRequestHandler[] =
               mapHttpRequestHandlerMiddlewaresToExpressMiddleware(httpRequestHandler);
            const requestHandler: ExpressRequestHandler =
               mapHttpRequestHandlerToExpressRequestHandler(httpRequestHandler);

            switch (httpRequestHandler.type) {
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
         if (isUnguardedRestServerApplicationController(controller))
            app.use('/' + controller.path, expressRouter);

         if (isGuardedRestServerApplicationController(controller))
            app.use('/' + controller.guardedPath, authGuard, expressRouter);
      }
   };

const mapHttpRequestHandlerToExpressRequestHandler = (httpRequestHandler: HttpRequestHandler): ExpressRequestHandler =>
   async (expressRequest: ExpressRequest, expressResponse: ExpressResponse) => {
      const httpRequest: HttpRequest = mapExpressRequestToHttpRequest(
         expressRequest,
         httpRequestHandler.paramKeys,
         httpRequestHandler.queryParamKeys
      );
      const httpResponse: HttpResponse<any> = await httpRequestHandler.reducer(httpRequest);
      expressResponse.status(httpResponse.status).json(httpResponse);
   };

const mapHttpRequestHandlerMiddlewaresToExpressMiddleware =
   (httpRequestHandler: HttpRequestHandler): ExpressRequestHandler[] =>
      httpRequestHandler.middleware === undefined
         ? []
         : httpRequestHandler.middleware.map((middleware : HttpRequestMiddleware) : ExpressRequestHandler =>
            async (
               expressRequest : ExpressRequest,
               expressResponse : ExpressResponse,
               next : ExpressNext
            )  => {
               const httpRequest : HttpRequest = mapExpressRequestToHttpRequest(
                  expressRequest,
                  httpRequestHandler.paramKeys,
                  httpRequestHandler.queryParamKeys
               );
               const httpResponse : HttpResponse<undefined> = await middleware(httpRequest);
               if (httpResponse.error)
                  return expressResponse.status(httpResponse.status).json(httpResponse);
               else {
                  next();
                  return;
               }
            });

const mapHttpRequestHandlerSideEffectsToExpressMiddleware =
   (httpRequestHandler: HttpRequestHandler): ExpressRequestHandler => (
      expressRequest : ExpressRequest,
      expressResponse : ExpressResponse,
      next : ExpressNext
   ) : void => {
      if (httpRequestHandler.sideEffects === undefined || httpRequestHandler.sideEffects.length === 0)
         next();
      else {
         const httpRequest : HttpRequest = mapExpressRequestToHttpRequest(
            expressRequest,
            httpRequestHandler.paramKeys,
            httpRequestHandler.queryParamKeys,
         );
         executeHttpRequestSideEffects(httpRequest, httpRequestHandler.sideEffects);
         next();
      }
   };

const mapHttpRequestHandlerToExpressEndpoint = (httpRequestHandler: HttpRequestHandler): string => {
   const path: string = httpRequestHandler.path ? '/' + httpRequestHandler.path + '/' : '/';
   return appendParamKeys(httpRequestHandler.paramKeys, path);
};

const appendParamKeys = (paramKeys : string[] | undefined, path : string) : string => {
   if (paramKeys === undefined || paramKeys.length === 0) return path;
   else return appendParamKeys(
      paramKeys.slice(1),
      path.concat(':', paramKeys[0], '/')
   );
};

const mapExpressRequestToHttpRequest = (
   expressRequest: ExpressRequest,
   paramKeys: string[] | undefined,
   queryParamKeys: string[] | undefined
): HttpRequest => ({
   user:
      expressRequest.user !== undefined
         ? expressRequest.user as User
         : undefined,
   parameters:
      paramKeys !== undefined
         ? mapExpressRequestParametersToParamMap(paramKeys, expressRequest)
         : {},
   queryParameters:
      queryParamKeys !== undefined
         ? mapExpressRequestQueriesToParamMap(queryParamKeys, expressRequest)
         : {},
   payload: expressRequest.body,
});

const mapExpressRequestParametersToParamMap = (
   paramKeys: string[],
   expressRequest: ExpressRequest
): ParamMap => {
   let paramMap: ParamMap = {};
   for (const paramKey of paramKeys) {
      paramMap = {
         ...paramMap,
         [paramKey]: expressRequest.params[paramKey],
      };
   }
   return paramMap;
};

const mapExpressRequestQueriesToParamMap = (
   queryParamKeys: string[],
   expressRequest: ExpressRequest
): ParamMap => {
   let queryParamMap: ParamMap = {};
   for (const queryParamKey of queryParamKeys) {
      queryParamMap = {
         ...queryParamMap,
         [queryParamKey]: expressRequest.query[queryParamKey] as string,
      };
   }
   return queryParamMap;
};

const metadataRequestHandler = (
   title : string,
   port : number,
   version : string,
   environment : NodeEnvironmentOption,
) : ExpressRequestHandler =>
   (request : ExpressRequest, response : ExpressResponse) : void => {
      response.json(serverMetadata(title, port, version, environment));
   };