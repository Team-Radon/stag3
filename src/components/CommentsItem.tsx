import { Comment } from '@/helpers/interfaces';
import { useGetComments } from '@/orbis/useGetComments';
import { useAppStore } from '@/store/useAppStore';
import { HandThumbUpIcon, PencilIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Dispatch, SetStateAction } from 'react';
import { BaseUser } from './BaseUser';
import { CommentForm } from './CommentForm';
import Card from './UI/Card';
import { UserPophover } from './UserPophover';

dayjs.extend(relativeTime);

interface CommentsItemProps {
  comment: Comment
  master?: string
  activeComment: { id: string, type: 'replying' | 'editing' } | null
  setActiveComment: Dispatch<SetStateAction<{ id: string, type: 'replying' | 'editing' } | null>>
  addComment: (body: string, master: string, replyTo?: string) => void
  updateComment: (commentId: string, body: string, master?: string) => void
}

export const CommentsItem = ({ comment, master = undefined, activeComment, setActiveComment, addComment, updateComment }: CommentsItemProps) => {
  const user = useAppStore((state) => state.user)
  const { data: replies } = useGetComments({ id: comment.stream_id });
  const isReplying = activeComment && activeComment.type === 'replying' && activeComment.id === comment.stream_id
  const isEditing = activeComment && activeComment.id === comment.stream_id && activeComment.type === 'editing';
  const canEdit = user?.did === comment.creator;
  const replyId = master || comment.stream_id
  const replyTo = comment.stream_id

  return (
    <Card className="border-none">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <UserPophover details={comment.creator_details} />
        </div>
        <span>{dayjs(new Date(comment.timestamp * 1000)).fromNow()}</span>
      </div>
      <div className="relative mb-1 break-words pr-[80px] leading-7">
        {!isEditing && (
        <p className="mb-2 break-words text-md line-clamp-2">
          {comment.content.body}
        </p>
        )}
        {isEditing && (
          <CommentForm label="Editing" parent={comment} handleSubmit={(text) => updateComment(comment.stream_id, text, master)} />
        )}
      </div>
      <div className="flex">
        <div className="flex space-x-3">
          <span className="flex items-center space-x-2">
            <HandThumbUpIcon className="w-4 h-4" />
            {comment.count_likes ?? 0}
          </span>
          <span className="flex items-center space-x-2" onClick={() => setActiveComment({ id: comment.stream_id, type: 'replying' })}>
            Reply
          </span>
        </div>
        {canEdit && (
        <div className="flex space-x-3">
          <span className="flex items-center space-x-2">
            <PencilIcon className="w-4 h-4" />
          </span>
          <span className="flex items-center space-x-2" onClick={() => setActiveComment({ id: comment.stream_id, type: 'editing' })}>
            Edit
          </span>
        </div>
        )}
      </div>
      {isReplying && (
      <CommentForm
        label={(
          <div className="flex">
            <span>Replying to: </span>
            <BaseUser details={comment.creator_details} />
          </div>
          )}
        parent={comment}
        handleSubmit={(text) => addComment(text, replyId, replyTo)}
      />
      )}
      {replies && replies?.data?.length > 0 && (
        <div className="p-4">
          {replies?.data?.map((reply) => (
            <CommentsItem
              key={reply.stream_id}
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
    </Card>
  )
};
