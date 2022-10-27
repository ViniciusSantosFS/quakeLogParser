export class GameDto {
  totalKills: number;
  players: string[];
  kills: object;

  constructor({ totalKills, players, kills }) {
    this.totalKills = totalKills;
    this.players = players;
    this.kills = kills;
  }
}
