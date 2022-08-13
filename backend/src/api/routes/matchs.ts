import { Router } from 'express';
import ControllerMatchs from '../../app/controller/matchs';
import ValidToken from '../middleware/validToken';

class Matchs {
  public matchRoute = Router();

  private _controllerMatchs:ControllerMatchs;

  private _checkToken: ValidToken;

  constructor() {
    this._controllerMatchs = new ControllerMatchs();
    this._checkToken = new ValidToken();
    this.Routes();
  }

  Routes() {
    this.matchRoute.get('/', this._controllerMatchs.findAll);

    this.matchRoute.get(
      '/',
      this._controllerMatchs.findProgres,
    );

    this.matchRoute.patch(
      '/:id',
      this._controllerMatchs.upGols,
    );

    this.matchRoute.patch(
      '/:id/finish',
      this._controllerMatchs.finish,
    );

    this.matchRoute.use(this._checkToken.VerifyToken);

    this.matchRoute.post('/', this._controllerMatchs.create);
  }
}

export default new Matchs().matchRoute;
