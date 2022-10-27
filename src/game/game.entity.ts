import { Player } from 'src/player/player.entity';
import { GameDto } from './game.dto';

const FIGHTERS_NAME = /Kill: [0-9 ]*: (.*) killed (.*) by/;

export class Game {
  private totalKills: number;
  private amountKillsReasons: Map<string, number>;
  private kills: Map<string, number>;

  constructor(private readonly player: Player, gameLog = []) {
    this.totalKills = 0;
    this.amountKillsReasons = new Map<string, number>();
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
      this.player.addPlayer(line);
    }

    if (command == 'Kill') {
      this.totalKills += 1;

      const fighters = line.match(FIGHTERS_NAME);

      if (fighters) {
        this.player.handleKill(fighters);
        this.countKillReasons(fighters);
        this.countKillBy(fighters);
      }
    }
  }

  countKillReasons(fighters: RegExpMatchArray) {
    const reason = this.getKillReason(fighters.input);
    const killReason = this.amountKillsReasons.get(reason);

    this.amountKillsReasons.set(reason, this.parseNumber(killReason));
  }

  countKillBy(fighters: RegExpMatchArray): void {
    const playerKills = this.kills.get(fighters[1]);
    this.kills.set(fighters[1], this.parseNumber(playerKills));
  }

  getKillReason(fightersInput: string) {
    return fightersInput
      .split('')
      .reverse()
      .join('')
      .replace(/','/g, '')
      .split(' ')[0];
  }

  parseNumber(value: number | undefined) {
    return isNaN(value) ? 0 : value + 1;
  }

  getGame() {
    return new GameDto({
      totalKills: this.totalKills,
      amountKillsReasons: Object.fromEntries(this.amountKillsReasons),
      kills: Object.fromEntries(this.kills),
    });
  }
}
