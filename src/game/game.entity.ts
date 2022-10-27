import { GameDto } from './game.dto';

const PLAYER_NAME = /ClientUserinfoChanged: [0-9]* n\\(.*)\\t\\[0-9]+\\model/;
const FIGHTERS_NAME = /Kill: [0-9 ]*: (.*) killed (.*) by/;

export class Game {
  private totalKills: number;
  private players: string[];
  private kills: Map<string, number>;

  constructor(gameLog = []) {
    this.totalKills = 0;
    this.players = [];
    this.kills = new Map<string, number>();

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
      this.kills.set(playerName, 0);
    }
  }

  handleKill(line: string): void {
    const fighters = line.match(FIGHTERS_NAME);

    if (fighters) {
      this.totalKills += 1;

      if (fighters[1] === '<world>') {
        const playerKills = this.kills.get(fighters[2]);
        this.kills.set(fighters[2], playerKills - 1);
      }

      if (fighters[1] !== fighters[2]) {
        const playerKills = this.kills.get(fighters[1]);

        this.kills.set(fighters[1], playerKills + 1);
      }
    }
  }

  getGame() {
    return new GameDto({
      totalKills: this.totalKills,
      players: this.players,
      kills: Object.fromEntries(this.kills),
    });
  }
}
