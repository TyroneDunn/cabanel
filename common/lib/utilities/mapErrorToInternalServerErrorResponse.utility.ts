import { Error } from '../error/error.type';
import { Response } from '../app/response.type';
import { INTERNAL_SERVER_ERROR } from '../http/http-status-codes.constant';

export const mapErrorToInternalServerErrorResponse = (error : Error) : Response => ({
   status: INTERNAL_SERVER_ERROR,
   error : error.message,
});
