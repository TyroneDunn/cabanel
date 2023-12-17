import {CommandResult} from "./command-result.type";
import {Response} from "../app/response.type";
import {OK, INTERNAL_SERVER_ERROR, NOT_FOUND} from "../http/http-status-codes.constant"

export const mapCommandResultToSuccessResponse = (result: CommandResult): Response => ({
    status: OK,
    count: result.affectedCount
});

export const mapUpdateResultToResponse = (result: CommandResult): Response => ({
    status: result.success ? OK : INTERNAL_SERVER_ERROR,
    ...result.success && {count: result.affectedCount},
    ...(!result.success) && {
        error: 'Update Error: An unexpected error occurred. Please try' +
            ' again or contact support for assistance.'
    }
});

export const mapDeleteResultToResponse = (result: CommandResult): Response => ({
    status: result.success && result.affectedCount > 0
        ? OK
        : result.success && result.affectedCount === 0
            ? NOT_FOUND
            : INTERNAL_SERVER_ERROR,
    ...result.success && {count: result.affectedCount},
    ...(!result.success) && {
        error: 'Delete Error: An unexpected error occurred. Please try again' +
            ' or contact support for assistance.'
    }
});
