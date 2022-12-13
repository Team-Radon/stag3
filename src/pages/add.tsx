/* eslint-disable import/no-unresolved */

import SiteLayout from '@/components/SiteLayout'
import { AddProject } from '@/components/AddProject'

// Submit new project
const Add = () => (
  <SiteLayout>
    <main className="container mx-auto px-4 md:px-6 2xl:px-20">
      <div className="space-y-10 lg:flex  lg:gap-20 lg:space-y-0">
        <div className="sidebar lg:w-1/3">
          <AddProject />
        </div>
      </div>
    </main>
  </SiteLayout>

)
export default Add
