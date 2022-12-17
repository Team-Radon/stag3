import { GetDiscussionsOptions, useGetDiscussions } from '@/orbis/useGetDiscussions';
import { DiscussionsItem } from './DiscussionsItem';
import Card from './UI/Card';
import { LoadingSpinner } from './UI/LoadingSpinner';

export const Discussions = ({ options }: { options?: GetDiscussionsOptions }) => {
  const { data: discussions, isLoading } = useGetDiscussions({ options });

  if (!discussions && isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  if (discussions?.data?.length === 0) {
    return <Card>Discussions not found</Card>
  }

  return (
    <>
      {discussions?.data?.map((discussion) => (
        <DiscussionsItem discussion={discussion} key={discussion.stream_id} />
      ))}
    </>
  )
};
