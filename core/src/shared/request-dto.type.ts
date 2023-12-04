import {ParamMap} from "./param-map.type";

export type Request = {
    // sender: User,
    paramMap?: ParamMap,
    queryParamMap?: ParamMap,
    payload?: Object,
};
