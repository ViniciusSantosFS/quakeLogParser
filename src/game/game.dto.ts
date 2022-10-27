export class GameDto {
  totalKills: number;
  kills: object;
  amountKillsReasons: object;

  constructor({ totalKills, amountKillsReasons, kills }) {
    this.totalKills = totalKills;
    this.amountKillsReasons = amountKillsReasons;
    this.kills = kills;
  }
}
