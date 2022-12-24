
import { Projects } from '@/components/Projects'
import { GridItemEight, GridItemFour, GridItemTwelve, GridLayout } from '@/components/GridLayout'
import { GroupMembers } from '@/components/GroupMembers'
import Hero from '../components/Hero'
import { GitCredentials } from '../components/GitCredentials'

const Home = () => (
  <GridLayout>
    <GridItemTwelve>
      <Hero />
    </GridItemTwelve>
    <GridItemEight className="flex flex-col gap-4 md:gap-6">
      <Projects />
    </GridItemEight>
    <GridItemFour className="flex flex-col gap-4 md:gap-6">
      <GroupMembers />
      <GitCredentials />
    </GridItemFour>
  </GridLayout>
)

export default Home
