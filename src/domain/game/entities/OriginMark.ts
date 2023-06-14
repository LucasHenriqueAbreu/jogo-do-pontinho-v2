import Position from "../Position";
import Mark from "./Mark";

export default class OriginMark extends Mark {
  private _distiny: Position;

  constructor(ownerId: number, distiny: Position) {
    super(ownerId);
    this._distiny = distiny;
  }

  get distiny(): Position {
    return this._distiny;
  }

  public isMyDistiny(position: Position): boolean {
    return this._distiny.equal(position);
  }
}