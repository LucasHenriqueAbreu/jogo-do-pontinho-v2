import ExecuteAmove from "../../src/aplication/ExecuteAmove";
import Board from "../../src/domain/game/entities/Board";
import Game from "../../src/domain/game/entities/Game";
import Player from "../../src/domain/game/entities/Player";
import GameRepositoryMemory from "../../src/infra/repository/memory/GameRepository";

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
      ownerId: 1,
    })).resolves.not.toThrow();

  });

  // describe('Must cause an exception if any position is not valid', () => {
  //   it('Case 1', () => {
  //     const board = new Board(4, 4);
  //     expect(() => board.executeMove(new Position(10, 10), new Position(0, 1), 1)).toThrow('Points must be inside of the board');
  //   });

  //   it('Case 2', () => {
  //     const board = new Board(4, 4);
  //     expect(() => board.executeMove(new Position(0, 10), new Position(0, 1), 1)).toThrow('Points must be inside of the board');
  //   });

  //   it('Case 3', () => {
  //     const board = new Board(4, 4);
  //     expect(() => board.executeMove(new Position(0, 0), new Position(4, 4), 1)).toThrow('Points must be inside of the board');
  //   });

  //   it('Case 4', () => {
  //     const board = new Board(4, 4);
  //     expect(() => board.executeMove(new Position(0, 0), new Position(4, 0), 1)).toThrow('Points must be inside of the board');
  //   });
  // });

  // describe('Must cause an exception if the destiny point is not around', () => {
  //   const board = new Board(10, 10);

  //   it('Case 1: trying connect equal position (0, 0 with 0, 0)', () => {
  //     expect(() => board.executeMove(new Position(0, 0), new Position(0, 0), 1)).toThrow(`Origin and destiny position cant't be equal`);
  //   });

  //   it('Case 2: trying connect position 0, 2 with 2, 2', () => {
  //     expect(() => board.executeMove(new Position(0, 2), new Position(2, 2), 1)).toThrow('Point must be around');
  //   });
  // });
});