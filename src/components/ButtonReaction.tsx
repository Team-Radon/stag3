/* eslint-disable react-hooks/rules-of-hooks */
import { useOrbis } from '@/orbis/useOrbis';
import { useAppStore } from '@/store/useAppStore';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { usePrevious } from '@/hooks/usePrevious';
import { Button } from './UI/Button';

type ReactType = 'like' | 'downvote' | 'haha'

export const ButtonReaction = ({
  creator,
  stream_id,
  count_downvotes,
  count_likes,
  className = ''
}: {
  creator: string
  stream_id: string
  count_downvotes: number
  count_likes: number
  className?: string
}) => {
  const orbis = useOrbis();
  const user = useAppStore((state) => state.user);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDownvoted, setIsDownvoted] = useState<boolean>(false);

  const [likeLoading, setLikeLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [totalLikes, setTotalLikes] = useState<number>(0);
  const [totalDownvotes, setTotalDownvotes] = useState<number>(0);

  const [currentType, setCurrentType] = useState<ReactType>('haha');
  const prevType = usePrevious<ReactType>(currentType);

  const getIsReacted = async () => {
    const { data, error } = await orbis.api.from('orbis_reactions').select('type').eq('post_id', stream_id).eq('creator', user?.did)
    if (error) {
      console.log('Error querying isReacted: ', error);
      toast.error('Error querying isReacted');
      return;
    }

    if (data.length) {
      setCurrentType(data[0]?.type)
    }
  };

  const setReaction = async (type: ReactType) => {
    setLikeLoading(type === 'like');
    setLoading(type === 'downvote');

    const res = await orbis.react(stream_id, type);

    if (res.status === 300) {
      toast.error('Error set following');
      return;
    }

    if (res.status === 200) {
      setLikeLoading(false);
      setLoading(false);

      if (type === 'like') {
        setTotalLikes(totalLikes + 1);
        toast.success('like');
        if (prevType === 'downvote') {
          setTotalDownvotes(totalDownvotes - 1);
        }
      } else if (type === 'downvote') { // downvote
        setTotalDownvotes(totalDownvotes + 1);
        toast.success('dislike');
        if (prevType === 'like') {
          setTotalLikes(totalLikes - 1)
        }
      } else if (type === 'haha') { // haha
        if (prevType === 'like') {
          setTotalLikes(totalLikes - 1)
        } else if (prevType === 'downvote') {
          setTotalDownvotes(totalDownvotes - 1)
        }
      }
      setCurrentType(type);
    }
  };

  // trigger get reaction
  useEffect(() => {
    getIsReacted();
  }, [user]);

  // set totals
  useEffect(() => {
    setTotalLikes(count_likes);
    setTotalDownvotes(count_downvotes);
  }, []);

  useEffect(() => {
    setIsLiked(currentType === 'like');
    setIsDownvoted(currentType === 'downvote');
  }, [currentType]);

  return (
    <>
      {/* like */}
      <Button
        loading={likeLoading}
        size="sm"
        className={clsx(
          'group',
          {
            'hover:!border-red hover:!text-red':
            isLiked
          },
          className
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setReaction(!isLiked ? 'like' : 'haha');
        }}
        icon={isLiked
          ? <HandThumbUpIcon className="w-4 h-4 fill-black" />
          : <HandThumbUpIcon className="h-4 w-4" />}
        disabled={likeLoading}
      >
        <span>
          {totalLikes}
        </span>
      </Button>
      {/* downvote */}
      <Button
        loading={loading}
        size="sm"
        className={clsx(
          'group',
          {
            'hover:!border-red hover:!text-red':
            isDownvoted
          },
          className
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setReaction(!isDownvoted ? 'downvote' : 'haha');
        }}
        icon={isDownvoted
          ? <HandThumbDownIcon className="w-4 h-4 fill-black" />
          : <HandThumbDownIcon className="w-4 h-4" />}
        // disabled={user?.did === creator}
        disabled={likeLoading}
      >
        <span>
          {totalDownvotes}
        </span>
      </Button>
    </>
  );
};
