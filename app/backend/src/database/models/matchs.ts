import ModelMatchs from './sequelize/matchs';
import associate from './utils/associate';
import ICreateMatchDTO, { Gols, IMatchsDT02, ISequelizeValuesDTO } from '../../interface/matchs';

interface ICreateMatchWithIdDTO extends ICreateMatchDTO{
  id:number
}

class Matchs {
  private _metodos = ModelMatchs;

  findAll = async (): Promise<IMatchsDT02[]> => {
    const result = await this._metodos.findAll(
      {
        include: associate,
      },
    );

    const allClubs = result as unknown as ISequelizeValuesDTO<IMatchsDT02>[];
    return allClubs.map((club) => club.dataValues);
  };

  findSearch = async (progress: boolean): Promise<IMatchsDT02[]> => {
    const result = await this._metodos.findAll({
      where: { inProgress: progress },
      include: associate,
    });
    const allClubs = result as unknown as ISequelizeValuesDTO<IMatchsDT02>[];
    return allClubs.map((club) => club.dataValues);
  };

  private orderkeys = (newMatch:ISequelizeValuesDTO<ICreateMatchWithIdDTO>) => ({
    id: newMatch.dataValues.id,
    homeTeam: newMatch.dataValues.homeTeam,
    homeTeamGoals: newMatch.dataValues.homeTeamGoals,
    awayTeam: newMatch.dataValues.awayTeam,
    awayTeamGoals: newMatch.dataValues.awayTeamGoals,
    inProgress: newMatch.dataValues.inProgress,
  });

  create = async (match:ICreateMatchDTO):Promise<ICreateMatchWithIdDTO> => {
    const result = await this._metodos.create(match);
    const createMatch = result as unknown as ISequelizeValuesDTO<ICreateMatchWithIdDTO>;
    console.log(createMatch);
    return this.orderkeys(createMatch);
  };

  update = async (id:number):Promise<number> => {
    await this._metodos.update({ inProgress: false }, { where: { id } });
    return id;
  };

  updateGols = async (id:number, gols:Gols):Promise<number> => {
    await this._metodos.update({ ...gols }, { where: { id } });
    return id;
  };
}

export default Matchs;
