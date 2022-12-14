/* eslint-disable import/no-unresolved */

import { GITCOIN_PASSPORT_SCORES } from '@/constants';

/**
 * Sum total gitcoin credential scores
 * @param providers - list of gitcoin passport verified credentials from user did
 * GITCOIN_PASSPORT_SCORES- hash map of provider and score
 * @returns scores - sum of points based on stag3 scoring
 */
export const getGitCoinPassportScores = (providers: string[]) => {
  // const signers: string[] = ['Ens', 'Twitter', 'Poh'];
  const scores = providers.map((provider) => GITCOIN_PASSPORT_SCORES[`${provider}`]).reduce((acc, score) => acc + score, 0);
  return scores;
}
