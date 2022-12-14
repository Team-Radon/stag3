/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { CeramicPassport, getStamps, getGitPassportCredentials, getGitCoinPassportScores } from '@/helpers/gitcoinPassportUtils';

import { useAddress } from '../hooks/useAddress';
import { useAppStore } from '../store/useAppStore';

import { Button } from './UI/Button';
import Card from './UI/Card';

export const GitCredentials = () => {
  const user = useAppStore((state) => state.user);
  const userLoading = useAppStore((state) => state.userLoading);
  const { address } = useAddress(user?.details);

  const [passport, setPassport] = useState<CeramicPassport >();
  const [score, setScore] = useState<number>(0);

  // get gitcoin credentials
  const readGitCredentials = async () => {
    const response: CeramicPassport | false = await getGitPassportCredentials(address);
    if (response) {
      // set Credentials
      setPassport(response);
      // get total Score with verified credential
      const stamps = await getStamps(response);
      setScore(await getGitCoinPassportScores(stamps));
    }
  }

  useEffect(() => {
    if (address) {
      readGitCredentials()
    }
  }, [address, readGitCredentials]);

  return !user && userLoading
    ? (
      <Button loading>Connecting</Button>
      )
    : user
      ? (
        <Card>
          <div>
            <div className="space-y-2 border-b border-gray-200 pb-2">
              <div className="flex items-center h-8">
                <img src="https://passport.gitcoin.co/assets/gitcoinLogoDark.svg" alt="Gitcoin Logo" />
                <img className="mx-4 h-6" src="https://passport.gitcoin.co/assets/logoLine.svg" alt="Logo Line" />
                <img src="https://passport.gitcoin.co/assets/passportLogoBlack.svg" alt="pPassport Logo" />
              </div>
              <div className="text-l truncate">
                Total Score
                {` ${score}`}
              </div>
              <div className="text-sm truncate">{address}</div>
            </div>

            {passport?.stamps?.length
              ? (
                <div>
                  <div className="grid grid-flow-row grid-cols-2 gap-4 mt-4">
                    {passport?.stamps?.map((item, index) => (
                      <div key={index} className="px-4 py-2 rounded-lg bg-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="min-w-0 truncate flex-1 text-sm font-medium text-gray-900">
                            {item.provider}
                          </div>
                          <svg className="w-5 h-5 fill-emerald-600" stroke-width="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                  <a
                    className="flex justify-center items-center mt-4 border border-skin-border font-medium text-skin-text hover:text-accent hover:border-accent px-3 py-2 text-sm space-x-2 rounded-lg"
                    href="https://passport.gitcoin.co/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>View Stamps</span>
                    <svg className="w-5 h-5" fill="currentColor" stroke="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                  </a>
                </div>
                )
              : (
                <a
                  className="flex justify-center items-center mt-4 border border-skin-border font-medium text-skin-text hover:text-accent hover:border-accent px-3 py-2 text-sm space-x-2 rounded-lg"
                  href="https://passport.gitcoin.co/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Connect Gitcoin Passport</span>
                  <svg className="w-5 h-5" fill="currentColor" stroke="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
                )}
          </div>
        </Card>
        )
      : null
};
