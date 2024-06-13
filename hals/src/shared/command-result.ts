import { Result, Success, Failure } from './result';
import { HttpResponse, ok } from '../http/http';

export type CommandResult = Result<SuccessfulCommandResult, FailedCommandResult>

export type SuccessfulCommandResult = Success<AcknowledgeCount>;
export type AcknowledgeCount = { acknowledgedCount: number }

export type FailedCommandResult = Failure<CommandResultError>;
export type CommandResultError = undefined;


export type MapSuccessfulCommandResultToHttpSuccessResponse = <T>(result : SuccessfulCommandResult) => HttpResponse<T>;
export const mapSuccessfulCommandResultToHttpSuccessResponse : MapSuccessfulCommandResultToHttpSuccessResponse =
   <T>(result : SuccessfulCommandResult) : HttpResponse<T> => ({
      status: ok,
      count : result.data.acknowledgedCount,
   });
