import { CommandResult } from '../command-result/command-result.type';
import { Response } from '../app/response.type';
import { INTERNAL_SERVER_ERROR, OK } from '../http/http-status-codes.constant';

export const mapUpdateResultToResponse = (result : CommandResult) : Response => ({
   status: result.success ? OK : INTERNAL_SERVER_ERROR,
   ...result.success && { count: result.affectedCount },
   ...(!result.success) && {
      error: 'Update Error: An unexpected error occurred. Please try' +
         ' again or contact support for assistance.',
   },
});