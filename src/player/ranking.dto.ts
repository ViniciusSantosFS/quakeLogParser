export class RankingDto {
  players: string[];
  scores: object;

  constructor({ players, scores }) {
    this.players = players;
    this.scores = scores;
  }
}
