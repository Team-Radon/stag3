import { useQuery } from '@tanstack/react-query';
import { User } from '@/helpers/interfaces';
import { useOrbis } from './useOrbis';

export const useGetProfileFollowing = ({ id }: { id: string }) => {
  console.log('useGetProfileFollowing');
  const orbis = useOrbis();

  return useQuery(['profile-following', id], async () => await orbis.getProfileFollowing(id) as {
    data: User[]
    error: Error
    status: number
  });
};
