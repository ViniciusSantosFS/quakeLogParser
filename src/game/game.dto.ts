export class GameDto {
  totalKills: number;
  players: string[];
  kills: object;
  amountKillsReasons: object;

  constructor({ totalKills, players, amountKillsReasons, kills }) {
    this.totalKills = totalKills;
    this.players = players;
    this.amountKillsReasons = amountKillsReasons;
    this.kills = kills;
  }
}
