import { Project } from '@/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useOrbis } from './useOrbis';

export const useGetProject = ({ id }: { id: string }) => {
  const orbis = useOrbis();

  return useQuery(['project', id], async () => await orbis.getPost(id) as {
    data: Project
    error: Error
    status: number
  });
};
