import { useRouter } from 'next/router';
import Error from 'next/error';

import { useGetProfile } from '@/orbis/useGetProfile';
import { useAppStore } from '@/store/useAppStore';
import { useUsername } from '@/hooks/useUsername';
import Link from 'next/link';
import Card from './UI/Card';
import { LoadingSpinner } from './UI/LoadingSpinner';
import { Button } from './UI/Button';
import { AvatarUser } from './AvatarUser';
import { ButtonFollow } from './ButtonFollow';

interface Props {
  profiledid?: string
}
export const ProfileHeader = ({ profiledid }: Props) => {
  let {
    query: { did },
    push
  } = useRouter();
  did = did || profiledid;

  const {
    data: profile,
    isLoading,
    error
  } = useGetProfile({ id: did as string });
  const user = useAppStore((state) => state.user)

  const { username } = useUsername(profile?.data?.details);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!profile && isLoading) {
    return (
      <LoadingSpinner />
    );
  }
  return (
    <>
      {profile && isLoading
        ? <div>loading</div>
        : (
          <Card padded className="md:sticky top-[154px]">
            <AvatarUser
              details={profile?.data?.details}
              size="80"
            />
            <div className="mt-2 text-center">
              <Link href={`/profile/${profile?.data?.details?.did}`} className="truncate font-semibold hover:text-accent duration-100" title="View Profile">
                {username}
              </Link>
            </div>
            {user?.did === did
              ? (
                <div className="flex flex-grow items-start gap-x-2 lg:mb-4 justify-center mt-2">
                  <Button size="sm" onClick={async () => push(`/profile/${user?.did}/edit`)}>
                    Edit profile
                  </Button>
                </div>
                )
              : (
                <div className="flex flex-grow items-center gap-x-2 lg:mb-4 justify-center mt-2">
                  <ButtonFollow creator={profile?.data?.did || ''} />
                </div>
                )}
            <div className="flex items-center justify-center gap-4 mt-6">
              <Link href={`/profile/${profile?.data?.did}/follower`} className="flex items-center gap-2 text-xs hover:text-accent duration-100">
                <span className="font-semibold">{profile?.data?.count_followers}</span>
                <span className="uppercase">Followers</span>
              </Link>
              <Link href={`/profile/${profile?.data?.did}/following`} className="flex items-center gap-2 text-xs hover:text-accent duration-100">
                <span className="font-semibold">{profile?.data?.count_following}</span>
                <span className="uppercase">Following</span>
              </Link>
            </div>
          </Card>
          )}
    </>
  )
}
