import Board from "../../../src/domain/entities/Board";
import Game from "../../../src/domain/entities/Game";
import Player from "../../../src/domain/entities/Player";


describe('Game', () => {
  it('Must create a Game with success', () => {
    const players = [new Player('Player1', '#fffff', 1), new Player('Player2', '#333', 2)];
    const board = new Board(10, 10);
    const game = new Game(board, players);
    expect(game).toBeInstanceOf(Game);
  });

  it('Must spawn one player at a time', () => {
    const players = [new Player('Player1', '#fffff', 1), new Player('Player2', '#333', 2)];
    const board = new Board(10, 10);
    const game = new Game(board, players);
    expect(game.turnPlayer).toBeInstanceOf(Player);
  });

  
});