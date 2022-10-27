import { Controller, Get } from '@nestjs/common';
import { GameService } from './game.service';

interface GetKillsDto {
  kills: number;
}

interface GetKillersDto {
  killers: string[];
}

interface GetTypeOfDeathsDto {
  deathsBy: string[];
}

@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}
  @Get('kills')
  getKills(): GetKillsDto {
    return this.gameService.getTotalKills();
  }

  @Get('killers')
  getKillers(): GetKillersDto {
    return this.gameService.getAllKillers();
  }

  @Get('deaths')
  getTypeOfDeaths(): GetTypeOfDeathsDto {
    return this.gameService.getAllTypeOfDeaths();
  }
}
