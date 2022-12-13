
import { Projects } from '@/components/Projects'
import { ActiveUsers } from '@/components/ActiveUsers'
import Hero from '@/components/Hero'
import { GitCredentials } from '@/components/GitCredentials'
import SiteLayout from '@/components/SiteLayout'
import { useRouter } from 'next/router'

const ListByTag = () => {
  const {
    query: { slug }
  } = useRouter();
  const options = { tag: slug?.toString() }
  return (
    <SiteLayout>
      <main className="container mx-auto px-4 md:px-6 2xl:px-20">
        <Hero />
        <div className="space-y-10 lg:flex lg:gap-20 lg:space-y-0">
          <div className="space-y-4 md:space-y-6 lg:w-2/3">
            <Projects options={options} />
          </div>
          <div className="sidebar lg:w-1/3">
            <ActiveUsers />
            <GitCredentials />
          </div>
        </div>
      </main>
    </SiteLayout>

  )
}
export default ListByTag
