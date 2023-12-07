export type Error = {
    type: ErrorType,
    message: string,
};

export type ErrorType =
    | "BadRequest"
    | "NotFound"
    | "Conflict"
    | "Unauthorized"
    | "Forbidden";