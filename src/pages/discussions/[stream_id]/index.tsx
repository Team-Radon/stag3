import { useRouter } from 'next/router';
import Error from 'next/error';
import { PencilIcon } from '@heroicons/react/24/solid';
import Head from 'next/head';
import { GridItemEight, GridItemFour, GridLayout } from '@/components/GridLayout';
import Card from '@/components/UI/Card';
import { Comments } from '@/components/Comments';
import { useGetDiscussion } from '@/orbis/useGetDiscussion';
import { ButtonReaction } from '@/components/ButtonReaction';
import { Markdown } from '@/components/Markdown';
import { ProfileHeader } from '@/components/ProfileHeader';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/UI/Button';

const Discussion = () => {
  const {
    query: { stream_id },
    push
  } = useRouter();
  const user = useAppStore((state) => state.user)

  const {
    data: discussion,
    error,
    isLoading
  } = useGetDiscussion({ id: stream_id as string });

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
        : (
          <>
            <GridItemEight className="space-y-4">
              <Head>
                <title>
                  {`${discussion?.data?.content?.title} discussion`}
                </title>
              </Head>
              <Card padded>
                <div className="flex justify-end">
                  {discussion?.data?.creator_details?.did === user?.did &&
                  (
                  <Button onClick={async () => push(`${discussion?.data?.stream_id}/edit` || '#')} size="sm" icon={<PencilIcon className="w-3 h-3" />}>Edit</Button>
                  )}
                </div>
                <div className="relative flex gap-4">
                  <ButtonReaction creator={discussion?.data?.creator || ''} stream_id={discussion?.data?.stream_id || ''} count_downvotes={discussion?.data?.count_downvotes || 0} count_likes={discussion?.data?.count_likes || 0} />
                  <div>
                    <div>
                      {(discussion?.data?.content?.title)
                        ? (
                          <div className="text-base md:text-xl font-semibold">
                            {discussion?.data?.content?.title}
                          </div>
                          )
                        : (
                          <div className="text-base text-slate-400 md:text-xl font-semibold">
                            No Topic
                          </div>
                          )}
                    </div>
                    <div className="about prose-sm prose-p:last-of-type:!mb-0 max-w-none text-black">
                      <Markdown source={discussion?.data?.content?.body} />
                    </div>
                  </div>
                </div>
              </Card>
              <Card>
                {discussion && (
                  <Comments
                    context={process.env.DISCUSSION_CONTEXT || ''}
                    post={discussion?.data}
                  />
                )}
              </Card>
            </GridItemEight>
            <GridItemFour>
              <ProfileHeader profiledid={discussion?.data?.creator_details?.did} />
            </GridItemFour>
          </>
          )}
    </GridLayout>
  );
};

export default Discussion;
