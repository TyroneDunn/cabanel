import {Request as HalsRequest} from "../shared/request.type";
import {SideEffect as HalsSideEffect} from "./side-effect.type";

export const executeSideEffects = (dto: HalsRequest, sideEffects: HalsSideEffect[]): void =>
    sideEffects.forEach(sideEffect => sideEffect(dto));
