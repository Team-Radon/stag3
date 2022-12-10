import { useQuery } from '@tanstack/react-query';
import { useOrbis } from './useOrbis';

export const useGetActiveUsers = ({ did }: { did?: string }) => {
  const orbis = useOrbis();

  return useQuery(
    ['active-users', did],
    async () => await orbis.api.rpc('active_users', {
      user_did: did ?? 'none'
    })
  );
};
