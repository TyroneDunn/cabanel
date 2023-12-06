import {Request as HalsRequest} from "../app/request.type";
import {SideEffect as HalsSideEffect} from "./side-effect.type";

export const executeSideEffects = (dto: HalsRequest, sideEffects: HalsSideEffect[]): void =>
    sideEffects.forEach(sideEffect => sideEffect(dto));
