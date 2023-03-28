import GameRepository from "../domain/repository/GameRepository";

type Input = {
  originPosition: Position;
  destinyPosition: Position;
  gameId: number;
}

class TakeTheMove {
  private _gameRepository: GameRepository;

  constructor(gameRepository: GameRepository) {
    this._gameRepository = gameRepository;
  }

  public async execute(input: Input): Promise<void> {
    const game = await this._gameRepository.findById(input.gameId);
  }
}

export default TakeTheMove;