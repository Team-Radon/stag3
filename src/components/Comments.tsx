import { Comment, Post } from '@/helpers/interfaces';
import { useGetComments } from '@/orbis/useGetComments';
import clsx from 'clsx';
import { AddComment } from './AddComment';
import { CommentsItem } from './CommentsItem';
import Card from './UI/Card';

export const Comments = ({
  post,
  className
}: {
  post: Post
  className?: string
}) => {
  const { data: comments, isLoading } = useGetComments({ id: post.stream_id });

  if (!comments && isLoading) {
    return (
      <Card>
        <div className="lazy-loading mb-2 rounded-md w-[80%] h-[20px]" />
        <div className="lazy-loading rounded-md w-[50%] h-[20px]" />
      </Card>
    );
  }

  return (
    <div className={clsx('space-y-4', className)}>
      <h3>
        Comments (
        {post?.count_replies}
        )
      </h3>
      <AddComment comment={post as Comment} />
      <div className="divide-y divide-skin-border">
        {comments?.data?.map((comment, i: number) => (
          <CommentsItem key={i} comment={comment} />
        ))}
      </div>
    </div>
  );
};
