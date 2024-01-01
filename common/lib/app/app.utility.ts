import { Request } from "./request.type";
import { Response } from "./response.type";

export const addRequestPageDataToResponse = (
   request : Request,
   response : Response
) : Response => {
   if (request.queryParamMap === undefined) return { ...response };
   else return ({
      ...response,
      index : parseInt(request.queryParamMap['index']),
      limit : parseInt(request.queryParamMap['limit']),
   });
};
