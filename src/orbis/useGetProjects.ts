// https://orbis.club/documentation/api-documentation/getPosts
import { useQuery } from '@tanstack/react-query';
import { useOrbis } from './useOrbis';

export const useGetProjects = ({ options }: { options: any }) => {
  const orbis = useOrbis();

  return useQuery(
    ['projects', options],
    async () => await orbis.getPosts({
      context: process.env.PROJECT_CONTEXT,
      only_master: true,
      ...options
    })
  );
};
