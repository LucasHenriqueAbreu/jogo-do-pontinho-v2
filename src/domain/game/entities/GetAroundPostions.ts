import Board from "./Board";
import Position from "./Position";

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
class GetAroundPostions {
  public static execute(input: Input): OutPut {
    const outPut: OutPut = {};
    const rowTopIndex = input.position.rowIndex - 1;
    const columnPreviousIndex = input.position.columnIndex - 1;
    const rowBottomIndex = input.position.rowIndex + 1;
    const columnNextIndex = input.position.columnIndex + 1;
    if (rowTopIndex >= 0) {
      outPut.top = new Position(input.position.columnIndex, rowTopIndex);
    }
    if (columnPreviousIndex >= 0) {
      outPut.previous = new Position(columnPreviousIndex, input.position.rowIndex);
    }
    if (rowBottomIndex <= input.board.value.length - 1) {
      outPut.bottom = new Position(input.position.columnIndex, rowBottomIndex);
    }
    if (rowBottomIndex <= input.board.value[0].length - 1) {
      outPut.next = new Position(columnNextIndex, input.position.rowIndex);
    }
    return outPut;
  }
}

export default GetAroundPostions;