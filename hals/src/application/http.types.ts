import { ParamMap } from '../shared/param-map.type';
import { User } from '../users/user.types';

export type HttpMethod = {
   type : HttpMethodType,
   path? : string,
   paramKeys? : string[],
   queryParamKeys? : string[],
   sideEffects? : HttpMethodSideEffect[],
   middleware? : HttpRequestHandler[],
   requestHandler : HttpRequestHandler,
};

export type HttpMethodType =
   | "GET"
   | "POST"
   | "PUT"
   | "PATCH"
   | "DELETE";

export type HttpMethodSideEffect = (request : HttpRequest) => Promise<void>;

export type HttpRequest = {
   parameters : ParamMap,
   queryParameters : ParamMap,
   payload : any,
   user : User | undefined,
};

export type HttpRequestHandler = (request : HttpRequest) => Promise<HttpResponse<any>>;

export type HttpResponse<T> = {
   status      : number
   error?      : string,
   collection? : T[],
   count?      : number,
   index?      : number,
   limit?      : number,
};

export type HostAddress = string;