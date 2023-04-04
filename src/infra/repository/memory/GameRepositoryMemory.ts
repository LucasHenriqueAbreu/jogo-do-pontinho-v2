import Game from "../../../domain/game/entities/Game";
import GameRepository from "../../../domain/game/repository/GameRepository";

export class GameRepositoryMemory implements GameRepository {

  private _games: Game[] = [];

  async findById(id: number): Promise<Game | undefined> {
    return this._games.find((game) => game.id === id);
  }

  async save(game: Game): Promise<void> {
    this._games.push(game);
  }

  async update(id: number, game: Partial<Game>): Promise<void> {
    let gameToUpdate = await this.findById(id);
    if (!gameToUpdate) {
      throw new Error('Game not found');
    }
    // apenas aqui para testes
    gameToUpdate = game as Game;
  }
}
