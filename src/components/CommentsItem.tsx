import { Comment } from '@/helpers/interfaces';
import { useGetComments } from '@/orbis/useGetComments';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Dispatch, SetStateAction } from 'react';
import { CommentForm } from './CommentForm';
import Card from './UI/Card';
import { UserPophover } from './UserPophover';

dayjs.extend(relativeTime);

interface CommentsItemProps {
  comment: Comment
  master?: string | null
  activeComment: { id: string, type: 'replying' | 'editing' } | null
  setActiveComment: Dispatch<SetStateAction<{ id: string, type: 'replying' | 'editing' } | null>>
  addComment: (body: string, master: string, replyTo?: string) => void
}

export const CommentsItem = ({ comment, master = null, activeComment, setActiveComment, addComment }: CommentsItemProps) => {
  const { data: replies } = useGetComments({ id: comment.stream_id });
  const isReplying = activeComment && activeComment.type === 'replying' && activeComment.id === comment.stream_id
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
        <p className="mb-2 break-words text-md line-clamp-2">
          {comment.content.body}
        </p>
      </div>
      <div className="flex space-x-3">
        <span className="flex items-center space-x-2">
          <HandThumbUpIcon className="w-4 h-4" />
          {comment.count_likes ?? 0}
        </span>
        <span className="flex items-center space-x-2" onClick={() => setActiveComment({ id: comment.stream_id, type: 'replying' })}>
          Reply
        </span>
      </div>
      {isReplying && <CommentForm parent={comment} handleSubmit={(text) => addComment(text, replyId, replyTo)} />}
      {replies && replies?.data?.length > 0 && (
        <div className="p-4">
          {replies?.data?.map((reply) => (
            <CommentsItem
              key={reply.stream_id}
              master={comment?.stream_id}
              addComment={addComment}
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
