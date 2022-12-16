import { useRouter } from 'next/router';
import Error from 'next/error';
import { GridItemEight, GridItemFour, GridLayout } from '@/components/GridLayout';
import Card from '@/components/UI/Card';
import { AvatarUser } from '@/components/AvatarUser';
import { Markdown } from '@/components/Markdown';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import { useGetProject } from '../../orbis/useGetProject';
import { useUsername } from '../../hooks/useUsername';

const Project = () => {
  const {
    query: { stream_id }
  } = useRouter();

  const {
    data: post,
    error,
    isLoading
  } = useGetProject({ id: stream_id as string });

  const { username } = useUsername(post?.data?.creator_details);

  if (error) {
    return <Error statusCode={404} />;
  }

  return (
    <GridLayout className="pt-16">
      {!post && isLoading
        ? (
          <GridItemEight>
            <div>Loading</div>
          </GridItemEight>
          )
        : (
          <>
            {console.log(post?.data?.content)}
            <GridItemEight className="space-y-4">
              <Card>
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                  <div className="logo shrink-0 relative aspect-square w-28 md:w-36 rounded-md md:rounded-lg overflow-hidden">
                    <Image
                      className="w-full h-full"
                      src={post?.data?.content?.data?.logo ?? ''}
                      alt="logo"
                      width={100}
                      height={100}
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </div>
                  <div className="px-4 md:px-0">
                    <div className="text-center md:text-left">
                      <h1 className="text-2xl">{post?.data?.content?.title}</h1>
                      <div>{post?.data?.content?.body}</div>
                    </div>
                    <div className="tag-chips flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                      {post?.data?.content?.tags.map(({ title, slug }) => (
                        <Link key={slug} href={`/list/${slug}`}>
                          <span className="bg-indigo-100 border border-indigo-300 hover:bg-indigo-200 text-indigo-600 text-xs font-semibold px-2.5 py-0.5 rounded-md dark:bg-blue-200 dark:text-indigo-800 dark:hover:bg-indigo-300">
                            {title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="font-medium leading-6 text-gray-900 border-b border-gray-200 pb-2">Details</div>
                <div className="owners flex flex-col md:flex-row md:gap-20">
                  <div className="creator mt-6">
                    <div className="text-sm font-medium text-gray-500 mb-4">Creator</div>
                    <Link href={`/profile/${post?.data?.creator_details?.did}`} className="flex items-center gap-2 mt-3 hover:underline">
                      <AvatarUser
                        details={post?.data?.creator_details}
                        size="20"
                      />
                      <div className="text-sm text-gray-900">{post?.data?.creator_details?.profile?.username}</div>
                    </Link>
                  </div>
                  <div className="members mt-6">
                    <div className="text-sm font-medium text-gray-500 mb-4">Members</div>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <Link href={`/profile/${post?.data?.creator_details?.did}`} className="flex items-center gap-2 hover:underline">
                        <div className="bg-gray-300 w-5 h-5 rounded-full overflow-hidden" />
                        <div className="text-sm text-gray-900">Username</div>
                      </Link>
                      <Link href={`/profile/${post?.data?.creator_details?.did}`} className="flex items-center gap-2 hover:underline">
                        <div className="bg-gray-300 w-5 h-5 rounded-full overflow-hidden" />
                        <div className="text-sm text-gray-900">Username</div>
                      </Link>
                      <Link href={`/profile/${post?.data?.creator_details?.did}`} className="flex items-center gap-2 hover:underline">
                        <div className="bg-gray-300 w-5 h-5 rounded-full overflow-hidden" />
                        <div className="text-sm text-gray-900">Username</div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="about mt-6">
                  <div className="text-sm font-medium text-gray-500 mb-4">About</div>
                  <div className="prose prose-sm max-w-none">
                    <Markdown source={post?.data?.content?.data?.description_long} />
                  </div>
                </div>
                <div className="font-medium leading-6 text-gray-900 border-b border-gray-200 pb-2">Links</div>
                <div className="links flex flex-col md:flex-row md:gap-20">
                  <div className="official-sites mt-6">
                    <div className="text-sm font-medium text-gray-500 mb-4">Official Links</div>
                    <Link href={post?.data?.content?.data?.website ?? ''} className="group flex items-center gap-1 mt-2 text-sm text-sky-600 hover:underline">
                      <span>Website</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 hidden group-hover:block" />
                    </Link>
                    <Link href={post?.data?.content?.data?.whitepaper ?? ''} className="group flex items-center gap-1 mt-2 text-sm text-sky-600 hover:underline">
                      <span>Whitepaper / Litepaper</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 hidden group-hover:block" />
                    </Link>
                    <Link href={post?.data?.content?.data?.github ?? ''} className="group flex items-center gap-1 mt-2 text-sm text-sky-600 hover:underline">
                      <span>Github</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 hidden group-hover:block" />
                    </Link>
                    <Link href={post?.data?.content?.data?.gitcoin ?? ''} className="group flex items-center gap-1 mt-2 text-sm text-sky-600 hover:underline">
                      <span>Gitcoin</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 hidden group-hover:block" />
                    </Link>
                  </div>
                  <div className="socials mt-6">
                    <div className="text-sm font-medium text-gray-500 mb-4">Socials</div>
                    <Link href={post?.data?.content?.data?.discord ?? ''} className="group flex items-center gap-1 mt-2 text-sm text-sky-600 hover:underline">
                      <span>Discord</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 hidden group-hover:block" />
                    </Link>
                    <Link href={post?.data?.content?.data?.twitter ?? ''} className="group flex items-center gap-1 mt-2 text-sm text-sky-600 hover:underline">
                      <span>Twitter</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 hidden group-hover:block" />
                    </Link>
                  </div>
                </div>
              </Card>
            </GridItemEight>
            <GridItemFour>
              <Card>
                <div className="flex items-center justify-center gap-2">
                  <AvatarUser
                    details={post?.data?.creator_details}
                    size="32"
                  />
                  <div>{username}</div>
                </div>
              </Card>
              <Card className="mt-4">
                {post?.data?.content?.data?.cover && <img src={post?.data?.content?.data?.cover} />}
              </Card>
            </GridItemFour>
          </>
          )}
    </GridLayout>
  );
};

export default Project;
