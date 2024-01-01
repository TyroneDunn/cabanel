import { Request } from "./request.type";
import { Response } from "./response.type";

export const addRequestPageDataToResponse = (
   request : Request,
   response : Response
) : Response =>
   request.queryParamMap === undefined
   ? { ...response }
   : {
      ...response,
      index: parseInt(request.queryParamMap['index']),
      limit: parseInt(request.queryParamMap['limit']),
     };
