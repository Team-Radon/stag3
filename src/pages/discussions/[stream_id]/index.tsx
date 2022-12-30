import { useRouter } from 'next/router';
import Error from 'next/error';
import { GridItemEight, GridLayout } from '@/components/GridLayout';
import Card from '@/components/UI/Card';
import { Comments } from '@/components/Comments';
import { useGetDiscussion } from '@/orbis/useGetDiscussion';
import { ButtonReaction } from '@/components/ButtonReaction';
import { Markdown } from '@/components/Markdown';

const Discussion = () => {
  const {
    query: { stream_id }
  } = useRouter();

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
              <Card padded>
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
                {discussion && <Comments context={process.env.DISCUSSION_CONTEXT || ''} post={discussion?.data} />}
              </Card>
            </GridItemEight>
          </>
          )}
    </GridLayout>
  );
};

export default Discussion;
