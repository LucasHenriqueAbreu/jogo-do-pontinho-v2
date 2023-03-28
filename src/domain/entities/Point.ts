class Point {
  private _ownerId?: number;

  constructor() { }

  get ownerId(): number | undefined {
    return this._ownerId;
  }

  setOwnerId(newValue: number) {
    if (this._ownerId) {
      throw new Error('This position already has an owner')
    }
    this._ownerId = newValue;
  }
}

export default Point;