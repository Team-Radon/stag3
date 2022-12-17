import { User } from '../helpers/interfaces';
import { useGetActiveUsers } from '../orbis/useGetActiveUsers';
import { Button } from './UI/Button';
import Card from './UI/Card';
import { LoadingSpinner } from './UI/LoadingSpinner';
import { UserProfileItem } from './UserProfileItem';

export const ActiveUsers = () => {
  const { data: users, isLoading } = useGetActiveUsers({ did: 'none' });

  if (!users && isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <Card>
      <div className="divide-y divide-skin-divider">
        {users?.data?.map((user: User) => (
          <UserProfileItem key={user.did} details={user.profile} />
        ))}
      </div>
      <div className="mt-6 flex">
        <Button className="w-full">
          View all
        </Button>
      </div>
    </Card>
  )
}
