import { AddDiscussion } from '@/components/AddDiscussion'
import { GridItemEight, GridItemTwelve, GridLayout } from '@/components/GridLayout'

const Add = () => (
  <GridLayout>
    <GridItemTwelve>
      <div className="pt-12">
        <h1 className="text-2xl font-medium leading-6 text-gray-900">New discussion</h1>
      </div>
    </GridItemTwelve>
    <GridItemEight>
      <AddDiscussion />
    </GridItemEight>
  </GridLayout>
)
export default Add
