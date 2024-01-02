import { Method } from "./method.type";

export type Controller = {
   path    : string,
   guard   : boolean,
   methods : Method[],
};
