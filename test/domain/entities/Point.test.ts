import Mark, { MarkType } from "../../../src/domain/game/entities/Mark";
import Point from "../../../src/domain/game/entities/Point";


describe('Point', () => {
  it('Must create a Point with success', () => {
    const point = new Point();
    expect(point).toBeInstanceOf(Point);
  });

  it('Must be possible add new marks in a point', () => {
    const point = new Point();
    expect(() => point.addMark(new Mark(1, MarkType.ORIGIN))).not.toThrowError();
  });

  it('Must couse an exception if try add new mark out of limit (4)', () => {
    const point = new Point();
    point.addMark(new Mark(1, MarkType.ORIGIN));
    point.addMark(new Mark(2, MarkType.ORIGIN));
    point.addMark(new Mark(3, MarkType.ORIGIN));
    point.addMark(new Mark(4, MarkType.ORIGIN));
    expect(() => point.addMark(new Mark(5, MarkType.ORIGIN))).toThrowError('Stack has reached max capacity, you cannot add more items');
  });
});