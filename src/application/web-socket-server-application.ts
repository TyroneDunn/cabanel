import {
   ApplicationSchema,
   AuthStrategy,
   NodeEnvironmentOption,
   ServerFrameworkOption,
} from './application';
import { CorsOptions } from '../http/cors';
import { HostAddress } from '../http/http';

export type WebSocketServerApplication = {
   run : () => void,
};

export type WebSocketServerApplicationSchema = {
   title : string,
   host : HostAddress,
   port : number,
   nodeEnv : NodeEnvironmentOption;
   corsOptions : CorsOptions,
   authStrategy : AuthStrategy,
   socketEvents : SocketEvents,
   routerSchemas : WebSocketServerApplicationRouterSchema[],
};

export type WebSocketServerApplicationRouterSchema =
   | GuardedWebSocketServerApplicationRouterSchema
   | UnguardedWebSocketServerApplicationRouterSchema;

export type UnguardedWebSocketServerApplicationRouterSchema = {
   path    : string,
   methods : WebSocketServerMethod[],
};

export type GuardedWebSocketServerApplicationRouterSchema = {
   path    : string,
   methods : WebSocketServerMethod[],
};

export type WebSocketServerMethod = undefined;

export type SocketEvents = {
   onConnection? : () => void,
   onClose? : () => void,
   onEvent? : () => void,
};

export const isWebSocketServerApplicationSchema =
   (applicationSchema : ApplicationSchema) : applicationSchema is WebSocketServerApplicationSchema => (
      applicationSchema !== null
      && typeof applicationSchema === 'object'
      && 'title' in applicationSchema
      && 'version' in applicationSchema
      && 'port' in applicationSchema
      && 'nodeEnv' in applicationSchema
      && 'serverOption' in applicationSchema
      && 'corsOptions' in applicationSchema
      && 'authStrategy' in applicationSchema
      && 'socketEvents' in applicationSchema
      && 'routerSchemas' in applicationSchema
   );
