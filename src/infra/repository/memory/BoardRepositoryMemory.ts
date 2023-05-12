import Board from "../../../domain/game/entities/Board";
import BoardRepository from "../../../domain/game/repository/BoardRepository";

export class BoardRepositoryMemory implements BoardRepository {

  private _boards: Board[] = [];

  async findById(id: number): Promise<Board | undefined> {
    return this._boards.find((game) => game.id === id);
  }

  async save(board: Board): Promise<void> {
    this._boards.push(board);
  }

  async update(id: number, board: Partial<Board>): Promise<void> {
    let boardToUpdate = await this.findById(id);
    if (!boardToUpdate) {
      throw new Error('Board not found');
    }
    // apenas aqui para testes
    boardToUpdate = board as Board;
  }
}
