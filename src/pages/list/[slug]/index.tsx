
import { Projects } from '@/components/Projects'
import { ActiveUsers } from '@/components/ActiveUsers'
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
      <GridItemEight className="flex flex-col gap-4 md:gap-6">
        <Projects options={{ tag: slug as string }} />
      </GridItemEight>
      <GridItemFour className="flex flex-col gap-4 md:gap-6">
        <ActiveUsers />
        <GitCredentials />
      </GridItemFour>
    </GridLayout>
  )
}
export default ListByTag
