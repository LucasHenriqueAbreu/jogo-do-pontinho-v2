import ExecuteAmove from "../../src/aplication/ExecuteAMove";
import Board from "../../src/domain/game/entities/Board";
import Game from "../../src/domain/game/entities/Game";
import Mark from "../../src/domain/game/entities/Mark";
import Player from "../../src/domain/game/entities/Player";
import Point from "../../src/domain/game/entities/Point";
import BoardRepository from "../../src/domain/game/repository/BoardRepository";
import GameRepository from "../../src/domain/game/repository/GameRepository";
import { BoardRepositoryMemory } from "../../src/infra/repository/memory/BoardRepositoryMemory";
import { GameRepositoryMemory } from "../../src/infra/repository/memory/GameRepositoryMemory";

// TODO: data tests must be mock.
describe('Execute a move', () => {
  let gameRepository: GameRepository;
  let boardRepository: BoardRepository;
  let usecase: ExecuteAmove;

  beforeEach(() => {
    gameRepository = new GameRepositoryMemory();
    boardRepository = new BoardRepositoryMemory();
    usecase = new ExecuteAmove(gameRepository, boardRepository);
  });

  describe('Must be possible for a player to execute a move', () => {
    it('Case 1: execution without error', async () => {
      const players = [
        new Player(1, 'Lucas Teste 1', '#333'),
        new Player(2, 'Lucas Teste 2', '#fffff'),
      ]
      const board = new Board(1, 4, 4);
      const game = new Game(board, players, 1);
      await gameRepository.save(game);
      await boardRepository.save(board);
      await expect(usecase.execute({
        originPosition: { columnIndex: 0, rowIndex: 0 },
        destinyPosition: { columnIndex: 0, rowIndex: 1 },
        gameId: 1,
        ownerId: game.turnPlayer.id!,
      })).resolves.not.toThrow();
    });

    it('Case 2: execution and update values in "database"', async () => {
      const players = [
        new Player(1, 'Lucas Teste 1', '#333'),
        new Player(2, 'Lucas Teste 2', '#fffff'),
      ]
      const board = new Board(1, 4, 4);
      const game = new Game(board, players, 1);
      await gameRepository.save(game);
      await boardRepository.save(board);

      const playerTurn = game.turnPlayer.id!;
      await usecase.execute({
        originPosition: { columnIndex: 0, rowIndex: 0 },
        destinyPosition: { columnIndex: 0, rowIndex: 1 },
        gameId: 1,
        ownerId: playerTurn,
      });
      const gameUpdated = await gameRepository.findById(game.id!);
      expect(gameUpdated).toBeInstanceOf(Game);
      expect(gameUpdated?.turnPlayer).toEqual(game.turnPlayer);

      const boardUpdated = await boardRepository.findById(board.id!);
      expect(boardUpdated).toBeInstanceOf(Board);
      const originPoint = boardUpdated?.value[0][0];
      const destinyPoint = boardUpdated?.value[0][1];
      expect(originPoint).toBeInstanceOf(Point);
      expect(destinyPoint).toBeInstanceOf(Point);

      const originMark = originPoint?.marks.peek()!;
      const destinyMark = destinyPoint?.marks.peek()!;
      expect(originMark).toBeInstanceOf(Mark);
      expect(originMark.ownerId).toEqual(playerTurn);

      expect(destinyMark).toBeInstanceOf(Mark);
      expect(destinyMark.ownerId).toEqual(playerTurn);
    });
  });


  it('Must cause an exception if there is no game', async () => {
    await expect(usecase.execute({
      originPosition: { columnIndex: 0, rowIndex: 0 },
      destinyPosition: { columnIndex: 0, rowIndex: 1 },
      gameId: 1,
      ownerId: 1,
    })).rejects.toEqual(Error('Game not found'));
  });

  it('Must cause an exception if there is no player', async () => {
    const players = [
      new Player(1, 'Lucas Teste 1', '#333'),
      new Player(2, 'Lucas Teste 2', '#fffff'),
    ]
    const board = new Board(1, 4, 4);
    const game = new Game(board, players, 1);
    await gameRepository.save(game);
    await expect(usecase.execute({
      originPosition: { columnIndex: 0, rowIndex: 0 },
      destinyPosition: { columnIndex: 0, rowIndex: 1 },
      gameId: 1,
      ownerId: 4,
    })).rejects.toEqual(Error('Player not found'));
  });

  describe('Must cause an exception if any position is not valid', () => {
    it('Case 1', async () => {
      const players = [
        new Player(1, 'Lucas Teste 1', '#333'),
        new Player(2, 'Lucas Teste 2', '#fffff'),
      ]
      const board = new Board(1, 4, 4);
      const game = new Game(board, players, 1);
      await gameRepository.save(game);
      await expect(usecase.execute({
        originPosition: { columnIndex: 10, rowIndex: 10 },
        destinyPosition: { columnIndex: 0, rowIndex: 1 },
        gameId: 1,
        ownerId: game.turnPlayer.id!,
      })).rejects.toEqual(Error('Points must be inside of the board'));
    });

    it('Case 2', async () => {
      const players = [
        new Player(1, 'Lucas Teste 1', '#333'),
        new Player(2, 'Lucas Teste 2', '#fffff'),
      ]
      const board = new Board(1, 4, 4);
      const game = new Game(board, players, 1);
      await gameRepository.save(game);
      await expect(usecase.execute({
        originPosition: { columnIndex: 0, rowIndex: 10 },
        destinyPosition: { columnIndex: 0, rowIndex: 1 },
        gameId: 1,
        ownerId: game.turnPlayer.id!,
      })).rejects.toEqual(Error('Points must be inside of the board'));
    });

    it('Case 3', async () => {
      const players = [
        new Player(1, 'Lucas Teste 1', '#333'),
        new Player(2, 'Lucas Teste 2', '#fffff'),
      ]
      const board = new Board(1, 4, 4);
      const game = new Game(board, players, 1);
      await gameRepository.save(game);
      await expect(usecase.execute({
        originPosition: { columnIndex: 0, rowIndex: 10 },
        destinyPosition: { columnIndex: 0, rowIndex: 1 },
        gameId: 1,
        ownerId: game.turnPlayer.id!,
      })).rejects.toEqual(Error('Points must be inside of the board'));
    });

    it('Case 4', async () => {
      const players = [
        new Player(1, 'Lucas Teste 1', '#333'),
        new Player(2, 'Lucas Teste 2', '#fffff'),
      ]
      const board = new Board(1, 4, 4);
      const game = new Game(board, players, 1);
      await gameRepository.save(game);
      await expect(usecase.execute({
        originPosition: { columnIndex: 0, rowIndex: 0 },
        destinyPosition: { columnIndex: 4, rowIndex: 4 },
        gameId: 1,
        ownerId: game.turnPlayer.id!,
      })).rejects.toEqual(Error('Points must be inside of the board'));
    });

    it('Case 5', async () => {
      const players = [
        new Player(1, 'Lucas Teste 1', '#333'),
        new Player(2, 'Lucas Teste 2', '#fffff'),
      ]
      const board = new Board(1, 4, 4);
      const game = new Game(board, players, 1);
      await gameRepository.save(game);
      await expect(usecase.execute({
        originPosition: { columnIndex: 0, rowIndex: 0 },
        destinyPosition: { columnIndex: 4, rowIndex: 0 },
        gameId: 1,
        ownerId: game.turnPlayer.id!,
      })).rejects.toEqual(Error('Points must be inside of the board'));
    });
  });

  describe('Must cause an exception if the destiny point is not around', () => {
    it('Case 1: trying connect equal position (0, 0 with 0, 0)', async () => {
      const players = [
        new Player(1, 'Lucas Teste 1', '#333'),
        new Player(2, 'Lucas Teste 2', '#fffff'),
      ]
      const board = new Board(1, 4, 4);
      const game = new Game(board, players, 1);
      await gameRepository.save(game);
      await expect(usecase.execute({
        originPosition: { columnIndex: 0, rowIndex: 0 },
        destinyPosition: { columnIndex: 0, rowIndex: 0 },
        gameId: 1,
        ownerId: game.turnPlayer.id!,
      })).rejects.toEqual(Error(`Origin and destiny position cant't be equal`));
    });

    it('Case 2: trying connect position 0, 2 with 2, 2', async () => {
      const players = [
        new Player(1, 'Lucas Teste 1', '#333'),
        new Player(2, 'Lucas Teste 2', '#fffff'),
      ]
      const board = new Board(1, 4, 4);
      const game = new Game(board, players, 1);
      await gameRepository.save(game);
      await expect(usecase.execute({
        originPosition: { columnIndex: 0, rowIndex: 2 },
        destinyPosition: { columnIndex: 2, rowIndex: 2 },
        gameId: 1,
        ownerId: game.turnPlayer.id!,
      })).rejects.toEqual(Error(`Point must be around`));
    });
  });
});