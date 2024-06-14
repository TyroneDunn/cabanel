export { HalsEventEmitter, userLoggedInEvent, userLoggedOutEvent, userRegisteredEvent } from './application/events';
export { hals } from './application/application';


// HTTP
export { addPageDataToHttpResponse, isHttpRequestError } from './http/http';
export { localHost } from './http/http';


// Common
export { mapSuccessfulCommandResultToHttpSuccessResponse } from './common/command-result';
export { isSuccess, isFailure } from './common/result';
export { isEndOnlyDateRange, isStartAndEndDateRange, isStartOnlyDateRange } from './common/time';
export { isValidationError } from './common/validation';


// Password
export {
   generateHash,
   validateHash,
   generateSalt
} from './password/password';
