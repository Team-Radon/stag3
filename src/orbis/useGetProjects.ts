// https://orbis.club/documentation/api-documentation/getPosts
import { useQuery } from '@tanstack/react-query';
import { PROJECT_CONTEXT } from '../../constants';
import { useOrbis } from './useOrbis';

export const useGetProjects = ({ options }: { options: any }) => {
  const orbis = useOrbis();

  return useQuery(
    ['projects', options],
    async () => await orbis.getPosts({
      context: PROJECT_CONTEXT,
      only_master: true,
      ...options
    })
  );
};
