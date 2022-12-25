/* eslint-disable react-hooks/rules-of-hooks */
import { useOrbis } from '@/orbis/useOrbis';
import { useAppStore } from '@/store/useAppStore';
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
    <div className={clsx('flex items-center md:flex-col', className)}>
      {/* upvote */}
      <Button
        loading={likeLoading}
        size="sm"
        className={clsx(
          'border-none hover:bg-indigo-100/50',
          className
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setReaction(!isLiked ? 'like' : 'haha');
        }}
        icon={isLiked
          ? (
            <div className="flex items-center justify-center w-4 h-5">
              <svg className="w-3 h-3 text-indigo-500" viewBox="0 0 8 6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.0457177 5.78562C0.0796693 5.85023 0.130626 5.90435 0.193089 5.94213C0.255551 5.97992 0.327147 5.99992 0.40015 6L7.60082 6C7.67369 5.9997 7.7451 5.97954 7.80737 5.9417C7.86963 5.90385 7.92041 5.84975 7.95422 5.78522C7.98804 5.72068 8.00362 5.64815 7.99929 5.57542C7.99496 5.50269 7.97088 5.43251 7.92965 5.37244L4.32931 0.172801C4.29261 0.119508 4.24351 0.0759338 4.18622 0.0458312C4.12894 0.0157286 4.0652 -5.65746e-09 4.00048 0C3.93577 5.65746e-09 3.87203 0.0157286 3.81474 0.0458312C3.75746 0.0759338 3.70835 0.119508 3.67165 0.172801L0.0713197 5.37244C0.0296812 5.43239 0.00527808 5.50261 0.000764139 5.57545C-0.0037498 5.6483 0.0117986 5.72099 0.0457177 5.78562ZM4.00048 1.10314L6.83755 5.20006L1.16342 5.20006L4.00048 1.10314Z" fill="currentColor" />
                <path d="M4 1L7.4641 5.5H0.535899L4 1Z" fill="currentColor" />
              </svg>
            </div>
            )
          : (
            <div className="flex items-center justify-center w-4 h-5">
              <svg className="w-3 h-3" viewBox="0 0 8 6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.0457175 5.78562C0.0796691 5.85023 0.130626 5.90435 0.193088 5.94213C0.255551 5.97992 0.327147 5.99992 0.40015 6L7.60082 6C7.67369 5.9997 7.7451 5.97954 7.80737 5.9417C7.86963 5.90385 7.92041 5.84976 7.95422 5.78522C7.98804 5.72068 8.00362 5.64815 7.99929 5.57542C7.99496 5.50269 7.97088 5.43251 7.92965 5.37244L4.32931 0.172801C4.29261 0.119508 4.24351 0.075934 4.18622 0.0458313C4.12894 0.0157287 4.0652 1.45872e-07 4.00048 1.51529e-07C3.93577 1.57187e-07 3.87203 0.0157287 3.81474 0.0458314C3.75746 0.075934 3.70835 0.119508 3.67165 0.172801L0.0713195 5.37244C0.029681 5.43239 0.00527788 5.50261 0.000763948 5.57545C-0.00374999 5.6483 0.0117984 5.72099 0.0457175 5.78562ZM4.00048 1.10314L6.83755 5.20006L1.16342 5.20006L4.00048 1.10314Z" fill="currentColor" />
              </svg>
            </div>
            )}
        disabled={likeLoading}
      />

      <div className="text-center text-xs">{totalLikes}</div>

      {/* downvote */}
      <Button
        loading={loading}
        size="sm"
        className={clsx(
          'border-none hover:bg-indigo-100/50',
          className
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setReaction(!isDownvoted ? 'downvote' : 'haha');
        }}
        icon={isDownvoted
          ? (
            <div className="flex items-center justify-center w-4 h-5">
              <svg className="w-3 h-3 text-rose-500" viewBox="0 0 8 6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.95428 0.214385C7.92033 0.149768 7.86937 0.0956479 7.80691 0.0578663C7.74445 0.0200847 7.67285 7.61105e-05 7.59985 0H0.399182C0.326312 0.000300943 0.254904 0.0204572 0.192635 0.0583012C0.130366 0.0961451 0.0795931 0.150245 0.0457763 0.214782C0.0119596 0.27932 -0.0036216 0.351854 0.000708385 0.424583C0.00503837 0.497313 0.0291157 0.567486 0.0703511 0.627557L3.67069 5.8272C3.70738 5.88049 3.75649 5.92407 3.81377 5.95417C3.87106 5.98427 3.9348 6 3.99952 6C4.06423 6 4.12797 5.98427 4.18526 5.95417C4.24254 5.92407 4.29165 5.88049 4.32835 5.8272L7.92868 0.627557C7.97032 0.567609 7.99472 0.497395 7.99924 0.424549C8.00375 0.351703 7.9882 0.279013 7.95428 0.214385ZM3.99952 4.89686L1.16245 0.799945H6.83658L3.99952 4.89686Z" fill="currentColor" />
                <path d="M4 5L0.535898 0.500001L7.4641 0.5L4 5Z" fill="currentColor" />
              </svg>
            </div>
            )
          : (
            <div className="flex items-center justify-center w-4 h-5">
              <svg className="w-3 h-3" viewBox="0 0 8 6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.95428 0.214385C7.92033 0.149768 7.86937 0.0956479 7.80691 0.0578663C7.74445 0.0200847 7.67285 7.61105e-05 7.59985 0H0.399182C0.326312 0.000300943 0.254904 0.0204572 0.192635 0.0583012C0.130366 0.0961451 0.0795931 0.150245 0.0457763 0.214782C0.0119596 0.27932 -0.0036216 0.351854 0.000708385 0.424583C0.00503837 0.497313 0.0291157 0.567486 0.0703511 0.627557L3.67069 5.8272C3.70738 5.88049 3.75649 5.92407 3.81377 5.95417C3.87106 5.98427 3.9348 6 3.99952 6C4.06423 6 4.12797 5.98427 4.18526 5.95417C4.24254 5.92407 4.29165 5.88049 4.32835 5.8272L7.92868 0.627557C7.97032 0.567609 7.99472 0.497395 7.99924 0.424549C8.00375 0.351703 7.9882 0.279013 7.95428 0.214385ZM3.99952 4.89686L1.16245 0.799945H6.83658L3.99952 4.89686Z" fill="currentColor" />
              </svg>
            </div>
            )}
        // disabled={user?.did === creator}
        disabled={likeLoading}
      />
    </div>
  );
};
