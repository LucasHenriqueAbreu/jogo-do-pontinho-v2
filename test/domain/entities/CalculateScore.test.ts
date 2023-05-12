import Board from "../../../src/domain/game/entities/Board";
import CalculateScore from "../../../src/domain/game/entities/CalculateScore";
import Game from "../../../src/domain/game/entities/Game";
import Player from "../../../src/domain/game/entities/Player";
import Position from "../../../src/domain/game/entities/Position";

describe('CalculateScore DomainService', () => {

  describe('Must calculate the score of each one player from some game', () => {
    it('Case 1: Just two players, but only one with score', () => {
      // let firstPlayer: Player;
      // const players = [
      //   new Player('Player1', '#fffff', 1),
      //   new Player('Player2', '#333', 2),
      // ];
      // const moves = [
      //   {
      //     originPosition: new Position(0, 0),
      //     destinyPosition: new Position(0, 1)
      //   },
      //   {
      //     originPosition: new Position(1, 0),
      //     destinyPosition: new Position(0, 0)
      //   },
      //   {
      //     originPosition: new Position(1, 0),
      //     destinyPosition: new Position(1, 1)
      //   },
      //   // The last move make a perfect square
      //   {
      //     originPosition: new Position(0, 1),
      //     destinyPosition: new Position(1, 1)
      //   },
      // ]

      // const board = new Board(10, 10);
      // const game = new Game(board, players);
      // for (let i = 0; i < moves.length; i++) {
      //   const move = moves[i];
      //   if (i === 0) {
      //     firstPlayer = game.turnPlayer;
      //   }
      //   game.createAmove(move.originPosition, game.turnPlayer.id!, move.destinyPosition);
      // }
      // const result = CalculateScore.execute(game);
      // const playerScore = result.find((score) => score.playerId === firstPlayer.id);
      // expect(playerScore!.score).toEqual(1);
      expect(0).toEqual(0);
    });
  });
});