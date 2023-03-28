import Position from "./Position";

class PositionAreEquals {
  public static execute(positionOne: Position, positionTwo: Position) {
    return positionOne.columnIndex === positionTwo.columnIndex && positionOne.rowIndex === positionTwo.rowIndex;
  }
}

export default PositionAreEquals;