
import { ProductItem } from '../components/ProductItem'
import { ActiveUsers } from '../components/ActiveUsers'

import Hero from '../components/Hero'
import { GitCredentials } from '../components/GitCredentials'
import SiteLayout from '../components/SiteLayout'

const Home = () => (
  <SiteLayout>
    <main className="container mx-auto px-4 md:px-6 2xl:px-20">
      <Hero />
      <div className="space-y-10 lg:flex lg:gap-20 lg:space-y-0">
        <ul className="list space-y-4 md:space-y-6 lg:w-2/3">
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </ul>
        <div className="sidebar space-y-4 md:space-y-6 lg:w-1/3">
          <GitCredentials />
          <ActiveUsers />
        </div>
      </div>
    </main>
  </SiteLayout>

)
export default Home
