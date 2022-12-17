import { Discussion } from '@/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useOrbis } from './useOrbis';

export interface GetDiscussionsOptions {
  did?: string
  tag?: string
}

export const useGetDiscussions = ({ options }: { options?: GetDiscussionsOptions }) => {
  const orbis = useOrbis();

  return useQuery(
    ['discussions', options],
    async () => await orbis.getPosts({
      context: process.env.DISCUSSION_CONTEXT,
      only_master: true,
      ...options
    }) as {
      data: Discussion[]
      error: Error
      status: number
    }
  );
};
