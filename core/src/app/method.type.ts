import {SideEffect} from "./side-effect.type";
import {ParamMap} from "./param-map.type";
import {ResponseDTO} from "./response-dto.type";

export type Method<T> = {
    type: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    paramsDefinition: string[],
    parser: (paramMap: ParamMap, queryParamMap: ParamMap, payload: Object) => T,
    sideEffects?: SideEffect<T>[],
    callback?: (dto: T) => ResponseDTO,
};
