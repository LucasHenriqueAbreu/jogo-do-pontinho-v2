import Position from "./Position";

class Score {
  private _id?: number;
  private _positions: Position[];
  private _ownerId: number;

  constructor(positions: Position[], ownerId: number, id?: number) {
    this._id = id;
    this._positions = positions;
    this._ownerId = ownerId;
  }
}

export default Score;