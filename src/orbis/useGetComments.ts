import { Comment } from '@/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useOrbis } from './useOrbis';

export const useGetComments = ({ id, context }: { id: string, context: string }) => {
  const orbis = useOrbis();

  return useQuery(
    ['comments', id],
    async () => await orbis.getPosts({
      context,
      master: id
    }) as {
      data: Comment[]
      error: Error
      status: number
    }
  );
};
