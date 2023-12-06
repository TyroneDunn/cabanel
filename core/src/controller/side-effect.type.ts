import {Request} from "../shared/request.type";

export type SideEffect = (dto: Request) => Promise<void>;
