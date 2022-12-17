import { Discussions } from '@/components/Discussions';
import { GridItemEight, GridLayout } from '@/components/GridLayout';

const DiscussionsPage = () => (
  <GridLayout className="pt-16">
    <GridItemEight>
      <Discussions />
    </GridItemEight>
  </GridLayout>
);

export default DiscussionsPage;
