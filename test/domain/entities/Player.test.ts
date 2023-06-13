import Player from "../../../src/domain/game/entities/Player";

describe('Player', () => { 
  it('Must create a Player with success', () => {
    const player = new Player(1, 'Player1', '#333');
    expect(player).toBeInstanceOf(Player);
  })
 });