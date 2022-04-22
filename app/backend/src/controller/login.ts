import { Request, RequestHandler, Response } from 'express';
import ValidLogin from './utils/validLogin';
import ServiceUser from '../services/user';
import { IUserJwt } from '../interface/users';

class Login {
  private _validLogin:ValidLogin;

  private _serviceUser: ServiceUser = new ServiceUser();

  private _token:IUserJwt;

  public post:RequestHandler = async (req:Request, res:Response) => {
    this._validLogin = new ValidLogin(req.body);
    const user = await this._serviceUser.getByEmail(req.body);
    return res.status(200).json(user);
  };

  public validUser:RequestHandler = (req, res) => res.status(200).json(req.user.role);
}

export default Login;
