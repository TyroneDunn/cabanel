import {SideEffect} from "./side-effect.type";
import {ResponseDTO} from "../shared/response-dto.type";
import {Request} from "../shared/request-dto.type";

export type MethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type MethodCallback = (dto: Request) => Promise<ResponseDTO>;

export type Method = {
    type: MethodType,
    path?: string,
    paramKeys: string[],
    queryParamKeys: string[]
    sideEffects: SideEffect[],
    done: MethodCallback,
};
