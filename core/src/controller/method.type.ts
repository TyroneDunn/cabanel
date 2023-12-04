import {SideEffect} from "./side-effect.type";
import {ResponseDTO} from "../shared/response-dto.type";
import {Request} from "../shared/request-dto.type";

export type MethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type Callback = (response: ResponseDTO) => void;

export type Method = {
    type: MethodType,
    path?: string,
    paramKeys: string[],
    queryParamKeys: string[]
    sideEffects: SideEffect[],
    done: (dto: Request, callback: Callback) => void,
};
