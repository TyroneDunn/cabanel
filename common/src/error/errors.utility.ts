import {Response} from "../app/response.type";
import {Error} from "./error.type"
import {INTERNAL_SERVER_ERROR} from "../http/http-status-codes.constant";

export const mapToInternalServerErrorResponse = (error: Error): Response => ({
    status: INTERNAL_SERVER_ERROR,
    error: error.message,
});

export const throwErrors = (errors: Error[]): void => {
    const errorMessages: string = '';
    for (const error of errors) errorMessages.concat(error.message, '\n');
    throw new Error(errorMessages);
};
