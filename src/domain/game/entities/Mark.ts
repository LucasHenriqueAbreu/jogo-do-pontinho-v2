
// TODO: maybe don't need be a abstract class, just using target;
abstract class Mark {
  private _ownerId: number;

  constructor(ownerId: number) {
    this._ownerId = ownerId;
  }

  get ownerId(): number {
    return this._ownerId;
  }
}

export default Mark;