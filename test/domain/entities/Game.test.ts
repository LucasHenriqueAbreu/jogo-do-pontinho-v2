import Board from "../../../src/domain/game/entities/Board";
import Game from "../../../src/domain/game/entities/Game";
import Player from "../../../src/domain/game/entities/Player";
import Position from "../../../src/domain/game/entities/Position";


describe('Game', () => {
  it('Must create a Game with success', () => {
    const players = [new Player(1, 'Player1', '#fffff'), new Player(2, 'Player2', '#333')];
    const board = new Board(1, 10, 10);
    const game = new Game(board, players);
    expect(game).toBeInstanceOf(Game);
  });

  it('Must spawn one player at a time', () => {
    const players = [new Player(1, 'Player1', '#fffff'), new Player(2, 'Player2', '#333')];
    const board = new Board(1, 10, 10);
    const game = new Game(board, players);
    expect(game.turnPlayer).toBeInstanceOf(Player);
  });

  it('Must cause an exception when another player try make a move without your turn', () => {
    const players = [new Player(1, 'Player1', '#fffff'), new Player(2, 'Player2', '#333')];
    const board = new Board(1, 10, 10);
    const game = new Game(board, players);
    const diffPlayer = game.turnPlayer.id === 2 ? 1 : 2;
    expect(() => game.createAmove(new Position(0, 0), diffPlayer, new Position(0, 1))).toThrowError('Is not your turn');
  });

  it('Must change to next player when a turn over', () => {
    const players = [new Player(1, 'Player1', '#fffff'), new Player(2, 'Player2', '#333')];
    const board = new Board(1, 10, 10);
    const game = new Game(board, players);
    const nextPlayer = game.turnPlayer.id === 2 ? 1 : 2;
    game.createAmove(new Position(0, 0), game.turnPlayer.id!, new Position(0, 1));
    expect(game.turnPlayer.id).toEqual(nextPlayer);
  });

  it('Must change to next player when a turn over. (test with more players)', () => {
    const players = [
      new Player(1, 'Player1', '#fffff'),
      new Player(2, 'Player2', '#333'),
      new Player(3, 'Player3', '#333'),
      new Player(4, 'Player4', '#333'), 
      new Player(5, 'Player5', '#333'),
    ];
    const moves = [
      {
        originPosition: new Position(0, 0), 
        destinyPosition: new Position(0, 1)
      },
      {
        originPosition: new Position(1, 0), 
        destinyPosition: new Position(1, 1)
      },
      {
        originPosition: new Position(2, 0), 
        destinyPosition: new Position(2, 1)
      },
      {
        originPosition: new Position(3, 0), 
        destinyPosition: new Position(3, 1)
      },
      {
        originPosition: new Position(4, 0), 
        destinyPosition: new Position(4, 1)
      }
    ]

    const board = new Board(1, 10, 10);
    const game = new Game(board, players);
    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      const nextTurnPlayerId = game.turnPlayer.id === 5 ? 1 : game.turnPlayer.id! + 1;
      game.createAmove(move.originPosition, game.turnPlayer.id!, move.destinyPosition);
      expect(game.turnPlayer.id).toEqual(nextTurnPlayerId);
    }
  });
});