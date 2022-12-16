import { useHover } from '@/hooks/useHover';
import { useOrbis } from '@/orbis/useOrbis';
import { useAppStore } from '@/store/useAppStore';
import { CheckIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from './UI/Button';

export const ButtonFollow = ({
  creator,
  className = ''
}: {
  creator: string
  className?: string
}) => {
  const orbis = useOrbis();
  const user = useAppStore((state) => state.user);
  const [isFollowing, setIsFollowing] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>();
  const [hoverRef, isHovered] = useHover<HTMLButtonElement>();

  const getIsFollowing = async () => {
    const { data, error } = await orbis.getIsFollowing(user?.did, creator);

    if (error) {
      console.log('Error querying isfollowing: ', error);
      toast.error('Error querying isfollowing');
      return;
    }

    setIsFollowing(data);
  };

  const setFollow = async (follow: boolean) => {
    setLoading(true);
    const res = await orbis.setFollow(creator, follow);

    setLoading(false);

    if (res.status === 300) {
      toast.error('Error set following');
      return;
    }

    if (res.status === 200) {
      setIsFollowing(follow);
      toast.success(follow ? 'Followed' : 'Unfollowed');
    }
  };

  useEffect(() => {
    getIsFollowing();
  }, [user]);

  if (user?.did === creator) {
    return null;
  }

  return (
    <Button
      ref={hoverRef}
      loading={loading}
      size="sm"
      className={clsx(
        'group',
        {
          'hover:!border-red hover:!text-red':
            isFollowing
        },
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setFollow(!isFollowing);
      }}
      icon={isFollowing && isHovered
        ? <MinusIcon className="h-4 w-4" />
        : isFollowing
          ? <CheckIcon className="h-4 w-4" />
          : <PlusIcon className="h-4 w-4" />}
    >
      {isFollowing
        ? (
          <span>
            <span className="group-hover:hidden">
              Followed
            </span>
            <span className="hidden group-hover:block">Unfollow</span>
          </span>
          )
        : (
          <span>Follow</span>
          )}
    </Button>
  );
};
