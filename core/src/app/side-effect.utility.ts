import { Request, SideEffect } from "@hals/common";

export const executeSideEffects = (
   request     : Request,
   sideEffects : SideEffect[]
) : void => {
   if (sideEffects !== undefined)
      sideEffects.forEach(sideEffect => sideEffect(request));
};
