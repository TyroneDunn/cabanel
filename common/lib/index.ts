import {
   BAD_REQUEST as BAD_REQUESTconst,
   CONFLICT as CONFLICTconst,
   CREATED as CREATEDconst,
   FORBIDDEN as FORBIDDENconst,
   INTERNAL_SERVER_ERROR as INTERNAL_SERVER_ERRORconst,
   NOT_FOUND as NOT_FOUNDconst,
   OK as OKconst,
   UNAUTHORIZED as UNAUTHORIZEDconst,
} from "./http/http-status-codes.constant";

import {
   addPageDataToResponse as addPageDataToResponseImpl,
   handleRequest as handleRequestImpl,
} from "./app/app.utility";
import { CommandResult as CommandResultImpl } from "./command-result/command-result.type";
import {
   configureHashUtility as configureHashUtilityImpl,
   generateSalt as generateSaltImpl,
} from "./password/password.utility";
import { Error as ErrorImpl } from "./error/error.type";
import {
   mapCommandResultToSuccessResponse as mapCommandResultToSuccessResponseImpl,
   mapDeleteResultToResponse as mapDeleteResultToResponseImpl,
   mapUpdateResultToResponse as mapUpdateResultToResponseImpl,
} from "./command-result/command-result.utility";
import { mapRequestToPage as mapRequestToPageImpl } from "./page/page.utility";
import {
   mapRequestToTimestamps as mapRequestToTimestampsImpl,
} from "./timestamps/timestamps.utility";
import {
   isValidationError as isValidationErrorImpl,
   mapValidationErrorToErrorResponse as mapValidationErrorToErrorResponseImpl,
} from "./validation-error/validation-error.utility";
import { ValidationError as ValidationErrorImpl } from "./validation-error/validation-error.type";
import {
   isError as isErrorImpl,
   mapErrorToInternalServerErrorResponse as mapErrorToInternalServerErrorResponseImpl,
} from "./error/error.utility";


export const OK : number = OKconst;
export const CREATED : number = CREATEDconst;
export const BAD_REQUEST : number = BAD_REQUESTconst;
export const UNAUTHORIZED : number = UNAUTHORIZEDconst;
export const FORBIDDEN : number = FORBIDDENconst;
export const NOT_FOUND : number = NOT_FOUNDconst;
export const CONFLICT : number = CONFLICTconst;
export const INTERNAL_SERVER_ERROR : number = INTERNAL_SERVER_ERRORconst;


export const addPageDataToResponse = addPageDataToResponseImpl;
export const CommandResult = CommandResultImpl;
export const configureHashUtility = configureHashUtilityImpl;
export const Error = ErrorImpl;
export const generateSalt = generateSaltImpl;
export const handleRequest = handleRequestImpl;
export const isError = isErrorImpl;
export const mapCommandResultToSuccessResponse = mapCommandResultToSuccessResponseImpl;
export const mapDeleteResultToResponse = mapDeleteResultToResponseImpl;
export const mapErrorToInternalServerErrorResponse = mapErrorToInternalServerErrorResponseImpl;
export const mapRequestToPage = mapRequestToPageImpl;
export const mapRequestToTimestamps = mapRequestToTimestampsImpl;
export const mapUpdateResultToResponse = mapUpdateResultToResponseImpl;
export const mapValidationErrorToErrorResponse = mapValidationErrorToErrorResponseImpl;
export const ValidationError = ValidationErrorImpl;
export const isValidationError = isValidationErrorImpl;
