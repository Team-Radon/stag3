import { Comment } from '@/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useOrbis } from './useOrbis';

export const useGetComment = ({ id }: { id: string }) => {
  const orbis = useOrbis();

  return useQuery(
    ['comment', id],
    async () => await orbis.getPost(id) as {
      data: Comment
      error: Error
      status: number
    }
  );
};
