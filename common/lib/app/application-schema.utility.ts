import { RestApplicationSchema, WebSocketApplicationSchema } from './application-schema.type';

export const isRestApplicationSchema = (object : any) : object is RestApplicationSchema => (
   object !== null
   && typeof object === 'object'
   && 'title'        in object
   && 'version'      in object
   && 'port'         in object
   && 'nodeEnv'      in object
   && 'serverOption' in object
   && 'corsOptions'  in object
   && 'authStrategy' in object
   && 'controllers'  in object
);

export const isWebSocketApplicationSchema = (object : any) : object is WebSocketApplicationSchema => (
   object !== null
   && typeof object === 'object'
   && 'title'        in object
   && 'version'      in object
   && 'port'         in object
   && 'nodeEnv'      in object
   && 'serverOption' in object
   && 'corsOptions'  in object
   && 'authStrategy' in object
   && 'socketEvents' in object
   && 'controllers'  in object
);
