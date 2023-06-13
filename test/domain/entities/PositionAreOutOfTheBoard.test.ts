import Board from "../../../src/domain/game/entities/Board";
import Position from "../../../src/domain/game/entities/Position";
import PositionAreOutOfTheBoard from "../../../src/domain/game/entities/PositionAreOutOfTheBoard";

describe('PositionAreOutOfTheBoard: Must be possible know if positions is out of the board', () => {
  it('Case 1: Position is in the board', () => {
    const position = new Position(0, 0);
    const board = new Board(1, 10, 10);
    const result = PositionAreOutOfTheBoard.execute({ position, board });
    expect(result).toBeFalsy();
  });

  it('Case 2: Position is not in the board', () => {
    const position = new Position(-1, 0);
    const board = new Board(1, 10, 10);
    const result = PositionAreOutOfTheBoard.execute({ position, board });
    expect(result).toBeTruthy();
  });

  it('Case 3: Position is not in the board', () => {
    const position = new Position(0, 10);
    const board = new Board(1, 10, 10);
    const result = PositionAreOutOfTheBoard.execute({ position, board });
    expect(result).toBeTruthy();
  });

  it('Case 4: Position is not in the board', () => {
    const position = new Position(10, 10);
    const board = new Board(1, 10, 10);
    const result = PositionAreOutOfTheBoard.execute({ position, board });
    expect(result).toBeTruthy();
  });

  it('Case 5: Position is not in the board', () => {
    const position = new Position(10, 0);
    const board = new Board(1, 10, 10);
    const result = PositionAreOutOfTheBoard.execute({ position, board });
    expect(result).toBeTruthy();
  });

  it('Case 6: Position is not in the board', () => {
    const position = new Position(9, -1);
    const board = new Board(1, 10, 10);
    const result = PositionAreOutOfTheBoard.execute({ position, board });
    expect(result).toBeTruthy();
  });

  it('Case 7: Position is not in the board', () => {
    const position = new Position(4, 3);
    const board = new Board(1, 4, 4);
    const result = PositionAreOutOfTheBoard.execute({ position, board });
    expect(result).toBeTruthy();
  });
});