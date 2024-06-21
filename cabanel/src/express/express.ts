import {
   BuildRestServerApplication,
   isGuardedRestServerApplicationController,
   isUnguardedRestServerApplicationController,
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
               applicationSchema.nodeEnv
            )));
      }
   };
   return application;
};

const configureExpressAppRouters = (
   app: ExpressApplication,
   routersSchemas: RestServerApplicationRouterSchema[]
): void => {
      for (const routerSchema of routersSchemas) {
         const expressRouter: ExpressRouter = ExpressRouter();
         for (const endpointSchema of routerSchema.endpointSchemas) {
            const path: string = isGuardedRestServerApplicationController(routerSchema)
               ? routerSchema.guardedPath
               : routerSchema.path;

            const endpoint: string = mapEndpointSchemaToExpressEndpoint(path, endpointSchema);
            const requestReducer: ExpressRequestHandler
               = mapEndpointSchemaToExpressRequestReducer(path, endpointSchema);

            switch (endpointSchema.requestType) {
               case "GET": {
                  expressRouter.get(endpoint, requestReducer);
                  break;
               }
               case "POST": {
                  expressRouter.post(endpoint, requestReducer);
                  break;
               }
               case "PATCH": {
                  expressRouter.patch(endpoint, requestReducer);
                  break;
               }
               case "PUT": {
                  expressRouter.put(endpoint, requestReducer);
                  break;
               }
               case "DELETE": {
                  expressRouter.delete(endpoint, requestReducer);
                  break;
               }
            }
         }

         if (isUnguardedRestServerApplicationController(routerSchema))
            app.use(expressRouter);

         if (isGuardedRestServerApplicationController(routerSchema))
            app.use(authGuard, expressRouter);
      }
   };

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
   endpointSchema: EndpointSchema
): string => {
   const endpoint: string = path ? '/' + path + '/' : '/';
   return appendParamKeys(endpointSchema.parameterKeys, endpoint);
};

const appendParamKeys = (paramKeys : string[] | undefined, path : string) : string => {
   if (paramKeys === undefined || paramKeys.length === 0) return path;
   else return appendParamKeys(
      paramKeys.slice(1),
      path.concat(':', paramKeys[0], '/')
   );
};

const buildHttpRequest = (
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
   parameters     : endpointSchema.parameterKeys !== undefined
                       ? mapExpressRequestParametersToParamMap(endpointSchema.parameterKeys, expressRequest)
                       : {},
   queryParameters: endpointSchema.queryParameterKeys !== undefined
                       ? mapExpressRequestQueriesToParamMap(endpointSchema.queryParameterKeys, expressRequest)
                       : {},
   payload        : expressRequest.body,
   respond        : respond,
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
      response.json(renderJsonServerMetadata(title, port, version, environment));
   };
