import Board from "../../../src/domain/entities/Board";
import Position from "../../../src/domain/entities/Position";

describe('Board', () => {
  it('Must create a instance of a Board with success', () => {
    const board = new Board(40, 40);
    expect(board).toBeInstanceOf(Board);
  });

  it('Must create a matrix with de dimensions pass in the constructor', () => {
    const board = new Board(40, 40);
    expect(board.value.length).toEqual(40);
    for (let i = 0; i < board.value.length; i++) {
      const row = board.value[i];
      expect(row.length).toEqual(40);
    }
  });

  it('Must be possible for a player to execute a move', () => {
    const board = new Board(4, 4);
    board.executeMove(new Position(0, 0), new Position(0, 1), 1);
    expect(board.value[0][0].ownerId).toEqual(1);
    expect(board.value[0][1].ownerId).toEqual(1);
  });

  describe('Must cause an exception if any position is not valid', () => {
    it('Case 1', () => {
      const board = new Board(4, 4);
      expect(() => board.executeMove(new Position(10, 10), new Position(0, 1), 1)).toThrow('Invalid position');
    });
  });

});