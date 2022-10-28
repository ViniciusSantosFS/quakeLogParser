import { ApiProperty } from '@nestjs/swagger';

export class GameDto {
  @ApiProperty()
  totalKills: number;

  @ApiProperty()
  kills: { [key: string]: number };

  @ApiProperty()
  amountKillsReasons: { [key: string]: number };

  constructor({ totalKills, amountKillsReasons, kills }) {
    this.totalKills = totalKills;
    this.amountKillsReasons = amountKillsReasons;
    this.kills = kills;
  }
}
