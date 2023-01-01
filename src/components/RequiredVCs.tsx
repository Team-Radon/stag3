
import Link from 'next/link';
import { getAddressFromDid } from '@orbisclub/orbis-sdk/utils';
import { useEffect, useState } from 'react';
import Card from './UI/Card';
import { useAppStore } from '@/store/useAppStore';
import { validateStampsVerified } from '@/helpers/gitcoinPassportUtils';
// interface TwitterLinkProps {
//   url: string
//   social?: string
//   socialType: string
//   children: React.ReactNode
// }

export const RequiredVCs = () => {
  const [isVerified, setIsVerified] = useState<boolean>(false);

  // get current login user info
  const user = useAppStore((state) => state.user);
  const { address } = getAddressFromDid(user?.details?.did);

  const readGitCredentials = async () => {
    const requiredVC = ['TwitterFollowerGT100', 'Github', 'Brightid']
    // validate if verified credentials
    setIsVerified(await validateStampsVerified(address, requiredVC));
  }

  useEffect(() => {
    if (address) {
      readGitCredentials();
    }
  }, [address, readGitCredentials]);

  const iconCheck = (
    <svg className={isVerified ? 'w-5 h-5 fill-emerald-600' : 'w-5 h-5 invisible'} strokeWidth="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  )
  return (
    <Card padded className="md:sticky top-[100px] mt-4">
      <div className="text-sm">You must own one of these verifiable credentials to comment.</div>
      <div className="flex flex-col gap-2 mt-4">
        <Link href="#" title="Twitter followers > 100" className="px-4 py-2 rounded-lg bg-gray-100">
          <div className="flex items-center gap-4">
            <div className="min-w-0 truncate flex-1 text-sm font-medium text-gray-900">
              TwitterFollowerGT100
            </div>
            {iconCheck}
          </div>
        </Link>
        <Link href="#" title="Has a GitHub account" className="px-4 py-2 rounded-lg bg-gray-100">
          <div className="flex items-center gap-4">
            <div className="min-w-0 truncate flex-1 text-sm font-medium text-gray-900">
              Github
            </div>
            {iconCheck}
          </div>
        </Link>
        <Link href="#" title="Is Human in proof of Humanity" className="px-4 py-2 rounded-lg bg-gray-100">
          <div className="flex items-center gap-4">
            <div className="min-w-0 truncate flex-1 text-sm font-medium text-gray-900">
              ProofOfHumanity
            </div>
            {iconCheck}
          </div>
        </Link>
      </div>
      {!isVerified
        ? (
          <a
            className="flex justify-center items-center mt-4 border border-skin-border font-medium text-skin-text hover:text-accent hover:border-accent px-3 py-2 text-sm space-x-2 rounded-lg"
            href="https://passport.gitcoin.co/"
            target="_blank"
            rel="noreferrer"
          >
            <span>Verify with Gitcoin Passport</span>
            <svg className="w-5 h-5" fill="currentColor" stroke="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
          )
        : (
          <a className="flex justify-center items-center mt-4 border border-skin-border font-medium text-skin-text hover:text-accent hover:border-accent px-3 py-2 text-sm space-x-2 rounded-lg" href="https://passport.gitcoin.co/" target="_blank" rel="noreferrer">
            <span>View Stamps</span>
            <svg className="w-5 h-5" fill="currentColor" stroke="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
          ) }
    </Card>
  );
}
