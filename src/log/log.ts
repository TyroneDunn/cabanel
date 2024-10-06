import { HttpRequest$ } from "../application/application";
import { HttpRequest } from "../http/http";
import { timestamp } from "../common/time";

export const httpRequestLogger = (httpRequest$: HttpRequest$, log: LogHttpRequest): void => {
   httpRequest$.subscribe((request: HttpRequest | undefined) => {
      if (request)
         log(request);
   });
};

export const httpRequestToStdOutLogger = (httpRequest$: HttpRequest$): void => {
   httpRequest$.subscribe((request: HttpRequest | undefined) => {
      if (request)
         consoleLogHttpRequest(request);
   });
};

export type LogHttpRequest = (httpRequest: HttpRequest) => void;

export const consoleLogHttpRequest: LogHttpRequest = (request: HttpRequest): void =>
   console.log(
      `${ timestamp(new Date()) } INFO - cabanel - ` +
      (request.sender
         ? `'${ request.sender?.username }' `
         : 'unauthorised user ') +
      (request.senderIp
         ? `${ request.senderIp } `
         : '') +
      `${ request.requestType } ` +
      `'${ request.path }/' ` +
      (JSON.stringify(request.parameters) !== '{}'
         ? `parameters: ${ JSON.stringify(request.parameters) } `
         : '') +
      (JSON.stringify(request.queryParameters) !== '{}'
         ? `query parameters: ${ JSON.stringify(request.queryParameters) } `
         : '') +
      (JSON.stringify(request.payload) !== '{}'
         ? `payload: ${ JSON.stringify(request.payload) } `
         : '') +
      (request.sessionId
         ? `'${ request.sessionId }' `
         : '')
   );