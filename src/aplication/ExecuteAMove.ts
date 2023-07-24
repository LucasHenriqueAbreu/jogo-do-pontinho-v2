import Board from "../domain/game/entities/Board";
import Position from "../domain/game/entities/Position";
import PositionAreEquals from "../domain/game/entities/PositionAreEquals";
import PositionAreOutOfTheBoard from "../domain/game/entities/PositionAreOutOfTheBoard";
import PositionsAreAround from "../domain/game/entities/PositionsAreAround";
import BoardRepository from "../domain/game/repository/BoardRepository";
import GameRepository from "../domain/game/repository/GameRepository";

// TODO: verify if this is a better way.
type RawPosition = { columnIndex: number, rowIndex: number };

type Input = {
  originPosition: RawPosition;
  destinyPosition: RawPosition;
  gameId: number;
  ownerId: number;
}
// TODO: Create custom errors.
// TODO: We don't need two repositories, just one repository for an aggregate 
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
    const { originPosition, destinyPosition } = this._buildPositions(input.originPosition, input.destinyPosition);
    this._verifyIfPositionsAreEquals(originPosition, destinyPosition);
    this._verifyIfPositionsAreOutOfTheBoard(originPosition, destinyPosition, game.board);
    this._verifyIfPositionsAreAround(originPosition, destinyPosition, game.board)

    game.createAmove(originPosition, input.ownerId, destinyPosition);
    // TODO: change turn player is her, i don't know!
    await this._gameRepository.update(game.id!, game);
    await this._boardRepository.update(game.board.id!, game.board);
    //atualizar game/tabuleiro
  }

  private _buildPositions(originPosition: RawPosition, destinyPosition: RawPosition): { originPosition: Position; destinyPosition: Position; } {
    return {
      originPosition: new Position(originPosition.columnIndex, originPosition.rowIndex),
      destinyPosition: new Position(destinyPosition.columnIndex, destinyPosition.rowIndex),
    }
  }

  private _verifyIfPositionsAreEquals(originPosition: Position, destinyPosition: Position): void {
    if (PositionAreEquals.execute({ positionOne: originPosition, positionTwo: destinyPosition })) {
      throw new Error(`Origin and destiny position cant't be equal`);
    }
  }

  private _verifyIfPositionsAreOutOfTheBoard(originPosition: Position, destinyPosition: Position, board: Board): void {
    if (PositionAreOutOfTheBoard.execute({ position: destinyPosition, board }) ||
      PositionAreOutOfTheBoard.execute({ position: originPosition, board })) {
      throw new Error('Points must be inside of the board');
    }
  }

  private _verifyIfPositionsAreAround(originPosition: Position, destinyPosition: Position, board: Board): void {
    // TODO: improve parameter passing
    if (!PositionsAreAround.execute({ originPosition, destinyPosition, board })) {
      throw new Error('Point must be around');
    }
  }
}


export default ExecuteAmove;