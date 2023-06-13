class Player {
  private _id: number;
  private _name: string;
  // TODO: maybe this shold be a value object 
  private _color: string;

  constructor(id: number, name: string, color: string) {
    this._id = id;
    this._name = name;
    this._color = color;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get color(): string {
    return this._color;
  }
}

export default Player;