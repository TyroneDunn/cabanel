import {SideEffect} from "./side-effect.type";
import {ResponseDTO} from "../shared/response-dto.type";
import {FeatureDTO} from "./feature-dto.type";

export type MethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type Method = {
    type: MethodType,
    paramKeys?: string[],
    queryParamKeys?: string[]
    sideEffects?: SideEffect[],
    callback?: (dto: FeatureDTO) => ResponseDTO,
};
