import Board from "./Board";
import GetAroundPositions from "./GetAroundPositions";
import Position from "./Position";
import PositionAreEquals from "./PositionAreEquals";

type Input = {
  originPosition: Position,
  destinyPosition: Position,
  board: Board
}

class PositionsAreAround {
  public static execute(input: Input): boolean {
    const result = GetAroundPositions.execute({ position: input.originPosition, board: input.board });
    return result.bottom !== null && PositionAreEquals.execute({ positionOne: input.destinyPosition, positionTwo: result.bottom! })
      || result.top !== null && PositionAreEquals.execute({ positionOne: input.destinyPosition, positionTwo: result.top! })
      || result.next !== null && PositionAreEquals.execute({ positionOne: input.destinyPosition, positionTwo: result.next! })
      || result.previous !== null && PositionAreEquals.execute({ positionOne: input.destinyPosition, positionTwo: result.previous! })
  }
}

export default PositionsAreAround;