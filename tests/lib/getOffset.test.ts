import getOffset from '../../lib/getOffset';

describe('getOffset', () => {
  it('It should return the exact offset', () => {
    const have = 90;
    const want = getOffset('10', 10);
    expect(want).toBe(have);
  });
});
