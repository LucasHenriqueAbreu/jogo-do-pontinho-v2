import Board from "../../../src/domain/game/entities/Board";
import Position from "../../../src/domain/game/entities/Position";
import PositionsAreAround from "../../../src/domain/game/entities/PositionsAreAround";

describe('PositionsAreAround: Must be possible know if some position is around of another', () => {
  it('Case 1: Position is around', () => {
    const originPosition = new Position(1, 1);
    const destinyPosition = new Position(1, 0);
    const board = new Board(1, 10, 10);
    const result = PositionsAreAround.execute({ originPosition, destinyPosition, board });
    expect(result).toBeTruthy();
  });

  it('Case 2: Position is not around', () => {
    const originPosition = new Position(1, 1);
    const destinyPosition = new Position(4, 4);
    const board = new Board(1, 10, 10);
    const result = PositionsAreAround.execute({ originPosition, destinyPosition, board });
    expect(result).toBeFalsy();
  });

  it('Case 3: Position is not around', () => {
    const originPosition = new Position(1, 1);
    const destinyPosition = new Position(0, 0);
    const board = new Board(1, 10, 10);
    const result = PositionsAreAround.execute({ originPosition, destinyPosition, board });
    expect(result).toBeFalsy();
  });

  it('Case 4: Position is not around', () => {
    const originPosition = new Position(1, 1);
    const destinyPosition = new Position(2, 2);
    const board = new Board(1, 10, 10);
    const result = PositionsAreAround.execute({ originPosition, destinyPosition, board });
    expect(result).toBeFalsy();
  });

  it('Case 5: Position is around', () => {
    const originPosition = new Position(1, 1);
    const destinyPosition = new Position(1, 0);
    const board = new Board(1, 10, 10);
    const result = PositionsAreAround.execute({ originPosition, destinyPosition, board });
    expect(result).toBeTruthy();
  });

  it('Case 6: Position is around', () => {
    const originPosition = new Position(1, 1);
    const destinyPosition = new Position(0, 1);
    const board = new Board(1, 10, 10);
    const result = PositionsAreAround.execute({ originPosition, destinyPosition, board });
    expect(result).toBeTruthy();
  });

  it('Case 7: Position is around', () => {
    const originPosition = new Position(1, 1);
    const destinyPosition = new Position(1, 2);
    const board = new Board(1, 10, 10);
    const result = PositionsAreAround.execute({ originPosition, destinyPosition, board });
    expect(result).toBeTruthy();
  });

  it('Case 8: Position is around', () => {
    const originPosition = new Position(1, 1);
    const destinyPosition = new Position(2, 1);
    const board = new Board(1, 10, 10);
    const result = PositionsAreAround.execute({ originPosition, destinyPosition, board });
    expect(result).toBeTruthy();
  });

  it('Case 9: Positionis not around', () => {
    const originPosition = new Position(0, 2);
    const destinyPosition = new Position(2, 2);
    const board = new Board(1, 10, 10);
    const result = PositionsAreAround.execute({ originPosition, destinyPosition, board });
    expect(result).toBeFalsy();
  });

});