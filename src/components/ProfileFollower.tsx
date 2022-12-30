import { useRouter } from 'next/router';
import { useGetProfileFollower } from '@/orbis/useGetProfileFollower';
import { User } from '../helpers/interfaces';

import Card from './UI/Card';
import { LoadingSpinner } from './UI/LoadingSpinner';
import { UserProfileItem } from './UserProfileItem';

export const ProfileFollower = () => {
  const {
    query: { did }
  } = useRouter();

  const { data: users, isLoading } = useGetProfileFollower({ id: did as string });

  if (!users && isLoading) {
    return (
      <LoadingSpinner />
    );
  }
  return (
    <Card padded>
      <div className="divide-y divide-skin-divider">
        <>
          {users?.data?.map((user: User) => (
            <UserProfileItem key={user.did} details={user.details} />
          ))}
        </>
      </div>
    </Card>
  )
}
