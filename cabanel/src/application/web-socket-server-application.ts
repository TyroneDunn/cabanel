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
   version : string;
   host : HostAddress,
   port : number,
   nodeEnv : NodeEnvironmentOption;
   serverOption : ServerFrameworkOption,
   corsOptions : CorsOptions,
   authStrategy : AuthStrategy,
   socketEvents : SocketEvents,
   controllers : WebSocketServerApplicationController[],
};

export type WebSocketServerApplicationController =
   | GuardedWebSocketServerApplicationController
   | UnguardedWebSocketServerApplicationController;

export type UnguardedWebSocketServerApplicationController = {
   path    : string,
   methods : WebSocketServerMethod[],
};

export type GuardedWebSocketServerApplicationController = {
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
      && 'controllers' in applicationSchema
   );
