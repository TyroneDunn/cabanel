import {SideEffect} from "./side-effect.type";
import {ResponseDTO} from "./response-dto.type";
import {FeatureDTO} from "./feature-dto.type";

export type Method = {
    type: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    paramKeys?: string[],
    queryParamKeys?: string[]
    sideEffects?: SideEffect[],
    callback?: (dto: FeatureDTO) => ResponseDTO,
};
