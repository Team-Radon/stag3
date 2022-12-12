
import { GitCredentials } from '../../../components/GitCredentials'
import SiteLayout from '../../../components/SiteLayout'

const ProfileCredentials = () => (
  <SiteLayout>
    <main className="container mx-auto px-4 md:px-6 2xl:px-20">
      <div className="space-y-10 lg:flex  lg:gap-20 lg:space-y-0">
        <div className="sidebar lg:w-1/3">
          <GitCredentials />
        </div>
      </div>
    </main>
  </SiteLayout>

)
export default ProfileCredentials
