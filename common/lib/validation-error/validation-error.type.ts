import { Error, ErrorType } from "../error/error.type";

export type ValidationError = {
   error : Error,
};

export const ValidationError = (type : ErrorType, message : string) : ValidationError => ({
   error: {
      type   : type,
      message: message,
   },
});