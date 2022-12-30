/* eslint-disable import/no-unresolved */
import { AddProject } from '@/components/AddProject'
import { GitCredentials } from '@/components/GitCredentials'
import { GridItemEight, GridItemFour, GridItemTwelve, GridLayout } from '@/components/GridLayout'

const Add = () => (
  <GridLayout>
    <GridItemTwelve>
      <div className="pt-12">
        <h1 className="text-2xl font-medium leading-6 text-gray-900">Submit a Project</h1>
        <p className="mt-2 text-sm text-gray-500">Reprehenderit et fugiat et dolor.</p>
      </div>
    </GridItemTwelve>
    <GridItemEight>
      <AddProject />
    </GridItemEight>
    <GridItemFour>
      <GitCredentials />
    </GridItemFour>
  </GridLayout>
)
export default Add
