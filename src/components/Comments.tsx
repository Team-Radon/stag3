import { Post } from '@/helpers/interfaces';
import { useGetComments } from '@/orbis/useGetComments';
import { useOrbis } from '@/orbis/useOrbis';
import clsx from 'clsx';
import { useState } from 'react';
import { CommentForm } from './CommentForm';
import { CommentsItem } from './CommentsItem';
import Card from './UI/Card';

export const Comments = ({
  post,
  className
}: {
  post: Post
  className?: string
}) => {
  const orbis = useOrbis();
  const { data: comments, isLoading } = useGetComments({ id: post.stream_id });

  const [activeComment, setActiveComment] = useState<{ id: string, type: 'replying' | 'editing' } | null>(null)

  if (!comments && isLoading) {
    return (
      <Card>
        <div className="lazy-loading mb-2 rounded-md w-[80%] h-[20px]" />
        <div className="lazy-loading rounded-md w-[50%] h-[20px]" />
      </Card>
    );
  }

  const addComment = async (body: string, master?: string) => {
    await orbis.createPost({
      body,
      reply_to: master ?? post?.stream_id,
      master: master ?? post?.stream_id,
      context: process.env.PROJECT_CONTEXT
    })
  }

  return (
    <div className={clsx('space-y-4', className)}>
      <h3>
        Comments (
        {post?.count_replies}
        )
      </h3>
      <CommentForm handleSubmit={addComment} />
      <div className="divide-y divide-skin-border">
        {comments?.data?.map((comment, i: number) => (
          <CommentsItem key={i} comment={comment} addComment={addComment} activeComment={activeComment} setActiveComment={setActiveComment} />
        ))}
      </div>
    </div>
  );
};
