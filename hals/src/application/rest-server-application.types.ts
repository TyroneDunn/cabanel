import {
   AuthStrategy,
   NodeEnvironmentOption,
   ServerFrameworkOption,
} from './application.types';
import { CorsOptions } from '../http/cors.types';
import { HostAddress, HttpRequestHandler } from '../http/http.types';

export type RestServerApplication = {
   run : () => void,
};

export type RestServerApplicationSchema = {
   title : string,
   version : string;
   host : HostAddress,
   port : number,
   nodeEnv : NodeEnvironmentOption;
   serverOption : ServerFrameworkOption,
   corsOptions : CorsOptions,
   authStrategy : AuthStrategy,
   controllers : RestServerApplicationController[],
};

type RestServerApplicationController =
   | UnguardedRestServerApplicationController
   | GuardedRestServerApplicationController;

type UnguardedRestServerApplicationController = {
   path    : string,
   requestHandlers : HttpRequestHandler[],
};

type GuardedRestServerApplicationController = {
   path    : string,
   requestHandlers : HttpRequestHandler[],
};

export const isRestServerApplicationSchema = (object : any) : object is RestServerApplicationSchema => (
   object !== null
   && typeof object === 'object'
   && 'title' in object
   && 'version' in object
   && 'port' in object
   && 'nodeEnv' in object
   && 'serverOption' in object
   && 'corsOptions' in object
   && 'authStrategy' in object
   && 'controllers' in object
);