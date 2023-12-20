import { ParamMap } from "./param-map.type";

export type Request = {
   paramMap: ParamMap,
   queryParamMap: ParamMap,
   payload: Object,
};
