import { ParamMap } from '../common/param-map';
import { User } from '../users/users';
import { Page } from '../common/page';

// HTTP Request
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

export type HttpRequest = {
   parameters : ParamMap,
   queryParameters : ParamMap,
   payload : any,
   user : User | undefined,
};

export type HttpRequestSideEffect = (request : HttpRequest) => Promise<void>;

export type ExecuteHttpRequestSideEffects = (
   request     : HttpRequest,
   sideEffects : HttpRequestSideEffect[]
) => void;

export type HttpRequestReducer = (request : HttpRequest) => Promise<HttpResponse<any>>;

export type HttpRequestMiddleware = <T>(request : HttpRequest) => Promise<HttpResponse<T>>;

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

// HTTP Response
export type HttpResponse<T> = {
   status      : number
   error?      : string,
   collection? : T[],
   count?      : number,
   index?      : number,
   limit?      : number,
};

export type AddPageDataToHttpResponse =
   <T>(page : Page, response : HttpResponse<T>) => HttpResponse<T>;

export const addPageDataToHttpResponse: AddPageDataToHttpResponse = <T>(
   page : Page,
   response : HttpResponse<T>,
) : HttpResponse<T> => ({
   ...response,
   index: page.index,
   limit: page.limit,
});


export type HostAddress = string;

export const localHost : HostAddress = '127.0.0.1';

export const ok : number = 200;
export const created : number = 201;
export const badRequest : number = 400;
export const unauthorized : number = 401;
export const forbidden : number = 403;
export const notFound : number = 404;
export const conflict : number = 409;
export const internalServerError : number = 500;


export const executeHttpRequestSideEffects : ExecuteHttpRequestSideEffects = (
   request     : HttpRequest,
   sideEffects : HttpRequestSideEffect[]
) : void => {
   if (sideEffects !== undefined)
      sideEffects.forEach((sideEffect: HttpRequestSideEffect) => sideEffect(request));
};
