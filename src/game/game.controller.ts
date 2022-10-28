import { Controller, Get, Param } from '@nestjs/common';
import { GameService } from './game.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GameDto } from './game.dto';
import { RankingDto } from 'src/player/ranking.dto';

@ApiTags('games')
@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}
  @Get('rankings')
  @ApiOkResponse({ type: [RankingDto] })
  getRanking(): RankingDto[] {
    return this.gameService.getRankings();
  }

  @Get()
  @ApiOkResponse({ type: [GameDto] })
  getGames(): GameDto[] {
    return this.gameService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: GameDto })
  getGame(@Param() params: { id: string }): GameDto {
    const { id } = params;
    return this.gameService.getBy(parseInt(id));
  }
}
