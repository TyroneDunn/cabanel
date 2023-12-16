import {ValidationOutcome} from "./validation-outcome.type";
import {Response} from "../app/response.type";
import {
    BAD_REQUEST,
    CONFLICT,
    FORBIDDEN, INTERNAL_SERVER_ERROR,
    NOT_FOUND, OK,
    UNAUTHORIZED
} from "../http/http-status-codes.constant";

export const mapValidationOutcomeToErrorResponse = (validationOutcome: ValidationOutcome): Response => {
    if (validationOutcome.error === undefined)
        return {
            status: OK,
        };

    if (validationOutcome.error.type ===  "BadRequest") return ({
        status: BAD_REQUEST,
        error: validationOutcome.error.message,
    });

    if (validationOutcome.error.type === "NotFound") return {
        status: NOT_FOUND,
        error: validationOutcome.error.message,
    };

    if (validationOutcome.error.type === "Unauthorized") return {
        status: UNAUTHORIZED,
        error: validationOutcome.error.message,
    };

    if (validationOutcome.error.type === "Forbidden") return {
        status: FORBIDDEN,
        error: validationOutcome.error.message,
    };

    if (validationOutcome.error.type === "Conflict") return {
        status: CONFLICT,
        error: validationOutcome.error.message,
    };

    return {
        status: INTERNAL_SERVER_ERROR,
        error: validationOutcome.error?.message
    };
};
