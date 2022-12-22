/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import Error from 'next/error';
import { GridItemEight, GridItemFour, GridLayout } from '@/components/GridLayout';
import Card from '@/components/UI/Card';
import { AvatarUser } from '@/components/AvatarUser';
import { Markdown } from '@/components/Markdown';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import { Comments } from '@/components/Comments';
import { ButtonReaction } from '@/components/ButtonReaction';
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
            <GridItemEight className="space-y-4">
              <Card>
                {post?.data?.content?.data?.cover && (
                <div className="cover mb-6">
                  <div className="relative aspect-[5/2] md:aspect-[3/1] overflow-hidden rounded">
                    <Image src={post?.data?.content?.data?.cover} alt="cover" fill style={{ objectFit: 'cover', objectPosition: 'top' }} />
                  </div>
                </div>
                )}
                <div className="flex flex-col md:flex-row justify-between items-start -mt-20 mb-6 md:mb-8 md:mt-0">
                  <div className="flex flex-col items-center md:flex-row gap-4 md:gap-6">
                    <div className="logo shrink-0 relative aspect-square w-24 rounded-md md:rounded-lg overflow-hidden">
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
                        <div className="text-xs font-medium tracking-wider uppercase mb-2">Status</div>
                        <h1 className="text-2xl mb-2">{post?.data?.content?.title}</h1>
                        <div className="content space-y-6 text-sm break-words">
                          {post?.data?.content?.body}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 mx-auto mt-4 md:mx-0 md:ml-4">
                    <ButtonReaction creator={post?.data?.creator || ''} stream_id={post?.data?.stream_id || ''} count_downvotes={post?.data?.count_downvotes || 0} count_likes={post?.data?.count_haha || 0} />
                  </div>
                </div>
                <div className="font-medium leading-6 text-gray-900 border-b border-gray-200 pb-2">Details</div>
                <div className="about mt-6">
                  <div className="text-sm font-medium text-gray-500 mb-4">Tags</div>
                  <div className="tag-chips flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6">
                    {post?.data?.content?.tags.map(({ title, slug }) => (
                      <Link key={slug} href={`/list/${slug}`}>
                        <span className="bg-indigo-100 border border-indigo-300 hover:bg-indigo-200 text-indigo-600 text-xs font-semibold px-2.5 py-0.5 rounded-md dark:bg-blue-200 dark:text-indigo-800 dark:hover:bg-indigo-300">
                          {title}
                        </span>
                      </Link>
                    ))}
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
                  <div className="official-sites w-1/2 mt-6">
                    <div className="text-sm font-medium text-gray-500 mb-4">Official</div>
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
                  <div className="socials w-1/2 mt-6">
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
              <Card>
                {post && (
                <Comments
                  context={process.env.PROJECT_CONTEXT || ''}
                  post={post?.data}
                />
                )}
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
              {/* <Card className="mt-4">
                {post?.data?.content?.data?.cover && <img src={post?.data?.content?.data?.cover} alt="cover" />}
              </Card> */}
            </GridItemFour>
          </>
          )}
    </GridLayout>
  );
};

export default Project;
