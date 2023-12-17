import {CommandResult as CommandResultType} from "./src/command-result/command-result.type";
import {DateRange as DateRangeType} from "./src/timestamps/date-range.type";
import {Error as Error_Type, ErrorType as ErrorType_Type} from "./src/error/error.type";
import {
    GenerateSalt as GenerateSaltType,
    HashUtility as HashUtilityType
} from "./src/password/password.type";
import {NumberRange as NumberRangeType} from "./src/number-range/number-range.type";
import {OrderOption as OrderOptionType} from "./src/order/order-option.type";
import {Timestamps as TimestampsType} from "./src/timestamps/timestamps.type";
import {Request as RequestType, Respnse as ResponseType} from "./src/app/request.type";
import {Page as PageType} from "./src/page/page.type";
import {ParamMap as ParamMapType} from "./src/app/param-map.type";
import {
    ValidationOutcome as ValidationOutcomeType
} from "./src/validation-outcome/validation-outcome.type";
import {
    BAD_REQUEST as BAD_REQUESTconst,
    CONFLICT as CONFLICTconst,
    CREATED as CREATEDconst,
    FORBIDDEN as FORBIDDENconst,
    INTERNAL_SERVER_ERROR as INTERNAL_SERVER_ERRORconst,
    NOT_FOUND as NOT_FOUNDconst,
    OK as OKconst,
    UNAUTHORIZED as UNAUTHORIZEDconst,
} from "./src/http/http-status-codes.constant";

import {
    addRequestPageDataToResponse as addRequestPageDataToResponseImpl
} from "./src/app/app.utility";
import {configureHashUtility as configureHashUtilityImpl} from "./src/password/password.utility";
import {generateSalt as generateSaltImpl} from "./src/password/password.utility";
import {
    mapCommandResultToSuccessResponse as mapCommandResultToSuccessResponseImpl,
    mapDeleteResultToResponse as mapDeleteResultToResponseImpl,
    mapUpdateResultToResponse as mapUpdateResultToResponseImpl
} from "./src/command-result/command-result.utility";
import {mapRequestToPage as mapRequestToPageImpl} from "./src/page/page.utility";
import {mapRequestToTimestamps as mapRequestToTimestampsImpl} from "./src/timestamps/timestamps.utility";
import {mapValidationOutcomeToErrorResponse as mapValidationOutcomeToErrorResponseImpl} from "./src/validation-outcome/validation-outcome.utility";
import {
    mapErrorToInternalServerErrorResponse as mapErrorToInternalServerErrorResponseImpl,
    throwErrors as throwErrorsImpl
} from "./src/error/errors.utility";

export type CommandResult = CommandResultType;
export type DateRange = DateRangeType;
export type Error = Error_Type;
export type ErrorType = ErrorType_Type;
export type GenerateSalt = GenerateSaltType;
export type HashUtility = HashUtilityType;
export type NumberRange = NumberRangeType;
export type OrderOption = OrderOptionType;
export type Request = RequestType;
export type Response = ResponseType;
export type Timestamps = TimestampsType;
export type Page = PageType;
export type ParamMap = ParamMapType;
export type ValidationOutcome = ValidationOutcomeType;

export const OK: number = OKconst;
export const CREATED: number = CREATEDconst;
export const BAD_REQUEST: number = BAD_REQUESTconst;
export const UNAUTHORIZED: number = UNAUTHORIZEDconst;
export const FORBIDDEN: number = FORBIDDENconst;
export const NOT_FOUND: number = NOT_FOUNDconst;
export const CONFLICT: number = CONFLICTconst;
export const INTERNAL_SERVER_ERROR: number = INTERNAL_SERVER_ERRORconst;


export const addRequestPageDataToResponse = addRequestPageDataToResponseImpl;
export const configureHashUtility = configureHashUtilityImpl;
export const generateSalt = generateSaltImpl;
export const mapCommandResultToSuccessResponse = mapCommandResultToSuccessResponseImpl;
export const mapDeleteResultToResponse = mapDeleteResultToResponseImpl;
export const mapErrorToInternalServerErrorResponse = mapErrorToInternalServerErrorResponseImpl;
export const mapRequestToPage = mapRequestToPageImpl;
export const mapRequestToTimestamps = mapRequestToTimestampsImpl;
export const mapUpdateResultToResponse = mapUpdateResultToResponseImpl;
export const mapValidationOutcomeToErrorResponse = mapValidationOutcomeToErrorResponseImpl;
export const throwErrors = throwErrorsImpl;
