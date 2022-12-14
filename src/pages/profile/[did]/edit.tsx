import { GitCredentials } from '@/components/GitCredentials';
import { GridItemEight, GridItemFour, GridLayout } from '@/components/GridLayout';
import { ProfileForm } from '@/components/ProfileForm';
import Card from '@/components/UI/Card';
import { useAppStore } from '@/store/useAppStore';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useGetProfile } from '../../../orbis/useGetProfile';

const Profile = () => {
  const {
    query: { did }
  } = useRouter();

  const {
    data: profile,
    isLoading
  } = useGetProfile({ id: did as string });

  const user = useAppStore((state) => state.user)

  if (!profile && isLoading) {
    return (
      <div>Loading</div>
    )
  }

  if (profile?.data?.did !== user?.did) {
    return <Error statusCode={404} />;
  }

  return (
    <GridLayout>
      <GridItemEight>
        <Card className="overflow-hidden">
          {profile && <ProfileForm profile={profile?.data} />}
        </Card>
      </GridItemEight>
      <GridItemFour>
        <GitCredentials />
      </GridItemFour>
    </GridLayout>
  );
};

export default Profile;
