import {Request} from "./request.type";

export type SideEffect = (request: Request) => Promise<void>;
