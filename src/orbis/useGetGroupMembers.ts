import { User } from '@/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useOrbis } from './useOrbis';

export const useGetGroupMembers = () => {
  const orbis = useOrbis();

  return useQuery(
    ['group-members'],
    async () => await orbis.getGroupMembers(process.env.STAGE_GROUP) as {
      data: User[]
    }
  );
};
