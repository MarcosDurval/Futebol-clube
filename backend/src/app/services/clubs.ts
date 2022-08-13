import ModelClubs from '../repositories/clubs';

class Clubs {
  private ModelClub = new ModelClubs();

  public findAll = async () => this.ModelClub.findAll();

  public findId = async (id:number) => this.ModelClub.findId(id);
}

export default Clubs;
