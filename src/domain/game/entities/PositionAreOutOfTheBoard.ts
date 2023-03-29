import Board from "./Board";
import Position from "./Position";

type Input = {
  position: Position, board: Board,
}

// TODO: maybe this can be a Factory, using inheritance and polymorphism, i don't know, just an idea.
class PositionAreOutOfTheBoard {
  public static execute(input: Input): boolean {
    const rowIndex = input.position.rowIndex;
    const columnIndex = input.position.columnIndex;
    return rowIndex < 0 ||
      columnIndex < 0 ||
      rowIndex > input.board.value.length - 1 ||
      columnIndex > input.board.value[0].length - 1;
  }
}

export default PositionAreOutOfTheBoard;