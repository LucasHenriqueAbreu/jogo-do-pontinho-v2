import Position from "../domain/game/entities/Position";
import PositionAreEquals from "../domain/game/entities/PositionAreEquals";
import PositionAreOutOfTheBoard from "../domain/game/entities/PositionAreOutOfTheBoard";
import PositionsAreAround from "../domain/game/entities/PositionsAreAround";
import GameRepository from "../domain/game/repository/GameRepository";

type Input = {
  originPosition: Position;
  destinyPosition: Position;
  gameId: number;
}

class ExecuteAMove {
  private _gameRepository: GameRepository;

  constructor(gameRepository: GameRepository) {
    this._gameRepository = gameRepository;
  }

  public async execute(input: Input): Promise<void> {
    const game = await this._gameRepository.findById(input.gameId);
    if (PositionAreEquals.execute({ positionOne: input.originPosition, positionTwo: input.destinyPosition })) {
      throw new Error(`Origin and destiny position cant't be equal`);
    }

    if (PositionAreOutOfTheBoard.execute({ position: input.destinyPosition, board: this }) ||
      PositionAreOutOfTheBoard.execute({ position: input.originPosition, board: this })) {
      throw new Error('Points must be inside of the board');
    }

    if (!PositionsAreAround.execute({ input.originPosition, input.destinyPosition, board: this })) {
      throw new Error('Point must be around');
    }

    this._getPoint(input.originPosition).addMark(new Mark(ownerId, MarkType.ORIGIN));
    this._getPoint(destinyPosition).addMark(new Mark(ownerId, MarkType.DESTINY));
  }
}

export default ExecuteAMove;