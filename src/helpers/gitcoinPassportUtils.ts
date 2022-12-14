/* eslint-disable import/no-unresolved */

import type { CeramicPassport as OriginalCeramicPassport } from '@gitcoinco/passport-sdk-reader';
import { PassportReader } from '@gitcoinco/passport-sdk-reader';
import { GITCOIN_PASSPORT_SCORES } from '@/constants';

/**
 * Get the GitCoin passport scores for a list of verified user credentials.
 * @param {string[]} providers -['Twiiter','Ens'] The list of Gitcoin Passport stamps|providers to get the scores for.
 * @returns {number} scores - The total GitCoin passport scores for the given providers.
 */
export const getGitCoinPassportScores = (providers: string[]) => {
  const scores = providers
    .map((provider) => GITCOIN_PASSPORT_SCORES[`${provider}`])
    .filter((score) => score !== undefined) // filter out scores that are undefined
    .reduce((acc, score) => acc + score, 0);
  return scores;
}

/**
 * Export Ceramic Passport types in utils
 * To reduce the need to import the @gitcoinco/passport-sdk-reader module in multiple components, we can export the relevant types from the utils module and you can import them in a single file.
 */
export type CeramicPassport = OriginalCeramicPassport;

/**
 * Get Git passport credentials for a given address.
 * @param {string} address - The address to get Git passport credentials for.
 * @returns {Promise<CeramicPassport|false>} - A promise that resolves with the Git passport credentials for the given address, or `false` if no credentials were found.
 */
export const getGitPassportCredentials = async (address: string) => {
  const reader = new PassportReader();
  const response: CeramicPassport | false = await reader.getPassportStream(address);
  return response;
}
