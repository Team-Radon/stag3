import { Comment } from '@/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useOrbis } from './useOrbis';

export const useGetComments = ({ id }: { id: string }) => {
  const orbis = useOrbis();

  return useQuery(
    ['comments', id],
    async () => await orbis.getPosts({
      context: process.env.PROJECT_CONTEXT,
      master: id
    }) as {
      data: Comment[]
      error: Error
      status: number
    }
  );
};
