export enum MarkType {
  ORIGIN,
  DESTINY
}

class Mark {
  private _ownerId: number;
  private _type: MarkType;

  constructor(ownerId: number, type: MarkType, closeScare: boolean = false) {
    this._ownerId = ownerId;
    this._type = type;
  }

  get ownerId(): number {
    return this._ownerId;
  }

  get type(): MarkType {
    return this._type;
  }
}

export default Mark;