import { AuthService } from "../auth/auth.service";
import {
    NextFunction,
    Request as ExpressRequest,
    RequestHandler,
    Response as ExpressResponse,
    Router,
} from "express";
import passport from "passport";
import { RegisterUserDTO } from "../users/users-dtos";
import { CREATED, INTERNAL_SERVER_ERROR, OK, Response as HalsResponse } from "@hals/common";
import { authGuard } from "./authentication.utility";
import { User } from "../users/user.type";
import {
    HalsEventEmitter,
    UserLoggedInEvent,
    UserLoggedOutEvent,
    UserRegisteredEvent,
} from "../app/event-emitter.service";

export const configureLocalAuthRouter = (authService: AuthService): Router => {
   const authRouter: Router = Router();
   authRouter.post('/register/', register(authService), authenticate, loggedIn);
   authRouter.post('/login/', authenticate, loggedIn);
   authRouter.post('/logout/', authGuard, logout);
   authRouter.get('/protected/', authGuard, authenticated);

   return authRouter;
};

const register = (authService: AuthService): RequestHandler =>
   async (request: ExpressRequest, response: ExpressResponse, next: NextFunction): Promise<void> => {
      const dto: RegisterUserDTO = mapToRegisterUserDTO(request);
      const halsResponse: HalsResponse = await authService.registerUser(dto);
      if (halsResponse.status === CREATED) {
         const user: User = halsResponse.collection?.pop() as User;
         HalsEventEmitter.emit(UserRegisteredEvent, user);
         next();
         return;
      }
      response.status(halsResponse.status).json(halsResponse);
   };

const authenticate: RequestHandler = passport.authenticate('local');

const mapToRegisterUserDTO = (req: ExpressRequest): RegisterUserDTO => ({
   username: req.body.username,
   password: req.body.password,
});

const loggedIn: RequestHandler = (request: ExpressRequest, response: ExpressResponse): void => {
   response.json({ status: OK, message: 'Logged in successfully.' });
   HalsEventEmitter.emit(UserLoggedInEvent, request.user as User);
};

const logout: RequestHandler = (request: ExpressRequest, response: ExpressResponse): void => {
   request.logout((error) => {
      if (error) {
         response.status(INTERNAL_SERVER_ERROR).json({
            status: INTERNAL_SERVER_ERROR,
            message: 'Log out failed.',
         });
         return;
      }
      response.json({
         status: OK,
         message: 'Logged out successfully.',
      });
      HalsEventEmitter.emit(UserLoggedOutEvent, request.user as User);
   });
};

const authenticated: RequestHandler =
   (request: ExpressRequest, response: ExpressResponse): void => {
      response.json({
         status: OK,
         username: (request.user as User).username,
      });
   };
