import { Notification } from '@/helpers/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useOrbis } from './useOrbis';

export const useGetNotifications = ({ did }: { did?: string }) => {
  const orbis = useOrbis();

  return useQuery(
    ['notifications', did],
    async () => await orbis.getNotifications({
      type: 'social'
    }) as {
      data: Notification[]
      error: Error
      status: number
    }
  );
};
