import { ParamMap } from '../shared/param-map.type';
import { User } from '../users/user.types';

export type HttpRequestHandler = {
   path? : string,
   type : HttpRequestType,
   paramKeys? : string[],
   queryParamKeys? : string[],
   sideEffects? : HttpRequestSideEffect[],
   middleware? : HttpRequestMiddleware[],
   reducer : HttpRequestReducer,
};

export type HttpRequestType =
   | "GET"
   | "POST"
   | "PUT"
   | "PATCH"
   | "DELETE";

export type HttpRequestSideEffect = (request : HttpRequest) => Promise<void>;

export type HttpRequest = {
   parameters : ParamMap,
   queryParameters : ParamMap,
   payload : any,
   user : User | undefined,
};

export type HttpRequestReducer = (request : HttpRequest) => Promise<HttpResponse<any>>;

export type HttpRequestMiddleware = (request : HttpRequest) => Promise<undefined>;

export type HttpResponse<T> = {
   status      : number
   error?      : string,
   collection? : T[],
   count?      : number,
   index?      : number,
   limit?      : number,
};

export type HostAddress = string;

export const localHost : HostAddress = '127.0.0.1';

export type HttpRequestError = {
   type    : HttpRequestErrorType
   message : string,
};

export type HttpRequestErrorType =
   | "BadRequest"
   | "NotFound"
   | "Unauthorized"
   | "Conflict"
   | "Forbidden"
   | "Internal";

export const HttpRequestError =
   (type: HttpRequestErrorType, message: string): HttpRequestError => ({
      type: type,
      message: message
   });

export const isHttpRequestError = (object : any) : object is HttpRequestError => (
   object !== null
   && typeof object === 'object'
   && 'type'     in object
   && 'message'  in object
);
