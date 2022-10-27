// import es from 'event-stream';
import { Injectable } from '@nestjs/common';
import { GameRepository } from './game.repository';

@Injectable()
export class GameService {
  constructor(private readonly gameRepository: GameRepository) {}

  getGames() {
    return this.gameRepository.getGames();
  }
}
