import { Response } from "../app/response.type";
import { ValidationError } from "../validation-error/validation-error.type";
import {
   isValidationError,
   mapValidationErrorToErrorResponse,
} from "../validation-error/validation-error.utility";

export const handleRequest = async <T>(
   request: T,
   validate: (request: T) => Promise<ValidationError | null>,
   reduce: (request: T) => Promise<Response>
): Promise<Response> => {
   const validationOutcome : ValidationError | null = await validate(request);
   if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
   else return reduce(request);
};
