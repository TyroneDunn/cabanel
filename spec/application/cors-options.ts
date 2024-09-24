import {ok} from "../../src";
import { CorsOptions } from "../../src/http/cors";

export const corsOptions: CorsOptions = {
   origin              : [
      '*',
   ],
   allowedHeaders      : 'Content-Type,credentials',
   credentials         : true,
   optionsSuccessStatus: ok,
   methods             : [ "GET", "POST", "DELETE", "PATCH" ],
};