import Position from "../../../src/domain/game/entities/Position";
import PositionAreEquals from "../../../src/domain/game/entities/PositionAreEquals";

describe('PositionAreEquals', () => {
  it('Must be result false when the positions are different', () => {
    expect(PositionAreEquals.execute({ positionOne: new Position(0, 0), positionTwo: new Position(1, 1) })).toBeFalsy();
  });

  it('Must be result true when the positions are different', () => {
    expect(PositionAreEquals.execute({ positionOne: new Position(0, 0), positionTwo: new Position(0, 0) })).toBeTruthy();
  });
});