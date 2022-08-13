import ModelMatchs from '../../database/models/matchs';
import associate from './utils/associate';
import { ICreateMatchDTO, Gols, IMatchsDTO } from '../../interface/matchs';

interface ICreateMatchWithIdDTO extends ICreateMatchDTO{
  id:number
}

class Matchs {
  private _metodos = ModelMatchs;

  findAll = async (): Promise<IMatchsDTO[]> => {
    const result = await this._metodos.findAll(
      { raw: true,
        include: associate,
        nest: true,
      },
    );

    const allClubs = result as unknown as IMatchsDTO[];
    return allClubs;
  };

  findSearch = async (progress: boolean): Promise<IMatchsDTO[]> => {
    const result = await this._metodos.findAll({
      where: { inProgress: progress },
      include: associate,
      raw: true,
      nest: true,
    });
    const allClubs = result as unknown as IMatchsDTO[];
    return allClubs;
  };

  create = async (match:ICreateMatchDTO):Promise<ICreateMatchWithIdDTO> => {
    const result = await this._metodos.create(match, { raw: true });
    const createMatch = result as unknown as ICreateMatchWithIdDTO;
    return createMatch;
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
