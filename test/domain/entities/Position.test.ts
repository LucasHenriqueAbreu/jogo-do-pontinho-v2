import Position from "../../../src/domain/game/entities/Position";

describe('Position', () => {
  it('Must be possible create a new instance of Position', () => {
    const position = new Position(0, 0);
    expect(position).toBeInstanceOf(Position);
  });
});