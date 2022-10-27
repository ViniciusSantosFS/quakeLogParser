// import es from 'event-stream';
import { Injectable } from '@nestjs/common';
import { GameRepository } from './game.repository';

@Injectable()
export class GameService {
  constructor(private readonly gameRepository: GameRepository) {}

  findAll() {
    return this.gameRepository.getGames();
  }

  getBy(id: number) {
    return this.gameRepository.findOne(id);
  }

  getRankings() {
    return this.gameRepository.getRankings();
  }
}
