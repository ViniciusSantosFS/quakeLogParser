import { ApiProperty } from '@nestjs/swagger';

export class RankingDto {
  @ApiProperty()
  players: string[];

  @ApiProperty()
  scores: { [key: string]: number };

  constructor({ players, scores }) {
    this.players = players;
    this.scores = scores;
  }
}
