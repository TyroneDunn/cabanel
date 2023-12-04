import {RequestHandler, Request, Response, NextFunction} from "express";
import {UNAUTHORIZED} from "../shared/http-status-codes.constant";

export const authGuard: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated())
        return res.status(UNAUTHORIZED).json('Unauthorized.');
    return next();
};
