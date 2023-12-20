import { Request } from "./request.type";
import { Response } from "./response.type";

export type RequestHandler = (dto: Request) => Promise<Response>;
