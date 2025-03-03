export type CorsOptions = {
   // origin? : StaticOrigin | CustomOrigin | string[] | undefined;
   origin? : string[] | undefined;
   methods? : string | string[] | undefined;
   allowedHeaders? : string | string[] | undefined;
   exposedHeaders? : string | string[] | undefined;
   credentials? : boolean | undefined;
   maxAge? : number | undefined;
   preflightContinue? : boolean | undefined;
   optionsSuccessStatus? : number | undefined;
};

export type StaticOrigin =
   | boolean
   | string
   | RegExp
   | Array<boolean | string | RegExp>;

export type CustomOrigin = (
   requestOrigin : string | undefined,
   callback : (err : Error | null, origin? : StaticOrigin) => void,
) => void;
