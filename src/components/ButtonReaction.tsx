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
  const [likeLoading, setLikeLoading] = useState<boolean>();

  const [totalLikes, setTotalLikes] = useState<number>(0);
  const [totalDownvotes, setTotalDownvotes] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>();
  // const [currentType, setCurrentType] = useState<ReactType>();

  const prevType = usePrevious<boolean>(isLiked);

  const getIsReacted = async () => {
    const { data, error } = await orbis.api.from('orbis_reactions').select('type').eq('post_id', stream_id).eq('creator', user?.did)
    if (error) {
      console.log('Error querying isReacted: ', error);
      toast.error('Error querying isReacted');
      return;
    }
    console.log('data');
    console.log(data);

    if (data.length) {
      setIsLiked(data[0]?.type === 'like');
      setIsDownvoted(data[0]?.type === 'downvote');
    }
  };

  const setReaction = async (type: ReactType) => {
    if (type === 'like') {
      setLikeLoading(true);
    } else if (type === 'downvote') {
      setLoading(true);
    }

    const res = await orbis.react(stream_id, type);

    if (res.status === 300) {
      toast.error('Error set following');
      return;
    }
    setLikeLoading(false);
    setLoading(false);

    alert(prevType)
    if (res.status === 200) {
      if (type === 'like') {
        setIsLiked(true);
        setIsDownvoted(false);
        setTotalLikes(totalLikes + 1)
        // if (prevType === 'downvote') {
        //   setTotalDownvotes(totalDownvotes - 1)
        // }
      } else if (type === 'downvote') {
        setIsDownvoted(true);
        setIsLiked(false);
        setTotalDownvotes(totalDownvotes + 1);
        // if (prevType === 'like') {
        //   setTotalLikes(totalLikes - 1)
        // }
        // eslint-disable-next-line react-hooks/rules-of-hooks
      } else if (type === 'haha') { // haha
        setIsDownvoted(false);
        setIsLiked(false);
        // if (prevType === 'like') {
        //   setTotalLikes(totalLikes - 1)
        // } else if (prevType === 'downvote') {
        //   setTotalDownvotes(totalDownvotes - 1)
        // }
      }
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
  // useEffect(() => {

  // }, [currentType]);

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
        // disabled={user?.did === creator}
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
      >
        <span>
          {totalDownvotes}
        </span>
      </Button>
    </>
  );
};
