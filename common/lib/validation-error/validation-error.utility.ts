import { ValidationError } from "./validation-error.type";

export const isValidationError = (object : any) : object is ValidationError => (
   object !== null
   && typeof object === 'object'
   && 'error' in object
);
