export type Result<T, U> =
   | Success<T>
   | Failure<U>;

export type Success<T> = { data: T };
export type Failure<U> = { error: U };
// TODO: create success and failure type constructors

export const isSuccess = (result : Result<any,any>) : result is Success<any> => (
   typeof result === 'object'
   && 'data' in result
);

export const isFailure = (result : Result<any,any>) : result is Failure<any> => (
   typeof result === 'object'
   && 'error' in result
);
