class Player {
  private _id?: number;
  private _name: string;
  private _color: string;

  constructor(name: string, color: string, id?: number) {
    this._id = id;
    this._name = name;
    this._color = color;
  }

  get id(): number | undefined {
    return this._id;
  }
}

export default Player;