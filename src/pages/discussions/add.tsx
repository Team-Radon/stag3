import { AddDiscussion } from '@/components/AddDiscussion'
import { GridItemEight, GridItemFour, GridItemTwelve, GridLayout } from '@/components/GridLayout'
import Card from '@/components/UI/Card'

const Add = () => (
  <GridLayout>
    <GridItemTwelve>
      <div className="pt-12">
        <h1 className="text-2xl font-medium leading-6 text-gray-900">New discussion</h1>
        <p className="mt-2 text-sm text-gray-500">Reprehenderit et fugiat et dolor.</p>
      </div>
    </GridItemTwelve>
    <GridItemEight>
      <AddDiscussion />
    </GridItemEight>
    <GridItemFour>
      <Card>Sidebar</Card>
    </GridItemFour>
  </GridLayout>
)
export default Add
