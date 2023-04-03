import ExecuteAmove from "../../src/aplication/ExecuteAmove";
import Board from "../../src/domain/game/entities/Board";
import Game from "../../src/domain/game/entities/Game";
import Player from "../../src/domain/game/entities/Player";
import GameRepositoryMemory from "../../src/infra/repository/memory/GameRepositoryMemory";

describe('Execute a move', () => {
  let gameRepository: GameRepositoryMemory;
  let usecase: ExecuteAmove;

  beforeEach(() => {
    gameRepository = new GameRepositoryMemory();
    usecase = new ExecuteAmove(gameRepository);
  })

  it('Must be possible for a player to execute a move', async () => {
    const players = [
      new Player('Lucas Teste 1', '#333', 1),
      new Player('Lucas Teste 2', '#fffff', 2),
    ]
    const board = new Board(4, 4);
    const game = new Game(board, players, 1);
    await gameRepository.save(game);
    await expect(usecase.execute({
      originPosition: { columnIndex: 0, rowIndex: 0 },
      destinyPosition: { columnIndex: 0, rowIndex: 1 },
      gameId: 1,
      ownerId: game.turnPlayer.id!,
    })).resolves.not.toThrow();
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
      new Player('Lucas Teste 1', '#333', 1),
      new Player('Lucas Teste 2', '#fffff', 2),
    ]
    const board = new Board(4, 4);
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
        new Player('Lucas Teste 1', '#333', 1),
        new Player('Lucas Teste 2', '#fffff', 2),
      ]
      const board = new Board(4, 4);
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
        new Player('Lucas Teste 1', '#333', 1),
        new Player('Lucas Teste 2', '#fffff', 2),
      ]
      const board = new Board(4, 4);
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
        new Player('Lucas Teste 1', '#333', 1),
        new Player('Lucas Teste 2', '#fffff', 2),
      ]
      const board = new Board(4, 4);
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
        new Player('Lucas Teste 1', '#333', 1),
        new Player('Lucas Teste 2', '#fffff', 2),
      ]
      const board = new Board(4, 4);
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
        new Player('Lucas Teste 1', '#333', 1),
        new Player('Lucas Teste 2', '#fffff', 2),
      ]
      const board = new Board(4, 4);
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
        new Player('Lucas Teste 1', '#333', 1),
        new Player('Lucas Teste 2', '#fffff', 2),
      ]
      const board = new Board(4, 4);
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
        new Player('Lucas Teste 1', '#333', 1),
        new Player('Lucas Teste 2', '#fffff', 2),
      ]
      const board = new Board(4, 4);
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