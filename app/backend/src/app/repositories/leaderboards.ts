import ModelMatchs from '../../database/models/matchs';
import ModelClubs from '../../database/models/clubs';
import associate from './utils/associate';
import { IMatchsDTO } from '../../interface/matchs';
import IClubsCamelDTO from '../../interface/clubs';

class Leaderboards {
  private metodos = ModelMatchs;

  private times = ModelClubs;

  findAllClubs = async ():Promise<IClubsCamelDTO[]> => {
    const times = await this.times.findAll({ raw: true });
    const listTimes = times as unknown as IClubsCamelDTO[];
    return listTimes;
  };

  findAll = async ():Promise<IMatchsDTO[]> => {
    const result = await this.metodos.findAll({ where: { inProgress: false },
      include: associate,
      raw: true,
      nest: true,
    });
    const matchs = result as unknown as IMatchsDTO[];
    return matchs;
  };
}
export default Leaderboards;
