
import { Projects } from '@/components/Projects'
import { GroupMembers } from '@/components/GroupMembers'
import { GridItemEight, GridItemFour, GridItemTwelve, GridLayout } from '@/components/GridLayout'

import { useRouter } from 'next/router'

const ListByTag = () => {
  const {
    query: { slug }
  } = useRouter();

  return (
    <GridLayout>
      <GridItemTwelve>
        <div className="mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl capitalize">
            {slug}
          </h1>
        </div>
      </GridItemTwelve>
      <GridItemEight>
        <Projects options={{ tag: slug as string }} />
      </GridItemEight>
      <GridItemFour>
        <GroupMembers />
      </GridItemFour>
    </GridLayout>
  )
}
export default ListByTag
