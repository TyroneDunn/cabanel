import { Request, SideEffect } from "@hals/common";

export const executeSideEffects = (
   request     : Request,
   sideEffects : SideEffect[]
) : void =>
   sideEffects.forEach(sideEffect => sideEffect(request));
