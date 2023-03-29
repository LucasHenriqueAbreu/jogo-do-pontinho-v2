import Mark, { MarkType } from "../../../src/domain/game/entities/Mark";


describe('Mark', () => {
  it('Must create a Mark with success', () => {
    const mark = new Mark(1, MarkType.DESTINY);
    expect(mark).toBeInstanceOf(Mark);
  });
});