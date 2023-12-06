import {Request} from "../shared/request-dto.type";

export type SideEffect = (dto: Request) => Promise<void>;
