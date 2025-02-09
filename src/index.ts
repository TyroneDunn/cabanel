import { HttpRequest$, httpRequestSubject } from './application/application';

export { cabanelEvent$, userLoggedInEvent, userLoggedOutEvent, userRegisteredEvent } from './application/events';
export { buildServer } from './application/application';


// HTTP
export {
   addPageDataToHttpResponse,
   isHttpRequestError,
   mapHttpRequestToPage,
   HttpRequestError,
   localHost,
   internalServerError,
   ok,
   unauthorized,
   created,
   conflict,
   badRequest,
   forbidden,
   notFound,
} from './http/http';


// Common
export { mapSuccessfulCommandResultToHttpSuccessResponse } from './common/command-result';
export { isSuccess, isFailure } from './common/result';
export { isEndOnlyDateRange, isStartAndEndDateRange, isStartOnlyDateRange } from './common/time';
export { isValidationError, ValidationError, } from './common/validation';


// Password
export {
   generateHash,
   validateHash,
   generateSalt,
} from './password/password';



// Http Request Stream
export const httpRequest$ : HttpRequest$ = httpRequestSubject.asObservable();