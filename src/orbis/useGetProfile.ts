import { User } from '@/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useOrbis } from './useOrbis';

export const useGetProfile = ({ id }: { id: string }) => {
  const orbis = useOrbis();

  return useQuery(['profile', id], async () => await orbis.getProfile(id) as {
    data: User
    error: Error
    status: number
  });
};
