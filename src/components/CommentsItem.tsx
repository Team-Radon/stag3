import { Comment } from '@/helpers/interfaces';
import { useGetComments } from '@/orbis/useGetComments';
import { useAppStore } from '@/store/useAppStore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Dispatch, SetStateAction } from 'react';
import { BaseUser } from './BaseUser';
import { CommentForm } from './CommentForm';
import { UserPophover } from './UserPophover';
import { ButtonReaction } from './ButtonReaction';

dayjs.extend(relativeTime);

interface CommentsItemProps {
  context: string
  comment: Comment
  master?: string
  activeComment: { id: string, type: 'replying' | 'editing' } | null
  setActiveComment: Dispatch<SetStateAction<{ id: string, type: 'replying' | 'editing' } | null>>
  addComment: (body: string, master: string, replyTo?: string) => void
  updateComment: (commentId: string, body: string, master?: string) => void
}

export const CommentsItem = ({ context, comment, master = undefined, activeComment, setActiveComment, addComment, updateComment }: CommentsItemProps) => {
  const user = useAppStore((state) => state.user)
  const { data: replies } = useGetComments({ context, id: comment.stream_id });
  const isReplying = activeComment && activeComment.type === 'replying' && activeComment.id === comment.stream_id
  const isEditing = activeComment && activeComment.id === comment.stream_id && activeComment.type === 'editing';
  const canEdit = user?.did === comment.creator;
  const replyId = master || comment.stream_id
  const replyTo = comment.stream_id

  return (
    <div className="flex gap-3">
      <div className="user shrink-0">
        <UserPophover iconOnly details={comment.creator_details} />
      </div>
      <div className="w-full">
        <>
          {!isEditing && (
            <>
              <div className="flex items-center justify-between">
                <UserPophover userOnly details={comment.creator_details} />
                <div className="text-xs">{dayjs(new Date(comment.timestamp * 1000)).fromNow()}</div>
              </div>
              <p className="break-words prose-sm max-w-none mt-2">
                {comment.content.body}
              </p>
            </>
          )}
          {isEditing && (
            <CommentForm
              initialValue={comment.content.body}
              label="Editing"
              parent={comment}
              handleSubmit={(text) => updateComment(comment.stream_id, text, master)}
              handleCancel={() => setActiveComment(null)}
            />
          )}
        </>

        <div className="actions flex items-center gap-4 mt-2 -ml-2">
          <ButtonReaction className="!flex-row" creator={comment.creator} stream_id={comment.stream_id} count_downvotes={comment.count_downvotes} count_likes={comment.count_likes} />
          <button className="text-sm font-medium" onClick={() => setActiveComment({ id: comment.stream_id, type: 'replying' })}>Reply</button>
          {canEdit && (
            <button className="text-sm font-medium" onClick={() => setActiveComment({ id: comment.stream_id, type: 'editing' })}>Edit</button>
          )}
        </div>

        {isReplying && (
          <CommentForm
            label={(
              <div className="flex items-center gap-2 mt-4 mb-1">
                <div className="text-sm font-medium">Replying to:</div>
                <BaseUser details={comment.creator_details} />
              </div>
          )}
            parent={comment}
            handleSubmit={(text) => addComment(text, replyId, replyTo)}
          />
        )}

        {replies && replies?.data?.length > 0 && (
          <div className="pt-8 pl-4 mt-4 border-l-4 border-gray-100 space-y-6">
            {replies?.data?.map((reply) => (
              <CommentsItem
                key={reply.stream_id}
                context={context}
                master={comment.stream_id}
                addComment={addComment}
                updateComment={updateComment}
                comment={reply}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
};
