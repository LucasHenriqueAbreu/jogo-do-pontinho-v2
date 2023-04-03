import Game from "../entities/Game";

interface GameRepository {
  findById(id: number): Promise<Game | undefined>;
  save(game: Game): Promise<void>;
}

export default GameRepository;