import { Injectable } from '@nestjs/common';
import { Game } from './game.entity';
import * as fs from 'fs';

const LINE_HAS_HYPHENS = /(-)\1+/;
const LINE_COMMAND = /^.{0,7}([a-z A-Z][^:]*)/;

@Injectable()
export class GameRepository {
  private logPath = `${__dirname}/../games.log`;
  private games = [];

  constructor() {
    this.readFile();
  }

  readFile() {
    const lines = fs.readFileSync(this.logPath).toString().split('\n');

    return this.parseLines(lines);
  }

  parseLines(lines: string[]) {
    let gameLog = [];
    const lastLine = lines.length;

    for (let i = 0; i < lastLine; i++) {
      const command = lines[i].match(LINE_COMMAND);
      const stringIsClean = lines[i].search(LINE_HAS_HYPHENS) === -1;

      if (command && stringIsClean) {
        const currentCommand = command[1];

        const gameStarted = currentCommand === 'InitGame';
        const gameEnded = currentCommand === 'ShutdownGame';

        if (gameStarted) gameLog = [];
        gameLog.push(command);

        if (gameEnded) {
          const game = new Game(gameLog);
          this.games.push(game.getGame());
        }
      }
    }
  }

  getGames() {
    return this.games;
  }
}
