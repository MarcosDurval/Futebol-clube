import { Router } from 'express';
import 'express-async-errors';
import ControllerLeaderboards from '../controller/leaderboards';

class Leaderboards {
  public leaderboardsRoutes:Router;

  private _metodos: ControllerLeaderboards;

  constructor() {
    this.leaderboardsRoutes = Router();

    this._metodos = new ControllerLeaderboards();

    this.Routes();
  }

  Routes() {
    this.leaderboardsRoutes.get('/', this._metodos.findAll);

    this.leaderboardsRoutes.get('/home', this._metodos.findHome);

    this.leaderboardsRoutes.get('/away', this._metodos.findVisit);
  }
}

export default new Leaderboards().leaderboardsRoutes;
