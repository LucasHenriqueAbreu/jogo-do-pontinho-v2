import Board from "../../../domain/game/entities/Board";
import BoardRepository from "../../../domain/game/repository/BoardRepository";

export class BoardRepositoryMemory implements BoardRepository {

  private _games: Board[] = [];

  async findById(id: number): Promise<Board | undefined> {
    return this._games.find((game) => game.id === id);
  }

  async save(game: Board): Promise<void> {
    this._games.push(game);
  }

  async update(id: number, game: Partial<Board>): Promise<void> {
    let gameToUpdate = await this.findById(id);
    if (!gameToUpdate) {
      throw new Error('Board not found');
    }
    // apenas aqui para testes
    gameToUpdate = game as Board;
  }
}
