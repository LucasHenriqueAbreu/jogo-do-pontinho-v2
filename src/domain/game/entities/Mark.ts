export enum MarkType {
  ORIGIN,
  DESTINY
}

class Mark {
  private _ownerId: number;
  private _type: MarkType;

  constructor(ownerId: number, type: MarkType) {
    this._ownerId = ownerId;
    this._type = type;
  }

  get ownerId(): number {
    return this._ownerId;
  }
}

export default Mark;