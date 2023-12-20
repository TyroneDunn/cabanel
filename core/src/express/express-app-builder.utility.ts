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
import { AppBuilder as HalsAppBuilder } from "../app/app-builder.utility";
import { configureAuthentication } from "./authentication.utility";
import { configureRouters } from "./hals-express.utility";

const express = require("express");

const cors = require('cors');

export const expressAppBuilder: HalsAppBuilder = {
   buildApp(schema: HalsSchema, controllers: HalsController[]): HalsApplication {
      const expressApp: ExpressApplication = express();
      expressApp.use(express.json());
      expressApp.use(cors(schema.corsOptions));
      configureAuthentication(expressApp, schema);
      configureRouters(expressApp, controllers);
      expressApp.get('/', metadata(schema.title, schema.port, schema.version));
      return {
         run: (): void => {
            expressApp.listen(schema.port, () =>
               console.log(`${schema.title} @ port: ${schema.port}`));
         },
      };
   },
};

const metadata =
   (title: string = 'Untitled', port: number = 2400, version?: string): ExpressRequestHandler =>
      (request: ExpressRequest, response: ExpressResponse): void => {
         response.send({
            "message": `${title} @ port: ${port}`,
            ...version && { "version": `${version}` },
         });
      };
