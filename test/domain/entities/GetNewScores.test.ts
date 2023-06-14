import Board from "../../../src/domain/game/entities/Board";
import Game from "../../../src/domain/game/entities/Game";
import GetNewScores from "../../../src/domain/game/entities/GetNewScores";
import Player from "../../../src/domain/game/entities/Player";
import Position from "../../../src/domain/game/entities/Position";
import BoardRepository from "../../../src/domain/game/repository/BoardRepository";
import GameRepository from "../../../src/domain/game/repository/GameRepository";
import { BoardRepositoryMemory } from "../../../src/infra/repository/memory/BoardRepositoryMemory";
import { GameRepositoryMemory } from "../../../src/infra/repository/memory/GameRepositoryMemory";
// TODO: translate
// TODO: test position of points
describe('HasNewScore', () => {
  let gameRepository: GameRepository;
  let boardRepository: BoardRepository;

  beforeEach(() => {
    gameRepository = new GameRepositoryMemory();
    boardRepository = new BoardRepositoryMemory();
  });

  describe('Horizontal', () => {
    let players: Player[];
    let board: Board;
    let game: Game;

    beforeEach(async () => {
      players = [
        new Player(1, 'Lucas Teste 1', '#333'),
        new Player(2, 'Lucas Teste 2', '#fffff'),
      ]
      board = new Board(1, 4, 4);
      game = new Game(board, players, 1);
      await gameRepository.save(game);
      await boardRepository.save(board);
    });

    it('Deve ser retornar um ponto quando o quadrado foi fechado na parte superior', async () => {

      game.createAmove(
        new Position(0, 0),
        game.turnPlayer.id,
        new Position(0, 1),
      );

      game.createAmove(
        new Position(1, 0),
        game.turnPlayer.id,
        new Position(1, 1),
      );

      game.createAmove(
        new Position(1, 1),
        game.turnPlayer.id,
        new Position(0, 1),
      );

      game.createAmove(
        new Position(0, 0),
        game.turnPlayer.id,
        new Position(1, 0),
      );

      const result = GetNewScores.execute({ destinyPosition: new Position(0, 0), originPosition: new Position(1, 0), board: game.board, ownerId: game.turnPlayer.id });
      expect(result.length).toEqual(1);
    });

    it('Deve ser retornar um ponto quando o quadrado foi fechado na parte inferior', async () => {
      game.createAmove(
        new Position(1, 1),
        game.turnPlayer.id,
        new Position(1, 0),
      );

      game.createAmove(
        new Position(1, 0),
        game.turnPlayer.id,
        new Position(0, 0),
      );

      game.createAmove(
        new Position(0, 0),
        game.turnPlayer.id,
        new Position(0, 1),
      );

      game.createAmove(
        new Position(0, 1),
        game.turnPlayer.id,
        new Position(1, 1),
      );

      const result = GetNewScores.execute({ destinyPosition: new Position(1, 1), originPosition: new Position(0, 1), board: game.board, ownerId: game.turnPlayer.id });
      expect(result.length).toEqual(1);
    });

    it('Deve ser retornar dois ponto quando o quadrado foi fechado no meio, ou seja parte superior e inferior possuem traços', async () => {
      game.createAmove(
        new Position(1, 1),
        game.turnPlayer.id,
        new Position(1, 0),
      );

      game.createAmove(
        new Position(1, 0),
        game.turnPlayer.id,
        new Position(0, 0),
      );

      game.createAmove(
        new Position(0, 0),
        game.turnPlayer.id,
        new Position(0, 1),
      );

      game.createAmove(
        new Position(0, 1),
        game.turnPlayer.id,
        new Position(0, 2),
      );

      game.createAmove(
        new Position(0, 2),
        game.turnPlayer.id,
        new Position(1, 2),
      );

      game.createAmove(
        new Position(1, 2),
        game.turnPlayer.id,
        new Position(1, 1),
      );

      game.createAmove(
        new Position(0, 1),
        game.turnPlayer.id,
        new Position(1, 1),
      );

      const result = GetNewScores.execute({ destinyPosition: new Position(1, 1), originPosition: new Position(0, 1), board: game.board, ownerId: game.turnPlayer.id });
      expect(result.length).toEqual(2);
    });
  });

  describe('Vertical', () => {
    let players: Player[];
    let board: Board;
    let game: Game;

    beforeEach(async () => {
      players = [
        new Player(1, 'Lucas Teste 1', '#333'),
        new Player(2, 'Lucas Teste 2', '#fffff'),
      ]
      board = new Board(1, 4, 4);
      game = new Game(board, players, 1);
      await gameRepository.save(game);
      await boardRepository.save(board);
    });

    it('Deve ser retornar um ponto quando o quadrado foi fechado na direita', async () => {

      game.createAmove(
        new Position(1, 0),
        game.turnPlayer.id,
        new Position(0, 0),
      );

      game.createAmove(
        new Position(0, 0),
        game.turnPlayer.id,
        new Position(0, 1),
      );

      game.createAmove(
        new Position(0, 1),
        game.turnPlayer.id,
        new Position(1, 1),
      );

      game.createAmove(
        new Position(1, 1),
        game.turnPlayer.id,
        new Position(1, 0),
      );

      const result = GetNewScores.execute({
        originPosition: new Position(1, 1),
        destinyPosition: new Position(1, 0),
        board: game.board,
        ownerId: game.turnPlayer.id,
      });
      expect(result.length).toEqual(1);
    });

    // it('Deve ser retornar um ponto quando o quadrado foi fechado na parte inferior', async () => {  
    //   game.createAmove(
    //     new Position(1, 1),
    //     game.turnPlayer.id,
    //     new Position(1, 0),
    //   );

    //   game.createAmove(
    //     new Position(1, 0),
    //     game.turnPlayer.id,
    //     new Position(0, 0),
    //   );

    //   game.createAmove(
    //     new Position(0, 0),
    //     game.turnPlayer.id,
    //     new Position(0, 1),
    //   );

    //   game.createAmove(
    //     new Position(0, 1),
    //     game.turnPlayer.id,
    //     new Position(1, 1),
    //   );

    //   const result = GetNewScores.execute({ destinyPosition: new Position(1, 1), originPosition: new Position(0, 1), board: game.board, ownerId: game.turnPlayer.id });
    //   expect(result.length).toEqual(1);
    // });

    // it('Deve ser retornar dois ponto quando o quadrado foi fechado no meio, ou seja parte superior e inferior possuem traços', async () => {  
    //   game.createAmove(
    //     new Position(1, 1),
    //     game.turnPlayer.id,
    //     new Position(1, 0),
    //   );

    //   game.createAmove(
    //     new Position(1, 0),
    //     game.turnPlayer.id,
    //     new Position(0, 0),
    //   );

    //   game.createAmove(
    //     new Position(0, 0),
    //     game.turnPlayer.id,
    //     new Position(0, 1),
    //   );

    //   game.createAmove(
    //     new Position(0, 1),
    //     game.turnPlayer.id,
    //     new Position(0, 2),
    //   );

    //   game.createAmove(
    //     new Position(0, 2),
    //     game.turnPlayer.id,
    //     new Position(1, 2),
    //   );

    //   game.createAmove(
    //     new Position(1, 2),
    //     game.turnPlayer.id,
    //     new Position(1, 1),
    //   );

    //   game.createAmove(
    //     new Position(0, 1),
    //     game.turnPlayer.id,
    //     new Position(1, 1),
    //   );

    //   const result = GetNewScores.execute({ destinyPosition: new Position(1, 1), originPosition: new Position(0, 1), board: game.board, ownerId: game.turnPlayer.id });
    //   expect(result.length).toEqual(2);
    // });
  });
});