/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import Error from 'next/error';
import { GridItemEight, GridItemTwelve, GridLayout } from '@/components/GridLayout';

import { useAppStore } from '@/store/useAppStore';
import { EditProject } from '@/components/EditProject';
import { useGetProject } from '../../orbis/useGetProject';

const Project = () => {
  const {
    query: { stream_id }
  } = useRouter();

  // current login user
  const user = useAppStore((state) => state.user);

  const {
    data: post,
    error,
    isLoading
  } = useGetProject({ id: stream_id as string });

  if (error) {
    return <Error statusCode={404} />;
  }

  return (
    <GridLayout className="pt-16">
      {!post && isLoading
        ? (
          <GridItemEight>
            <div>Loading</div>
          </GridItemEight>
          )
        : post && (
          <>
            <GridItemTwelve>
              <div className="pt-12">
                <h1 className="text-2xl font-medium leading-6 text-gray-900">Update Project</h1>
                <p className="mt-2 text-sm text-gray-500">{post?.data?.content?.title}</p>
              </div>
            </GridItemTwelve>
            <GridItemEight>
              {post?.data?.creator_details?.did === user?.did &&
              <EditProject post={post?.data} /> }
            </GridItemEight>
          </>
        )}
    </GridLayout>
  );
};

export default Project;
