export type Response = {
   status      : number
   error       : string | undefined,
   collection  : [any]  | undefined,
   count       : number | undefined,
   index       : number | undefined,
   limit       : number | undefined,
};
