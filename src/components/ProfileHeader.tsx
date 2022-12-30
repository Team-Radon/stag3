import { useRouter } from 'next/router';
import Error from 'next/error';

import { useGetProfile } from '@/orbis/useGetProfile';
import { useAppStore } from '@/store/useAppStore';
import { useUsername } from '@/hooks/useUsername';
import Card from './UI/Card';
import { LoadingSpinner } from './UI/LoadingSpinner';
import { Button } from './UI/Button';
import { AvatarUser } from './AvatarUser';
import { ButtonFollow } from './ButtonFollow';

export const ProfileHeader = () => {
  const {
    query: { did },
    push
  } = useRouter();

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
            <div className="truncate font-semibold text-center mt-2">{username}</div>
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
              <div className="flex items-center gap-2 text-xs" onClick={async () => push(`/profile/${profile?.data?.did}/follower`)}>
                <span className="font-semibold">{profile?.data?.count_followers}</span>
                <span className="uppercase">Followers</span>
              </div>
              <div className="flex items-center gap-2 text-xs" onClick={async () => push(`/profile/${profile?.data?.did}/following`)}>
                <span className="font-semibold">{profile?.data?.count_following}</span>
                <span className="uppercase">Following</span>
              </div>
            </div>
          </Card>
          )}
    </>
  )
}
