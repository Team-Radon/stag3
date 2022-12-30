
// eslint-disable-next-line import/no-unresolved
import { ProfileFollowing } from '@/components/ProfileFollowing';
import { GridItemEight, GridItemFour, GridLayout } from '@/components/GridLayout';
import { ProfileHeader } from '@/components/ProfileHeader';

const Following = () => (
  <GridLayout>
    <GridItemFour>
      <ProfileHeader />
    </GridItemFour>
    <GridItemEight>
      <ProfileFollowing />
    </GridItemEight>
  </GridLayout>
)
export default Following
