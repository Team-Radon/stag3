import { User } from '../helpers/interfaces';
import { useGetActiveUsers } from '../orbis/useGetActiveUsers';
import { Button } from './UI/Button';
import Card from './UI/Card';
import { UserProfileItem } from './UserProfileItem';

export const ActiveUsers = () => {
  const { data: users, isLoading } = useGetActiveUsers({ did: 'none' });

  if (!users && isLoading) {
    return (
      <>
        <div className="lazy-loading mb-2 rounded-md w-[80%] h-[20px]" />
        <div className="lazy-loading rounded-md w-[50%] h-[20px]" />
      </>
    );
  }

  return (
    <Card>
      <div className="divide-y divide-skin-divider">
        {users?.data?.map((user: User, i: number) => (
          <UserProfileItem key={i} details={user.profile} />
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
