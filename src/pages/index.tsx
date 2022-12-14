
import { Projects } from '@/components/Projects'
import { GridItemEight, GridItemFour, GridItemTwelve, GridLayout } from '@/components/GridLayout'
import { ActiveUsers } from '../components/ActiveUsers'
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
      <ActiveUsers />
      <GitCredentials />
    </GridItemFour>
  </GridLayout>
)
export default Home
