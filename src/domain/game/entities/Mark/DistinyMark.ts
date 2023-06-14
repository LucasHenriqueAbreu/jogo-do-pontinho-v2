import Position from "../Position";
import Mark from "./Mark";

export default class DistinyMark extends Mark {
  private _origin: Position;

  constructor(ownerId: number, origin: Position) {
    super(ownerId);
    this._origin = origin;
  }

  get origin(): Position {
    return this._origin;
  }

  public isMyOrigin(position: Position): boolean {
    return this._origin.equal(position);
  }
}