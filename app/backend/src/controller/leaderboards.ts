import { RequestHandler } from 'express';
import ServiceLeaderboards from '../services/leaderboards';

class Leaderboards {
  private _metodos = new ServiceLeaderboards();

  findAll:RequestHandler = async (_req, res) => {
    const data = await this._metodos.findAll();
    return res.status(200).json(data);
  };

  findHome:RequestHandler = async (_req, res) => {
    const result = await this._metodos.findAll(true, false);
    return res.status(200).json(result);
  };

  findVisit:RequestHandler = async (_req, res) => {
    const result = await this._metodos.findAll(false);
    return res.status(200).json(result);
  };
}
export default Leaderboards;
