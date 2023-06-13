import Board from "../../../src/domain/game/entities/Board";
import GetAroundPositions from "../../../src/domain/game/entities/GetAroundPositions";
import Position from "../../../src/domain/game/entities/Position";

describe('Must be possible get around positions', () => {
  it('Case 1: Position have all around positions', () => {
    const position = new Position(1, 1);
    const board = new Board(1, 10, 10);
    const result = GetAroundPositions.execute({ position, board });
    expect(result.top).toEqual(new Position(1, 0));
    expect(result.bottom).toEqual(new Position(1, 2));
    expect(result.previous).toEqual(new Position(0, 1));
    expect(result.next).toEqual(new Position(2, 1));
  });

  it('Case 2: Position have only next and bottom', () => {
    const position = new Position(0, 0);
    const board = new Board(1, 10, 10);
    const result = GetAroundPositions.execute({ position, board });
    expect(result.top).toBeUndefined();
    expect(result.bottom).toEqual(new Position(0, 1));
    expect(result.previous).toBeUndefined();
    expect(result.next).toEqual(new Position(1, 0));
  });

  it('Case 3: Position have only previous and top', () => {
    const position = new Position(3, 3);
    const board = new Board(1, 4, 4);
    const result = GetAroundPositions.execute({ position, board });
    expect(result.top).toEqual(new Position(3, 2));
    expect(result.bottom).toBeUndefined();
    expect(result.previous).toEqual(new Position(2, 3));
    expect(result.next).toBeUndefined();
  });

  it('Case 4: Position out of the borad must causes an exception', () => {
    const position = new Position(4, 4);
    const board = new Board(1, 4, 4);
    expect(() => GetAroundPositions.execute({ position, board })).toThrowError('Position out of the board');
  });
});