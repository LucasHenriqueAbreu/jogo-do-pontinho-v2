import Board from "../../../src/domain/game/entities/Board";
import Mark from "../../../src/domain/game/entities/Mark";
import Position from "../../../src/domain/game/entities/Position";

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
    const mark1 = board.value[0][0].marks.getSomeItem(0);
    expect(mark1).toBeInstanceOf(Mark);
    expect(mark1?.ownerId).toEqual(1);

    const mark2 = board.value[0][1].marks.getSomeItem(0);
    expect(mark2).toBeInstanceOf(Mark);
    expect(mark2?.ownerId).toEqual(1);
  });

  describe('Must cause an exception if any position is not valid', () => {
    it('Case 1', () => {
      const board = new Board(4, 4);
      expect(() => board.executeMove(new Position(10, 10), new Position(0, 1), 1)).toThrow('Invalid position');
    });

    it('Case 2', () => {
      const board = new Board(4, 4);
      expect(() => board.executeMove(new Position(0, 10), new Position(0, 1), 1)).toThrow('Invalid position');
    });

    it('Case 3', () => {
      const board = new Board(4, 4);
      expect(() => board.executeMove(new Position(0, 0), new Position(4, 4), 1)).toThrow('Invalid position');
    });

    it('Case 4', () => {
      const board = new Board(4, 4);
      expect(() => board.executeMove(new Position(0, 0), new Position(4, 0), 1)).toThrow('Invalid position');
    });
  });

  describe('Must cause an exception if the destiny point is not around', () => {
    const board = new Board(10, 10);

    it('Case 1: trying connect equal position (0, 0 with 0, 0)', () => {
      expect(() => board.executeMove(new Position(0, 0), new Position(0, 0), 1)).toThrow(`Origin and destiny position cant't be equal`);
    });
    
    it('Case 2: trying connect position 0, 2 with 2, 2', () => {
      expect(() => board.executeMove(new Position(0, 2), new Position(2, 2), 1)).toThrow('Point must be around');
    });
  });

});