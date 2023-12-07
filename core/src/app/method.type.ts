import {SideEffect} from "./side-effect.type";
import {Response} from "./response.type";
import {Request} from "./request.type";

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
export type RequestHandler = (dto: Request) => Promise<Response>;

