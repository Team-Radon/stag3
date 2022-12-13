import { useRouter } from 'next/router';
import Error from 'next/error';
import SiteLayout from '@/components/SiteLayout';
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
    <SiteLayout>
      <main className="container mx-auto px-4 md:px-6 2xl:px-20">
        <div className="space-y-10 lg:flex  lg:gap-20 lg:space-y-0">
          <div className="sidebar lg:w-1/3">
            {post && isLoading
              ? <div>loading</div>
              : (
                <div>
                  <h1>{username}</h1>
                  <div>{JSON.stringify(post)}</div>
                </div>
                )}
          </div>
        </div>
      </main>
    </SiteLayout>
  );
};

export default Project;
