import { SideEffect } from "./side-effect.type";
import { RequestHandler } from "./request-handler.type";

export type Method = {
   type: MethodType,
   path?: string,
   paramKeys: string[],
   queryParamKeys: string[]
   sideEffects: SideEffect[],
   middleware: RequestHandler[],
   requestHandler: RequestHandler,
};

export type MethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
