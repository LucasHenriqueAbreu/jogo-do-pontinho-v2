import GetAroundPostions from "./GetAroundPostions";
import Mark, { MarkType } from "./Mark";
import Point from "./Point";
import Position from "./Position";
import PositionAreEquals from "./PositionAreEquals";

class Board {
  private _columnSize: number;
  private _rowColumn: number;
  private _value: Point[][] = [];

  constructor(columnSize: number, rowColumn: number) {
    this._columnSize = columnSize;
    this._rowColumn = rowColumn;
    this._buildBoardValue();
  }

  executeMove(originPosition: Position, destinyPosition: Position, ownerId: number) {
    if (PositionAreEquals.execute({ positionOne: originPosition, positionTwo: destinyPosition })) {
      throw new Error(`Origin and destiny position cant't be equal`);
    }

    if (this._positionsAreAround(originPosition, destinyPosition)) {
      throw new Error('Point must be around');
    }

    this._getPoint(originPosition).addMark(new Mark(ownerId, MarkType.ORIGIN));
    this._getPoint(destinyPosition).addMark(new Mark(ownerId, MarkType.DESTINY));
  }

  private _getPoint(position: Position): Point {
    const exception = new Error('Invalid position');
    const column = this._value[position.columnIndex];
    if (!column) {
      throw exception;
    }
    const point = column[position.rowIndex];
    if (!point) {
      throw exception;
    }
    return point;
  }

  private _buildBoardValue() {
    for (let i = 0; i < this._rowColumn; i++) {
      let rowValue = []
      for (let j = 0; j < this._columnSize; j++) {
        rowValue.push(new Point());
      }
      this._value.push(rowValue);
    }
  }

  // TODO: that method must be a DomainService
  private _positionsAreAround(originPosition: Position, destinyPosition: Position): boolean {
    const result = GetAroundPostions.execute({ position: originPosition, board: this });

    // return PositionAreEquals.execute(destinyPosition, result.top) ||
    //   PositionAreEquals.execute(destinyPosition, result.bottom) ||
    //   PositionAreEquals.execute(destinyPosition, result.previous) ||
    //   PositionAreEquals.execute(destinyPosition, result.next);
    return false
  }

  get value(): Point[][] {
    return this._value;
  }

}

export default Board;