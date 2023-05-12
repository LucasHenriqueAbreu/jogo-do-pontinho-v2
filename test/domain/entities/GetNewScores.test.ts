import Board from "../../../src/domain/game/entities/Board";
import Game from "../../../src/domain/game/entities/Game";
import GetNewScores from "../../../src/domain/game/entities/GetNewScores";
import Player from "../../../src/domain/game/entities/Player";
import Position from "../../../src/domain/game/entities/Position";
import BoardRepository from "../../../src/domain/game/repository/BoardRepository";
import GameRepository from "../../../src/domain/game/repository/GameRepository";
import { BoardRepositoryMemory } from "../../../src/infra/repository/memory/BoardRepositoryMemory";
import { GameRepositoryMemory } from "../../../src/infra/repository/memory/GameRepositoryMemory";

describe('HasNewScore', () => {
  let gameRepository: GameRepository;
  let boardRepository: BoardRepository;

  beforeEach(() => {
    gameRepository = new GameRepositoryMemory();
    boardRepository = new BoardRepositoryMemory();
  });

  it('Shold be possible get to square', async () => {
    const players = [
      new Player('Lucas Teste 1', '#333', 1),
      new Player('Lucas Teste 2', '#fffff', 2),
    ]
    const board = new Board(4, 4);
    const game = new Game(board, players, 1);
    await gameRepository.save(game);
    await boardRepository.save(board);

    game.createAmove(
      new Position(0, 0),
      game.turnPlayer.id!,
      new Position(0, 1),
    );

    game.createAmove(
      new Position(1, 0),
      game.turnPlayer.id!,
      new Position(1, 1),
    );

    game.createAmove(
      new Position(1, 1),
      game.turnPlayer.id!,
      new Position(0, 1),
    );

    game.createAmove(
      new Position(0, 1),
      game.turnPlayer.id!,
      new Position(0, 0),
    );

    const result = GetNewScores.execute({ destinyPosition: new Position(0, 1), originPosition: new Position(0, 0), board: game.board, ownerId: game.turnPlayer });
    expect(result).toBeTruthy();
  })
});