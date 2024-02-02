import { ParamMap } from "./param-map.type";
import { User } from '../users/user.type';

export type Request = {
   paramMap      : ParamMap,
   queryParamMap : ParamMap,
   payload       : any,
   user?         : User,
};
