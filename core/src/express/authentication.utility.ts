import {
    Application as ExpressApplication,
    NextFunction,
    Request,
    RequestHandler,
    Response
} from "express";
import {Config} from "../app/config.type";
import {isLocalStrategy} from "../app/local-strategy.utility";
import {configureLocalAuthentication} from "./local-auth.utility";
import {UNAUTHORIZED} from "../shared/http-status-codes.constant";

export const configureAuthentication = (app: ExpressApplication, config: Config) => {
    if (config.authStrategy === "None") return;

    if (isLocalStrategy(config.authStrategy)) {
        configureLocalAuthentication(config, app);
        return;
    }

    // implement JWT strategy et al...
};

export const authGuard: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
    if (!request.isAuthenticated())
        return response.status(UNAUTHORIZED).json('Unauthorized.');
    return next();
};
