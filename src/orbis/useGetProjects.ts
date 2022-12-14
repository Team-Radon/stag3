import { Project } from '@/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useOrbis } from './useOrbis';

export interface GetProjectsOptions {
  did?: string
  tag?: string
}

export const useGetProjects = ({ options }: { options?: GetProjectsOptions }) => {
  const orbis = useOrbis();

  return useQuery(
    ['projects', options],
    async () => await orbis.getPosts({
      context: process.env.PROJECT_CONTEXT,
      only_master: true,
      ...options
    }) as {
      data: Project[]
      error: Error
      status: number
    }
  );
};
