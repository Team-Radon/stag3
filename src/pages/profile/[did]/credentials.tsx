
import { GridItemEight, GridItemFour, GridLayout } from '@/components/GridLayout'
import { ProfileHeader } from '@/components/ProfileHeader'
import { GitCredentials } from '../../../components/GitCredentials'

const ProfileCredentials = () => (
  <GridLayout>
    <GridItemFour>
      <ProfileHeader />
    </GridItemFour>
    <GridItemEight>
      <GitCredentials />
    </GridItemEight>
  </GridLayout>
)
export default ProfileCredentials
