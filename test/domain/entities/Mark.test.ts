import DistinyMark from "../../../src/domain/game/entities/DistinyMark";
import OriginMark from "../../../src/domain/game/entities/Mark/OriginMark";
import Position from "../../../src/domain/game/entities/Position";


describe('Mark', () => {
  it('Must create a DistinyMark with success', () => {
    const origin = new Position(0, 0);
    const mark = new DistinyMark(1, origin);
    expect(mark).toBeInstanceOf(DistinyMark);
  });

  it('Must create a OriginMark with success', () => {
    const distiy = new Position(0, 0);
    const mark = new OriginMark(1, distiy);
    expect(mark).toBeInstanceOf(OriginMark);
  });

  it('It must be possible to check whether a OriginMark has a destination in a specific DisinyMark', () => {
    const origin = new Position(0, 0);
    const mark = new OriginMark(1, origin);
    expect(mark.isMyDistiny(origin)).toBeTruthy();
  });

  it('It must be possible to check whether a Distiny has a destination in a specific OriginMark', () => {
    const distiny = new Position(0, 0);
    const mark = new DistinyMark(1, distiny);
    expect(mark.isMyOrigin(distiny)).toBeTruthy();
  });
});