export type ErrorType =
   | "BadRequest"
   | "NotFound"
   | "Unauthorized"
   | "Conflict"
   | "Forbidden"
   | "Internal";

export type Error = {
   type    : ErrorType
   message : string,
};

export const Error = (type: ErrorType, message: string): Error => ({
   type: type,
   message: message
});
