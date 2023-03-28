import Point from "../../../src/domain/entities/Point";


describe('Point', () => { 
  it('Must create a Point with success', () => {
    const point = new Point();
    expect(point).toBeInstanceOf(Point);
  });

  it('Should cause an error when tryng to assing an owner to the position if it already has an owner.', () => {
    const point = new Point();
    point.setOwnerId(1);
    expect(() => point.setOwnerId(1)).toThrowError('This position already has an owner')
  });
 });