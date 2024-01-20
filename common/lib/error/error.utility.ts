import { Error } from "./error.type";

export const isError = (object : any) : object is Error => (
   object !== null
   && typeof object === 'object'
   && 'type'     in object
   && 'message'  in object
);
