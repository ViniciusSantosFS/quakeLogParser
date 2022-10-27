import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { GameRepository } from './game.repository';

const GET_LINE_COMMAND = /^.{0,7}([a-z A-Z][^:]*)/;

@Injectable()
export class GameService {
  constructor(private readonly gameRepository: GameRepository) {
    this.readFile();
  }

  readFile() {
    const lines = fs
      .readFileSync(`${__dirname}/../games.log`)
      .toString()
      .split('\n');
    this.parseLines(lines);
  }

  parseLines(lines: string[]) {
    const lastLine = lines.length;

    for (let i = 0; i < lastLine; i++) {
      const command = lines[i].match(GET_LINE_COMMAND);

      if (command) {
        this.checkCommand(command[1], lines[i], i);
      }
    }
  }

  checkCommand(command, line, id) {
    if (command === 'Kill') {
      this.gameRepository.addKills();
      this.gameRepository.addTypeOfDeath(line);
      this.gameRepository.addKillers(line);
    }
  }

  getTotalKills() {
    return { kills: this.gameRepository.getKills() };
  }

  getAllKillers() {
    return { killers: this.gameRepository.getKillers() };
  }

  getAllTypeOfDeaths() {
    return { deathsBy: this.gameRepository.getTypesOfDeaths() };
  }
}
