import { Injectable } from '@nestjs/common';

@Injectable()
export class GameRepository {
  totalKills = 0;
  killers = [];
  typeofDeaths = [];

  addTypeOfDeath(line: string) {
    const reversedString = line.split('').reverse().join().replace(/,/g, '');
    const [typeOfDeath] = reversedString.split(' ');

    this.typeofDeaths.push(typeOfDeath);
  }

  addKillers(line: string) {
    const [killer] = line.split('by');
    this.killers.push(killer);
  }

  addKills() {
    this.totalKills += 1;
  }

  getKills() {
    return this.totalKills;
  }

  getKillers() {
    return this.killers;
  }

  getTypesOfDeaths() {
    return this.typeofDeaths;
  }
}
