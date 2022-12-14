import { ICreateMatchDTO } from '../../../interface/matchs';

class ValidMatch {
  private _time1:number;

  private _time2:number;

  constructor({ homeTeam, awayTeam }:ICreateMatchDTO) {
    this._time1 = homeTeam;
    this._time2 = awayTeam;
    this.validTime();
  }

  private validTime = () => {
    if (this._time1 === this._time2) {
      throw new Error('It is not possible to create a match with two equal teams/Unauthorized');
    }
  };
}

export default ValidMatch;
