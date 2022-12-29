
import { Projects } from '@/components/Projects'
import { GroupMembers } from '@/components/GroupMembers'
import Hero from '@/components/Hero'
import { GitCredentials } from '@/components/GitCredentials'
import { GridItemEight, GridItemFour, GridItemTwelve, GridLayout } from '@/components/GridLayout'

import { useRouter } from 'next/router'

const ListByTag = () => {
  const {
    query: { slug }
  } = useRouter();

  return (
    <GridLayout>
      <GridItemTwelve>
        <Hero />
      </GridItemTwelve>
      <GridItemEight>
        <Projects options={{ tag: slug as string }} />
      </GridItemEight>
      <GridItemFour>
        <GroupMembers />
        <GitCredentials />
      </GridItemFour>
    </GridLayout>
  )
}
export default ListByTag
