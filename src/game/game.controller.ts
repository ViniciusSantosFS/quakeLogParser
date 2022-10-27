import { Controller, Get, Param } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}
  @Get()
  getGames(): any {
    return this.gameService.findAll();
  }

  @Get(':id')
  getGame(@Param() params: { id: string }): any {
    const { id } = params;
    return this.gameService.getBy(parseInt(id));
  }

  @Get('rankings')
  getRanking(): any {
    return this.gameService.getRankings();
  }
}
