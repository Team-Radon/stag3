import { useQuery } from '@tanstack/react-query';
import { User } from '@/helpers/interfaces';
import { useOrbis } from './useOrbis';

export const useGetProfileFollower = ({ id }: { id: string }) => {
  const orbis = useOrbis();

  return useQuery(['profile-follower', id], async () => await orbis.getProfileFollowers(id) as {
    data: User[]
    error: Error
    status: number
  });
};
