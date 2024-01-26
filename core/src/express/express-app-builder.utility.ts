import {
   Application as HalsApplication,
   ApplicationSchema as HalsSchema,
   Controller as HalsController,
} from "@hals/common";
import {
   Application as ExpressApplication,
   Request as ExpressRequest,
   RequestHandler as ExpressRequestHandler,
   Response as ExpressResponse,
} from "express";
import { BuildApp } from "../app/build-app.utility";
import { configureExpressAppAuthentication } from "./authentication.utility";
import { configureExpressAppRouters } from "./hals-express.utility";
import { serverMetadata, serverStartMessage } from "../app/application.utility";
import { NodeEnvironmentOption } from "@hals/common/lib/app/application-schema.type";

const express = require("express");
const cors = require('cors');

export const expressAppBuilder : HalsAppBuilder = {
   buildApp(schema : HalsSchema, controllers : HalsController[]) : HalsApplication {
      const expressApp : ExpressApplication = express();
      expressApp.use(express.json());
      expressApp.use(cors(schema.corsOptions));
      configureExpressAppAuthentication(expressApp, schema);
      configureExpressAppRouters(expressApp, controllers);
      expressApp.get('/', metadata(schema.title, schema.port, schema.version, schema.nodeEnv));
      return {
         run: () : void => {
            expressApp.listen(schema.port, () =>
               console.log(serverStartMessage(schema.title, schema.port, schema.version, schema.nodeEnv)));
         },
      };
   },
};

const metadata = (
   title : string,
   port : number,
   version : string,
   environment : NodeEnvironmentOption,
) : ExpressRequestHandler =>
   (request : ExpressRequest, response : ExpressResponse) : void => {
      response.json(serverMetadata(title, port, version, environment));
   };
