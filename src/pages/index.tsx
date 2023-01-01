
import Head from 'next/head';
import { Projects } from '@/components/Projects'
import { GridItemEight, GridItemFour, GridItemTwelve, GridLayout } from '@/components/GridLayout'
import { GroupMembers } from '../components/GroupMembers'
import Hero from '../components/Hero'

const Home = () => (
  <GridLayout>
    <Head>
      <title>
        STAG3 | Your web3 product in the limelight
      </title>
      <meta
        name="description"
        content="Present your web3 ideas and projects on Stag3 and get valuable feedback from fellow blockchain builders."
      />
    </Head>
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
