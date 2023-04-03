import Position from "../domain/game/entities/Position";
import PositionAreEquals from "../domain/game/entities/PositionAreEquals";
import PositionAreOutOfTheBoard from "../domain/game/entities/PositionAreOutOfTheBoard";
import PositionsAreAround from "../domain/game/entities/PositionsAreAround";
import BoardRepository from "../domain/game/repository/BoardRepository";
import GameRepository from "../domain/game/repository/GameRepository";

type Input = {
  originPosition: { columnIndex: number, rowIndex: number };
  destinyPosition: { columnIndex: number, rowIndex: number };
  gameId: number;
  ownerId: number;
}

class ExecuteAmove {
  private _gameRepository: GameRepository;
  private _boardRepository: BoardRepository;

  constructor(gameRepository: GameRepository, boardRepository: BoardRepository) {
    this._gameRepository = gameRepository;
    this._boardRepository = boardRepository;
  }

  public async execute(input: Input): Promise<void> {
    const game = await this._gameRepository.findById(input.gameId);
    if (!game) {
      throw new Error('Game not found');
    }
    const originPosition = new Position(input.originPosition.columnIndex, input.originPosition.rowIndex);
    const destinyPosition = new Position(input.destinyPosition.columnIndex, input.destinyPosition.rowIndex);
    if (PositionAreEquals.execute({ positionOne: originPosition, positionTwo: destinyPosition })) {
      throw new Error(`Origin and destiny position cant't be equal`);
    }

    if (PositionAreOutOfTheBoard.execute({ position: destinyPosition, board: game.board }) ||
      PositionAreOutOfTheBoard.execute({ position: originPosition, board: game.board })) {
      throw new Error('Points must be inside of the board');
    }

    // TODO: improve parameter passing
    if (!PositionsAreAround.execute({originPosition, destinyPosition, board: game.board})) {
      throw new Error('Point must be around');
    }
    game.createAmove(originPosition, input.ownerId, destinyPosition);
    // TODO: remove !
    await this._gameRepository.update(game.id!, game);
    await this._boardRepository.update(game.board.id!, game.board);
    //atualizar game/tabuleiro
  }
}

export default ExecuteAmove;