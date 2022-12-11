/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { CeramicPassport, PassportReader } from '@gitcoinco/passport-sdk-reader';
import { useAddress } from '../hooks/useAddress';
import { useAppStore } from '../store/useAppStore';

import { Button } from './UI/Button';

export const GitCredentials = () => {
  const reader = new PassportReader();

  const user = useAppStore((state) => state.user);
  const userLoading = useAppStore((state) => state.userLoading);
  const { address } = useAddress(user?.details);

  const [passport, setPassport] = useState<CeramicPassport >();

  // get gitcoin credentials
  const readGitCredentials = async () => {
    const res: CeramicPassport | false = await reader.getPassportStream(address);
    if (res) {
      setPassport(res);
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
        <div className="mt-3 px-4 py-6 sm:px-6 shadow bg-white rounded-lg md:rounded-xl">
          <div className="text-xl font-medium mb-2">Gitcoin Verified Crendentials</div>

          <span className="text-sm">
            {address}
          </span>
          {passport?.stamps?.length
            ? (
              <div className=" flex flex-row flex-wrap px-5">
                {
              passport?.stamps?.map((item, index) => (
                <div
                  className="rounded flex flex-col items-center justify-center mr-2 mb-2 px-2 py-4 relative;
                  width: 31%"
                  key={index}
                >
                  <span className="flex flex-row items-center text-sm text-center break-all">
                    {item.provider}
                  </span>
                  <a href="https://passport.gitcoin.co/" target="_blank" rel="noreferrer">
                    <div className="chips inline-flex px-4 py-1 rounded-full bg-gray-200 text-xs ">
                      <img src="https://app.orbis.club/img/icons/gitcoin-logo.png" className="mright-5" height={18} width={18} />
                      <span>Gitcoin Passport</span>
                    </div>
                  </a>
                </div>
              ))
}

              </div>
              )
            : (
              <a href="https://passport.gitcoin.co/" target="_blank" rel="noreferrer">
                <div className="bg-gray-200 flex items-center font-normal text-xs py-1 px-2 rounded-full">
                  <img src="https://app.orbis.club/img/icons/gitcoin-logo.png" className="mright-5" height={18} width={18} />
                  <span className="items-center font-normal text-xs py-1 px-2">Connect Gitcoin Passport</span>
                </div>
              </a>
              )}
        </div>

        )
      : null
};
