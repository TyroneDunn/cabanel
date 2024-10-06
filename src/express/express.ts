import {
   BuildRestServerApplication,
   isGuardedRestServerApplicationRouterSchema,
   RestServerApplication,
   RestServerApplicationRouterSchema,
   RestServerApplicationSchema,
} from '../application/rest-server-application';
import express, {
   Application as ExpressApplication,
   Request as ExpressRequest,
   RequestHandler as ExpressRequestHandler,
   Response as ExpressResponse,
   Router as ExpressRouter,
} from 'express';
import cors from 'cors';
import {
   httpRequestSubject,
   NodeEnvironmentOption,
   renderJsonServerMetadata,
   serverStartupMessage,
} from '../application/application';
import {
   authGuard,
   configureExpressRestServerApplicationAuthentication
} from './authentication';
import { ParamMap } from '../common/param-map';
import {
   HttpRequest,
   EndpointSchema,
   Respond,
} from '../http/http';
import { User } from '../users/users';

export const buildExpressRestServerApplication: BuildRestServerApplication =
   (applicationSchema: RestServerApplicationSchema): RestServerApplication => {
      const expressApp: ExpressApplication = express();
      expressApp.use(express.json());
      expressApp.use(cors(applicationSchema.corsOptions));
      if (applicationSchema.authStrategy !== 'None')
         configureExpressRestServerApplicationAuthentication(
            expressApp,
            applicationSchema.authStrategy,
            applicationSchema.nodeEnv,
         );
      configureExpressAppRouters(expressApp, applicationSchema.routerSchemas);

      expressApp.get('/', metadataRequestHandler(
         applicationSchema.title,
         applicationSchema.port,
         applicationSchema.version,
         applicationSchema.nodeEnv));

      const application : RestServerApplication = {
         run() : void {
            expressApp.listen(applicationSchema.port, () =>
               // TODO : update message rendering
               console.log(serverStartupMessage(
                  applicationSchema.title,
                  applicationSchema.host,
                  applicationSchema.port,
                  applicationSchema.version,
                  applicationSchema.nodeEnv,
                  applicationSchema.authStrategy
               )));
         }
      };
      return application;
   };

const configureExpressAppRouters = (
   app: ExpressApplication,
   routersSchemas: RestServerApplicationRouterSchema[]
): void => routersSchemas.forEach(routerSchema => {
   const expressRouter: ExpressRouter = ExpressRouter();
   const path: string = isGuardedRestServerApplicationRouterSchema(routerSchema)
      ? routerSchema.guardedPath
      : routerSchema.path;
   routerSchema.endpointSchemas.forEach(endpointSchema => {
      const endpoint: string = mapEndpointSchemaToExpressEndpoint(path, endpointSchema);
      const requestReducer: ExpressRequestHandler
         = mapEndpointSchemaToExpressRequestReducer(path, endpointSchema);
      const guarded = isGuardedRestServerApplicationRouterSchema(routerSchema);

      switch (endpointSchema.requestType) {
         case "GET": {
            guarded
               ? expressRouter.get(endpoint, authGuard, requestReducer)
               : expressRouter.get(endpoint, requestReducer);
            break;
         }
         case "POST": {
            guarded
               ? expressRouter.post(endpoint, authGuard, requestReducer)
               : expressRouter.post(endpoint, requestReducer);
            break;
         }
         case "PATCH": {
            guarded
               ? expressRouter.patch(endpoint, authGuard, requestReducer)
               : expressRouter.patch(endpoint, requestReducer);
            break;
         }
         case "PUT": {
            guarded
               ? expressRouter.put(endpoint, authGuard, requestReducer)
               : expressRouter.put(endpoint, requestReducer);
            break;
         }
         case "DELETE": {
            guarded
               ? expressRouter.delete(endpoint, authGuard, requestReducer)
               : expressRouter.delete(endpoint, requestReducer);
            break;
         }
      }
   });

   app.use(expressRouter);
});

const mapEndpointSchemaToExpressRequestReducer = (
   path: string,
   endpointSchema: EndpointSchema,
): ExpressRequestHandler =>
   (expressRequest: ExpressRequest, expressResponse: ExpressResponse) => {
      const respond: Respond = (status: number, data: any): void => {
         expressResponse.status(status).json(data);
      };

      const httpRequest: HttpRequest = buildHttpRequest(
         path,
         endpointSchema,
         expressRequest,
         respond
      );

      httpRequestSubject.next(httpRequest);
   };

const mapEndpointSchemaToExpressEndpoint = (
   path: string,
   endpointSchema?: EndpointSchema
): string => {
   const endpoint: string = path ? '/' + path + '/' : '/';
   return appendParamKeys(endpoint, endpointSchema?.parameterKeys);
};

const appendParamKeys = (path: string, paramKeys: string[] | undefined): string =>
   paramKeys === undefined || paramKeys.length === 0
      ? path
      : appendParamKeys(path.concat(':', paramKeys[0], '/'), paramKeys.slice(1));

export const buildHttpRequest = (
   path : string,
   endpointSchema : EndpointSchema,
   expressRequest : ExpressRequest,
   respond : Respond,
): HttpRequest => ({
   path           : path,
   requestType    : endpointSchema.requestType,
   sender         : expressRequest.user !== undefined
      ? expressRequest.user as User
      : undefined,
   senderIp       : expressRequest.ip,
   sessionId      : expressRequest.sessionID !== undefined
                       ? expressRequest.sessionID
                       : undefined,
   parameters     : endpointSchema.parameterKeys !== undefined
                       ? mapExpressRequestParametersToParamMap(endpointSchema.parameterKeys, expressRequest)
                       : {},
   queryParameters: endpointSchema.queryParameterKeys !== undefined
                       ? mapExpressRequestQueriesToParamMap(endpointSchema.queryParameterKeys, expressRequest)
                       : {},
   payload        : expressRequest.body,
   respond        : respond,
});

export const mapExpressRequestParametersToParamMap = (
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

export const mapExpressRequestQueriesToParamMap = (
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
      response.json(renderJsonServerMetadata(title, port, version, environment));
   };
