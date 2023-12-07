import {AuthService} from "../auth/auth.service";
import {
    NextFunction,
    Request as ExpressRequest,
    RequestHandler,
    Response as ExpressResponse,
    Router,
} from "express";
import passport from "passport";
import {RegisterUserDTO} from "../users/users-dtos";
import {Response as HalsResponse} from "../app/response.type"
import {CREATED, INTERNAL_SERVER_ERROR, OK} from "../shared/http-status-codes.constant";
import {authGuard} from "./authentication.utility";
import {User} from "../users/user.type";

export const configureLocalAuthRouter = (authService: AuthService): Router => {
    const authRouter: Router = Router();
    authRouter.post('/register/', register(authService), authenticate, loggedIn);
    authRouter.post('/login/', authenticate, loggedIn);
    authRouter.post('/logout/', authGuard, logout);
    authRouter.get('/protected/', authGuard, authenticated);

    return authRouter;
};

const register = (authService: AuthService): RequestHandler =>
    async (request: ExpressRequest, response: ExpressResponse, next: NextFunction) => {
        const dto: RegisterUserDTO = mapToRegisterUserDTO(request);
        const halsResponse: HalsResponse = await authService.registerUser(dto);
        if (halsResponse.status === CREATED) return next();
        response.status(halsResponse.status).json(halsResponse);
    };

const authenticate: RequestHandler = passport.authenticate('local');

const mapToRegisterUserDTO = (req: ExpressRequest): RegisterUserDTO => ({
    username: req.body.username,
    password: req.body.password,
});

const loggedIn: RequestHandler = (request: ExpressRequest, response: ExpressResponse) => {
    response.json({status: OK, message: 'Logged in successfully.'});
};

const logout: RequestHandler = (req: ExpressRequest, res: ExpressResponse): void => {
    req.logout((error) => {
        if (error) {
            res.status(INTERNAL_SERVER_ERROR).json({
                status: INTERNAL_SERVER_ERROR,
                message: 'Log out failed.'
            });
            return;
        }
        res.json({
            status: OK,
            message: 'Logged out successfully.'
        });
    });
};

const authenticated: RequestHandler =
    (request: ExpressRequest, response: ExpressResponse): void => {
        response.json({
            status: OK,
            username: (request.user as User).username
        });
    };
