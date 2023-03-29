describe('TakeTheMove', () => {
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
      expect(() => board.executeMove(new Position(10, 10), new Position(0, 1), 1)).toThrow('Points must be inside of the board');
    });

    it('Case 2', () => {
      const board = new Board(4, 4);
      expect(() => board.executeMove(new Position(0, 10), new Position(0, 1), 1)).toThrow('Points must be inside of the board');
    });

    it('Case 3', () => {
      const board = new Board(4, 4);
      expect(() => board.executeMove(new Position(0, 0), new Position(4, 4), 1)).toThrow('Points must be inside of the board');
    });

    it('Case 4', () => {
      const board = new Board(4, 4);
      expect(() => board.executeMove(new Position(0, 0), new Position(4, 0), 1)).toThrow('Points must be inside of the board');
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