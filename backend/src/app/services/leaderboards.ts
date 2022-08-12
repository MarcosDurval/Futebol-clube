import ModelLeaderboards from '../repositories/leaderboards';
import { IMatchsDTO } from '../../interface/matchs';
import ILeaderboardsDTO from '../../interface/leaderboards';

class Leaderboards {
  private _metodos = new ModelLeaderboards();

  private listTime:ILeaderboardsDTO;

  private _homeClub:boolean;

  private _awayClub:boolean;

  init = () => {
    this.listTime = {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
  };

  visitTeam = (match:IMatchsDTO) => {
    if (this.listTime.name === match.awayClub.clubName) {
      this.pointsGameHome(match, 'awayTeamGoals', 'homeTeamGoals');
      if (this.listTime.name === match.awayClub.clubName) {
        this.listTime.goalsFavor += match.awayTeamGoals;
        this.listTime.goalsOwn += match.homeTeamGoals;
        this.listTime.totalGames += 1;
      }
    }
  };

  homeTeam = (match:IMatchsDTO) => {
    if (this.listTime.name === match.homeClub.clubName) {
      this.pointsGameHome(match, 'homeTeamGoals', 'awayTeamGoals');
      this.listTime.goalsFavor += match.homeTeamGoals;
      this.listTime.goalsOwn += match.awayTeamGoals;
      this.listTime.totalGames += 1;
    }
  };

  pointsGameHome = (match:IMatchsDTO, clubA:string, clubB:string) => {
    if (match[clubA] > match[clubB]) {
      this.listTime.totalVictories += 1;
      this.listTime.totalPoints += 3;
    } else if (match[clubA] < match[clubB]) {
      this.listTime.totalLosses += 1;
    } else {
      this.listTime.totalPoints += 1;
      this.listTime.totalDraws += 1;
    }
  };

  mate = () => {
    this.listTime.efficiency = (this.listTime.totalPoints / (this.listTime.totalGames * 3)) * 100;
    this.listTime.efficiency = Math.round(this.listTime.efficiency * 100) / 100;
    this.listTime.goalsBalance = this.listTime.goalsFavor - this.listTime.goalsOwn;
  };

  orderTimes = (times:ILeaderboardsDTO[]) => {
    times.sort((a, b) => {
      if (b.totalPoints - a.totalPoints === 0) {
        if (b.totalVictories - a.totalVictories === 0) {
          if (b.goalsBalance - a.goalsBalance === 0) {
            if (b.goalsFavor - a.goalsFavor === 0) {
              return b.goalsOwn - a.goalsOwn;
            }
            return b.goalsFavor - a.goalsFavor;
          }
          return b.goalsBalance - a.goalsBalance;
        }
        return b.totalVictories - a.totalVictories;
      }
      return b.totalPoints - a.totalPoints;
    });
  };

  findAll = async (homeClub = true, awayClub = true) => {
    this._homeClub = homeClub;
    this._awayClub = awayClub;
    const matchs = await this._metodos.findAll();
    const times = await this._metodos.findAllClubs();
    const resultTimes = times.map((time) => {
      this.init();
      this.listTime.name = time.clubName;
      matchs.forEach((match) => {
        if (this._homeClub) this.homeTeam(match);
        if (this._awayClub) this.visitTeam(match);
      });
      this.mate();
      return { ...this.listTime };
    });
    this.orderTimes(resultTimes);
    return resultTimes;
  };
}

export default Leaderboards;
