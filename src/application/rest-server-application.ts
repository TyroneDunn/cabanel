import { AuthStrategy, NodeEnvironmentOption, ServerFrameworkOption } from './application';
import { CorsOptions } from '../http/cors';
import { HostAddress, EndpointSchema } from '../http/http';

export type RestServerApplication = {
   run : () => void,
};

export type InitialiseRestServerApplication =
   (schema : RestServerApplication) => RestServerApplication;

export type BuildRestServerApplication =
   (applicationSchema: RestServerApplicationSchema) => RestServerApplication;

export type RestServerApplicationSchema = {
   title? : string,
   host? : HostAddress,
   port? : number,
   nodeEnv? : NodeEnvironmentOption,
   corsOptions? : CorsOptions,
   authStrategy? : AuthStrategy,
   routerSchemas : RestServerApplicationRouterSchema[],
};

export type RestServerApplicationRouterSchema =
   | UnguardedRestServerApplicationRouterSchema
   | GuardedRestServerApplicationRouterSchema;

export type UnguardedRestServerApplicationRouterSchema = {
   path    : string,
   endpointSchemas : EndpointSchema[],
};

export type GuardedRestServerApplicationRouterSchema = {
   guardedPath    : string,
   endpointSchemas : EndpointSchema[],
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
   && 'routerSchemas' in object
);

export const isGuardedRestServerApplicationRouterSchema = (object : any) : object is GuardedRestServerApplicationRouterSchema => (
   object !== null
   && typeof object === 'object'
   && 'guardedPath' in object
   && 'endpointSchemas' in object
);

export const isUnguardedRestServerApplicationRouterSchema = (object : any) : object is UnguardedRestServerApplicationRouterSchema => (
   object !== null
   && typeof object === 'object'
   && 'path' in object
   && 'endpointSchemas' in object
);
