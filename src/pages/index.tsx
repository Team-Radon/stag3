
import { Projects } from '@/components/Projects'
import { GridItemEight, GridItemFour, GridItemTwelve, GridLayout } from '@/components/GridLayout'
import { GroupMembers } from '../components/GroupMembers'
import Hero from '../components/Hero'

const Home = () => (
  <GridLayout>
    <GridItemTwelve>
      <Hero />
    </GridItemTwelve>
    <GridItemEight className="mt-8 md:mt-0">
      <Projects />
    </GridItemEight>
    <GridItemFour>
      <GroupMembers />
    </GridItemFour>
  </GridLayout>
)

export default Home
