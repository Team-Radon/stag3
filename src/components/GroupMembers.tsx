import { User } from '../helpers/interfaces';
import { useGetGroupMembers } from '../orbis/useGetGroupMembers';
import Card from './UI/Card';
import { LoadingSpinner } from './UI/LoadingSpinner';
import { UserProfileItem } from './UserProfileItem';

export const GroupMembers = () => {
  const { data: users, isLoading } = useGetGroupMembers();

  if (!users && isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <Card padded>
      <div className="divide-y divide-skin-divider">
        {users?.data?.map((user: User) => (
          <UserProfileItem key={user.did} details={user.profile_details} />
        ))}
      </div>
    </Card>
  )
}
