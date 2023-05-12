import ExecuteAmove from "./aplication/ExecuteAmove";
import Board from "./domain/game/entities/Board";
import Game from "./domain/game/entities/Game";
import Player from "./domain/game/entities/Player";
import { BoardRepositoryMemory } from "./infra/repository/memory/BoardRepositoryMemory";
import { GameRepositoryMemory } from "./infra/repository/memory/GameRepositoryMemory";

const player1 = new Player('Teste 1', '#333', 1);
const player2 = new Player('Teste 2', '#333', 2);
const board = new Board(4, 4, 1);
const game = new Game(board, [player1, player2], 1);

const boardRepository = new BoardRepositoryMemory();
const gameRepository = new GameRepositoryMemory();

gameRepository.save(game);
boardRepository.save(board);

const executeAmove = new ExecuteAmove(gameRepository, boardRepository);

async function main(): Promise<void> {
  await executeAmove.execute({
    originPosition: { columnIndex: 0, rowIndex: 0},
    destinyPosition: { columnIndex: 0, rowIndex: 1},
    gameId: game.id!,
    ownerId: game.turnPlayer.id!
  });

  await executeAmove.execute({
    originPosition: { columnIndex: 1, rowIndex: 0},
    destinyPosition: { columnIndex: 1, rowIndex: 1},
    gameId: game.id!,
    ownerId: game.turnPlayer.id!
  });

  await executeAmove.execute({
    originPosition: { columnIndex: 1, rowIndex: 1},
    destinyPosition: { columnIndex: 0, rowIndex: 1},
    gameId: game.id!,
    ownerId: game.turnPlayer.id!
  });

  await executeAmove.execute({
    originPosition: { columnIndex: 0, rowIndex: 1},
    destinyPosition: { columnIndex: 0, rowIndex: 0},
    gameId: game.id!,
    ownerId: game.turnPlayer.id!
  });

  const gameUpdated = await gameRepository.findById(1);
  
  for (let i = 0; i < gameUpdated!.board.value.length; i++) {
    const row = gameUpdated?.board.value[i];
    console.log('\n')
    for (let i = 0; i < row!.length; i++) {
      const poins = row![i];
      console.log(poins.marks);
    }
    
  }
}

main();