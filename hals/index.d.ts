// Application
export {
   hals,
   InitialiseApplication,
   Application,
   ApplicationSchema,
   NodeEnvironmentOption,
   AuthStrategy,
   ServerFrameworkOption,
} from './src/application/application';
export {
   HalsEventEmitter,
   userRegisteredEvent,
   userLoggedInEvent,
   userLoggedOutEvent
} from './src/application/events';
export {
   LocalAuthStrategy,
   LocalAuthDatabaseProvider,
   LocalAuthDatabaseOptions
} from './src/application/local-auth-strategy';
export {
   RestServerApplicationSchema,
   RestServerApplicationController,
   UnguardedRestServerApplicationController,
   GuardedRestServerApplicationController
} from './src/application/rest-server-application';


// HTTP
export {  } from './src/http';
export { CorsOptions, CustomOrigin, StaticOrigin } from './src/http/cors';
export {
   HttpRequestHandler,
   HttpRequestMiddleware,
   HttpResponse,
   HttpRequest,
   HttpRequestSideEffect,
   AddPageDataToHttpResponse,
   HostAddress,
   HttpRequestType,
   HttpRequestReducer,
   HttpRequestError,
   HttpRequestErrorType,
   internalServerError,
   ok,
   unauthorized,
   created,
   conflict,
   badRequest,
   forbidden,
   notFound,
   localHost,
} from './src/http/http';


// Common
export { Page } from './src/common/page';
export {
   CommandResult,
   CommandResultError,
   FailedCommandResult,
   SuccessfulCommandResult,
   MapSuccessfulCommandResultToHttpSuccessResponse,
   mapSuccessfulCommandResultToHttpSuccessResponse
} from './src/common/command-result';
export {
   NumberRange,
   StartOnlyNumberRange,
   EndOnlyNumberRange,
   StartAndEndNumberRange,
} from './src/common/number-range';
export { OrderOption } from './src/common/order-option';
export { ParamMap } from './src/common/param-map';
export { Result, Success, Failure, isSuccess, isFailure } from './src/common/result';
export {
   DateRange,
   CreatedAtDateRange,
   UpdatedAtDateRange,
   EndOnlyDateRange,
   StartAndEndDateRange,
   StartOnlyDateRange
} from './src/common/time';
export { ValidationError, ValidationErrorType } from './src/common/validation';


// Password
export {
   PasswordOptions,
   HashAlgorithm,
   GenerateHash,
   ValidateHash,
   GenerateSalt
} from './src/password/password';


// Users
export { User } from './src/users/users';
