import Player from "../../../src/domain/game/entities/Player";

describe('Player', () => { 
  it('Must create a Player with success', () => {
    const player = new Player('Player1', '#333',  1);
    expect(player).toBeInstanceOf(Player);
  })
 });