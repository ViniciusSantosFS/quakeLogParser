import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameRepository } from './game.repository';
import { GameService } from './game.service';
@Module({
  imports: [],
  controllers: [GameController],
  providers: [GameService, GameRepository],
})
export class GameModule {}
