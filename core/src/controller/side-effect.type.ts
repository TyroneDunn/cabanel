import {Request} from "../app/request.type";

export type SideEffect = (dto: Request) => Promise<void>;
