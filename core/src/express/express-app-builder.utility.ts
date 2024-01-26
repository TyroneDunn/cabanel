import {
   Application as HalsApplication,
   ApplicationSchema as HalsSchema,
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
import { NodeEnvironmentOption } from "@hals/common/lib/app/application-schema.type";
import { serverMetadata, serverStartedMessage } from '../app/server-metadata.utility';

const express = require("express");
const cors = require('cors');

export const buildExpressRestApp: BuildApp = (schema : HalsSchema) : HalsApplication => {
   const expressApp : ExpressApplication = express();
   expressApp.use(express.json());
   expressApp.use(cors(schema.corsOptions));
   configureExpressAppAuthentication(expressApp, schema);
   configureExpressAppRouters(expressApp, schema.controllers);
   expressApp.get('/', metadata(schema.title, schema.port, schema.version, schema.nodeEnv));
   return {
      run: () : void => {
         expressApp.listen(schema.port, () =>
            console.log(serverStartedMessage(
               schema.title,
               schema.host,
               schema.port,
               schema.version,
               schema.nodeEnv
            )));
      },
   };
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
