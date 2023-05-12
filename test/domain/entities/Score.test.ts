import Position from "../../../src/domain/game/entities/Position";
import Score from "../../../src/domain/game/entities/Score";

describe('Score test', () => {
  it('Should be possible to create a new instance of a Score', () => {
    const positions = [
      new Position(0, 0),
      new Position(0, 1),
      new Position(1, 0),
      new Position(1, 1),
    ]
    const score = new Score(positions, 1, 1);
    expect(score).toBeInstanceOf(Score);
  });
});