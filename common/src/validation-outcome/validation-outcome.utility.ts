import {ValidationOutcome} from "./validation-outcome.type";
import {Response} from "../app/response.type";
import {
    BadRequestError,
    ConflictError,
    ForbiddenError,
    NotFoundError,
    UnauthorizedError
} from "../errors/errors.type";
import {
    BAD_REQUEST,
    CONFLICT,
    FORBIDDEN, INTERNAL_SERVER_ERROR,
    NOT_FOUND,
    UNAUTHORIZED
} from "../http/http-status-codes.constant";

export const mapValidationOutcomeToErrorResponse = (validationOutcome: ValidationOutcome): Response => {
    if (validationOutcome.error instanceof BadRequestError) return ({
        status: BAD_REQUEST,
        error: validationOutcome.error.message,
    });
    if (validationOutcome.error instanceof NotFoundError) return {
        status: NOT_FOUND,
        error: validationOutcome.error.message,
    };
    if (validationOutcome.error instanceof UnauthorizedError) return {
        status: UNAUTHORIZED,
        error: validationOutcome.error.message,
    };
    if (validationOutcome.error instanceof ForbiddenError) return {
        status: FORBIDDEN,
        error: validationOutcome.error.message,
    };
    if (validationOutcome.error instanceof ConflictError) return {
        status: CONFLICT,
        error: validationOutcome.error.message,
    };
    return {
        status: INTERNAL_SERVER_ERROR,
        error: validationOutcome.error?.message
    }
};
