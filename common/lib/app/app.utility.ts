import { Response } from "./response.type";
import { Page } from "../page/page.type";

export const addPageDataToResponse = (
   page     : Page,
   response : Response
) : Response => ({
   ...response,
   index: page.index,
   limit: page.limit,
});
