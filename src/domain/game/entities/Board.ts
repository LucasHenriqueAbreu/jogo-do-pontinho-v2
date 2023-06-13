import Mark, { MarkType } from "./Mark";
import Point from "./Point";
import Position from "./Position";

class Board {
  private _id: number;
  private _columnSize: number;
  private _rowColumn: number;
  private _value: Point[][] = [];

  constructor(id: number, columnSize: number, rowColumn: number) {
    this._id = id;
    this._columnSize = columnSize;
    this._rowColumn = rowColumn;
    this._buildBoardValue();
  }

  get id(): number {
    return this._id;
  }

  public getPoint(position: Position): Point {
    // TODO: create expecifi exceptions
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

  get value(): Point[][] {
    return this._value;
  }

  public setPoints(originPosition: Position, ownerId: number, destinyPosition: Position): void {
    this.getPoint(originPosition).addMark(new Mark(ownerId, MarkType.ORIGIN));
    this.getPoint(destinyPosition).addMark(new Mark(ownerId, MarkType.DESTINY));
  }

}

export default Board;