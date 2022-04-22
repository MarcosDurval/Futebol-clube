import { Router } from 'express';
import Login from '../controller/login';
import 'express-async-errors';
import { IUserWithIdDTO } from '../interface/users';
import ValidToken from '../controller/middleware/validToken';

declare module 'express-serve-static-core'{
  interface Request {
    user: IUserWithIdDTO
  }
}

class LoginRoute {
  public loginRoute:Router;

  public controllerLogin:Login;

  public checkToken:ValidToken;

  constructor() {
    this.loginRoute = Router();

    this.controllerLogin = new Login();

    this.checkToken = new ValidToken();

    this.Routes();
  }

  Routes() {
    this.loginRoute.post('/', this.controllerLogin.post);

    this.loginRoute.use(this.checkToken.VerifyToken);

    this.loginRoute.get('/validate', this.controllerLogin.validUser);
  }
}

export default new LoginRoute().loginRoute;
