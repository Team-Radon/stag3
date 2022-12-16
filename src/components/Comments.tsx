import { Comment, Post } from '@/helpers/interfaces';
import { useAddCommentMutation } from '@/orbis/mutations/useAddComment';
import { useGetComments } from '@/orbis/useGetComments';
import { useAppStore } from '@/store/useAppStore';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useId, useState } from 'react';
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
  const queryClient = useQueryClient();
  const { data: comments, isLoading } = useGetComments({ id: post.stream_id });
  const user = useAppStore((state) => state.user)
  const id = useId();

  const [activeComment, setActiveComment] = useState<{ id: string, type: 'replying' | 'editing' } | null>(null)

  const { mutate: addCommentMutation } = useAddCommentMutation({
    onMutate: async (data) => {
      await queryClient.cancelQueries(['comments', data.master]);
      const snapshotOfPreviousComments = queryClient.getQueryData([
        'comments',
        data.master
      ]);
      queryClient.setQueryData(['comments', data.master], (old: any) => {
        const optimisticData = {
          ...old,
          data: [
            {
              creator: user?.did,
              creator_details: user?.details,
              temporary_id: id,
              stream_id: 'none',
              content: {
                body: data.body,
                reply_to: data.replyTo,
                master: data.master,
                context: process.env.PROJECT_CONTEXT
              },
              master: data.master,
              timestamp: Math.floor(Date.now() / 1000)
            },
            ...old.data
          ]
        };

        return optimisticData;
      });
      return { snapshotOfPreviousComments };
    },
    onError: (_err, data, context) => {
      queryClient.setQueryData(
        ['comments', data.master],
        context?.snapshotOfPreviousComments
      );
    }
  });

  if (!comments && isLoading) {
    return (
      <Card>
        <div className="lazy-loading mb-2 rounded-md w-[80%] h-[20px]" />
        <div className="lazy-loading rounded-md w-[50%] h-[20px]" />
      </Card>
    );
  }

  const addComment = async (body: string, master: string, replyTo?: string) => {
    addCommentMutation({ body, master, replyTo: replyTo ?? master ?? post?.stream_id })
  }

  return (
    <div className={clsx('space-y-4', className)}>
      <h3>
        Comments (
        {post?.count_replies}
        )
      </h3>
      <CommentForm parent={post as Comment} handleSubmit={addComment} />
      <div className="divide-y divide-skin-border">
        {comments?.data?.map((comment, i: number) => (
          <CommentsItem key={i} comment={comment} addComment={addComment} activeComment={activeComment} setActiveComment={setActiveComment} />
        ))}
      </div>
    </div>
  );
};
