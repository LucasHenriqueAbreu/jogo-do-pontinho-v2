import Board from "../../../src/domain/game/entities/Board";

describe('Board', () => {
  it('Must create a instance of a Board with success', () => {
    const board = new Board(1, 40, 40);
    expect(board).toBeInstanceOf(Board);
  });

  it('Must create a matrix with de dimensions pass in the constructor', () => {
    const board = new Board(1, 40, 40);
    expect(board.value.length).toEqual(40);
    for (let i = 0; i < board.value.length; i++) {
      const row = board.value[i];
      expect(row.length).toEqual(40);
    }
  });
});