import { useRouter } from 'next/router';
import Error from 'next/error';
import { GridItemEight, GridLayout } from '@/components/GridLayout';
import Card from '@/components/UI/Card';
import { Comments } from '@/components/Comments';
import { useGetDiscussion } from '@/orbis/useGetDiscussion';

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
              {JSON.stringify(discussion)}
              <Card>
                {discussion && <Comments post={discussion?.data} />}
              </Card>
            </GridItemEight>
          </>
          )}
    </GridLayout>
  );
};

export default Discussion;
