import Board from "./Board";
import Player from "./Player";

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

  get turnPlayer(): Player {
    return this._turnPlayer;
  }

  private _getRandomPlayer(): Player {
    return this._players[Math.floor(Math.random() * this._players.length)];
  }
}

export default Game;