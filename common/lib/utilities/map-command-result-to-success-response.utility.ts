import { CommandResult } from '../command-result/command-result.type';
import { Response } from '../app/response.type';
import { OK } from '../http/http-status-codes.constant';

export const mapCommandResultToSuccessResponse = (result : CommandResult) : Response => ({
   status: OK,
   count : result.affectedCount,
});