/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
import { ProfileFollower } from '@/components/ProfileFollower';
import { GridItemEight, GridItemFour, GridLayout } from '@/components/GridLayout';
import { ProfileHeader } from '@/components/ProfileHeader';

const Follower = () => (
  <GridLayout>
    <GridItemFour>
      <ProfileHeader />
    </GridItemFour>
    <GridItemEight>
      <ProfileFollower />
    </GridItemEight>
  </GridLayout>
)
export default Follower
