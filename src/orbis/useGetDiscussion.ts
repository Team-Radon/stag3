import { Discussion } from '@/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useOrbis } from './useOrbis';

export const useGetDiscussion = ({ id }: { id: string }) => {
  const orbis = useOrbis();

  return useQuery(
    ['discussion', id],
    async () => await orbis.getPost(id) as {
      data: Discussion
      error: Error
      status: number
    }
  );
};
