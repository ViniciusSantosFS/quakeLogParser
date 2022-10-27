import { RankingDto } from './ranking.dto';

const PLAYER_NAME = /ClientUserinfoChanged: [0-9]* n\\(.*)\\t\\[0-9]+\\model/;

export class Player {
  private players: string[];
  private scores: Map<string, number>;

  constructor() {
    this.players = [];
    this.scores = new Map<string, number>();
  }

  addPlayer(line: string) {
    const playerName = line.match(PLAYER_NAME)[1];

    const havePlayer = this.players.find((player) => player === playerName);

    if (!havePlayer) {
      this.players.push(playerName);
      this.scores.set(playerName, 0);
    }
  }

  handleKill(fighters: RegExpMatchArray): void {
    if (fighters[1] === '<world>') {
      const playerKills = this.scores.get(fighters[2]);
      this.scores.set(fighters[2], playerKills - 1);
    }

    if (fighters[1] !== fighters[2]) {
      const playerKills = this.scores.get(fighters[1]);
      this.scores.set(fighters[1], playerKills + 1);
    }
  }

  getRanking() {
    return new RankingDto({
      players: this.players,
      scores: Object.fromEntries(this.scores),
    });
  }
}
