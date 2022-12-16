import { Comment } from '@/helpers/interfaces';
import { ChatBubbleLeftIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AvatarUser } from './AvatarUser';
import Card from './UI/Card';

dayjs.extend(relativeTime);

export const CommentsItem = ({ comment }: { comment: Comment }) => (
  <Card className="border-none">
    <div className="mb-2 flex items-center justify-between">
      <div className="flex items-center space-x-1">
        <AvatarUser size="28" details={comment.creator_details} />
      </div>
      <span>{dayjs(new Date(comment.timestamp * 1000)).fromNow()}</span>
    </div>
    <div className="relative mb-1 break-words pr-[80px] leading-7">
      <p className="mb-2 break-words text-md line-clamp-2">
        {comment.content.body}
      </p>
    </div>
    <div className="flex space-x-3">
      <span className="flex items-center space-x-1">
        <ChatBubbleLeftIcon className="w-4 h-4" />
        {comment.count_replies ?? 0}
      </span>
      <span className="flex items-center space-x-2">
        <HandThumbUpIcon className="w-4 h-4" />
        {comment.count_likes ?? 0}
      </span>
    </div>
  </Card>
);
