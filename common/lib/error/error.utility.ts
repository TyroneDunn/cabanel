import { Response } from "../app/response.type";
import { Error } from "./error.type";
import { INTERNAL_SERVER_ERROR } from "../http/http-status-codes.constant";

export const mapErrorToInternalServerErrorResponse = (error : Error) : Response => ({
   status : INTERNAL_SERVER_ERROR,
   error  : error.message,
});

export const isError = (object : any) : object is Error => (
   object !== null
   && typeof object === 'object'
   && 'type'     in object
   && 'message'  in object
);
