import { useRouter } from 'next/router';
import Error from 'next/error';
import { GridItemTwelve, GridLayout } from '@/components/GridLayout';
import { useGetProject } from '../../orbis/useGetProject';
import { useUsername } from '../../hooks/useUsername';

const Project = () => {
  const {
    query: { stream_id }
  } = useRouter();

  const {
    data: post,
    error,
    isLoading
  } = useGetProject({ id: stream_id as string });

  const { username } = useUsername(post?.data?.creator_details);

  if (error) {
    return <Error statusCode={404} />;
  }

  return (
    <GridLayout>
      <GridItemTwelve>
        {post && isLoading
          ? <div>loading</div>
          : (
            <div>
              <h1>{username}</h1>
              <div>{JSON.stringify(post)}</div>
            </div>
            )}
      </GridItemTwelve>
    </GridLayout>
  );
};

export default Project;
