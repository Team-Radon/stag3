import { Comment, Post } from '@/helpers/interfaces';
import { useAddCommentMutation } from '@/orbis/mutations/useAddComment';
import { useUpdateCommentMutation } from '@/orbis/mutations/useUpdateComment';
import { useGetComments } from '@/orbis/useGetComments';
import { useAppStore } from '@/store/useAppStore';
import { useQueryClient } from '@tanstack/react-query';
import { useId, useState } from 'react';
import { AvatarUser } from './AvatarUser';
import { CommentForm } from './CommentForm';
import { CommentsItem } from './CommentsItem';
import Card from './UI/Card';

export const Comments = ({
  post,
  context
}: {
  post: Post
  context: string
}) => {
  const queryClient = useQueryClient();
  const { data: comments, isLoading } = useGetComments({ id: post.stream_id, context });
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
                context
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
    onError: (_err, data, ctx) => {
      queryClient.setQueryData(
        ['comments', data.master],
        ctx?.snapshotOfPreviousComments
      );
    }
  });

  const { mutate: updateCommentMutation } = useUpdateCommentMutation({
    onMutate: async (data) => {
      await queryClient.cancelQueries(['comments', data.master]);
      const snapshotOfPreviousComments = queryClient.getQueryData([
        'comments',
        data.id
      ]);

      queryClient.setQueryData<{ data: Comment[] }>(['comments', data.master], (old) => {
        if (typeof old !== 'undefined') {
          const optimisticData = old.data.map((comment) => {
            if (comment.stream_id === data.id) {
              return {
                ...comment,
                content: {
                  ...comment.content,
                  body: data.body
                }
              }
            }
            return comment
          })

          return { data: optimisticData };
        }

        return undefined
      });

      return { snapshotOfPreviousComments };
    },
    onError: (_err, data, ctx) => {
      queryClient.setQueryData(
        ['comments', data.master],
        ctx?.snapshotOfPreviousComments
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

  const updateComment = async (commentId: string, body: string, master?: string) => {
    updateCommentMutation({ id: commentId, body, master: master ?? post?.stream_id })
    setActiveComment(null)
  }

  return (
    <>
      <div className="font-medium leading-6 text-black border-b border-gray-200 px-4 pb-4 md:px-6 mt-6">
        Discussion
        (
        {post?.count_replies}
        )
      </div>

      {/* comment textarea */}
      <div className="flex gap-4 px-4 md:px-6 py-6 bg-gray-100/50">
        <AvatarUser
          className="!inline-flex shrink-0 !items-start py-2"
          details={user?.details}
          size="32"
        />
        <CommentForm
          label=""
          parent={post as Comment}
          handleSubmit={addComment}
        />
      </div>

      {/* comment items */}
      <div className="px-4 md:px-6 mt-8 mb-6 space-y-8">
        {comments?.data?.map((comment) => (
          <CommentsItem
            key={comment.stream_id}
            context={context}
            comment={comment}
            addComment={addComment}
            updateComment={updateComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
          />
        ))}
      </div>
    </>
  );
};
