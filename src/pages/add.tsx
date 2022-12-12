
import { ActiveUsers } from '../components/ActiveUsers'

import { GitCredentials } from '../components/GitCredentials'
import SiteLayout from '../components/SiteLayout'
// Submit new project
const Add = () => (
  <SiteLayout>
    <main className="container mx-auto px-4 md:px-6 2xl:px-20">
      <div className="space-y-10 lg:flex  lg:gap-20 lg:space-y-0">
        <div className="sidebar lg:w-1/3">
          Submit a Project
          <ActiveUsers />
          <GitCredentials />
        </div>
      </div>
    </main>
  </SiteLayout>

)
export default Add
