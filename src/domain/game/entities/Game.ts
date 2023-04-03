import Board from "./Board";
import Player from "./Player";
import Position from "./Position";

class Game {
  private _id?: number;
  private _players: Player[];
  private _board: Board;
  private _turnPlayer: Player;

  constructor(board: Board, players: Player[], id?: number) {
    this._id = id;
    this._players = players;
    this._board = board;
    this._turnPlayer = this._getRandomPlayer();
  }

  get id(): number | undefined {
    return this._id;
  }

  get turnPlayer(): Player {
    return this._turnPlayer;
  }

  get board(): Board {
    return this._board;
  }

  private _getRandomPlayer(): Player {
    return this._players[Math.floor(Math.random() * this._players.length)];
  }

  public createAmove(originPosition: Position, ownerId: number, destinyPosition: Position): void {
    const player = this._players.find((player) => player.id === ownerId);
    if(!player) {
      throw new Error('Player not found');
    }
    this._board.setPoints(originPosition, ownerId, destinyPosition);
  }

}

export default Game;