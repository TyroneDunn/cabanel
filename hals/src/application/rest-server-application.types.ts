import {
   AuthStrategy,
   NodeEnvironmentOption,
   ServerFrameworkOption,
} from './application.types';
import { CorsOptions } from './cors.types';
import { HostAddress, HttpMethod } from './http.types';

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
   methods : HttpMethod[],
};

type GuardedRestServerApplicationController = {
   path    : string,
   methods : HttpMethod[],
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