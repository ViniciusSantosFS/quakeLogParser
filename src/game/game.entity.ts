import { GameDto } from './game.dto';
import { RankingDto } from 'src/player/ranking.dto';

const PLAYER_NAME = /ClientUserinfoChanged: [0-9]* n\\(.*)\\t\\[0-9]+\\model/;
const FIGHTERS_NAME = /Kill: [0-9 ]*: (.*) killed (.*) by/;

export class Game {
  private totalKills: number;
  private players: string[];
  private scores: Map<string, number>;
  private amountKillsReasons: Map<string, number>;

  constructor(gameLog = []) {
    this.totalKills = 0;
    this.players = [];
    this.scores = new Map<string, number>();
    this.amountKillsReasons = new Map<string, number>();

    this.create(gameLog);
  }

  create(file) {
    file.forEach((line) => {
      const currentCommand = line[1];
      const currentLine = line.input;

      this.handleCommand(currentCommand, currentLine);
    });
  }

  handleCommand(command: string, line: string) {
    if (command === 'ClientUserinfoChanged') {
      this.addPlayer(line);
    }

    if (command == 'Kill') this.handleKill(line);
  }

  addPlayer(line: string) {
    const playerName = line.match(PLAYER_NAME)[1];

    const havePlayer = this.players.find((player) => player === playerName);

    if (!havePlayer) {
      this.players.push(playerName);
      this.scores.set(playerName, 0);
    }
  }

  handleKill(line: string): void {
    const fighters = line.match(FIGHTERS_NAME);

    if (fighters) {
      this.totalKills += 1;
      this.countKillReasons(fighters);

      if (fighters[1] === '<world>') {
        const playerKills = this.scores.get(fighters[2]);
        this.scores.set(fighters[2], playerKills - 1);
      }

      if (fighters[1] !== fighters[2]) {
        const playerKills = this.scores.get(fighters[1]);
        this.scores.set(fighters[1], playerKills + 1);
      }
    }
  }

  countKillReasons(fighters: RegExpMatchArray) {
    const reason = this.getKillReason(fighters.input);
    const killReason = this.amountKillsReasons.get(reason);
    const convertToNumber = isNaN(killReason) ? 0 : killReason + 1;

    this.amountKillsReasons.set(reason, convertToNumber);
  }

  getKillReason(fightersInput: string) {
    return fightersInput
      .split('')
      .reverse()
      .join('')
      .replace(/','/g, '')
      .split(' ')[0];
  }

  getRanking() {
    return new RankingDto({
      players: this.players,
      scores: Object.fromEntries(this.scores),
    });
  }

  getGame() {
    return new GameDto({
      totalKills: this.totalKills,
      amountKillsReasons: Object.fromEntries(this.amountKillsReasons),
      kills: 0,
    });
  }
}
