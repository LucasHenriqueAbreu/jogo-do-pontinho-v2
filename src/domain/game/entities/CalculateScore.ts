import Game from "./Game";
/// TODO: maybe this DomainService is not needed, it just needs a method in the Entity
class CalculateScore {
  public static execute(game: Game): { playerId: number, score: number }[] {
    for (let i = 0; i < game.players.length; i++) {
      const player = game.players[i];
      
      
    }
    return []
  }

}

export default CalculateScore;