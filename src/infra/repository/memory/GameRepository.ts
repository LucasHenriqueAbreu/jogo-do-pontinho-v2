import Game from "../../../domain/game/entities/Game";
import GameRepository from "../../../domain/game/repository/GameRepository";

class GameRepositoryMemory implements GameRepository {
  
  private _games: Game[] = [];
  
  async findById(id: number): Promise<Game | undefined> {
    return this._games.find((game) => game.id === id);
  }
  
  async save(game: Game): Promise<void> {
    this._games.push(game);
  }

}

export default GameRepositoryMemory;