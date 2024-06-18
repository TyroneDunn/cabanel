export type ValidationError = {
   type    : ValidationErrorType
   message : string,
};

export type ValidationErrorType =
   | "BadRequest"
   | "Internal";

export const ValidationError =
   (type: ValidationErrorType, message: string): ValidationError => ({
      type    : type,
      message : message
   });

export const isValidationError = (object : any) : object is ValidationError => (
   object !== null
   && typeof object === 'object'
   && 'type' in object
   && 'message' in object
);
