import { AvatarUser } from '@/components/AvatarUser';
import { GridItemEight, GridItemFour, GridLayout } from '@/components/GridLayout';
import { Projects } from '@/components/Projects';
import { Button } from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import { useAppStore } from '@/store/useAppStore';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useUsername } from '../../../hooks/useUsername';
import { useGetProfile } from '../../../orbis/useGetProfile';

const Profile = () => {
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

  return (
    <GridLayout>
      <GridItemFour>
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
                  <div className="flex flex-grow items-start gap-x-2 lg:mb-4 justify-center mt-2">
                    <Button>Follow</Button>
                  </div>
                  )}
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold">{profile?.data?.count_followers}</span>
                  <span className="uppercase">Followers</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold">{profile?.data?.count_following}</span>
                  <span className="uppercase">Following</span>
                </div>
              </div>
            </Card>
            )}
      </GridItemFour>
      <GridItemEight>
        <Projects options={{ did: profile?.data?.did }} />
      </GridItemEight>
    </GridLayout>
  );
};

export default Profile;
