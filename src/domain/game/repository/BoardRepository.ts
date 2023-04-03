import Board from "../entities/Board";

interface BoardRepository {
  findById(id: number): Promise<Board | undefined>;
  save(game: Board): Promise<void>;
  update(id:number, game: Partial<Board>): Promise<void>;
}

export default BoardRepository;