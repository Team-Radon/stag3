import { useQuery } from '@tanstack/react-query';
import { useOrbis } from './useOrbis';

export const useGetUserReaction = async ({ stream_id, did }: { stream_id: string, did: string }) => {
  const orbis = useOrbis();
  interface ResProps {
    data: any
    error: Error
    status: number
  }
  const { data, error, status }: ResProps = useQuery(['reaction', stream_id, did], async () => await orbis.api.from('orbis_reactions').select('type').eq('post_id', stream_id).eq('creator', did));
  console.log('data');
  console.log(data?.body);
  console.log(error);
  console.log(status);
  return data;
};
