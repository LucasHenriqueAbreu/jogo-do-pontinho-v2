import Point from "./Point";
import Position from "./Position";

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
    this._getPoint(originPosition).setOwnerId(ownerId);
    this._getPoint(destinyPosition).setOwnerId(ownerId);
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
  
  get value(): Point[][] {
    return this._value;
  }

}

export default Board;