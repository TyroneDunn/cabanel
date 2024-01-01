import { Request as HalsRequest, SideEffect as HalsSideEffect } from "@hals/common";

export const executeSideEffects = (
   request         : HalsRequest,
   sideEffects : HalsSideEffect[]
) : void =>
   sideEffects.forEach(sideEffect => sideEffect(request));
