import { RequestHandler } from 'express';
import ServiceClubs from '../services/clubs';

class Clubs {
  private ServiceClubs = new ServiceClubs();

  findAll:RequestHandler = async (_req, res) => {
    const data = await this.ServiceClubs.findAll();
    return res.status(200).json(data);
  };

  findById:RequestHandler = async (req, res) => {
    const { id } = req.params;
    const club = await this.ServiceClubs.findId(+id);
    return res.status(200).json(club);
  };
}

export default Clubs;
