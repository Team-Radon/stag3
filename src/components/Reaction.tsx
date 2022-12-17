import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useOrbis } from '@/orbis/useOrbis';
import { useAppStore } from '@/store/useAppStore';
import { useGetUserReaction } from '@/orbis/useGetUserReaction';

interface Props {
  className?: string
  stream_id: string
  count: number
  type: 'haha' | 'like' | 'downvote'
}

export const Reaction =
  ({ className = '', stream_id, count, type }: Props) => {
    const user = useAppStore((state) => state.user);
    const {
      data
      // isLoading,
      // error
    } = useGetUserReaction({ stream_id, did: user?.did as string });

    // const [rCount, setRCount] = useState(count);
    const [active, setActive] = useState<boolean>();
    // const [shake, setShake] = useState(false)
    const orbis = useOrbis();

    useEffect(() => {
      setActive(false);
      console.log('reactions');
      console.log(data);
      if (data && data.length > 0) {
        setActive(data[0].type);
      }
    }, [data])

    useEffect(() => {
      console.log(user);
    }, [user])
    const react = async () => {
      // setRCount(rCount + 1);
      // setHasReacted(true);
      // setShake(true);

      /** React to the post using the SDK */
      const res = await orbis.react(stream_id, type);

      /** Check results */
      if (res.status === 300) {
        console.log(res);
      }

      if (res.status === 200) {
        console.log(res);
        // toast.success('saved');
      }
    }
    return (
      <button
        className={clsx(
          'flex h-[44px] w-[44px] cursor-pointer select-none items-center justify-center rounded-full border border-skin-border hover:border-skin-text',
          className
          // hasReacted ? 'one-reaction active' : 'one-reaction'
        )}
        onClick={user ? async () => react() : () => alert('You must be connected to react to a post.')}
      >
        <svg className={active ? 'w-5 h-5 fill-emerald-600' : 'w-5 h-5 fill-white-600'} stroke-width="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        like
        {' '}
        {count}
      </button>
    );
  }
