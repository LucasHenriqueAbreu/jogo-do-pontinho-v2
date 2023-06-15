
import OriginMark from "../../../src/domain/game/entities/OriginMark";
import Point from "../../../src/domain/game/entities/Point";
import Position from "../../../src/domain/game/entities/Position";


describe('Point', () => {
  it('Must create a Point with success', () => {
    const point = new Point();
    expect(point).toBeInstanceOf(Point);
  });

  it('Must be possible add new marks in a point', () => {
    const point = new Point();
    expect(() => point.addMark(new OriginMark(1, new Position(0, 0)))).not.toThrowError();
  });

  it('Must couse an exception if try add new mark out of limit (4)', () => {
    const point = new Point();
    point.addMark(new OriginMark(1, new Position(0, 0)));
    point.addMark(new OriginMark(2, new Position(0, 0)));
    point.addMark(new OriginMark(3, new Position(0, 0)));
    point.addMark(new OriginMark(4, new Position(0, 0)));
    expect(() => point.addMark(new OriginMark(5, new Position(0, 0)))).toThrowError('Stack has reached max capacity, you cannot add more items');
  });
});