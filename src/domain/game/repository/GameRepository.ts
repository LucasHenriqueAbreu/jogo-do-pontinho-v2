import Game from "../entities/Game";

interface GameRepository {
  findById(id: number): Promise<Game | undefined>;
}

export default GameRepository;