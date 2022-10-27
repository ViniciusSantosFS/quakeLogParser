import { Controller, Get } from '@nestjs/common';
import { GameService } from './game.service';

@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}
  @Get('games')
  getKills(): any {
    return this.gameService.getGames();
  }
}
