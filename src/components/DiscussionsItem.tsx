import { Discussion } from '@/helpers/interfaces'
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { UserPophover } from './UserPophover';
import { ButtonReaction } from './ButtonReaction';

dayjs.extend(relativeTime);

export const DiscussionsItem = ({ discussion }: { discussion: Discussion }) => (
  <Link className="px-4 md:px-6 py-10 block hover:bg-gray-100 duration-100" href={`/discussions/${discussion.stream_id}`} title={discussion.content?.title}>
    <div className="flex items-center gap-4">
      <ButtonReaction className="!flex-col" stream_id={discussion.stream_id} count_likes={discussion.count_likes} count_downvotes={discussion.count_downvotes} creator={discussion.creator} />
      <div className="shrink-0">
        <UserPophover iconOnly details={discussion.creator_details} />
      </div>
      <div>
        {(discussion?.content?.title)
          ? (
            <div className="text-base md:text-xl font-semibold">
              {discussion?.content?.title}
            </div>
            )
          : (
            <div className="text-base text-slate-400 md:text-xl font-semibold">
              No Topic
            </div>
            )}
        <div className="flex items-center gap-4 !text-xs mt-2">
          <UserPophover userOnly details={discussion.creator_details} />
          <span>
            {discussion?.count_replies}
            {' '}
            replies
          </span>
          <span>{dayjs(new Date(discussion.timestamp * 1000)).fromNow()}</span>
        </div>
      </div>
    </div>
  </Link>
);
