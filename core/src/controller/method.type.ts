import {SideEffect} from "./side-effect.type";
import {Response} from "../app/response.type";
import {Request} from "../app/request.type";

export type Method = {
    type: MethodType,
    path?: string,
    paramKeys: string[],
    queryParamKeys: string[]
    sideEffects: SideEffect[],
    done: MethodCallback,
};

export type MethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type MethodCallback = (dto: Request) => Promise<Response>;

