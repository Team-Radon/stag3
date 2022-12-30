
import { GridItemEight, GridItemFour, GridLayout } from '@/components/GridLayout'
import { ProfileHeader } from '@/components/ProfileHeader'
import { useRouter } from 'next/router';
import { GitCredentials } from '../../../components/GitCredentials'

const ProfileCredentials = () => {
  const {
    query: { did }
  } = useRouter();
  return (
    <GridLayout>
      <GridItemFour>
        <ProfileHeader />
      </GridItemFour>
      <GridItemEight>
        <GitCredentials did={did?.toString()} />
      </GridItemEight>
    </GridLayout>
  )
}
export default ProfileCredentials
