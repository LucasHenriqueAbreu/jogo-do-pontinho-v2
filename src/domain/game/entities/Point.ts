import StackCollection from "../../util/StackCollection";
import Mark from "./Mark";

class Point {
  private _marks: StackCollection<Mark>;

  constructor() {
    this._marks = new StackCollection<Mark>(4);
  }

  public addMark(mark: Mark): void {
    this._marks.push(mark);
  }

  get marks(): StackCollection<Mark> {
    return this._marks;
  }
  
}

export default Point;