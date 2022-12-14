import { AvatarUser } from '@/components/AvatarUser';
import { GitCredentials } from '@/components/GitCredentials';
import { GridItemEight, GridItemFour, GridLayout } from '@/components/GridLayout';
import { Projects } from '@/components/Projects';
import { Button } from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import { useAppStore } from '@/store/useAppStore';
import clsx from 'clsx';
import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUsername } from '../../../hooks/useUsername';
import { useGetProfile } from '../../../orbis/useGetProfile';

const Profile = () => {
  const {
    query: { did },
    push,
    pathname
  } = useRouter();

  const {
    data: profile,
    isLoading,
    error
  } = useGetProfile({ id: did as string });

  const user = useAppStore((state) => state.user)

  const { username } = useUsername(profile?.data?.details);

  if (error) {
    return <Error statusCode={404} />;
  }

  return (
    <GridLayout>
      <GridItemEight>
        {profile && isLoading
          ? <div>loading</div>
          : (
            <div className="space-y-4">
              <Card className="overflow-hidden">
                <div className="lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
                  <div className="block px-4 pt-4 text-center md:flex lg:block lg:px-0 lg:pt-0">
                    <div className="flex lg:block">
                      <AvatarUser
                        details={profile?.data?.details}
                        size="80"
                        className="lg:my-3"
                      />
                      <div className="mx-3 flex flex-col justify-center truncate text-left lg:block lg:text-center">
                        <h3 className="mb-[2px] flex items-center lg:justify-center">
                          <div className="mr-1 truncate">{username}</div>
                        </h3>
                      </div>
                    </div>

                    {user?.did === did
                      ? (
                        <div className="flex flex-grow items-start justify-end gap-x-2 lg:mb-4 lg:justify-center">
                          <Button onClick={async () => push(`/profile/${user?.did}/edit`)}>
                            Edit profile
                          </Button>
                        </div>
                        )
                      : (
                        <div className="flex flex-grow items-start justify-end gap-x-2 lg:mb-4 lg:justify-center">
                          <Button>Follow</Button>
                        </div>
                        )}
                  </div>

                  <div className="no-scrollbar mt-4 flex overflow-y-auto lg:my-3 lg:block">
                    <Link href="/">
                      <div
                        className={clsx(
                          'block cursor-pointer whitespace-nowrap px-4  py-2 text-skin-link hover:bg-skin-bg',
                          {
                            'border-l-[0px] border-b-[3px] !pl-[21px] lg:border-b-[0px] lg:border-l-[3px]':
                          pathname === '/[did]'
                          }
                        )}
                      >
                        Posts
                      </div>
                    </Link>
                    <Link href="/">
                      <div
                        className={clsx(
                          'block cursor-pointer whitespace-nowrap px-4  py-2 text-skin-link hover:bg-skin-bg',
                          {
                            'border-l-[0px] border-b-[3px] !pl-[21px] lg:border-b-[0px] lg:border-l-[3px]':
                          pathname === '/[did]/about'
                          }
                        )}
                      >
                        About
                      </div>
                    </Link>
                    <Link href="/">
                      <div
                        className={clsx(
                          'block cursor-pointer whitespace-nowrap px-4  py-2 text-skin-link hover:bg-skin-bg',
                          {
                            'border-l-[0px] border-b-[3px] !pl-[21px] lg:border-b-[0px] lg:border-l-[3px]':
                          pathname === '/[did]/followers'
                          }
                        )}
                      >
                        <div className="flex space-x-2">
                          <span>Followers</span>
                          <span className="h-[20px] min-w-[20px] rounded-full bg-skin-text px-1 text-center text-xs leading-normal text-white my-auto">
                            {profile?.data?.count_followers}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <Link href="/">
                      <div
                        className={clsx(
                          'block cursor-pointer whitespace-nowrap px-4  py-2 text-skin-link hover:bg-skin-bg',
                          {
                            'border-l-[0px] border-b-[3px] !pl-[21px] lg:border-b-[0px] lg:border-l-[3px]':
                          pathname === '/[did]/following'
                          }
                        )}
                      >
                        <div className="flex space-x-2">
                          <span>Following</span>
                          <span className="h-[20px] min-w-[20px] rounded-full bg-skin-text px-1 text-center text-xs leading-normal text-white my-auto">
                            {profile?.data?.count_following}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </Card>
              <Card>
                <Projects options={{ did: profile?.data?.did }} />
              </Card>
            </div>
            )}
      </GridItemEight>
      <GridItemFour>
        <GitCredentials />
      </GridItemFour>
    </GridLayout>
  );
};

export default Profile;
