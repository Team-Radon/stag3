import { GridItemEight, GridItemFour, GridLayout } from '@/components/GridLayout';
import { ProfileHeader } from '@/components/ProfileHeader';
import { Projects } from '@/components/Projects';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react'
import { Discussions } from '@/components/Discussions';
import { ProfileFollower } from '@/components/ProfileFollower';
import { ProfileFollowing } from '@/components/ProfileFollowing';
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
        <Tab.Group>
          <Tab.List className="isolate flex divide-x divide-gray-200 rounded-lg shadow overflow-hidden mb-4 md:mb-6">
            <Tab className={({ selected }) => `group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 ${selected ? 'text-accent font-semibold bg-gray-50' : 'text-gray-500 hover:text-gray-700'}`}>Projects</Tab>
            <Tab className={({ selected }) => `group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 ${selected ? 'text-accent font-semibold bg-gray-50' : 'text-gray-500 hover:text-gray-700'}`}>Discussions</Tab>
            <Tab className={({ selected }) => `group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 ${selected ? 'text-accent font-semibold bg-gray-50' : 'text-gray-500 hover:text-gray-700'}`}>Followers</Tab>
            <Tab className={({ selected }) => `group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 ${selected ? 'text-accent font-semibold bg-gray-50' : 'text-gray-500 hover:text-gray-700'}`}>Following</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <Projects options={{ did: profile?.data?.did }} />
            </Tab.Panel>
            <Tab.Panel>
              <Discussions options={{ did: profile?.data?.did }} />
            </Tab.Panel>
            <Tab.Panel>
              <ProfileFollower />
            </Tab.Panel>
            <Tab.Panel>
              <ProfileFollowing />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </GridItemEight>
    </GridLayout>
  );
};

export default Profile;
