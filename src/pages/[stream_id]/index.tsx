import { useRouter } from 'next/router';
import Error from 'next/error';
import { GridItemTwelve, GridLayout } from '@/components/GridLayout';
import Card from '@/components/UI/Card';
import { AvatarUser } from '@/components/AvatarUser';
import { Markdown } from '@/components/Markdown';
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
        <div className="lg:flex">
          <div className="relative w-full pr-0 lg:w-3/4 lg:pr-5">
            {!post && isLoading
              ? (
                <div className="space-y-3">
                  <div className="lazy-loading rounded-md w-full h-[34px]" />
                  <div className="lazy-loading rounded-md w-[40%] h-[34px]" />
                  <div className="lazy-loading rounded-md w-[65px] h-[28px]" />
                </div>
                )
              : (
                <>
                  <div className="px-3 md:px-0">
                    <h1 className="mb-3 break-words text-xl leading-8 sm:text-2xl">
                      {post?.data?.content.title}
                    </h1>

                    <Markdown source={post?.data?.content?.data?.description_long} />
                  </div>
                </>
                )}
          </div>

          <div className="float-right w-full lg:w-1/4">
            <div className="mb-4 lg:fixed lg:mb-0 lg:w-[240px]">
              <Card className="overflow-hidden">
                <div className="lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
                  <div className="truncate lg:text-center">
                    <div className="flex truncate lg:mt-3 lg:block">
                      <div className="flex lg:justify-center">
                        <AvatarUser
                          details={post?.data?.creator_details}
                          size="80"
                          className="lg:my-3"
                        />
                      </div>
                      <div className="mx-3 flex flex-col justify-center truncate text-left lg:block lg:text-center">
                        <h3 className="mb-[2px] flex items-center lg:justify-center">
                          <div className="mr-1 truncate">{username}</div>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </GridItemTwelve>
    </GridLayout>
  );
};

export default Project;
