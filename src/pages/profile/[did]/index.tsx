import { GridItemEight, GridItemFour, GridLayout } from '@/components/GridLayout';
import { ProfileHeader } from '@/components/ProfileHeader';
import { Projects } from '@/components/Projects';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useGetProfile } from '../../../orbis/useGetProfile';

const Profile = () => {
  const {
    query: { did }
  } = useRouter();

  const {
    data: profile,
    error
  } = useGetProfile({ id: did as string });

  if (error) {
    return <Error statusCode={404} />;
  }

  return (
    <GridLayout>
      <GridItemFour>
        <ProfileHeader />
      </GridItemFour>
      <GridItemEight>
        <Projects options={{ did: profile?.data?.did }} />
      </GridItemEight>
    </GridLayout>
  );
};

export default Profile;
