/* eslint-disable @next/next/no-img-element */
import Error from 'next/error';
import { GridItemEight, GridItemTwelve, GridLayout } from '@/components/GridLayout';

import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'next/router';
import { useGetDiscussion } from '@/orbis/useGetDiscussion';
import { EditDiscussion } from '@/components/EditDiscussion';

const Project = () => {
  const user = useAppStore((state) => state.user);
  const { query: { stream_id } } = useRouter();

  const { data: discussion, isLoading, error } = useGetDiscussion({ id: stream_id as string })

  if (error) {
    return <Error statusCode={404} />;
  }

  return (
    <GridLayout className="pt-16">
      {!discussion && isLoading
        ? (
          <GridItemEight>
            <div>Loading</div>
          </GridItemEight>
          )
        : discussion && (
          <>
            <GridItemTwelve>
              <div className="pt-12">
                <h1 className="text-2xl font-medium leading-6 text-gray-900">Update Discussion</h1>
                <p className="mt-2 text-sm text-gray-500">{discussion?.data?.content?.title}</p>
              </div>
            </GridItemTwelve>
            <GridItemEight>
              {discussion?.data?.creator_details?.did === user?.did &&
              <EditDiscussion discussion={discussion?.data} /> }
            </GridItemEight>
          </>
        )}
    </GridLayout>
  );
};

export default Project;
