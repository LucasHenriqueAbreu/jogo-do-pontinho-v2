import Position from "./Position";

type Input = {
  positionOne: Position,
  positionTwo: Position
}

class PositionAreEquals {
  public static execute(input: Input) {
    return input.positionOne.columnIndex === input.positionTwo.columnIndex &&
      input.positionOne.rowIndex === input.positionTwo.rowIndex;
  }
}

export default PositionAreEquals;