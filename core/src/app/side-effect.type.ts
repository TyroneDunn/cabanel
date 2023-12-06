import {Request} from "./request.type";

export type SideEffect = (dto: Request) => Promise<void>;
