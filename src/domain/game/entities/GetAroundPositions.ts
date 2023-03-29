import Board from "./Board";
import Position from "./Position";
import PositionAreOutOfTheBoard from "./PositionAreOutOfTheBoard";

type Input = {
  position: Position, board: Board,
}

type OutPut = {
  top?: Position,
  bottom?: Position,
  next?: Position,
  previous?: Position
}
// TODO: maybe this can be a Factory, using inheritance and polymorphism, i don't know, just an idea.
class GetAroundPositions {
  public static execute(input: Input): OutPut {
    if (PositionAreOutOfTheBoard.execute(input)) {
      throw new Error('Position out of the board');
    }
    const outPut: OutPut = {};
    const top = new Position(input.position.columnIndex, input.position.rowIndex - 1);
    const previous = new Position(input.position.columnIndex - 1, input.position.rowIndex);;
    const bottom = new Position(input.position.columnIndex, input.position.rowIndex + 1);
    const next = new Position(input.position.columnIndex + 1, input.position.rowIndex);
    if (!PositionAreOutOfTheBoard.execute({position: top, board: input.board})) {
      outPut.top = top;
    }
    if (!PositionAreOutOfTheBoard.execute({position: previous, board: input.board})) {
      outPut.previous = previous;
    }
    if (!PositionAreOutOfTheBoard.execute({position: bottom, board: input.board})) {
      outPut.bottom = bottom;
    }
    if (!PositionAreOutOfTheBoard.execute({position: next, board: input.board})) {
      outPut.next = next;
    }
    return outPut;
  }
}

export default GetAroundPositions;