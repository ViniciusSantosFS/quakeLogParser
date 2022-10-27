import { Controller, Get } from '@nestjs/common';
import { GetKillersDto, GetKillsDto, GetTypeOfDeathsDto } from './game.dto';
import { GameService } from './game.service';

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
