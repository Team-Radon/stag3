import Link from 'next/link';
import { Details } from '../helpers/interfaces';
import { shorten } from '../helpers/utils';
import { useUsername } from '../hooks/useUsername';
import { AvatarUser } from './AvatarUser';
import { ButtonFollow } from './ButtonFollow';

export const UserProfileItem = ({ details }: { details: Details }) => {
  const { username } = useUsername(details)

  return (
    <div className="py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <AvatarUser details={details} size="sm" />
        </div>
        <Link href={`/profile/${details?.did}`} title={username} className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900 hover:text-accent">{username}</p>
          <p className="truncate text-sm text-skin-text">{shorten(details?.metadata?.address)}</p>
        </Link>
        <ButtonFollow creator={details?.did} />
      </div>
    </div>
  )
}
