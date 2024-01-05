import { Response } from "./response.type";
import { Page } from "../page/page.type";
import { ValidationError } from "../validation-error/validation-error.type";
import {
   isValidationError,
   mapValidationErrorToErrorResponse,
} from "../validation-error/validation-error.utility";

export const addPageDataToResponse = (
   page     : Page,
   response : Response
) : Response => ({
   ...response,
   index: page.index,
   limit: page.limit,
});

export const handleRequest = async <T>(
   request: T,
   validate: (request: T) => Promise<ValidationError | null>,
   handler: (request: T) => Promise<Response>
): Promise<Response> => {
   const validationOutcome : ValidationError | null = await validate(request);
   if (isValidationError(validationOutcome)) return mapValidationErrorToErrorResponse(validationOutcome);
   else return handler(request);
}
