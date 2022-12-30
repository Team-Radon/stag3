import { Discussions } from '@/components/Discussions';
import { GridItemEight, GridItemTwelve, GridLayout } from '@/components/GridLayout';
import { Button } from '@/components/UI/Button';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

const DiscussionsPage = () => {
  const { push } = useRouter();

  return (
    <GridLayout>
      <GridItemTwelve>
        <div className="md:w-3/4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">Backstage Discussions</h1>
          <p className="w-4/5 mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">Talk with other Blockchain builders to get tips and feedback on various topics before you take on The Stage with your project.</p>
        </div>
        <div className="mt-5 sm:mt-8">
          <Button size="lg" primary icon={<ChatBubbleLeftRightIcon className="w-6 h-6" />} onClick={async () => push('/discussions/add')}>New Discussion</Button>
        </div>
      </GridItemTwelve>
      <GridItemEight>
        <Discussions />
      </GridItemEight>
    </GridLayout>
  )
};

export default DiscussionsPage;
