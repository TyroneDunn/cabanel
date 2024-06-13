import { Result, Success, Failure } from './result';

export type CommandResult = Result<CommandResultSuccess, CommandResultFailure>

export type CommandResultSuccess = Success<AcknowledgeCount>;
export type AcknowledgeCount = { acknowledgedCount: number }

export type CommandResultFailure = Failure<CommandResultError>;
export type CommandResultError = undefined;