class Position {
  private _columnIndex: number;
  private _rowIndex: number;

  constructor(columnIndex: number, rowIndex: number) {
    this._columnIndex = columnIndex;
    this._rowIndex = rowIndex;
  }

  get columnIndex(): number {
    return this._columnIndex;
  }

  get rowIndex(): number {
    return this._rowIndex;
  }

  public equal(position: Position): boolean {
    return position.columnIndex === this._columnIndex &&
      position.rowIndex === this._rowIndex;
  }
}

export default Position;