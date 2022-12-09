import Error from 'next/error';
import { useRouter } from 'next/router';
import { useUsername } from '../../hooks/useUsername';
import { useGetProfile } from '../../orbis/useGetProfile';

const Profile = () => {
  const {
    query: { did }
  } = useRouter();

  const {
    data: profile,
    isLoading,
    error
  } = useGetProfile({ id: did as string });

  const { username } = useUsername(profile?.data?.details);

  if (error) {
    return <Error statusCode={404} />;
  }

  return (
    <div>
      {profile && isLoading
        ? <div>loading</div>
        : (
          <div>
            <h1>{username}</h1>
            <div>{JSON.stringify(profile)}</div>
          </div>
          )}
    </div>
  );
};

export default Profile;
