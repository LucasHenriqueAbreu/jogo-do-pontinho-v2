import Board from "../../../src/domain/game/entities/Board";
import GetAroundPostions from "../../../src/domain/game/entities/GetAroundPostions";
import Position from "../../../src/domain/game/entities/Position";

describe('Must be possible get around positions', () => {
  it('Case 1: Position have all around positions', () => {
    const position = new Position(1, 1);
    const board = new Board(10, 10);
    const result = GetAroundPostions.execute({ position, board });
    expect(result.top).toEqual(new Position(1, 0));
    expect(result.bottom).toEqual(new Position(1, 2));
    expect(result.previous).toEqual(new Position(0, 1));
    expect(result.next).toEqual(new Position(2, 1));
  });

  it('Case 2: Position have only next and bottom', () => {
    const position = new Position(0, 0);
    const board = new Board(10, 10);
    const result = GetAroundPostions.execute({ position, board });
    expect(result.top).toBeUndefined();
    expect(result.bottom).toEqual(new Position(0, 1));
    expect(result.previous).toBeUndefined();
    expect(result.next).toEqual(new Position(1, 0));
  });

  it('Case 3: Position have only previous and top', () => {
    const position = new Position(4, 4);
    const board = new Board(4, 4);
    const result = GetAroundPostions.execute({ position, board });
    expect(result.top).toEqual(new Position(4, 3));
    expect(result.bottom).toBeUndefined();
    expect(result.previous).toEqual(new Position(3, 4));
    expect(result.next).toBeUndefined();
  });
});