import ModelClubs from '../../database/sequelize.models/clubs';
import IClubsCamelDTO from '../../interface/clubs';

class Clubs {
  private _metodos = ModelClubs;

  findAll = async ():Promise<IClubsCamelDTO[]> => {
    const result = await this._metodos.findAll({ raw: true });
    return result as unknown as IClubsCamelDTO[];
  };

  findId = async (id:number):Promise<IClubsCamelDTO | null> => {
    const result = await this._metodos.findByPk(id, { raw: true });
    return result as unknown as IClubsCamelDTO | null;
  };

  findAllIds = async (id1:number, id2:number) => {
    const result = await this._metodos.findAll({ where: { id: [id1, id2] }, raw: true });
    return result as unknown as IClubsCamelDTO[];
  };
}

export default Clubs;
