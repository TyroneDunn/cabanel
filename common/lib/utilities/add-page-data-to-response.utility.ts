import { Page } from '../page/page.type';
import { Response } from '../app/response.type';

export const addPageDataToResponse = (
   page : Page,
   response : Response,
) : Response => ({
   ...response,
   index: page.index,
   limit: page.limit,
});
