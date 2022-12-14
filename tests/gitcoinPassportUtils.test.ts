
import { getGitCoinPassportScores, getStamps } from '../src/helpers/gitcoinPassportUtils';

describe('getGitCoinPassportScores', () => {
  it('should return the sum of the scores for the given stamps', () => {
    const stamps = ['Ens', 'Twitter'];
    expect(getGitCoinPassportScores(stamps)).toEqual(2);
  });

  it('should return 0 if no stamps are given', () => {
    expect(getGitCoinPassportScores([])).toEqual(0);
  });

  it('should only return the sum of valid stamps in GITCOIN_PASSPORT_SCORE', () => {
    const stamps = ['Ens', 'Twitter',"Hehehe"];
    expect(getGitCoinPassportScores(stamps)).toEqual(2);
  });
});
describe('getStamps', () => {
  it('should return an empty array if no passport is provided', () => {
    expect(getStamps(false)).toEqual([]);
  });
});




